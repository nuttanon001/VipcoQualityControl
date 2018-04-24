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

using AutoMapper;

namespace VipcoQualityControl.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class RequireQualityControlController : GenericController<RequireQualityControl>
    {
        // Repository
        private readonly IRepositoryMachine<ProjectCodeMaster> RepositoryProject;
        private readonly IRepositoryMachine<ProjectCodeDetail> RepositoryProjectDetail;
        private readonly IRepositoryMachine<Employee> RepositoryEmployee;
        private readonly IRepositoryMachine<EmployeeGroupMis> RepositoryGroupMis;
        private readonly IRepositoryMachine<AttachFile> RepositoryAttach;
        private readonly IRepositoryQualityControl<RequireHasAttach> RepositoryHasAttach;
        // Helper
        private readonly Helper.EmailClass EmailClass;
        // IHost
        private readonly IHostingEnvironment HostEnvironment;
        public RequireQualityControlController(IRepositoryQualityControl<RequireQualityControl> repo,
            IRepositoryMachine<ProjectCodeMaster> repoProMaster,
            IRepositoryMachine<ProjectCodeDetail> repoProDetail,
            IRepositoryMachine<Employee> repoEmp,
            IRepositoryMachine<EmployeeGroupMis> repoGroupMis,
            IRepositoryMachine<AttachFile> repoAttach,
            IRepositoryQualityControl<RequireHasAttach> repoHasAttach,
            IMapper map,
            IHostingEnvironment hostEnv) : base(repo,map)
        {
            // Repository Machine
            this.RepositoryEmployee = repoEmp;
            this.RepositoryProject = repoProMaster;
            this.RepositoryProjectDetail = repoProDetail;
            this.RepositoryGroupMis = repoGroupMis;
            this.RepositoryAttach = repoAttach;
            this.RepositoryHasAttach = repoHasAttach;
            // Helper
            this.EmailClass = new Helper.EmailClass();
            // IHost
            this.HostEnvironment = hostEnv;
        }

        #region Property
        private IEnumerable<DateTime> EachDay(DateTime from, DateTime thru)
        {
            for (var day = from.Date; day.Date <= thru.Date; day = day.AddDays(1))
                yield return day;
        }

        #endregion

        // GET: api/RequireQualityControl/5
        [HttpGet("GetKeyNumber")]
        public override async Task<IActionResult> Get(int key)
        {
            var HasItem = await this.repository.GetAsync(key,true);

            if (HasItem != null)
            {
                var MapItem = this.mapper.Map<RequireQualityControl, RequireQualityControlViewModel>(HasItem);
                // RequireEmpString
                if (!string.IsNullOrEmpty(MapItem.RequireEmp))
                    MapItem.RequireEmpString = (await this.RepositoryEmployee.GetAsync(MapItem.RequireEmp)).NameThai;
                // ProjectCodeDetail
                if (MapItem.ProjectCodeDetailId.HasValue)
                {
                    var HasProject = await this.RepositoryProjectDetail
                                            .GetAllAsQueryable()
                                            .Include(x => x.ProjectCodeMaster)
                                            .FirstOrDefaultAsync(x => x.ProjectCodeDetailId ==( MapItem.ProjectCodeDetailId ?? 0));
                    MapItem.ProjectCodeDetailString = HasProject != null ? $"{HasProject.ProjectCodeMaster.ProjectCode}/{HasProject.Description}" : "-";
                }
                // GroupMIS
                if (!string.IsNullOrEmpty(MapItem.GroupMIS))
                    MapItem.GroupMISString = (await this.RepositoryGroupMis.GetAsync(MapItem.GroupMIS)).GroupDesc;

                return new JsonResult(MapItem, this.DefaultJsonSettings);
            }
            return BadRequest();
        }
        // GET: api/RequireQualityControl/ActionRequireMaintenance/5
        [HttpGet("ActionRequireQualityControl")]
        public async Task<IActionResult> ActionRequireQualityControl(int key, string byEmp)
        {
            if (key > 0)
            {
                var HasData = await this.repository.GetAsync(key);
                if (HasData != null)
                {
                    HasData.ResponseDate = DateTime.Now;
                    HasData.ModifyDate = DateTime.Now;
                    HasData.Modifyer = byEmp;

                    var Complate = await this.repository.UpdateAsync(HasData, key);
                    var EmpName = (await this.RepositoryEmployee.GetAsync(HasData.RequireEmp)).NameThai ?? "ไม่ระบุ";

                    if (Complate != null)
                    {
                        if (this.EmailClass.IsValidEmail(Complate.MailReply))
                        {
                            var BodyMessage = "<body style=font-size:11pt;font-family:Tahoma>" +
                                                    "<h4 style='color:steelblue;'>เมล์ฉบับนี้เป็นแจ้งเตือนจากระบบงาน VIPCO Maintenance SYSTEM</h4>" +
                                                    $"เรียน คุณ{EmpName}" +
                                                    $"<p>เรื่อง การเปิดคำขอตรวจคุณภาพงานเลขที่ {Complate.RequireQualityNo} </p>" +
                                                    $"<p style='color:blue;'><b>ณ.ขณะนี้ได้รับการตอบสนอง</b></p>" +
                                                    $"<p>จากทางหน่วยงานควบคุมคุณภาพ โปรดรอการดำเนินการจากทางหน่วยงาน</p>" +
                                                    $"<p>\"คุณ{EmpName}\" " +
                                                    $"สามารถเข้าไปตรวจติดตามข้อมูลได้ <a href='http://{Request.Host}/qualitycontrol/qualitycontrol/link-mail/{Complate.RequireQualityControlId}'>ที่นี้</a> </p>" +
                                                    "<span style='color:steelblue;'>This mail auto generated by VIPCO Maintenance SYSTEM. Do not reply this email.</span>" +
                                                "</body>";

                            await this.EmailClass.SendMailMessage(Complate.MailReply, EmpName,
                                                       new List<string> { Complate.MailReply },
                                                       BodyMessage, "Notification mail from VIPCO Maintenance SYSTEM.");
                        }
                        return new JsonResult(Complate, this.DefaultJsonSettings);
                    }
                }
            }
            return BadRequest();
        }

        // POST: api/RequireQualityControl/GetScroll
        [HttpPost("GetScroll")]
        public async Task<IActionResult> GetScroll([FromBody] ScrollViewModel Scroll)
        {
            if (Scroll == null)
                return BadRequest();

            var QueryData = this.repository.GetAllAsQueryable()
                                // .AsNoTracking()
                                .AsQueryable();

            if (!string.IsNullOrEmpty(Scroll.Where))
                QueryData = QueryData.Where(x => x.Creator == Scroll.Where);

            // Filter
            var filters = string.IsNullOrEmpty(Scroll.Filter) ? new string[] { "" }
                                : Scroll.Filter.ToLower().Split(null);

            foreach (var keyword in filters)
            {
                QueryData = QueryData.Where(x => x.RequireQualityNo.ToLower().Contains(keyword) ||
                                                 x.InspectionPoint.Name.ToLower().Contains(keyword) ||
                                                 x.WorkActivity.Name.ToLower().Contains(keyword) ||
                                                 x.WorkGroupQualityControl.Name.ToLower().Contains(keyword) ||
                                                 x.Remark.ToLower().Contains(keyword) ||
                                                 x.Description.ToLower().Contains(keyword));
            }

            // Order
            switch (Scroll.SortField)
            {
                case "RequireQualityNo":
                    if (Scroll.SortOrder == -1)
                        QueryData = QueryData.OrderByDescending(e => e.RequireQualityNo);
                    else
                        QueryData = QueryData.OrderBy(e => e.RequireQualityNo);
                    break;
                case "InspectionPointString":
                    if (Scroll.SortOrder == -1)
                        QueryData = QueryData.OrderByDescending(e => e.InspectionPoint.Name);
                    else
                        QueryData = QueryData.OrderBy(e => e.InspectionPoint.Name);
                    break;
                case "RequireDate":
                    if (Scroll.SortOrder == -1)
                        QueryData = QueryData.OrderByDescending(e => e.RequireDate);
                    else
                        QueryData = QueryData.OrderBy(e => e.RequireDate);
                    break;
                default:
                    QueryData = QueryData.OrderByDescending(e => e.RequireDate);
                    break;
            }
            // Get TotalRow
            Scroll.TotalRow = await QueryData.CountAsync();
            // Skip Take
            QueryData = QueryData.Skip(Scroll.Skip ?? 0).Take(Scroll.Take ?? 50);

            var HasData = await QueryData.ToListAsync();
            var listData = new List<RequireQualityControlViewModel>();
            foreach (var item in HasData)
            {
                var MapItem = this.mapper.Map<RequireQualityControl, RequireQualityControlViewModel>(item);
                listData.Add(MapItem);
            }

            return new JsonResult(new ScrollDataViewModel<RequireQualityControlViewModel>(Scroll, listData), this.DefaultJsonSettings);
        }

        // POST: api/RequireQualityControl/
        [HttpPost]
        public override async Task<IActionResult> Create([FromBody] RequireQualityControl record)
        {
            // Set date for CrateDate Entity
            if (record == null)
                return BadRequest();
            // +7 Hour
            record = this.helper.AddHourMethod(record);
            var RunNumber = (await this.repository.GetAllAsQueryable().CountAsync(x => x.RequireDate.Year == record.RequireDate.Year)) + 1;
            record.RequireQualityNo = $"{record.RequireDate.ToString("yy")}-{RunNumber.ToString("0000")}";
            record.CreateDate = DateTime.Now;

            if (await this.repository.AddAsync(record) == null)
                return BadRequest();
            return new JsonResult(record, this.DefaultJsonSettings);
        }

        #region ATTACH

        // GET: api/RequireQualityControl/GetAttach/5
        [HttpGet("GetAttach")]
        public async Task<IActionResult> GetAttach(int key)
        {
            var AttachIds = await this.RepositoryHasAttach.GetAllAsQueryable()
                                  .Where(x => x.RequireHasAttachId == key)
                                  .Select(x => x.AttachFileId).ToListAsync();
            if (AttachIds != null)
            {
                var DataAttach = await this.RepositoryAttach.GetAllAsQueryable()
                                       .Where(x => AttachIds.Contains(x.AttachFileId))
                                       .AsNoTracking()
                                       .ToListAsync();

                return new JsonResult(DataAttach, this.DefaultJsonSettings);
            }

            return NotFound(new { Error = "Attatch not been found." });
        }

        // POST: api/RequireQualityControl/PostAttach/5/Someone
        [HttpPost("PostAttach")]
        public async Task<IActionResult> PostAttac(int key, string CreateBy, IEnumerable<IFormFile> files)
        {
            string Message = "";
            try
            {
                long size = files.Sum(f => f.Length);

                // full path to file in temp location
                var filePath1 = Path.GetTempFileName();

                foreach (var formFile in files)
                {
                    string FileName = Path.GetFileName(formFile.FileName).ToLower();
                    // create file name for file
                    string FileNameForRef = $"{DateTime.Now.ToString("ddMMyyhhmmssfff")}{ Path.GetExtension(FileName).ToLower()}";
                    // full path to file in temp location
                    var filePath = Path.Combine(this.HostEnvironment.WebRootPath + "/files", FileNameForRef);

                    if (formFile.Length > 0)
                    {
                        using (var stream = new FileStream(filePath, FileMode.Create))
                            await formFile.CopyToAsync(stream);
                    }

                    var returnData = await this.RepositoryAttach.AddAsync(new AttachFile()
                    {
                        FileAddress = $"/maintenance/files/{FileNameForRef}",
                        FileName = FileName,
                        CreateDate = DateTime.Now,
                        Creator = CreateBy ?? "Someone"
                    });

                    await this.RepositoryHasAttach.AddAsync(new RequireHasAttach()
                    {
                        AttachFileId = returnData.AttachFileId,
                        CreateDate = DateTime.Now,
                        Creator = CreateBy ?? "Someone",
                        RequireQualityControlId = key
                    });
                }

                return Ok(new { count = 1, size, filePath1 });

            }
            catch (Exception ex)
            {
                Message = ex.ToString();
            }

            return NotFound(new { Error = "Not found " + Message });
        }

        // DELETE: api/RequireQualityControl/DeleteAttach/5
        [HttpDelete("DeleteAttach")]
        public async Task<IActionResult> DeleteAttach(int AttachFileId)
        {
            if (AttachFileId > 0)
            {
                var AttachFile = await this.RepositoryAttach.GetAsync(AttachFileId);
                if (AttachFile != null)
                {
                    var filePath = Path.Combine(this.HostEnvironment.WebRootPath + AttachFile.FileAddress);
                    FileInfo delFile = new FileInfo(filePath);

                    if (delFile.Exists)
                        delFile.Delete();
                    // Condition
                    Expression<Func<RequireHasAttach, bool>> condition = c => c.AttachFileId == AttachFile.AttachFileId;
                    var RequireMaitenanceHasAttach = this.RepositoryHasAttach.FindAsync(condition).Result;
                    if (RequireMaitenanceHasAttach != null)
                        this.RepositoryHasAttach.Delete(RequireMaitenanceHasAttach.RequireHasAttachId);
                    // remove attach
                    return new JsonResult(await this.RepositoryAttach.DeleteAsync(AttachFile.AttachFileId), this.DefaultJsonSettings);
                }
            }
            return NotFound(new { Error = "Not found attach file." });
        }

        #endregion
    }
}
