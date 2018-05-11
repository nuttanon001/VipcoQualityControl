using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VipcoQualityControl.ViewModels
{
    public class RequireQualityControlSchedule
    {
        public string Filter { get; set; }
        public int? ProjectMasterId { get; set; }
        public int? Skip { get; set; }
        public int? Take { get; set; }
        /// <summary>
        /// 1 : All Task Without cancel
        /// null or 2 : Wait and Process only
        /// </summary>
        public int? Mode { get; set; }
        /// <summary>
        /// Filter user require maintenance
        /// </summary>
        public string Creator { get; set; }
        /// <summary>
        /// ItemMaintenance
        /// </summary>
        public int? QuailtyControlId { get; set; }
        /// <summary>
        /// RequireMaintenance
        /// </summary>
        public int? RequireQuailtyControlId { get; set; }
        /// <summary>
        /// WorkGroupMaintenanceId
        /// </summary>
        public int? WorkGroupQuailtyControlId { get; set; }
        /// <summary>
        /// Start date
        /// </summary>
        public DateTime? SDate { get; set; }
        /// <summary>
        /// End date
        /// </summary>
        public DateTime? EDate { get; set; }
    }
}
