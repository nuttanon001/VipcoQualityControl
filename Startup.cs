using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Microsoft.EntityFrameworkCore;

using AutoMapper;

using VipcoQualityControl.Services;
using VipcoQualityControl.Models.Machines;
using VipcoQualityControl.Models.QualityControls;

namespace VipcoQualityControl
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add Newtonsoft
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                    .AddJsonOptions(option => option.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            // Add AutoMap
            AutoMapper.Mapper.Reset();
            services.AddAutoMapper(typeof(Startup));
            // AddDbContextPool
            // Change AddDbContextPool if EF Core 2.1
            services.AddDbContextPool<QualityControlContext>(option =>
                option.UseLazyLoadingProxies().UseSqlServer(Configuration.GetConnectionString("QualityControlConnection")))
                    .AddDbContextPool<MachineContext>(option =>
                option.UseLazyLoadingProxies().UseSqlServer(Configuration.GetConnectionString("MachineConnection")));
            // Add Repositoy
            services.AddTransient(typeof(IRepositoryQualityControl<>), typeof(RepositoryQualityControl<>))
                    .AddTransient(typeof(IRepositoryMachine<>), typeof(RepositoryMachine<>));
            // Setting up CORS
            services.AddCors();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            string pathBase = Configuration.GetSection("Hosting")["PathBase"];
            if (string.IsNullOrEmpty(pathBase) == false)
                app.UsePathBase(pathBase);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            // Http to Https
            // app.UseHttpsRedirection();

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.Options.StartupTimeout = new System.TimeSpan(0, 0, 120);
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
