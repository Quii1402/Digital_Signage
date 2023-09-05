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
    public class DeviceModel
    {
        public int? id_device { get; set; }

        public string ip_address { get; set; }

        public string name_device { get; set; }

        public string location { get; set; }

        public bool status { get; set; }

        public string url_playlist { get; set; }

        public string create_by { get; set; }

        public DateTime? create_at { get; set; }


        public string last_modify_by { get; set; }

        public DateTime? last_modify_at { get;set; }



        //Get Device

        public List<DeviceModel> GetDeviceModel(DeviceModel input)
        {

            List<DeviceModel> result = new List<DeviceModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id_device", input.id_device);
            dParam.Add("@ip_address", input.ip_address);
            dParam.Add("@name_device", input.name_device);       
            dParam.Add("@location", input.location);
            dParam.Add("@status", input.status);
            dParam.Add("@url_playlist", input.url_playlist);
            dParam.Add("@create_by", input.create_by);
            dParam.Add("@create_at", input.create_at);
            result = new SQLHelper(DBConnection.KDTVN_DIGITAL_SIGNAGE).ExecProcedureData<DeviceModel>("[dbo].[sp_get_device]", dParam).ToList();

            return result;
        }

        //Insert Device
        public QueryResult Insert(DeviceModel input)
        {
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@ip_address", input.ip_address);
            dParam.Add("@name_device", input.name_device);
            dParam.Add("@location", input.location);
            dParam.Add("@status", input.status);
            dParam.Add("@create_by", input.create_by);
            dParam.Add("@create_at", input.create_at);

            var result = new SQLHelper(DBConnection.KDTVN_DIGITAL_SIGNAGE)
                .ExecProcedureDataQueryResult("[dbo].[sp_insert_device]", dParam);

            return result;

        }
        //Delete Device

        public QueryResult Delete(DeviceModel input)
        {
            var dParam = new DynamicParameters();
            dParam.Add("@id_device", input.id_device);
            return new SQLHelper(DBConnection.KDTVN_DIGITAL_SIGNAGE)
                .ExecProcedureDataQueryResult("[dbo].[sp_delete_device]", dParam);
        }
        //Update
        public QueryResult UpdateDeviceData(DeviceModel input)
        {

            QueryResult qr = new QueryResult();

            DynamicParameters dParam = new DynamicParameters();
            //dParam.Add("@id_device", input.id_device);
            dParam.Add("@ip_address", input.ip_address);
            dParam.Add("@name_device", input.name_device);
            dParam.Add("@location", input.location);
            dParam.Add("@status", input.status);
            dParam.Add("@url_playlist", input.url_playlist);
            dParam.Add("@last_modify_by", input.last_modify_by);

            qr = new SQLHelper(DBConnection.KDTVN_DIGITAL_SIGNAGE).ExecProcedureDataQueryResult("[dbo].[sp_update_device]", dParam);


            return qr;
        }

    }
}