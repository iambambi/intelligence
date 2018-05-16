using CryptoTrader.EntityDomain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CryptoTrader.EntityDomain.Entities
{
    public class Trade : Entity
    {
        [Required]
        public TradeTypes Type { get; set; }

        [Required]
        public Guid TraderId { get; set; }

        public User Trader { get; set; }
        
        public int Amount { get; set; }

        public int ActualPrice { get; set; }

        /// <summary>
        /// The traded currency. Pl. *Global (USD) -> BTN or BTN -> Global (USD)
        /// </summary>
        [Required]
        public Guid TargetCurrencyId { get; set; }

        public Currency TargetCurrency { get; set; }
    }
}
