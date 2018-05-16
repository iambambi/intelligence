using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CryptoTrader.EntityDomain.Entities
{
    public class CurrencyUser : Entity
    {
        [Required]
        public Guid UserId { get; set; }

        public User User { get; set; }

        [Required]
        public Guid CurrencyId { get; set; }

        public Currency Currency { get; set; }

        public int Quantity { get; set; }
    }
}
