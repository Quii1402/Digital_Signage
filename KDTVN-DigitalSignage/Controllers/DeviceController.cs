using BaseProject.Controllers;
using KDTVN_DigitalSignage.Models;
using KDTVN_Shared.Helper;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System.Data;
using System.Diagnostics;



namespace KDTVN_DigitalSignage.Controllers
{
    public class DeviceController :BaseController<DeviceController>
    {
        private readonly ILogger<DeviceController> _logger;
        public DeviceController(ILogger<DeviceController> logger)
        {
            _logger = logger;
        }
        DeviceModel dm = new DeviceModel();
        public IActionResult Index()
        {
            return View();
        }

        //Get Device
        [HttpPost]
        public IActionResult GetDevice(DeviceModel input)
        {
            var result = dm.GetDeviceModel(input);
            return Json(result);
        }

        //Insert
        [HttpPost]
        public IActionResult InsertDevice(DeviceModel input)
        {
            QueryResult qr = new QueryResult();
            input.create_by = SignInAccount.username;
            input.status = true;
            qr = new DeviceModel().Insert(input);
            return new ObjectResult(new { type = qr.Code == 1 ? "success" : "error", message = qr.Msg });
        }
        //Delete
        [HttpDelete]
        public IActionResult DeleteDevice(DeviceModel input)
        {
            var response = new DeviceModel().Delete(input);
            return new ObjectResult(new { type = response.Code == 1 ? "success" : "error", message = response.Msg });
        }

        //Update
        [HttpPut]
        public IActionResult UpdateDevice(DeviceModel input)
        {
          
            input.last_modify_by = SignInAccount.username;
           
            var qr = new DeviceModel().UpdateDeviceData(input);

            return new ObjectResult(new { type = qr.Code == 1 ? "success" : "error", message = qr.Msg });
        }

        //Insert
        [HttpPost]
        public IActionResult InsertLink(LinkModel input)
        {
            QueryResult qr = new QueryResult();
            input.last_modify_by = SignInAccount.username;
            qr = new LinkModel().Insert(input);
            return new ObjectResult(new { type = qr.Code == 1 ? "success" : "error", message = qr.Msg });
        }

        //IMPORT EXCEL

        [HttpPost]
        public IActionResult UploadDeviceExcel(IFormFile file)
        {
            try
            {
                if (file == null || file.Length <= 0)
                    return BadRequest("File is empty");

                // ReSharper disable once PossibleNullReferenceException
                if (!Path.GetExtension(file.FileName).Equals(".xlsx", StringComparison.OrdinalIgnoreCase))
                    return new ObjectResult(new { type = "error", message = "File extension is not supported" });

                var memoryStream = new MemoryStream();

                //file.CopyToAsync(memoryStream);
                file.CopyTo(memoryStream);

                using var package = new ExcelPackage(memoryStream);
                ExcelWorksheet inputSheet = package.Workbook.Worksheets["Input"];

                //convert to datatable
                DataTable dt = new DataTable();

                //thêm header
                //inputSheet.Dimension.End.Column = 4
                foreach (var firstRowCell in inputSheet.Cells[2, 1, 2, 3])
                {
                    dt.Columns.Add(firstRowCell.Text);
                }
                string[] additionalColHeader = { "url_playlist","create_by", "create_at","id_device","status" };
                foreach (var item in additionalColHeader)
                {
                    dt.Columns.Add(item);
                }


                ////thêm content
                // Đọc tất cả data bắt đầu từ row thứ 3

                for (var rowNumber = 3; rowNumber <= inputSheet.Dimension.End.Row; rowNumber++)
                {

                    // Lấy 1 row trong excel để truy vấn
                    var row = inputSheet.Cells[rowNumber, 1, rowNumber, 3];
                    // tạo 1 row trong data table
                    var newRow = dt.NewRow();
                    foreach (var cell in row)
                    {
                        newRow[cell.Start.Column -1] = cell.Text;
                    }
                    newRow["status"] = true;

                    newRow["url_playlist"] = null;
                    //last_modify_by
                    newRow["create_by"] = SignInAccount.username;

                    //last_modify_at
                    newRow["create_at"] = DateTime.Now;


                    dt.Rows.Add(newRow);
                }
                dt.Columns["id_device"].SetOrdinal(0);
                dt.Columns["status"].SetOrdinal(4);
                //dt.Columns["LabelCheck"].SetOrdinal(20);
                //dt.Columns["CreateAT"].SetOrdinal(22);
                //dt.Columns["Createby"].SetOrdinal(23);
                //dt.Columns["Last_modify_at"].SetOrdinal(5);
                //dt.Columns["Last_modify_by"].SetOrdinal(4);
                //dt.Columns["Status"].SetOrdinal(26);
                //dt.Columns["LiftFloor"].SetOrdinal(29);
                //dt.Columns["KDTVNWarehouseInUseID"].SetOrdinal(30);



                /*
                Xử lý thêm location mới
                1. Truncate bảng product_schedule
                */
                //new SQLHelper(DBConnection.KDTVN_FACT_B_BACHIRETA).ExecQueryNonData("truncate table [dbo].[product_schedule]");

                /*
                2. Bulk insert dữ liệu vào bảng 
                */
                //thêm product_schedule mới
                QueryResult res = new SQLHelper(DBConnection.KDTVN_DIGITAL_SIGNAGE).BulkCopy(dt, "[dbo].[Device]");
                if (res.Code == -1)
                {
                    if (res.Msg.Contains("Violation of PRIMARY KEY"))
                    {
                        int start = res.Msg.IndexOf('(');
                        int stop = res.Msg.IndexOf(')');
                        string duplicate = res.Msg.Substring(start + 1, stop - start - 1);
                        return new ObjectResult(new { type = "error", message = "Có mã giá bị lặp nhiều lần thông tin trong danh sách " + duplicate });
                    }
                    return new ObjectResult(new { type = "error", message = res.Msg });
                }
                else
                {
                    return new ObjectResult(new { type = res.Code == 1 ? "success" : "error", message = res.Msg });
                }

            }
            catch (Exception ex)
            {
                return new ObjectResult(new { type = "error", message = ex.Message });
            }


        }



    }
}
