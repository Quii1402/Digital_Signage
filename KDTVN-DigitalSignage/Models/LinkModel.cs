using Dapper;
using KDTVN_Shared.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using KDTVN_DigitalSignage.Models;


namespace KDTVN_DigitalSignage.Models
{
    public class LinkModel
    {
       
        public string? ip_address { get; set; }

        public string? url { get; set; }

        public string? last_modify_by { get; set; }

        public DateTime? last_modify_at { get; set; }
        //Get

        public List<LinkModel> GetLinkModel(LinkModel input)
        {

            List<LinkModel> result = new List<LinkModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@ip_address", input.ip_address);
            dParam.Add("@url", input.url);

            result = new SQLHelper(DBConnection.KDTVN_DIGITAL_SIGNAGE).ExecProcedureData<LinkModel>("[dbo].[sp_get_link]", dParam).ToList();

            return result;
        }

        //Insert link
        public QueryResult Insert(LinkModel input)
        {
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@ip_address", input.ip_address);
            dParam.Add("@url", input.url);
            dParam.Add("@last_modify_by", input.last_modify_by);
            dParam.Add("@last_modify_at", input.last_modify_at);

            var result = new SQLHelper(DBConnection.KDTVN_DIGITAL_SIGNAGE)
                .ExecProcedureDataQueryResult("[dbo].[sp_insert_link]", dParam);

            return result;

        }
        ////Delete 

        //public QueryResult Delete(DeviceModel input)
        //{
        //    var dParam = new DynamicParameters();
        //    dParam.Add("@id_device", input.id_device);
        //    return new SQLHelper(DBConnection.KDTVN_DIGITAL_SIGNAGE)
        //        .ExecProcedureDataQueryResult("[dbo].[sp_delete_device]", dParam);
        //}
        ////Update
        //public QueryResult UpdateDeviceData(DeviceModel input)
        //{

        //    QueryResult qr = new QueryResult();

        //    DynamicParameters dParam = new DynamicParameters();
        //    dParam.Add("@id_device", input.id_device);
        //    dParam.Add("@ip_address", input.ip_address);
        //    dParam.Add("@name_device", input.name_device);
        //    dParam.Add("@name_method", input.name_method);
        //    dParam.Add("@location", input.location);
        //    dParam.Add("@last_modify_by", input.last_modify_by);

        //    qr = new SQLHelper(DBConnection.KDTVN_DIGITAL_SIGNAGE).ExecProcedureDataQueryResult("[dbo].[sp_update_device]", dParam);


        //    return qr;
        //}

    }
}