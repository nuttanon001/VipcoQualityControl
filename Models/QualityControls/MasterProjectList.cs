using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VipcoQualityControl.Models.QualityControls
{
    public class MasterProjectList:BaseModel
    {
        [Key]
        public int MasterProjectListId { get; set; }
        [StringLength(50)]
        public string Name { get; set; }
        [StringLength(200)]
        public string Description { get; set; }
        [StringLength(200)]
        public string Remark { get; set; }
        [StringLength(200)]
        public string DrawingNo { get; set; }
        [StringLength(200)]
        public string MarkNo { get; set; }
        public double? Length { get; set; }
        public double? Width { get; set; }
        public double? Heigth { get; set; }
        public double? Weigth { get; set; }
        public double? Quantity { get; set; }
        public int? Revised { get; set; }
        //FK
        //ProjectCodeDetail
        public int? ProjectCodeDetailId { get; set; }
        //RequireHasMasterProject
        public virtual ICollection<RequireHasMasterProject> RequireHasMasterProjects { get; set; }

    }
}
