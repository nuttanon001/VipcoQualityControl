﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Migrations;
using VipcoQualityControl.Models.QualityControls;

namespace VipcoQualityControl.Migrations
{
    [DbContext(typeof(QualityControlContext))]
    partial class QualityControlContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.0-preview2-30571")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("VipcoQualityControl.Models.QualityControls.Branch", b =>
                {
                    b.Property<int>("BranchId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address")
                        .HasMaxLength(250);

                    b.Property<string>("Name")
                        .HasMaxLength(50);

                    b.HasKey("BranchId");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasFilter("[Name] IS NOT NULL");

                    b.ToTable("Branch");

                    b.HasData(
                        new { BranchId = 1, Address = "-", Name = "Vipco2" },
                        new { BranchId = 2, Address = "-", Name = "Vipco1" },
                        new { BranchId = 3, Address = "-", Name = "Vipco3" },
                        new { BranchId = 4, Address = "-", Name = "Vipco4" },
                        new { BranchId = 5, Address = "-", Name = "Vipco5" },
                        new { BranchId = 6, Address = "-", Name = "Vipco6" }
                    );
                });

            modelBuilder.Entity("VipcoQualityControl.Models.QualityControls.InspectionPoint", b =>
                {
                    b.Property<int>("InspectionPointId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("CreateDate");

                    b.Property<string>("Creator")
                        .HasMaxLength(50);

                    b.Property<string>("Description")
                        .HasMaxLength(200);

                    b.Property<DateTime?>("ModifyDate");

                    b.Property<string>("Modifyer")
                        .HasMaxLength(50);

                    b.Property<string>("Name")
                        .HasMaxLength(50);

                    b.Property<string>("Remark")
                        .HasMaxLength(200);

                    b.HasKey("InspectionPointId");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasFilter("[Name] IS NOT NULL");

                    b.ToTable("InspectionPoint");
                });

            modelBuilder.Entity("VipcoQualityControl.Models.QualityControls.MasterProjectList", b =>
                {
                    b.Property<int>("MasterProjectListId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("CreateDate");

                    b.Property<string>("Creator")
                        .HasMaxLength(50);

                    b.Property<string>("Description")
                        .HasMaxLength(200);

                    b.Property<string>("DrawingNo")
                        .HasMaxLength(200);

                    b.Property<double?>("Heigth");

                    b.Property<double?>("Length");

                    b.Property<string>("MarkNo")
                        .HasMaxLength(200);

                    b.Property<DateTime?>("ModifyDate");

                    b.Property<string>("Modifyer")
                        .HasMaxLength(50);

                    b.Property<string>("Name")
                        .HasMaxLength(50);

                    b.Property<int?>("ProjectCodeDetailId");

                    b.Property<double?>("Quantity");

                    b.Property<string>("Remark")
                        .HasMaxLength(200);

                    b.Property<int?>("Revised");

                    b.Property<double?>("Weigth");

                    b.Property<double?>("Width");

                    b.HasKey("MasterProjectListId");

                    b.ToTable("MasterProjectList");
                });

            modelBuilder.Entity("VipcoQualityControl.Models.QualityControls.Permission", b =>
                {
                    b.Property<int>("PermissionId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("CreateDate");

                    b.Property<string>("Creator")
                        .HasMaxLength(50);

                    b.Property<int>("LevelPermission");

                    b.Property<DateTime?>("ModifyDate");

                    b.Property<string>("Modifyer")
                        .HasMaxLength(50);

                    b.Property<int>("UserId");

                    b.HasKey("PermissionId");

                    b.ToTable("Permission");
                });

            modelBuilder.Entity("VipcoQualityControl.Models.QualityControls.RequireHasAttach", b =>
                {
                    b.Property<int>("RequireHasAttachId")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AttachFileId");

                    b.Property<DateTime?>("CreateDate");

                    b.Property<string>("Creator")
                        .HasMaxLength(50);

                    b.Property<DateTime?>("ModifyDate");

                    b.Property<string>("Modifyer")
                        .HasMaxLength(50);

                    b.Property<int?>("RequireQualityControlId");

                    b.HasKey("RequireHasAttachId");

                    b.HasIndex("RequireQualityControlId");

                    b.ToTable("RequireHasAttach");
                });

            modelBuilder.Entity("VipcoQualityControl.Models.QualityControls.RequireHasMasterProject", b =>
                {
                    b.Property<int>("RequireHasMasterProjectId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("CreateDate");

                    b.Property<string>("Creator")
                        .HasMaxLength(50);

                    b.Property<int?>("MasterProjectListId");

                    b.Property<DateTime?>("ModifyDate");

                    b.Property<string>("Modifyer")
                        .HasMaxLength(50);

                    b.Property<double?>("PassQuantity");

                    b.Property<double?>("Quantity");

                    b.Property<int?>("RequireQualityControlId");

                    b.HasKey("RequireHasMasterProjectId");

                    b.HasIndex("MasterProjectListId");

                    b.HasIndex("RequireQualityControlId");

                    b.ToTable("RequireHasMasterProject");
                });

            modelBuilder.Entity("VipcoQualityControl.Models.QualityControls.RequireQualityControl", b =>
                {
                    b.Property<int>("RequireQualityControlId")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("BranchId");

                    b.Property<DateTime?>("CreateDate");

                    b.Property<string>("Creator")
                        .HasMaxLength(50);

                    b.Property<string>("Description")
                        .HasMaxLength(200);

                    b.Property<string>("GroupMIS");

                    b.Property<int?>("InspectionPointId");

                    b.Property<string>("MailReply")
                        .HasMaxLength(200);

                    b.Property<DateTime?>("ModifyDate");

                    b.Property<string>("Modifyer")
                        .HasMaxLength(50);

                    b.Property<int?>("ProjectCodeDetailId");

                    b.Property<string>("Remark")
                        .HasMaxLength(200);

                    b.Property<DateTime>("RequireDate");

                    b.Property<string>("RequireEmp");

                    b.Property<string>("RequireQualityNo")
                        .HasMaxLength(50);

                    b.Property<int>("RequireStatus");

                    b.Property<DateTime?>("ResponseDate");

                    b.Property<int?>("WorkActivityId");

                    b.Property<int?>("WorkGroupQualityControlId");

                    b.HasKey("RequireQualityControlId");

                    b.HasIndex("BranchId");

                    b.HasIndex("InspectionPointId");

                    b.HasIndex("WorkActivityId");

                    b.HasIndex("WorkGroupQualityControlId");

                    b.ToTable("RequireQualityControl");
                });

            modelBuilder.Entity("VipcoQualityControl.Models.QualityControls.WorkActivity", b =>
                {
                    b.Property<int>("WorkActivityId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("CreateDate");

                    b.Property<string>("Creator")
                        .HasMaxLength(50);

                    b.Property<string>("Description")
                        .HasMaxLength(200);

                    b.Property<DateTime?>("ModifyDate");

                    b.Property<string>("Modifyer")
                        .HasMaxLength(50);

                    b.Property<string>("Name")
                        .HasMaxLength(50);

                    b.Property<string>("Remark")
                        .HasMaxLength(200);

                    b.HasKey("WorkActivityId");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasFilter("[Name] IS NOT NULL");

                    b.ToTable("WorkActivity");
                });

            modelBuilder.Entity("VipcoQualityControl.Models.QualityControls.WorkGroupQualityControl", b =>
                {
                    b.Property<int>("WorkGroupQualityControlId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("CreateDate");

                    b.Property<string>("Creator")
                        .HasMaxLength(50);

                    b.Property<string>("Description")
                        .HasMaxLength(200);

                    b.Property<DateTime?>("ModifyDate");

                    b.Property<string>("Modifyer")
                        .HasMaxLength(50);

                    b.Property<string>("Name")
                        .HasMaxLength(50);

                    b.Property<string>("Remark")
                        .HasMaxLength(200);

                    b.HasKey("WorkGroupQualityControlId");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasFilter("[Name] IS NOT NULL");

                    b.ToTable("WorkGroupQualityControl");
                });

            modelBuilder.Entity("VipcoQualityControl.Models.QualityControls.WorkQualityControl", b =>
                {
                    b.Property<int>("WorkQualityControlId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("CreateDate");

                    b.Property<string>("Creator")
                        .HasMaxLength(50);

                    b.Property<string>("Description")
                        .HasMaxLength(250);

                    b.Property<DateTime?>("ModifyDate");

                    b.Property<string>("Modifyer")
                        .HasMaxLength(50);

                    b.Property<DateTime>("QualityControlDate");

                    b.Property<string>("QualityControlEmp");

                    b.Property<string>("Remark")
                        .HasMaxLength(250);

                    b.Property<int?>("RequireQualityControlId");

                    b.Property<int>("WorkQcStatus");

                    b.HasKey("WorkQualityControlId");

                    b.HasIndex("RequireQualityControlId")
                        .IsUnique()
                        .HasFilter("[RequireQualityControlId] IS NOT NULL");

                    b.ToTable("WorkQualityControl");
                });

            modelBuilder.Entity("VipcoQualityControl.Models.QualityControls.RequireHasAttach", b =>
                {
                    b.HasOne("VipcoQualityControl.Models.QualityControls.RequireQualityControl", "RequireQualityControl")
                        .WithMany("RequireHasAttaches")
                        .HasForeignKey("RequireQualityControlId");
                });

            modelBuilder.Entity("VipcoQualityControl.Models.QualityControls.RequireHasMasterProject", b =>
                {
                    b.HasOne("VipcoQualityControl.Models.QualityControls.MasterProjectList", "MasterProjectList")
                        .WithMany("RequireHasMasterProjects")
                        .HasForeignKey("MasterProjectListId");

                    b.HasOne("VipcoQualityControl.Models.QualityControls.RequireQualityControl", "RequireQualityControl")
                        .WithMany("RequireHasMasterProjects")
                        .HasForeignKey("RequireQualityControlId");
                });

            modelBuilder.Entity("VipcoQualityControl.Models.QualityControls.RequireQualityControl", b =>
                {
                    b.HasOne("VipcoQualityControl.Models.QualityControls.Branch", "Branch")
                        .WithMany("RequireQualityControls")
                        .HasForeignKey("BranchId");

                    b.HasOne("VipcoQualityControl.Models.QualityControls.InspectionPoint", "InspectionPoint")
                        .WithMany("RequireQualityControls")
                        .HasForeignKey("InspectionPointId");

                    b.HasOne("VipcoQualityControl.Models.QualityControls.WorkActivity", "WorkActivity")
                        .WithMany("RequireQualityControls")
                        .HasForeignKey("WorkActivityId");

                    b.HasOne("VipcoQualityControl.Models.QualityControls.WorkGroupQualityControl", "WorkGroupQualityControl")
                        .WithMany("RequireQualityControls")
                        .HasForeignKey("WorkGroupQualityControlId");
                });

            modelBuilder.Entity("VipcoQualityControl.Models.QualityControls.WorkQualityControl", b =>
                {
                    b.HasOne("VipcoQualityControl.Models.QualityControls.RequireQualityControl", "RequireQualityControl")
                        .WithOne("WorkQualityControl")
                        .HasForeignKey("VipcoQualityControl.Models.QualityControls.WorkQualityControl", "RequireQualityControlId");
                });
#pragma warning restore 612, 618
        }
    }
}
