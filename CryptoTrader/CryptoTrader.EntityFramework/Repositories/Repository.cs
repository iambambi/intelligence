using CryptoTrader.EntityDomain;
using CryptoTrader.EntityFramework.Exceptions;
using CryptoTrader.EntityFramework.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CryptoTrader.EntityFramework.Repositories
{
    public abstract class Repository<T> : IRepository<T> where T : class, IEntity
    {
        protected ApplicationDbContext Context;

        /// <summary>
        /// Creates the specified entity
        /// </summary>
        /// <param name="entity">The entity.</param>
        public virtual async Task<T> Create(T entity)
        {
            if (entity == null)
                throw new EntityNotFoundException<T>(entity.Id);

            Context.Set<T>().Attach(entity);
            Context.Set<T>().Add(entity);

            await Context.SaveChangesAsync();

            return Context.Set<T>().FirstOrDefault(x => x.Id == entity.Id);
        }

        /// <summary>
        /// Determines whether T entity exists with given identifier
        /// </summary>
        public async Task<bool> Exists(Guid id, Expression<Func<T, bool>> filter = null)
        {
            IQueryable<T> result = Context.Set<T>();

            if (filter != null)
                result = result.Where(filter);

            return await result.AnyAsync(x => x.Id == id);
        }

        /// <summary>
        /// Gets all entities on the DbTable
        /// </summary>
        /// <param name="filter">The optional filter parameter (lambda).</param>
        public async Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> filter = null)
        {
            IQueryable<T> result = Context.Set<T>();

            if (filter != null)
                result = result.Where(filter);

            return await result.ToListAsync();
        }

        /// <summary>
        /// Returns the number of entities present (based on filter)
        /// </summary>
        /// <param name="filter">The optional filter parameter (lambda).</param>
        public int Count(Expression<Func<T, bool>> filter = null) => GetAll(filter).Result.Count();

        /// <summary>
        /// Gets the entity by the given identifier
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="filter">The optional filter parameter (lambda).</param>
        public T GetById(object id, Expression<Func<T, bool>> filter = null) => GetByIds(new List<object> { id }, filter).Result.FirstOrDefault();

        /// <summary>
        /// Gets the entities by the given identifiers
        /// </summary>
        /// <param name="ids">The identifiers.</param>
        /// <param name="filter">The optional filter parameter (lambda).</param>
        public async Task<IEnumerable<T>> GetByIds(List<object> ids, Expression<Func<T, bool>> filter = null)
        {
            IQueryable<T> result = Context.Set<T>();

            if (filter != null)
                result = result.Where(filter);

            if (ids != null)
                result = result.Where(x => ids.Contains(x.Id));
            else
                throw new ArgumentNullException("The ids were not given.");

            if (result == null)
                throw new EntityNotFoundException<T>(ids);

            return await result.ToListAsync();
        }

        /// <summary>
        /// Updates the specified entity
        /// </summary>
        /// <param name="entity">The entity.</param>
        /// <returns></returns>
        public async Task<T> Update(T entity)
        {
            if (entity == null)
                throw new ArgumentException("The entity was not given.");

            if (!Exists(entity.Id).Result)
                throw new EntityNotFoundException<T>(entity.Id);

            entity.UpdatedOn = DateTime.Now;
            Context.Set<T>().Attach(entity);
            Context.Entry(entity).State = EntityState.Modified;

            await Context.SaveChangesAsync();

            return Context.Set<T>().FirstOrDefault(x => x.Id == entity.Id);
        }

        /// <summary>
        /// Deletes the entity with the given identifier
        /// </summary>
        /// <param name="entity">The entity.</param>
        /// <returns></returns>
        public virtual async Task Delete(T entity)
        {
            if (entity == null)
                throw new ArgumentException("The entity was not given.");

            if (!Exists(entity.Id).Result)
                throw new EntityNotFoundException<T>(entity.Id);

            Context.Set<T>().Attach(entity);
            Context.Entry(entity).State = EntityState.Deleted;

            await Context.SaveChangesAsync();
        }
    }
}
