using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VipcoQualityControl.Models.QualityControls
{
    public class RequireHasAttach:BaseModel
    {
        [Key]
        public int RequireHasAttachId { get; set; }
        // FK
        // RequireQualityControl
        public int? RequireQualityControlId { get; set; }
        public virtual RequireQualityControl RequireQualityControl { get; set; }
        // AttachFile
        public int? AttachFileId { get; set; }
    }
}
