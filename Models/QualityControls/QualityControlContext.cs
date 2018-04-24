using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace VipcoQualityControl.Models.QualityControls
{
    public class QualityControlContext : DbContext
    {
        public QualityControlContext(DbContextOptions<QualityControlContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Branch>().ToTable("Branch")
                .HasIndex(b => b.Name).IsUnique();
            modelBuilder.Entity<Branch>().HasData(
                new { BranchId = 1, Name = "Vipco2", Address = "-" },
                new { BranchId = 2, Name = "Vipco1", Address = "-" },
                new { BranchId = 3, Name = "Vipco3", Address = "-" },
                new { BranchId = 4, Name = "Vipco4", Address = "-" },
                new { BranchId = 5, Name = "Vipco5", Address = "-" },
                new { BranchId = 6, Name = "Vipco6", Address = "-" });

            modelBuilder.Entity<InspectionPoint>().ToTable("InspectionPoint")
                .HasIndex(i => i.Name).IsUnique();
            modelBuilder.Entity<MasterProjectList>().ToTable("MasterProjectList");
            modelBuilder.Entity<Permission>().ToTable("Permission");
            modelBuilder.Entity<RequireHasAttach>().ToTable("RequireHasAttach");
            modelBuilder.Entity<RequireHasMasterProject>().ToTable("RequireHasMasterProject");
            modelBuilder.Entity<RequireQualityControl>().ToTable("RequireQualityControl");
            modelBuilder.Entity<WorkActivity>().ToTable("WorkActivity")
                .HasIndex(w => w.Name).IsUnique();
            modelBuilder.Entity<WorkGroupQualityControl>().ToTable("WorkGroupQualityControl")
                .HasIndex(w => w.Name).IsUnique();
            modelBuilder.Entity<WorkQualityControl>().ToTable("WorkQualityControl");
        }

        // Dbset
        public DbSet<Branch> Branchs { get; set; }
        public DbSet<InspectionPoint> InspectionPoints { get; set; }
        public DbSet<MasterProjectList> MasterProjectLists { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<RequireHasAttach> RequireHasAttachs { get; set; }
        public DbSet<RequireHasMasterProject> RequireHasMasterProjects { get; set; }
        public DbSet<RequireQualityControl> RequireQualityControls { get; set; }
        public DbSet<WorkActivity> WorkActivities { get; set; }
        public DbSet<WorkGroupQualityControl> WorkGroupQualityControls { get; set; }
        public DbSet<WorkQualityControl> WorkQualityControls { get; set; }
    }
}
