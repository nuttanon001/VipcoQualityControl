using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace VipcoQualityControl.ViewModels
{
    public class RequireQualityControlChangeViewModel
    {
        public int? RequireQualityControlId { get; set; }
        public DateTime? ChangeDate { get; set; }
        public DateTime? ChangeTime { get; set; }
        public string ChangeTimeString { get; set; }
        public string UserName { get; set; }
    }
}
