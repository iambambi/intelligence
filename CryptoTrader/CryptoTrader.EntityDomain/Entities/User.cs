using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CryptoTrader.EntityDomain.Entities
{
    public class User : Entity
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string UserName { get; set; }
        
        [Required]
        public string SocialMedia { get; set; }

        public List<CurrencyUser> Currencies { get; set; }
    }
}
