using System.Collections.Generic;
using VipcoQualityControl.Models.QualityControls;

namespace VipcoQualityControl.ViewModels
{
    public class QualityControlResultViewModel : QualityControlResult
    {
        public string EmpQualityControlString { get; set; }
        public string RequireQualityControlNo { get; set; }
        public string WorkGroupQualityControlString { get; set; }
        public string QualityControlStatusString { get; set; }
        public ICollection<RequireHasMasterProjectViewModel> QualityHasMasterLists { get; set; }
    }
}