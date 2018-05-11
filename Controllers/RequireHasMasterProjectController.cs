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
    public class RequireHasMasterProjectController : GenericController<RequireHasMasterProject>
    {
        public RequireHasMasterProjectController(IRepositoryQualityControl<RequireHasMasterProject> repo,
                IMapper mapper) : base(repo, mapper) { }

        // GET: api/RequireHasMasterProject/GetByMaster
        [HttpGet("GetByMaster")]
        public async Task<IActionResult> GetByMaster(int key)
        {
            if (key > 0)
            {
                Expression<Func<RequireHasMasterProject, bool>> 
                    expression = e => e.RequireQualityControlId == key;

                var RequireHasMaster = (await this.repository.FindAllAsync(expression,true));
                if (RequireHasMaster != null)
                {
                    var DataMapper = new List<RequireHasMasterProjectViewModel>();
                    foreach (var item in RequireHasMaster)
                    {
                        if (!item.PassQuantity.HasValue)
                            item.PassQuantity = 0;

                        DataMapper.Add(this.mapper.Map<RequireHasMasterProject, RequireHasMasterProjectViewModel>(item));
                    }

                    return new JsonResult(DataMapper, this.DefaultJsonSettings);
                }
            }
            return BadRequest();
        }
    }
}
