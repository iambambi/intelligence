using System;

namespace CryptoTrader.EntityDomain
{
    public interface IEntity
    {
        Guid Id { get; set; }

        DateTime CreatedOn { get; set; }

        DateTime? UpdatedOn { get; set; }

        // TODO: Global fields for entities
    }
}
