using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoTrader.DTO
{
    public class UserDTO
    {
        public Guid Id { get; set; }

        public string Email { get; set; }

        public string UserName { get; set; }

        public string SocialMedia { get; set; }

        public List<CurrencyDTO> Currencies { get; set; }
    }
}
