using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VipcoQualityControl.Migrations
{
    public partial class FixBugBaseModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "WorkQcStatus",
                table: "WorkQualityControl",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDate",
                table: "MasterProjectList",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Creator",
                table: "MasterProjectList",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifyDate",
                table: "MasterProjectList",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Modifyer",
                table: "MasterProjectList",
                maxLength: 50,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateDate",
                table: "MasterProjectList");

            migrationBuilder.DropColumn(
                name: "Creator",
                table: "MasterProjectList");

            migrationBuilder.DropColumn(
                name: "ModifyDate",
                table: "MasterProjectList");

            migrationBuilder.DropColumn(
                name: "Modifyer",
                table: "MasterProjectList");

            migrationBuilder.AlterColumn<int>(
                name: "WorkQcStatus",
                table: "WorkQualityControl",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
