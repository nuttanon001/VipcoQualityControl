using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VipcoQualityControl.Migrations
{
    public partial class UpdateRequireQc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "WorkQcStatus",
                table: "WorkQualityControl",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "RequireQualityNo",
                table: "RequireQualityControl",
                maxLength: 50,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RequireQualityNo",
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
