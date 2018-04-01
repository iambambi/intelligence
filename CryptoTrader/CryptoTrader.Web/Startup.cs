using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CryptoTrader.EntityFramework;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CryptoTrader
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IHostingEnvironment environment)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(environment.ContentRootPath)
                .AddJsonFile(path: "appsettings.json", optional: true, reloadOnChange: true);

            if (environment.IsDevelopment())
                builder.AddUserSecrets<Startup>();

            builder.AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.AddDbContext<ApplicationDbContext>
                (
                    options => options.UseSqlServer
                    (
                        Configuration.GetConnectionString("DefaultConnection"),
                        m => m.MigrationsAssembly("CryptoTrader.EntityFramework")
                    )
                );

            /*
             * Registrate here the repositories and services (because of DI)
             * For example:
             *             services.AddScoped<IExampleRepository, ExampleRepository>();
             *             services.AddScoped<IExampleService, ExampleService>();
             */
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // With this, the new migrations will be applied to your database when restarting your application
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.ServiceProvider.GetService<ApplicationDbContext>().Database.Migrate();
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseMvc();
        }
    }
}
