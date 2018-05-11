using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using VipcoQualityControl.Models.QualityControls;

namespace VipcoQualityControl.ViewModels
{
    public class MasterProjectListViewModel:MasterProjectList
    {
        public string ProjectCodeDetailString { get; set; }
        public double? FailQuantity { get; set; }
    }
}
