using CryptoTrader.EntityDomain.Entities;
using CryptoTrader.EntityFramework.Interfaces;
using CryptoTrader.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoTrader.Services.Implementations
{
    public class TradeService : Service<Trade>, ITradeService
    {
        IRepository<Trade> TradeRepository { get; set; }

        public TradeService(IRepository<Trade> repository)
            : base(repository)
        {
            TradeRepository = repository;
        }
    }
}
