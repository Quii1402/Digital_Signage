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
    public class PlayListModel
    {
        public int? id_playlist { get; set; }

        public string name_playlist { get; set; }

        public string name_content { get; set; }

        public string url { get; set; }

        //public bool status { get; set; }
        public string create_by { get; set; }

        public DateTime? create_at { get; set; }

        public string last_modify_by { get; set; }

        public DateTime? last_modify_at { get;set; }


        //Get All

        public List<PlayListModel> GetALL()
        {
            var result = new SQLHelper(DBConnection.KDTVN_DIGITAL_SIGNAGE)
                .ExecProcedureData<PlayListModel>("[dbo].[sp_get_all_playlist]").ToList();

            return result;
        }
        //Get Device

        public List<PlayListModel>GetPlayListModel(PlayListModel input)
        {

            List<PlayListModel> result = new List<PlayListModel>();
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id_playlist", input.id_playlist);
            dParam.Add("@name_playlist", input.name_playlist);
            dParam.Add("@name_content", input.name_content);       
            dParam.Add("@url", input.url);
            //dParam.Add("@status", input.status);
            dParam.Add("@create_by", input.create_by);
            dParam.Add("@create_at", input.create_at);
            result = new SQLHelper(DBConnection.KDTVN_DIGITAL_SIGNAGE).ExecProcedureData<PlayListModel>("[dbo].[sp_get_playlist]", dParam).ToList();

            return result;
        }

        //Insert playlist
        public QueryResult Insert(PlayListModel input)
        {
            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@name_playlist", input.name_playlist);
            dParam.Add("@name_content", input.name_content);
            dParam.Add("@url", input.url); 
            //dParam.Add("@status", input.status);
            dParam.Add("@create_by", input.create_by);
            dParam.Add("@create_at", input.create_at);

            var result = new SQLHelper(DBConnection.KDTVN_DIGITAL_SIGNAGE)
                .ExecProcedureDataQueryResult("[dbo].[sp_insert_playlist]", dParam);

            return result;

        }
        //Delete Device

        public QueryResult Delete(PlayListModel input)
        {
            var dParam = new DynamicParameters();
            dParam.Add("@id_playlist", input.id_playlist);
            return new SQLHelper(DBConnection.KDTVN_DIGITAL_SIGNAGE)
                .ExecProcedureDataQueryResult("[dbo].[sp_delete_playlist]", dParam);
        }

        //Update
        public QueryResult UpdatePlayListData(PlayListModel input)
        {

            QueryResult qr = new QueryResult();

            DynamicParameters dParam = new DynamicParameters();
            dParam.Add("@id_playlist", input.id_playlist);
            dParam.Add("@name_playlist", input.name_playlist);
            dParam.Add("@name_content", input.name_content);
            dParam.Add("@url", input.url);
            //dParam.Add("@status", input.status);
            dParam.Add("@last_modify_by", input.last_modify_by);


            qr = new SQLHelper(DBConnection.KDTVN_DIGITAL_SIGNAGE).ExecProcedureDataQueryResult("[dbo].[sp_update_playlist]", dParam);


            return qr;
        }

    }
}