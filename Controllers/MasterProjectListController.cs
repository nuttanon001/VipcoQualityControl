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
using VipcoQualityControl.Models.QualityControls;

using AutoMapper;

namespace VipcoQualityControl.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MasterProjectListController : GenericController<MasterProjectList>
    {
        public MasterProjectListController(IRepositoryQualityControl<MasterProjectList> repo,
            IMapper mapper): base(repo,mapper)
        { }

        // GET: api/MasterProjectList/Autocomplate
        [HttpGet("Autocomplate")]
        public async Task<IActionResult> GetAutocomplate(string Filter)
        {
            // Expression<Func<MasterProjectList, bool>> condition = m => m.MarkNo.ToLower().Contains(Filter.ToLower());
            // return new JsonResult(await this.repository.FindAllAsync(condition), this.DefaultJsonSettings);

            var QueryData = await this.repository.GetAllAsQueryable()
                                                 .Where(x => x.MarkNo.ToLower().Contains(Filter.ToLower()))
                                                 .Select(x => new
                                                     {
                                                         x.MarkNo,
                                                         x.Name
                                                     })
                                                 .Distinct()
                                                 .ToListAsync();
            if (QueryData != null)
                return new JsonResult(QueryData, this.DefaultJsonSettings);

            return NoContent();
        }

        // POST: api/MasterProjectList/GetScroll
        [HttpPost("GetScroll")]
        public async Task<IActionResult> GetScroll([FromBody] ScrollViewModel Scroll)
        {
            if (Scroll == null)
                return BadRequest();

            var QueryData = this.repository.GetAllAsQueryable()
                                //.AsNoTracking() Error EF-Core 2.1 Preview2
                                .AsQueryable();

            // Filter
            var filters = string.IsNullOrEmpty(Scroll.Filter) ? new string[] { "" }
                                : Scroll.Filter.ToLower().Split(null);

            foreach (var keyword in filters)
            {
                QueryData = QueryData.Where(x => x.Name.ToLower().Contains(keyword) ||
                                                 x.MarkNo.ToLower().Contains(keyword) ||
                                                 x.DrawingNo.ToLower().Contains(keyword) ||
                                                 x.Remark.ToLower().Contains(keyword) ||
                                                 x.Description.ToLower().Contains(keyword));
            }

            // Order
            switch (Scroll.SortField)
            {
                case "MarkNo":
                    if (Scroll.SortOrder == -1)
                        QueryData = QueryData.OrderByDescending(e => e.MarkNo);
                    else
                        QueryData = QueryData.OrderBy(e => e.MarkNo);
                    break;
                case "Name":
                    if (Scroll.SortOrder == -1)
                        QueryData = QueryData.OrderByDescending(e => e.Name);
                    else
                        QueryData = QueryData.OrderBy(e => e.Name);
                    break;
                case "Quantity":
                    if (Scroll.SortOrder == -1)
                        QueryData = QueryData.OrderByDescending(e => e.Quantity);
                    else
                        QueryData = QueryData.OrderBy(e => e.Quantity);
                    break;
                default:
                    QueryData = QueryData.OrderBy(e => e.MarkNo);
                    break;
            }
            // Get TotalRow
            Scroll.TotalRow = await QueryData.CountAsync();
            // Skip Take
            QueryData = QueryData.Skip(Scroll.Skip ?? 0).Take(Scroll.Take ?? 50);
            try
            {
                var HasData = await QueryData.ToListAsync();
                var listData = new List<MasterProjectListViewModel>();
                foreach (var item in HasData)
                {
                    var MapItem = this.mapper.Map<MasterProjectList, MasterProjectListViewModel>(item);
                    listData.Add(MapItem);
                }

                return new JsonResult(new ScrollDataViewModel<MasterProjectListViewModel>(Scroll, listData), this.DefaultJsonSettings);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = $"{ex.ToString()}" });
            }
        }
    }
}
