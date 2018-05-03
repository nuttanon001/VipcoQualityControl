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
    public class LocationQualityControlController : GenericController<LocationQualityControl>
    {
        public LocationQualityControlController(IRepositoryQualityControl<LocationQualityControl> repo,
            IMapper mapper) : base(repo, mapper) { }

        // GET: api/LocationQualityControl/GetByMaster
        [HttpGet("GetByMaster")]
        public async Task<IActionResult> GetByMaster(string key)
        {
            if (!string.IsNullOrEmpty(key))
            {
                Expression<Func<LocationQualityControl, bool>> expression = e => e.GroupMis == key;
                var LocationQc = (await this.repository.FindAllAsync(expression));
                if (LocationQc != null)
                {
                    var DataMapper = new List<LocationQualityControlViewModel>();
                    foreach (var item in LocationQc)
                        DataMapper.Add(this.mapper.Map<LocationQualityControl, LocationQualityControlViewModel>(item));

                    return new JsonResult(DataMapper, this.DefaultJsonSettings);
                }
            }

            return BadRequest();
        }
        
        // POST: api/LocationQualityControl/GetScroll
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
                                                 x.Description.ToLower().Contains(keyword));
            }
            // Order
            switch (Scroll.SortField)
            {
                case "Name":
                    if (Scroll.SortOrder == -1)
                        QueryData = QueryData.OrderByDescending(e => e.Name);
                    else
                        QueryData = QueryData.OrderBy(e => e.Name);
                    break;
                case "Description":
                    if (Scroll.SortOrder == -1)
                        QueryData = QueryData.OrderByDescending(e => e.Description);
                    else
                        QueryData = QueryData.OrderBy(e => e.Description);
                    break;
                default:
                    QueryData = QueryData.OrderBy(e => e.Name);
                    break;
            }
            // Get TotalRow
            Scroll.TotalRow = await QueryData.CountAsync();
            // Skip Take
            QueryData = QueryData.Skip(Scroll.Skip ?? 0).Take(Scroll.Take ?? 50);
            // Mapper
            var HasMapper = new List<LocationQualityControlViewModel>();
            foreach(var item in await QueryData.ToListAsync())
                HasMapper.Add(this.mapper.Map<LocationQualityControl, LocationQualityControlViewModel>(item));
            //JsonResult
            return new JsonResult(new ScrollDataViewModel<LocationQualityControlViewModel>(Scroll,
                HasMapper), this.DefaultJsonSettings);
        }
    }
}
