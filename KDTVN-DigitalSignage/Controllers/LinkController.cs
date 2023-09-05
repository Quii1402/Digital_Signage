using BaseProject.Controllers;
using KDTVN_DigitalSignage.Models;
using KDTVN_Shared.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace KDTVN_DigitalSignage.Controllers
{
    public class LinkController :/*BaseController<LinkController>*/Controller
    {
        private readonly ILogger<LinkController> _logger;

        private readonly IHttpContextAccessor _httpContextAccessor;

        public LinkController(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        LinkModel lm = new LinkModel();
        public IActionResult Index()
        {
            ViewData["GetIP"] = _httpContextAccessor.HttpContext?.Connection?.RemoteIpAddress?.ToString();
            //IPAddress[] ipv4Addresses = Array.FindAll(Dns.GetHostEntry(string.Empty).AddressList,
            //                                   a => a.AddressFamily == AddressFamily.InterNetwork);
            //ViewData["GetIP"] = ipv4Addresses[0].ToString();

            //string IPAddress = "";
            //IPHostEntry Host = default(IPHostEntry);
            //string Hostname = null;
            //Hostname = System.Environment.MachineName;
            //Host = Dns.GetHostEntry(Hostname);
            //foreach (IPAddress IP in Host.AddressList)
            //{
            //    if (IP.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
            //    {
            //        IPAddress = Convert.ToString(IP);
            //    }
            //}

            //Console.WriteLine(IPAddress);

            return View();
        }

        //Get Device
        [HttpPost]
        public IActionResult GetLink(LinkModel input)
        {
            var result = lm.GetLinkModel(input);
            return Json(result);
        }

        ////Insert
        //[HttpPost]
        //public IActionResult InsertLink(LinkModel input)
        //{
        //    QueryResult qr = new QueryResult();
        //    input.last_modify_by = SignInAccount.username;
        //    qr = new LinkModel().Insert(input);
        //    return new ObjectResult(new { type = qr.Code == 1 ? "success" : "error", message = qr.Msg });
        //}
      

    }
}
