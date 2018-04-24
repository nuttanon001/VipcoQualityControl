using System;
using System.Collections.Generic;

namespace VipcoQualityControl.Models.Machines
{
    public partial class ProjectCodeDetail
    {
        public int ProjectCodeDetailId { get; set; }
        public DateTime? CreateDate { get; set; }
        public string Creator { get; set; }
        public string Description { get; set; }
        public DateTime? ModifyDate { get; set; }
        public string Modifyer { get; set; }
        public string ProjectCodeDetailCode { get; set; }
        public int? ProjectCodeMasterId { get; set; }

        public virtual ProjectCodeMaster ProjectCodeMaster { get; set; }
    }
}
