using CryptoTrader.EntityDomain;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CryptoTrader.EntityFramework.Interfaces
{
    public interface IRepository<T> where T : class, IEntity
    {
        /// <summary>
        /// Creates the specified entity
        /// </summary>
        /// <param name="entity">The entity.</param>
        Task<T> Create(T entity);

        /// <summary>
        /// Determines whether T entity exists with given identifier
        /// </summary>
        Task<bool> Exists(Guid id, Expression<Func<T, bool>> filter = null);

        /// <summary>
        /// Gets all entities on the DbTable
        /// </summary>
        /// <param name="filter">The optional filter parameter (lambda).</param>
        Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> filter = null);

        /// <summary>
        /// Returns the number of entities present (based on filter)
        /// </summary>
        /// <param name="filter">The optional filter parameter (lambda).</param>
        int Count(Expression<Func<T, bool>> filter = null);

        /// <summary>
        /// Gets the entity by the given identifier
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="filter">The optional filter parameter (lambda).</param>
        T GetById(object id, Expression<Func<T, bool>> filter = null);

        /// <summary>
        /// Gets the entities by the given identifiers
        /// </summary>
        /// <param name="ids">The identifiers.</param>
        /// <param name="filter">The optional filter parameter (lambda).</param>
        Task<IEnumerable<T>> GetByIds(List<object> ids, Expression<Func<T, bool>> filter = null);

        /// <summary>
        /// Updates the specified entity
        /// </summary>
        /// <param name="entity">The entity.</param>
        /// <returns></returns>
        Task<T> Update(T entity);

        /// <summary>
        /// Deletes the entity with the given identifier
        /// </summary>
        /// <param name="entity">The entity.</param>
        /// <returns></returns>
        Task Delete(T entity);
    }
}
