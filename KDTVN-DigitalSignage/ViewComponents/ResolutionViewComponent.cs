using KDTVN_Shared.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KDTVN_DigitalSignage.Models;
namespace KDTVN_DigitalSignage.ViewComponents
{
    [ViewComponent(Name = "Resolution")]
    public class ResolutionViewComponent : ViewComponent
    {
        public async Task<IViewComponentResult> InvokeAsync(string id)
        {

            var Resolutions = new ResolutionModel().GetALl();
            ViewBag.Id = id;
            return View("Index", Resolutions);
        }
    }
}
