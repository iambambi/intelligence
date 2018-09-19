using CryptoTrader.EntityDomain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoTrader.DTO
{
    public class TradeDTO
    {
        public Guid Id { get; set; }

        public TradeTypes Type { get; set; }

        public UserDTO Trader { get; set; }

        public int Amount { get; set; }

        public CurrencyDTO TargetCurrency { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
