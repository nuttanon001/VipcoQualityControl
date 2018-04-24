using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VipcoQualityControl.Models.QualityControls
{
    public class WorkQualityControl:BaseModel
    {
        [Key]
        public int WorkQualityControlId { get; set; }
        [StringLength(250)]
        public string Description { get; set; }
        public WorkQualityControlStatus? WorkQcStatus { get; set; }
        [StringLength(250)]
        public string Remark { get; set; }
        [Required]
        public DateTime QualityControlDate { get; set; }
        //FK
        //Employee
        public string QualityControlEmp { get; set; }
        //RequireQualityControl
        public int? RequireQualityControlId { get; set; }
        public virtual RequireQualityControl RequireQualityControl { get; set; }
    }

    public enum WorkQualityControlStatus
    {
        Pass = 1,
        NotPass,
        Cancel,
    }
}
