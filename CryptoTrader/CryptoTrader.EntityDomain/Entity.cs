using System;

namespace CryptoTrader.EntityDomain
{
    public abstract class Entity : IEntity
    {
        private DateTime createdOn = DateTime.Now;
        public DateTime CreatedOn { get => createdOn; set => createdOn = value; }

        private DateTime? updatedOn = null;
        public DateTime? UpdatedOn { get => updatedOn; set => updatedOn = value; }

        private Guid id = new Guid();
        public Guid Id { get => id; set => id = value; }
    }
}