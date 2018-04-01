using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoTrader.EntityFramework
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        /*
         * Registrate the entities here into DbContext
         * For example: DbSet<ExampleEntity> ExampleEntities { get; set; }
        */
    }
}
