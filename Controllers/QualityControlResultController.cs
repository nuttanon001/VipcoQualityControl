using System;
using System.IO;
using System.Linq;
using System.Dynamic;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

using VipcoQualityControl.Services;
using VipcoQualityControl.ViewModels;
using VipcoQualityControl.Models.Machines;
using VipcoQualityControl.Models.QualityControls;
using VipcoQualityControl.Helper;

using AutoMapper;

namespace VipcoQualityControl.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class QualityControlResultController : GenericController<QualityControlResult>
    {
        private readonly IRepositoryQualityControl<RequireHasMasterProject> repositoryRequireHasMaster;
        private readonly IRepositoryQualityControl<RequireQualityControl> repositoryRequireQualityControl;
        private readonly IRepositoryQualityControl<InspectionPoint> repositoryInspection;
        private readonly IRepositoryMachine<ProjectCodeDetail> repositoryProject;
        private readonly IRepositoryMachine<Employee> repositoryEmployee;
        private readonly EmailClass EmailClass;
        public QualityControlResultController(IRepositoryQualityControl<QualityControlResult> repo,
            IRepositoryQualityControl<RequireHasMasterProject> repoRequireHasMaster,
            IRepositoryQualityControl<RequireQualityControl> repoRequireRequireQualityControl,
            IRepositoryQualityControl<InspectionPoint> repoInspacetion,
            IRepositoryMachine<Employee> repoEmployee,
            IRepositoryMachine<ProjectCodeDetail> repoProject,
            IMapper mapper) : base(repo, mapper) {
            //Repository Machine
            this.repositoryEmployee = repoEmployee;
            this.repositoryProject = repoProject;
            //Repository Quality Control
            this.repositoryRequireQualityControl = repoRequireRequireQualityControl;
            this.repositoryRequireHasMaster = repoRequireHasMaster;
            this.repositoryInspection = repoInspacetion;
            //Helper
            this.EmailClass = new EmailClass();
        }

        #region Private

        // Require qualitycontrol update
        private async Task<bool> RequireQualityControlUpdate(QualityControlResult QualityControl, bool Status, string ByUser)
        {
            if (QualityControl.RequireQualityControlId.HasValue)
            {
                var HasData = await this.repositoryRequireQualityControl.GetAsync(QualityControl.RequireQualityControlId.Value);
                if (HasData != null)
                {
                    // Comfirm require date
                    if (!HasData.ResponseDate.HasValue)
                        HasData.ResponseDate = HasData.RequireDate.AddHours(2);

                    HasData.RequireStatus = Status ? RequireStatus.Complate : RequireStatus.QcFail;
                    HasData.Modifyer = ByUser;
                    HasData.ModifyDate = DateTime.Now;

                    await this.repositoryRequireQualityControl.UpdateAsync(HasData, HasData.RequireQualityControlId);
                    await this.SendMail(QualityControl, Status);
                    return true;
                }
            }
            return false;
        }

        // Send Mail
        private async Task<bool> SendMail(QualityControlResult HasData,bool ShellYouCanPass)
        {
            if (HasData.RequireQualityControlId.HasValue)
            {
                var HasRequire = await this.repositoryRequireQualityControl.GetAsync(HasData.RequireQualityControlId.Value);
                if (HasRequire != null)
                {
                    if (this.EmailClass.IsValidEmail(HasRequire.MailReply))
                    {
                        var EmpName = (await this.repositoryEmployee.GetAsync(HasRequire.RequireEmp)).NameThai ?? "ไม่ระบุ";

                        var BodyMessage = "<body style=font-size:11pt;font-family:Tahoma>" +
                                            "<h4 style='color:steelblue;'>เมล์ฉบับนี้เป็นแจ้งเตือนจากระบบงาน VIPCO Quality Control System</h4>" +
                                            $"เรียน คุณ{EmpName}" +
                                            $"<p>เรื่อง ผลการตรวจสอบคุณภาพงานเลขที่ {HasRequire.RequireQualityNo} </p>" +
                                            $"{(ShellYouCanPass ? "<p style='color:steelblue;'><b>ผลการตรวจสอบผ่านเงื่อนไข</b></p>" : "<p style='color:red;'><b>ไม่ผ่านเงื่อนไขการตรวจสอบ</b></p>")}" +
                                            $"<p>จากทางหน่วยงานควบคุมคุณภาพ ในวันที่ <b>{HasData.QualityControlResultDate.Value.ToString("dd/MM/yy")}</b>" +
                                            $"<hr/>" +
                                            $"<p>\"คุณ{EmpName}\" " +
                                            (!ShellYouCanPass ? $"สามารถเข้าไปตรวจติดตามข้อมูลได้ <a href='http://{Request.Host}/qualitycontrol/require-qc/{HasData.RequireQualityControlId}'>ที่นี้</a> </p>" 
                                            : $"สามารถเข้าไปตรวจติดตามข้อมูลได้ <a href='http://{Request.Host}/qualitycontrol/require-qc/'> ที่นี้ </a> </p> ") +
                                            "<span style='color:steelblue;'>This mail auto generated by VIPCO Quality Control SYSTEM. Do not reply this email.</span>" +
                                          "</body>";

                        await this.EmailClass.SendMailMessage(HasRequire.MailReply, EmpName,
                                                   new List<string> { HasRequire.MailReply },
                                                   BodyMessage, "Notification mail from VIPCO Quality Control system.");

                        return true;
                    }
                }
            }
            return false;
        }

        #endregion

        // GET: api/QualityControlResult/GetKeyNumber/5
        [HttpGet("GetKeyNumber")]
        public override async Task<IActionResult> Get(int key)
        {
            var HasItem = await this.repository.GetAsync(key, true);

            if (HasItem != null)
            {
                var MapItem = this.mapper.Map<QualityControlResult, QualityControlResultViewModel>(HasItem);
                // RequireEmpString
                if (!string.IsNullOrEmpty(MapItem.EmpCode))
                    MapItem.EmpQualityControlString = (await this.repositoryEmployee.GetAsync(MapItem.EmpCode)).NameThai;
               
                return new JsonResult(MapItem, this.DefaultJsonSettings);
            }
            return BadRequest();
        }

        // POST: api/QualityControlResult/GetScroll
        [HttpPost("GetScroll")]
        public async Task<IActionResult> GetScroll([FromBody] ScrollViewModel Scroll)
        {
            if (Scroll == null)
                return BadRequest();

            var QueryData = this.repository.GetAllAsQueryable()
                                //.AsNoTracking() Error EF-Core 2.1 Preview2
                                .AsQueryable();

            if (!string.IsNullOrEmpty(Scroll.Where))
                QueryData = QueryData.Where(x => x.Creator == Scroll.Where);

            // Filter
            var filters = string.IsNullOrEmpty(Scroll.Filter) ? new string[] { "" }
                                : Scroll.Filter.ToLower().Split(null);
            foreach (var keyword in filters)
            {
                QueryData = QueryData.Where(x => x.RequireQualityControl.InspectionPoint.Name.ToLower().Contains(keyword) ||
                                                 x.RequireQualityControl.LocationQualityControl.Name.ToLower().Contains(keyword) ||
                                                 x.RequireQualityControl.RequireQualityNo.ToLower().Contains(keyword) ||
                                                 x.RequireQualityControl.WorkGroupQualityControl.Name.ToLower().Contains(keyword) ||
                                                 x.Remark.ToLower().Contains(keyword) ||
                                                 x.Description.ToLower().Contains(keyword));
            }
            // Order
            switch (Scroll.SortField)
            {
                case "RequireQualityControlNo":
                    if (Scroll.SortOrder == -1)
                        QueryData = QueryData.OrderByDescending(e => e.RequireQualityControl.RequireQualityNo);
                    else
                        QueryData = QueryData.OrderBy(e => e.RequireQualityControl.RequireQualityNo);
                    break;
                case "WorkGroupQualityControlString":
                    if (Scroll.SortOrder == -1)
                        QueryData = QueryData.OrderByDescending(e => e.RequireQualityControl.WorkGroupQualityControl.Name);
                    else
                        QueryData = QueryData.OrderBy(e => e.RequireQualityControl.WorkGroupQualityControl.Name);
                    break;
                case "QualityControlResultDate":
                    if (Scroll.SortOrder == -1)
                        QueryData = QueryData.OrderByDescending(e => e.QualityControlResultDate);
                    else
                        QueryData = QueryData.OrderBy(e => e.QualityControlResultDate);
                    break;
                default:
                    QueryData = QueryData.OrderByDescending(e => e.QualityControlResultDate);
                    break;
            }

            var Message = "";

            try
            {
                // Get TotalRow
                Scroll.TotalRow = await QueryData.CountAsync();
                // Skip Take
                QueryData = QueryData.Skip(Scroll.Skip ?? 0).Take(Scroll.Take ?? 50);
                // Mapper
                var HasMapper = new List<QualityControlResultViewModel>();
                foreach (var item in await QueryData.ToListAsync())
                    HasMapper.Add(this.mapper.Map<QualityControlResult, QualityControlResultViewModel>(item));
                //JsonResult
                return new JsonResult(new ScrollDataViewModel<QualityControlResultViewModel>(Scroll,
                    HasMapper), this.DefaultJsonSettings);
            }
            catch (Exception ex)
            {
                Message = $"Has error {ex.ToString()}";
            }

            return BadRequest(new { Error = Message });
        }

        //POST: api/QualityControlResult/CreateV2
        [HttpPost("CreateV2")]
        public async Task<IActionResult> CreateV2([FromBody] QualityControlResultViewModel recordViewModel)
        {
            // Set date for CrateDate Entity
            if (recordViewModel == null)
                return BadRequest();
            var record = this.mapper.Map<QualityControlResultViewModel, QualityControlResult>(recordViewModel);
            // +7 Hour
            record = this.helper.AddHourMethod(record);
            record.CreateDate = DateTime.Now;
            // Check HasFail or Pass
            var HasFail = false;
            // Set ItemMainHasEmployees
            if (recordViewModel.QualityHasMasterLists != null)
            {
                foreach (var item in recordViewModel.QualityHasMasterLists)
                {
                    if (item == null)
                        continue;

                    var HasData = await this.repositoryRequireHasMaster.GetAsync(item.RequireHasMasterProjectId);
                    if (HasData != null)
                    {
                        HasData.PassQuantity = item.PassQuantity;
                        HasData.ModifyDate = DateTime.Now;
                        HasData.Modifyer = record.Creator;
                        //Update
                        HasFail = HasData.PassQuantity != HasData.Quantity;
                        await this.repositoryRequireHasMaster.UpdateAsync(HasData, HasData.RequireHasMasterProjectId);
                    }
                }
            }
            // Status
            record.QualityControlStatus = HasFail ? QualityControlStatus.Failed : QualityControlStatus.Approved;

            if (await this.repository.AddAsync(record) == null)
                return BadRequest();
            // Update Require qualitycontrol
            await this.RequireQualityControlUpdate(record, !HasFail, record.Creator);
            if (record.RequireQualityControl != null)
                record.RequireQualityControl = null;

            return new JsonResult(record, this.DefaultJsonSettings);
        }

        //PUT: api/QualityControlResult/UpdateV2
        [HttpPut("UpdateV2")]
        public async Task<IActionResult> UpdateV2(int key, [FromBody] QualityControlResultViewModel recordViewModel)
        {
            if (key < 1)
                return BadRequest();
            if (recordViewModel == null)
                return BadRequest();

            var record = this.mapper.Map<QualityControlResultViewModel, QualityControlResult>(recordViewModel);
            // +7 Hour
            record = this.helper.AddHourMethod(record);
            var HasFail = false;
            // Set date for CrateDate Entity
            if (record.GetType().GetProperty("ModifyDate") != null)
                record.GetType().GetProperty("ModifyDate").SetValue(record, DateTime.Now);
            if (await this.repository.UpdateAsync(record, key) == null)
                return BadRequest();
            else
            {
                if (recordViewModel.QualityHasMasterLists != null)
                {
                    foreach (var item in recordViewModel.QualityHasMasterLists)
                    {
                        if (item == null)
                            continue;

                        var HasData = await this.repositoryRequireHasMaster.GetAsync(item.RequireHasMasterProjectId);
                        if (HasData != null)
                        {
                            HasData.PassQuantity = item.PassQuantity;
                            HasData.ModifyDate = DateTime.Now;
                            HasData.Modifyer = record.Creator;
                            //Update
                            HasFail = HasData.PassQuantity != HasData.Quantity;
                            await this.repositoryRequireHasMaster.UpdateAsync(HasData, HasData.RequireHasMasterProjectId);
                        }
                    }

                    // Update Require qualitycontrol
                    await this.RequireQualityControlUpdate(record, !HasFail, record.Creator);
                    if (record.RequireQualityControl != null)
                        record.RequireQualityControl = null;
                }
            }
            return new JsonResult(record, this.DefaultJsonSettings);
        }

        #region Report
        [HttpGet("QuailtyControlReport")]
        public async Task<IActionResult> QuailtyControlReport(int key)
        {
            if (key > 0)
            {
                var QuailtyControlData = await this.repository.GetAsync(key, true);
                if (QuailtyControlData != null)
                {
                    if (QuailtyControlData.RequireQualityControlId != null)
                    {
                        var Project = await this.repositoryProject.GetAsync(QuailtyControlData.RequireQualityControl.ProjectCodeDetailId ?? 0,true);
                        var Inspections = (await this.repositoryInspection.GetAllAsync()).ToList();
                        var ListCount = Inspections.Count();
                        var MarkNos = (await this.repositoryRequireHasMaster.GetAllAsQueryable()
                                                .Where(x => x.RequireQualityControlId == QuailtyControlData.RequireQualityControlId)
                                                .ToListAsync())
                                                .Select((item,index) => new
                                                {
                                                    RowNumber = index + 1,
                                                    item.MasterProjectList.DrawingNo,
                                                    item.MasterProjectList.MarkNo,
                                                    item.MasterProjectList.Name,
                                                    Box = "-",
                                                    Unit = "-",
                                                    item.Quantity,
                                                    TestResult = "-",
                                                    Remark = "-"
                                                }).ToList();

                        var Inspaectionid = QuailtyControlData?.RequireQualityControl?.InspectionPointId ?? 0;
                        var HasDataReport = new
                        {
                            JobNo = Project?.ProjectCodeMaster?.ProjectCode ?? "",
                            Project = $"{Project?.ProjectCodeMaster?.ProjectName ?? ""} / {Project?.ProjectCodeDetailCode ?? ""}",
                            Branch = QuailtyControlData?.RequireQualityControl?.Branch?.Name ?? "",
                            RequireDate = QuailtyControlData.RequireQualityControl.RequireDate.ToString("dd/MM/yy"),
                            RequireTime = QuailtyControlData.RequireQualityControl.RequireDate.ToString("HH:mm"),
                            Location = QuailtyControlData?.RequireQualityControl?.LocationQualityControl?.Name ?? "",
                            Inspections = new[]
                            {
                                new
                                {
                                    InspectionCheck1 = ListCount >= 1 ? (Inspections[0].InspectionPointId == Inspaectionid ? "1" : "") : "",
                                    InspectionName1 = ListCount >= 1 ? Inspections[0].Name : "",
                                    InspectionCheck2 = ListCount >= 2 ? (Inspections[1].InspectionPointId == Inspaectionid ? "1" : "") : "",
                                    InspectionName2 = ListCount >= 2 ? Inspections[1].Name : "",
                                    InspectionCheck3 = ListCount >= 3 ? (Inspections[2].InspectionPointId == Inspaectionid ? "1" : "") : "",
                                    InspectionName3 = ListCount >= 3 ? Inspections[2].Name : "",
                                    InspectionCheck4 = ListCount >= 4 ? (Inspections[3].InspectionPointId == Inspaectionid ? "1" : "") : "",
                                    InspectionName4 = ListCount >= 4 ? Inspections[3].Name : "",
                                },
                                new
                                {
                                    InspectionCheck1 = ListCount >= 5 ? (Inspections[4].InspectionPointId == Inspaectionid ? "1" : "") : "",
                                    InspectionName1 = ListCount >= 5 ? Inspections[4].Name : "",
                                    InspectionCheck2 = ListCount >= 6 ? (Inspections[5].InspectionPointId == Inspaectionid ? "1" : "") : "",
                                    InspectionName2 = ListCount >= 6 ? Inspections[5].Name : "",
                                    InspectionCheck3 = ListCount >= 7 ? (Inspections[6].InspectionPointId == Inspaectionid ? "1" : "") : "",
                                    InspectionName3 = ListCount >= 7 ? Inspections[6].Name : "",
                                    InspectionCheck4 = ListCount >= 8 ? (Inspections[7].InspectionPointId == Inspaectionid ? "1" : "") : "",
                                    InspectionName4 = ListCount >= 8 ? Inspections[7].Name : "",
                                },
                                 new
                                {
                                    InspectionCheck1 = ListCount >= 9 ? (Inspections[8].InspectionPointId == Inspaectionid ? "1" : "") : "",
                                    InspectionName1 = ListCount >= 9 ? Inspections[8].Name : "",
                                    InspectionCheck2 = ListCount >= 10 ? (Inspections[9].InspectionPointId == Inspaectionid ? "1" : "") : "",
                                    InspectionName2 = ListCount >= 10 ? Inspections[9].Name : "",
                                    InspectionCheck3 = ListCount >= 11 ? (Inspections[10].InspectionPointId == Inspaectionid ? "1" : "") : "",
                                    InspectionName3 = ListCount >= 11 ? Inspections[10].Name : "",
                                    InspectionCheck4 = ListCount >= 12 ? (Inspections[11].InspectionPointId == Inspaectionid ? "1" : "") : "",
                                    InspectionName4 = ListCount >= 12 ? Inspections[11].Name : "",
                                },
                                 new
                                {
                                    InspectionCheck1 = ListCount >= 13 ? (Inspections[12].InspectionPointId == Inspaectionid ? "1" : "") : "",
                                    InspectionName1 = ListCount >= 13 ? Inspections[12].Name : "",
                                    InspectionCheck2 = ListCount >= 14 ? (Inspections[13].InspectionPointId == Inspaectionid ? "1" : "") : "",
                                    InspectionName2 = ListCount >= 14 ? Inspections[13].Name : "",
                                    InspectionCheck3 = ListCount >= 15 ? (Inspections[14].InspectionPointId == Inspaectionid ? "1" : "") : "",
                                    InspectionName3 = ListCount >= 15 ? Inspections[14].Name : "",
                                    InspectionCheck4 = ListCount >= 16 ? (Inspections[15].InspectionPointId == Inspaectionid ? "1" : "") : "",
                                    InspectionName4 = ListCount >= 16 ? Inspections[15].Name : "",
                                },
                                 new
                                {
                                    InspectionCheck1 = ListCount >= 17 ? (Inspections[16].InspectionPointId == Inspaectionid ? "1" : "") : "",
                                    InspectionName1 = ListCount >= 17 ? Inspections[16].Name : "",
                                    InspectionCheck2 = ListCount >= 18 ? (Inspections[17].InspectionPointId == Inspaectionid ? "1" : "") : "",
                                    InspectionName2 = ListCount >= 18 ? Inspections[17].Name : "",
                                    InspectionCheck3 = ListCount >= 19 ? (Inspections[18].InspectionPointId == Inspaectionid ? "1" : "") : "",
                                    InspectionName3 = ListCount >= 19 ? Inspections[18].Name : "",
                                    InspectionCheck4 = ListCount >= 20 ? (Inspections[19].InspectionPointId == Inspaectionid ? "1" : "") : "",
                                    InspectionName4 = ListCount >= 20 ? Inspections[19].Name : "",
                                }
                            },
                            ListMarkNos = MarkNos,
                        };

                        if (HasDataReport != null)
                            return new JsonResult(HasDataReport, this.DefaultJsonSettings);
                    }
                }
            }

            return BadRequest(new { Error = "Not been found." });
        }

        #endregion
    }
}
