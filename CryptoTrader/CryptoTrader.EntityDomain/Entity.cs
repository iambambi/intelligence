using System;
using System.ComponentModel.DataAnnotations;

namespace CryptoTrader.EntityDomain
{
    public abstract class Entity : IEntity
    {
        [Key]
        public Guid Id { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? UpdatedOn { get; set; }
    }
}