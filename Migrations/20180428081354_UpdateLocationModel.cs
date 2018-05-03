using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VipcoQualityControl.Migrations
{
    public partial class UpdateLocationModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "WorkQcStatus",
                table: "WorkQualityControl",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "LocationQualityControlId",
                table: "RequireQualityControl",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "LocationQualityControl",
                columns: table => new
                {
                    Creator = table.Column<string>(maxLength: 50, nullable: true),
                    CreateDate = table.Column<DateTime>(nullable: true),
                    Modifyer = table.Column<string>(maxLength: 50, nullable: true),
                    ModifyDate = table.Column<DateTime>(nullable: true),
                    LocationQualityControlId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: true),
                    Description = table.Column<string>(maxLength: 200, nullable: true),
                    GroupMis = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LocationQualityControl", x => x.LocationQualityControlId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RequireQualityControl_LocationQualityControlId",
                table: "RequireQualityControl",
                column: "LocationQualityControlId");

            migrationBuilder.CreateIndex(
                name: "IX_LocationQualityControl_Name",
                table: "LocationQualityControl",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_RequireQualityControl_LocationQualityControl_LocationQualityControlId",
                table: "RequireQualityControl",
                column: "LocationQualityControlId",
                principalTable: "LocationQualityControl",
                principalColumn: "LocationQualityControlId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RequireQualityControl_LocationQualityControl_LocationQualityControlId",
                table: "RequireQualityControl");

            migrationBuilder.DropTable(
                name: "LocationQualityControl");

            migrationBuilder.DropIndex(
                name: "IX_RequireQualityControl_LocationQualityControlId",
                table: "RequireQualityControl");

            migrationBuilder.DropColumn(
                name: "LocationQualityControlId",
                table: "RequireQualityControl");

            migrationBuilder.AlterColumn<int>(
                name: "WorkQcStatus",
                table: "WorkQualityControl",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
