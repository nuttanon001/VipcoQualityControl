using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VipcoQualityControl.Migrations
{
    public partial class UpdateRequireQualityControlModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "WorkQcStatus",
                table: "WorkQualityControl",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "ParentRequireQcId",
                table: "RequireQualityControl",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RequireQualityControl_ParentRequireQcId",
                table: "RequireQualityControl",
                column: "ParentRequireQcId");

            migrationBuilder.AddForeignKey(
                name: "FK_RequireQualityControl_RequireQualityControl_ParentRequireQcId",
                table: "RequireQualityControl",
                column: "ParentRequireQcId",
                principalTable: "RequireQualityControl",
                principalColumn: "RequireQualityControlId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RequireQualityControl_RequireQualityControl_ParentRequireQcId",
                table: "RequireQualityControl");

            migrationBuilder.DropIndex(
                name: "IX_RequireQualityControl_ParentRequireQcId",
                table: "RequireQualityControl");

            migrationBuilder.DropColumn(
                name: "ParentRequireQcId",
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
