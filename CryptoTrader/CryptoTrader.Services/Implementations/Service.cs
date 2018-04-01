using CryptoTrader.EntityDomain;
using CryptoTrader.EntityFramework.Interfaces;
using CryptoTrader.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CryptoTrader.Services.Implementations
{
    public abstract class Service<T> : IService<T> where T : class, IEntity
    {
        protected IRepository<T> Repository { get; set; }
        
        public Service(IRepository<T> repository)
        {
            Repository = repository;
        }

        /// <summary>
        /// Returns the number of entities present (based on filter)
        /// </summary>
        /// <param name="filter">The optional filter parameter (lambda).</param>
        public virtual int Count()
        {
            return Repository.Count();
        }

        /// <summary>
        /// Creates the specified entity
        /// </summary>
        /// <param name="entity">The entity.</param>
        public virtual Task<T> Create(T entity)
        {
            return Repository.Create(entity);
        }

        /// <summary>
        /// Deletes the entity with the given identifier
        /// </summary>
        /// <param name="entity">The entity.</param>
        /// <returns></returns>
        public virtual Task Delete(T entity)
        {
            return Repository.Delete(entity);
        }

        /// <summary>
        /// Determines whether T entity exists with given identifier
        /// </summary>
        public virtual Task<bool> Exists(Guid id)
        {
            return Repository.Exists(id);
        }

        /// <summary>
        /// Gets all entities on the DbTable
        /// </summary>
        /// <param name="filter">The optional filter parameter (lambda).</param>
        public virtual Task<IEnumerable<T>> GetAll()
        {
            return Repository.GetAll();
        }

        /// <summary>
        /// Gets the entity by the given identifier
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="filter">The optional filter parameter (lambda).</param>
        public virtual T GetById(Guid id)
        {
            return Repository.GetById(id);
        }

        /// <summary>
        /// Gets the entities by the given identifiers
        /// </summary>
        /// <param name="ids">The identifiers.</param>
        /// <param name="filter">The optional filter parameter (lambda).</param>
        public virtual Task<IEnumerable<T>> GetByIds(List<object> ids)
        {
            return Repository.GetByIds(ids);
        }

        /// <summary>
        /// Updates the specified entity
        /// </summary>
        /// <param name="entity">The entity.</param>
        /// <returns></returns>
        public virtual Task<T> Update(T entity)
        {
            return Repository.Update(entity);
        }
    }
}
