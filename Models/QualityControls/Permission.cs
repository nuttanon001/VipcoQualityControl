using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VipcoQualityControl.Models.QualityControls
{
    public class Permission : BaseModel
    {
        [Key]
        public int PermissionId { get; set; }
        /// <summary>
        /// User FK from Table User in MachineDataBase
        /// </summary>
        public int UserId { get; set; }
        public int LevelPermission { get; set; }
    }
}
