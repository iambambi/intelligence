using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoTrader.EntityDomain.Entities
{
    public class Currency : Entity
    {
        public string Symbol { get; set; }

        public string Name { get; set; }
    }
}
