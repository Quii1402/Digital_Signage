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
    public class ResolutionModel
    {
        public int? id_resolution { get; set; }

        public string name_resolution { get; set; }



        //Get Device

        public List<ResolutionModel> GetALl()
        {
            var result = new SQLHelper(DBConnection.KDTVN_DIGITAL_SIGNAGE)
                .ExecProcedureData<ResolutionModel>("[dbo].[sp_get_resolution]").ToList();

            return result;
        }

    }
}