using BaseProject.Controllers;
using KDTVN_DigitalSignage.Models;
using KDTVN_Shared.Helper;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Security.Policy;

namespace KDTVN_DigitalSignage.Controllers
{
    public class PlayListController : BaseController<PlayListController>
    {
        
        private readonly ILogger<PlayListController> _logger;
        public PlayListController(ILogger<PlayListController> logger)
        {
            _logger = logger;
        }
        PlayListModel pm = new PlayListModel();

        public IActionResult Index()
        {
            return View();
        }

        //Upload
        //[HttpPost]
        //public IActionResult Uploadfile(IFormFile file)
        //{
        //    try
        //    {
        //        string filename = file.FileName;
        //        filename = Path.GetFileName(filename);
        //        string uploadfilepath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\imgs", filename);
        //        var stream = new FileStream(uploadfilepath, FileMode.Create);
        //        file.CopyToAsync(stream);
        //        ViewBag.message = "Tải lên thành công";
        //        ViewBag.FileName = filename;
        //    }
        //    catch (Exception ex)
        //    {
        //        ViewBag.message = "Error: " + ex.Message.ToString();
        //    }

        //    return View();
        //}
        [HttpPost]
        [RequestFormLimits(MultipartBodyLengthLimit = 2140000000)]
        [RequestSizeLimit(2140000000)]
        public IActionResult UploadFile()
        {
            foreach (var formFile in Request.Form.Files)
            {
                //var fulPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\imgs", formFile.FileName); //windown
                var fulPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/imgs", formFile.FileName); //Linuwx

                using (FileStream fs = System.IO.File.Create(fulPath))
                {
                    formFile.CopyTo(fs);
                    fs.Flush();
                }
               // return Json("Upload image succesfully.");
            }
            return View();
        }


        //public JsonResult Upload()
        //{
        //    for (int i = 0; i < Request.Files.Count; i++)
        //    {
        //        HttpPostedFileBase file = Request.Files[i]; //Uploaded file
        //                                                    //Use the following properties to get file's name, size and MIMEType
        //        int fileSize = file.ContentLength;
        //        string fileName = file.FileName;
        //        string mimeType = file.ContentType;
        //        System.IO.Stream fileContent = file.InputStream;
        //        //To save file, use SaveAs method
        //        file.SaveAs(Server.MapPath("~/") + fileName); //File will be saved in application root
        //    }
        //    return Json("Uploaded " + Request.Files.Count + " files");
        //}


        //Get Device
        [HttpPost]
        public IActionResult GetPlayList(PlayListModel input)
        {
            var result = pm.GetPlayListModel(input);
            return Json(result);
        }

        //Insert
        [HttpPost]
        public IActionResult InsertPlayList(PlayListModel input)
        {
            QueryResult qr = new QueryResult();
            //input.status = true;
            input.create_by = SignInAccount.username;
            qr = new PlayListModel().Insert(input);
            return new ObjectResult(new { type = qr.Code == 1 ? "success" : "error", message = qr.Msg });
        }

        //Delete
        [HttpDelete]
        public IActionResult DeletePlayList(PlayListModel input)
        {

        

            var response = new PlayListModel().Delete(input);
            return new ObjectResult(new { type = response.Code == 1 ? "success" : "error", message = response.Msg });

          
        }
        //Delete File
        [HttpDelete]
        public IActionResult DeleteFile(string URL)
        {
            //var folderFileCv = @"\wwwroot\imgs\"; //windown
            var folderFileCv = @"/wwwroot/imgs/"; //linux
            var basePath = Path.Combine(Directory.GetCurrentDirectory() + folderFileCv);
            var filePath = basePath + URL;
            System.IO.File.Delete(filePath);
            return View();
        }



        //Update
        //[HttpPut]
        [HttpPost]
        public IActionResult UpdatePlayList(PlayListModel input)
        {

            input.last_modify_by = SignInAccount.username;

            var qr = new PlayListModel().UpdatePlayListData(input);

            return new ObjectResult(new { type = qr.Code == 1 ? "success" : "error", message = qr.Msg });
        }

    }
}
