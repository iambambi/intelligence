using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CryptoTrader.EntityFramework;
using CryptoTrader.EntityFramework.Interfaces;
using CryptoTrader.EntityFramework.Repositories;
using CryptoTrader.Services.Implementations;
using CryptoTrader.Services.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
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
            services.Configure<MvcOptions>(options =>
            {
                options.Filters.Add(new RequireHttpsAttribute());
            });

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

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserService, UserService>();

            services.AddScoped<ICurrencyRepository, CurrencyRepository>();
            services.AddScoped<ICurrencyService, CurrencyService>();

            services.AddScoped<ITradeRepository, TradeRepository>();
            services.AddScoped<ITradeService, TradeService>();

            services.AddScoped<ICurrencyUserRepository, CurrencyUserRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // With this, the new migrations will be applied to your database when restarting your application
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.ServiceProvider.GetService<ApplicationDbContext>().Database.Migrate();
            }

            app.Use(async (context, next) =>
            {
                await next();
                if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value) && !context.Request.Path.Value.StartsWith("/api/"))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });

            app.UseDefaultFiles();
            app.UseStaticFiles();

            var options = new RewriteOptions().AddRedirectToHttps(301, 44301);
            app.UseRewriter(options);

            app.UseMvc();
        }
    }
}
