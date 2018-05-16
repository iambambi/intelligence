using CryptoTrader.EntityDomain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CryptoTrader.EntityFramework
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        /*
         * Registrate the entities here into DbContext
         * For example: DbSet<ExampleEntity> ExampleEntities { get; set; }
        */

        public DbSet<User> Users { get; set; }
        public DbSet<Currency> Currencies { get; set; }
        public DbSet<CurrencyUser> CurrencyUsers { get; set; }
        public DbSet<Trade> Trades { get; set; }
    }
}
