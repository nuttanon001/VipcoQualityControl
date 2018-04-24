using System;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

using VipcoQualityControl.Services;
using VipcoQualityControl.ViewModels;
using VipcoQualityControl.Models.Machines;
using AutoMapper;

namespace VipcoQualityControl.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ProjectCodeDetailController : GenericMachineController<ProjectCodeDetail>
    {
        public ProjectCodeDetailController(IRepositoryMachine<ProjectCodeDetail> repo,
            IMapper mapper) : base(repo,mapper) { }

        // POST: api/ProjectCodeDetail/GetScroll
        [HttpPost("GetScroll/")]
        public async Task<IActionResult> GetScroll([FromBody] ScrollViewModel Scroll)
        {
            var QueryData = this.repository.GetAllAsQueryable();
            // WhereId
            if (Scroll.WhereId.HasValue)
            {
                QueryData = QueryData.Where(x => x.ProjectCodeMasterId == Scroll.WhereId);
            }
            // Filter
            var filters = string.IsNullOrEmpty(Scroll.Filter) ? new string[] { "" }
                                : Scroll.Filter.ToLower().Split(null);
            foreach (var keyword in filters)
            {
                QueryData = QueryData.Where(x => x.ProjectCodeDetailCode.ToLower().Contains(keyword) ||
                                                 x.Description.ToLower().Contains(keyword));
            }

            // Order
            switch (Scroll.SortField)
            {
                case "ProjectCodeDetailCode":
                    if (Scroll.SortOrder == -1)
                        QueryData = QueryData.OrderByDescending(e => e.ProjectCodeDetailCode);
                    else
                        QueryData = QueryData.OrderBy(e => e.ProjectCodeDetailCode);
                    break;

                case "Description":
                    if (Scroll.SortOrder == -1)
                        QueryData = QueryData.OrderByDescending(e => e.Description);
                    else
                        QueryData = QueryData.OrderBy(e => e.Description);
                    break;

                default:
                    QueryData = QueryData.OrderByDescending(e => e.ProjectCodeDetailCode)
                                         .ThenBy(e => e.Description);
                    break;
            }
            // Get TotalRow
            Scroll.TotalRow = await QueryData.CountAsync();
            // Skip and Take
            QueryData = QueryData.Skip(Scroll.Skip ?? 0).Take(Scroll.Take ?? 50);

            var ListData = new List<ProjectDetailViewModel>();
            foreach (var item in await QueryData.ToListAsync())
                ListData.Add(this.mapper.Map<ProjectCodeDetail, ProjectDetailViewModel>(item));

            return new JsonResult(new ScrollDataViewModel<ProjectDetailViewModel>
                (Scroll, ListData), this.DefaultJsonSettings);
        }

        // GET: api/ProjectCodeDetail/GetByMaster/5
        [HttpGet("GetByMaster/")]
        public async Task<IActionResult> GetByMaster(int key)
        {
            var QueryData = await this.repository.GetAllAsQueryable()
                                        .Where(x => x.ProjectCodeMasterId == key).ToListAsync();
            var ListData = new List<ProjectDetailViewModel>();

            foreach (var item in QueryData)
                ListData.Add(this.mapper.Map<ProjectCodeDetail, ProjectDetailViewModel>(item));

            return new JsonResult(ListData, this.DefaultJsonSettings);
        }
    }
}
