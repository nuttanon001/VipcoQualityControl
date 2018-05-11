using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VipcoQualityControl.Migrations
{
    public partial class AddQualityControlResult : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "WorkQcStatus",
                table: "WorkQualityControl",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateTable(
                name: "QualityControlResult",
                columns: table => new
                {
                    Creator = table.Column<string>(maxLength: 50, nullable: true),
                    CreateDate = table.Column<DateTime>(nullable: true),
                    Modifyer = table.Column<string>(maxLength: 50, nullable: true),
                    ModifyDate = table.Column<DateTime>(nullable: true),
                    QualityControlResultId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(maxLength: 250, nullable: true),
                    Remark = table.Column<string>(maxLength: 250, nullable: true),
                    QualityControlResultDate = table.Column<DateTime>(nullable: true),
                    QualityControlStatus = table.Column<int>(nullable: false),
                    RequireQualityControlId = table.Column<int>(nullable: true),
                    EmpCode = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QualityControlResult", x => x.QualityControlResultId);
                    table.ForeignKey(
                        name: "FK_QualityControlResult_RequireQualityControl_RequireQualityControlId",
                        column: x => x.RequireQualityControlId,
                        principalTable: "RequireQualityControl",
                        principalColumn: "RequireQualityControlId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_QualityControlResult_RequireQualityControlId",
                table: "QualityControlResult",
                column: "RequireQualityControlId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QualityControlResult");

            migrationBuilder.AlterColumn<int>(
                name: "WorkQcStatus",
                table: "WorkQualityControl",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
