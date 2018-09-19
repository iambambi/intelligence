using CryptoTrader.EntityDomain.Entities;
using CryptoTrader.EntityFramework.Interfaces;
using CryptoTrader.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoTrader.Services.Implementations
{
    public class CurrencyService : Service<Currency>, ICurrencyService
    {
        IRepository<Currency> CurrencyRepository { get; set; }

        public CurrencyService(IRepository<Currency> repository)
            : base(repository)
        {
            CurrencyRepository = repository;
        }
    }
}
