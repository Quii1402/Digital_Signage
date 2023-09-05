using KDTVN_Shared.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KDTVN_DigitalSignage.Models;
namespace KDTVN_DigitalSignage.ViewComponents
{
    [ViewComponent(Name = "playlist")]
    public class PlayListViewComponent : ViewComponent
    {
        public async Task<IViewComponentResult> InvokeAsync(string id)
        {

            var Playlists = new PlayListModel().GetALL();
            ViewBag.Id = id;
            return View("Index", Playlists);
        }
    }
}
