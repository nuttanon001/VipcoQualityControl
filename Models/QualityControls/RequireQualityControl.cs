using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VipcoQualityControl.Models.QualityControls
{
    public class RequireQualityControl : BaseModel
    {
        [Key]
        public int RequireQualityControlId { get; set; }
        [StringLength(50)]
        public string RequireQualityNo { get; set; }
        [Required]
        public DateTime RequireDate { get; set; }
        public DateTime? ResponseDate { get; set; }
        [StringLength(200)]
        public string Description { get; set; }
        [StringLength(200)]
        public string Remark { get; set; }
        [StringLength(200)]
        public string MailReply { get; set; }
        public RequireStatus RequireStatus { get; set; }
        //FK
        // RequireQualityControl
        [ForeignKey("ParentRequireQc")]
        public int? ParentRequireQcId { get; set; }
        public virtual RequireQualityControl ParentRequireQc { get; set; }
        // LocationQualityControl
        public int? LocationQualityControlId { get; set; }
        public virtual LocationQualityControl LocationQualityControl { get; set; }
        // GroupMis
        public string GroupMIS { get; set; }
        // Employee
        public string RequireEmp { get; set; }
        // ProjectCodeDetail
        public int? ProjectCodeDetailId { get; set; }
        //WorkGroupQualityControl
        public int? WorkGroupQualityControlId { get; set; }
        public virtual WorkGroupQualityControl WorkGroupQualityControl { get; set; }
        //InspectionPoint
        public int? InspectionPointId { get; set; }
        public virtual InspectionPoint InspectionPoint { get; set; }
        //WorkActivity
        public int? WorkActivityId { get; set; }
        public virtual WorkActivity WorkActivity { get; set; }
        //Branch
        public int? BranchId { get; set; }
        public virtual Branch Branch { get; set; }
        // RequireHasMasterProject
        public virtual ICollection<RequireHasMasterProject> RequireHasMasterProjects { get; set; }
        // RequireHasAttach
        public virtual ICollection<RequireHasAttach> RequireHasAttaches { get; set; }
        // WorkQualityControl
        public virtual WorkQualityControl WorkQualityControl { get; set; }
    }

    public enum RequireStatus
    {
        Waiting = 1,
        QcResponse,
        QcChangeResponse,
        InProcess,
        Complate,
        Cancel,
    }
}
