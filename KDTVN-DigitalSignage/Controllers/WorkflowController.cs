using Microsoft.AspNetCore.Mvc;

namespace BaseProject.Controllers
{
    public class WorkflowController : Controller
    {
        public IActionResult Index()
        {

            return View();
        }
    }
}
