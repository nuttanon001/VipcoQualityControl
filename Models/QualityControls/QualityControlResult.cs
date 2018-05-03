using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VipcoQualityControl.Models.QualityControls
{
    public class QualityControlResult:BaseModel
    {
        [Key]
        public int QualityControlResultId { get; set; }
        [StringLength(250)]
        public string Description { get; set; }
        [StringLength(250)]
        public string Remark { get; set; }
        public DateTime? QualityControlResultDate { get; set; }
        public QualityControlStatus QualityControlStatus { get; set; }
        //FK
        // RequireQualityControl
        public int? RequireQualityControlId { get; set; }
        public virtual RequireQualityControl RequireQualityControl { get; set; }
        // QualityControl Employee
        public string EmpCode { get; set; }
    }

    public enum QualityControlStatus
    {
        Approved = 1,
        Processing,
        Failed,
        Unfulfilled
    }
}
