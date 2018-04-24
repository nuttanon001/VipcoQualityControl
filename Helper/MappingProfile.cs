﻿using AutoMapper;
using VipcoQualityControl.Models.Machines;
using VipcoQualityControl.Models.QualityControls;

using VipcoQualityControl.ViewModels;

namespace VipcoQualityControl.Helper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            #region RequireQuality
            CreateMap<RequireQualityControl, RequireQualityControlViewModel>()
                .ForMember(x => x.BranchString,
                            o => o.MapFrom(s => s.Branch == null ? "-" : s.Branch.Name))
                .ForMember(x => x.Branch, o => o.Ignore())
                .ForMember(x => x.InspectionPointString,
                            o => o.MapFrom(s => s.InspectionPoint == null ? "-" :  s.InspectionPoint.Name))
                .ForMember(x => x.InspectionPoint, o => o.Ignore())
                .ForMember(x => x.RequireStatusString, o => o.MapFrom(s => System.Enum.GetName(typeof(RequireStatus), s.RequireStatus)))
                .ForMember(x => x.WorkActivityString,
                            o => o.MapFrom(s => s.WorkActivity == null ? "-" : s.WorkActivity.Name))
                .ForMember(x => x.WorkActivity, o => o.Ignore())
                .ForMember(x => x.WorkGroupQualityControlString,
                            o => o.MapFrom(s => s.WorkGroupQualityControl == null ? "-" : s.WorkGroupQualityControl.Name))
                .ForMember(x => x.WorkGroupQualityControl, o => o.Ignore());
            #endregion

            #region User

            //User
            CreateMap<User, UserViewModel>()
                // CuttingPlanNo
                .ForMember(x => x.NameThai,
                           o => o.MapFrom(s => s.EmpCodeNavigation == null ? "-" : $"คุณ{s.EmpCodeNavigation.NameThai}"))
                .ForMember(x => x.EmpCodeNavigation, o => o.Ignore());

            #endregion User

            #region Employee

            //Employee
            CreateMap<Employee, EmployeeViewModel>()
                .ForMember(x => x.User, o => o.Ignore())
                .ForMember(x => x.GroupMisNavigation, o => o.Ignore());

            #endregion

            #region EmployeeGroupMis

            CreateMap<EmployeeGroupMis, GroupMisViewModel>()
                .ForMember(x => x.Employee, o => o.Ignore());

            #endregion

            #region ProjectCodeMaster

            CreateMap<ProjectCodeMaster, ProjectMasterViewModel>()
                .ForMember(x => x.ProjectCodeDetail, o => o.Ignore());

            #endregion

            #region ProjectCodeDetail

            CreateMap<ProjectCodeDetail, ProjectDetailViewModel>()
                .ForMember(x => x.ProjectCodeMaster, o => o.Ignore());

            #endregion
        }
    }
}