using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using VipcoQualityControl.Models.QualityControls;

namespace VipcoQualityControl.ViewModels
{
    public class RequireQualityControlViewModel : RequireQualityControl
    {
        public string GroupMISString { get; set; }
        public string RequireEmpString { get; set; }
        public string ProjectCodeDetailString { get; set; }
        public string WorkGroupQualityControlString { get; set; }
        public string InspectionPointString { get; set; }
        public string WorkActivityString { get; set; }
        public string BranchString { get; set; }
        public string RequireStatusString { get; set; }
    }
}
