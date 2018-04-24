using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VipcoQualityControl.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Branch",
                columns: table => new
                {
                    BranchId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: true),
                    Address = table.Column<string>(maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Branch", x => x.BranchId);
                });

            migrationBuilder.CreateTable(
                name: "InspectionPoint",
                columns: table => new
                {
                    CreateDate = table.Column<DateTime>(nullable: true),
                    ModifyDate = table.Column<DateTime>(nullable: true),
                    Creator = table.Column<string>(maxLength: 50, nullable: true),
                    Modifyer = table.Column<string>(maxLength: 50, nullable: true),
                    InspectionPointId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: true),
                    Description = table.Column<string>(maxLength: 200, nullable: true),
                    Remark = table.Column<string>(maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspectionPoint", x => x.InspectionPointId);
                });

            migrationBuilder.CreateTable(
                name: "MasterProjectList",
                columns: table => new
                {
                    MasterProjectListId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: true),
                    Description = table.Column<string>(maxLength: 200, nullable: true),
                    Remark = table.Column<string>(maxLength: 200, nullable: true),
                    DrawingNo = table.Column<string>(maxLength: 200, nullable: true),
                    MarkNo = table.Column<string>(maxLength: 200, nullable: true),
                    Length = table.Column<double>(nullable: true),
                    Width = table.Column<double>(nullable: true),
                    Heigth = table.Column<double>(nullable: true),
                    Weigth = table.Column<double>(nullable: true),
                    Quantity = table.Column<double>(nullable: true),
                    Revised = table.Column<int>(nullable: true),
                    ProjectCodeDetailId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MasterProjectList", x => x.MasterProjectListId);
                });

            migrationBuilder.CreateTable(
                name: "Permission",
                columns: table => new
                {
                    CreateDate = table.Column<DateTime>(nullable: true),
                    ModifyDate = table.Column<DateTime>(nullable: true),
                    Creator = table.Column<string>(maxLength: 50, nullable: true),
                    Modifyer = table.Column<string>(maxLength: 50, nullable: true),
                    PermissionId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(nullable: false),
                    LevelPermission = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permission", x => x.PermissionId);
                });

            migrationBuilder.CreateTable(
                name: "WorkActivity",
                columns: table => new
                {
                    CreateDate = table.Column<DateTime>(nullable: true),
                    ModifyDate = table.Column<DateTime>(nullable: true),
                    Creator = table.Column<string>(maxLength: 50, nullable: true),
                    Modifyer = table.Column<string>(maxLength: 50, nullable: true),
                    WorkActivityId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: true),
                    Description = table.Column<string>(maxLength: 200, nullable: true),
                    Remark = table.Column<string>(maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkActivity", x => x.WorkActivityId);
                });

            migrationBuilder.CreateTable(
                name: "WorkGroupQualityControl",
                columns: table => new
                {
                    CreateDate = table.Column<DateTime>(nullable: true),
                    ModifyDate = table.Column<DateTime>(nullable: true),
                    Creator = table.Column<string>(maxLength: 50, nullable: true),
                    Modifyer = table.Column<string>(maxLength: 50, nullable: true),
                    WorkGroupQualityControlId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: true),
                    Description = table.Column<string>(maxLength: 200, nullable: true),
                    Remark = table.Column<string>(maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkGroupQualityControl", x => x.WorkGroupQualityControlId);
                });

            migrationBuilder.CreateTable(
                name: "RequireQualityControl",
                columns: table => new
                {
                    CreateDate = table.Column<DateTime>(nullable: true),
                    ModifyDate = table.Column<DateTime>(nullable: true),
                    Creator = table.Column<string>(maxLength: 50, nullable: true),
                    Modifyer = table.Column<string>(maxLength: 50, nullable: true),
                    RequireQualityControlId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RequireDate = table.Column<DateTime>(nullable: false),
                    ResponseDate = table.Column<DateTime>(nullable: true),
                    Description = table.Column<string>(maxLength: 200, nullable: true),
                    Remark = table.Column<string>(maxLength: 200, nullable: true),
                    MailReply = table.Column<string>(maxLength: 200, nullable: true),
                    RequireStatus = table.Column<int>(nullable: false),
                    GroupMIS = table.Column<string>(nullable: true),
                    RequireEmp = table.Column<string>(nullable: true),
                    ProjectCodeDetailId = table.Column<int>(nullable: true),
                    WorkGroupQualityControlId = table.Column<int>(nullable: true),
                    InspectionPointId = table.Column<int>(nullable: true),
                    WorkActivityId = table.Column<int>(nullable: true),
                    BranchId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequireQualityControl", x => x.RequireQualityControlId);
                    table.ForeignKey(
                        name: "FK_RequireQualityControl_Branch_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branch",
                        principalColumn: "BranchId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RequireQualityControl_InspectionPoint_InspectionPointId",
                        column: x => x.InspectionPointId,
                        principalTable: "InspectionPoint",
                        principalColumn: "InspectionPointId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RequireQualityControl_WorkActivity_WorkActivityId",
                        column: x => x.WorkActivityId,
                        principalTable: "WorkActivity",
                        principalColumn: "WorkActivityId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RequireQualityControl_WorkGroupQualityControl_WorkGroupQualityControlId",
                        column: x => x.WorkGroupQualityControlId,
                        principalTable: "WorkGroupQualityControl",
                        principalColumn: "WorkGroupQualityControlId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RequireHasAttach",
                columns: table => new
                {
                    CreateDate = table.Column<DateTime>(nullable: true),
                    ModifyDate = table.Column<DateTime>(nullable: true),
                    Creator = table.Column<string>(maxLength: 50, nullable: true),
                    Modifyer = table.Column<string>(maxLength: 50, nullable: true),
                    RequireHasAttachId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RequireQualityControlId = table.Column<int>(nullable: true),
                    AttachFileId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequireHasAttach", x => x.RequireHasAttachId);
                    table.ForeignKey(
                        name: "FK_RequireHasAttach_RequireQualityControl_RequireQualityControlId",
                        column: x => x.RequireQualityControlId,
                        principalTable: "RequireQualityControl",
                        principalColumn: "RequireQualityControlId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RequireHasMasterProject",
                columns: table => new
                {
                    CreateDate = table.Column<DateTime>(nullable: true),
                    ModifyDate = table.Column<DateTime>(nullable: true),
                    Creator = table.Column<string>(maxLength: 50, nullable: true),
                    Modifyer = table.Column<string>(maxLength: 50, nullable: true),
                    RequireHasMasterProjectId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Quantity = table.Column<double>(nullable: true),
                    PassQuantity = table.Column<double>(nullable: true),
                    MasterProjectListId = table.Column<int>(nullable: true),
                    RequireQualityControlId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequireHasMasterProject", x => x.RequireHasMasterProjectId);
                    table.ForeignKey(
                        name: "FK_RequireHasMasterProject_MasterProjectList_MasterProjectListId",
                        column: x => x.MasterProjectListId,
                        principalTable: "MasterProjectList",
                        principalColumn: "MasterProjectListId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RequireHasMasterProject_RequireQualityControl_RequireQualityControlId",
                        column: x => x.RequireQualityControlId,
                        principalTable: "RequireQualityControl",
                        principalColumn: "RequireQualityControlId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WorkQualityControl",
                columns: table => new
                {
                    CreateDate = table.Column<DateTime>(nullable: true),
                    ModifyDate = table.Column<DateTime>(nullable: true),
                    Creator = table.Column<string>(maxLength: 50, nullable: true),
                    Modifyer = table.Column<string>(maxLength: 50, nullable: true),
                    WorkQualityControlId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(maxLength: 250, nullable: true),
                    WorkQcStatus = table.Column<int>(nullable: true),
                    Remark = table.Column<string>(maxLength: 250, nullable: true),
                    QualityControlDate = table.Column<DateTime>(nullable: false),
                    QualityControlEmp = table.Column<string>(nullable: true),
                    RequireQualityControlId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkQualityControl", x => x.WorkQualityControlId);
                    table.ForeignKey(
                        name: "FK_WorkQualityControl_RequireQualityControl_RequireQualityControlId",
                        column: x => x.RequireQualityControlId,
                        principalTable: "RequireQualityControl",
                        principalColumn: "RequireQualityControlId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Branch",
                columns: new[] { "BranchId", "Address", "Name" },
                values: new object[,]
                {
                    { 1, "-", "Vipco2" },
                    { 2, "-", "Vipco1" },
                    { 3, "-", "Vipco3" },
                    { 4, "-", "Vipco4" },
                    { 5, "-", "Vipco5" },
                    { 6, "-", "Vipco6" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Branch_Name",
                table: "Branch",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_InspectionPoint_Name",
                table: "InspectionPoint",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_RequireHasAttach_RequireQualityControlId",
                table: "RequireHasAttach",
                column: "RequireQualityControlId");

            migrationBuilder.CreateIndex(
                name: "IX_RequireHasMasterProject_MasterProjectListId",
                table: "RequireHasMasterProject",
                column: "MasterProjectListId");

            migrationBuilder.CreateIndex(
                name: "IX_RequireHasMasterProject_RequireQualityControlId",
                table: "RequireHasMasterProject",
                column: "RequireQualityControlId");

            migrationBuilder.CreateIndex(
                name: "IX_RequireQualityControl_BranchId",
                table: "RequireQualityControl",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_RequireQualityControl_InspectionPointId",
                table: "RequireQualityControl",
                column: "InspectionPointId");

            migrationBuilder.CreateIndex(
                name: "IX_RequireQualityControl_WorkActivityId",
                table: "RequireQualityControl",
                column: "WorkActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_RequireQualityControl_WorkGroupQualityControlId",
                table: "RequireQualityControl",
                column: "WorkGroupQualityControlId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkActivity_Name",
                table: "WorkActivity",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_WorkGroupQualityControl_Name",
                table: "WorkGroupQualityControl",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_WorkQualityControl_RequireQualityControlId",
                table: "WorkQualityControl",
                column: "RequireQualityControlId",
                unique: true,
                filter: "[RequireQualityControlId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Permission");

            migrationBuilder.DropTable(
                name: "RequireHasAttach");

            migrationBuilder.DropTable(
                name: "RequireHasMasterProject");

            migrationBuilder.DropTable(
                name: "WorkQualityControl");

            migrationBuilder.DropTable(
                name: "MasterProjectList");

            migrationBuilder.DropTable(
                name: "RequireQualityControl");

            migrationBuilder.DropTable(
                name: "Branch");

            migrationBuilder.DropTable(
                name: "InspectionPoint");

            migrationBuilder.DropTable(
                name: "WorkActivity");

            migrationBuilder.DropTable(
                name: "WorkGroupQualityControl");
        }
    }
}
