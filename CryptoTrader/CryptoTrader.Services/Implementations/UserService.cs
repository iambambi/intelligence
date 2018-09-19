using CryptoTrader.EntityDomain.Entities;
using CryptoTrader.EntityFramework.Interfaces;
using CryptoTrader.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoTrader.Services.Implementations
{
    public class UserService : Service<User>, IUserService
    {
        IRepository<User> UserRepository { get; set; }

        public UserService(IRepository<User> repository) 
            : base(repository)
        {
            UserRepository = repository;
        }
    }
}
