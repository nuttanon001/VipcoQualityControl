using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VipcoQualityControl.Models.QualityControls
{
    public class InspectionPoint:BaseModel
    {
        [Key]
        public int InspectionPointId { get; set; }
        [StringLength(50)]
        public string Name { get; set; }
        [StringLength(200)]
        public string Description { get; set; }
        [StringLength(200)]
        public string Remark { get; set; }
        //FK
        //RequireQualityControl
        public virtual ICollection<RequireQualityControl> RequireQualityControls { get; set; }
    }
}
