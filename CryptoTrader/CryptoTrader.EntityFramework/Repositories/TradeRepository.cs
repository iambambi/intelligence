using CryptoTrader.EntityDomain.Entities;
using CryptoTrader.EntityFramework.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoTrader.EntityFramework.Repositories
{
    public class TradeRepository : Repository<Trade>, ITradeRepository
    {
    }
}
