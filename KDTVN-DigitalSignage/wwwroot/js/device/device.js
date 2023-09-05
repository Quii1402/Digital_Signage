//GET Device

var DataTable = function () {
    var dt;
    let intialTable = true;
    var initDatatable = function () {
        dt = $("#Table_Device").DataTable({

            searchDelay: 500,
            processing: true,
            searching: true,
            order: [[0, 'asc']],
            //ajax: {
            //    url: "../Device/GetDevice",
            //    type: "POST",
            //    data: "",
            //    dataSrc: "",

            //},
            ajax: null, 
            columns: [
                { data: "id_device" },
                { data: "ip_address" },
                { data: "name_device" }, 
                { data: "location" },
                { data: { status: "status", id: "ip_address" } },
                { data: "url_playlist" }, 
                { data: "create_by" },
                { data: "create_at" },

                {
                    data: {
                        ID_device:"id_device",
                        Ip_address: "ip_address",
                        Name_device: "name_device",                       
                        location: "Location",
                        status : "Status",
                        Url_PlayList: "url_playlist",
                        Create_by: "create_by",
                        Create_at: "create_at",
                    }
                }

            ],
            footerCallback: function (row, data, start, end, display) {
                var api = this.api();

                // Remove the formatting to get integer data for summation
                var intVal = function (i) {
                    return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                };
            },

            columnDefs: [
                { "defaultContent": "-", "targets": "_all" },
                {
                    targets: [4],
                    render: function (data) {
                        return `<div class="form-check form-switch form-check-custom form-check-solid me-10">
                                    <input  disabled class="form-check-input h-20px w-30px" type="checkbox" id="${data.ip_address}" ${data.status ? "checked" : ""} onchange='toggleModelStatus("${data.ip_address}");'/>
                                </div>`;
                    }
                },
                {
                    targets: [7],
                    render: function (data) {
                        if (data == null)
                            return "";
                        return moment(data).format('YYYY-MM-DD HH:mm:ss');
                    }
                },

                {
                    targets: -1,
                    orderable: false,
                    className: 'text-end',
                    render: function (data, type, row) {
                        //console.log(data);
                        return `
                         <button onclick="ShowModalEdit('${data.ip_address
                            }','${data.name_device
                            }','${data.location
                            }','${data.url_playlist    
                            }','${data.status    
                            }');"

                               
                                title="Cập nhật Hồ Sơ"
                                class="btn btn-icon btn-active-light-danger btn-sm">
                                <span class="svg-icon svg-icon-muted svg-icon-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M2 4.63158C2 3.1782 3.1782 2 4.63158 2H13.47C14.0155 2 14.278 2.66919 13.8778 3.04006L12.4556 4.35821C11.9009 4.87228 11.1726 5.15789 10.4163 5.15789H7.1579C6.05333 5.15789 5.15789 6.05333 5.15789 7.1579V16.8421C5.15789 17.9467 6.05333 18.8421 7.1579 18.8421H16.8421C17.9467 18.8421 18.8421 17.9467 18.8421 16.8421V13.7518C18.8421 12.927 19.1817 12.1387 19.7809 11.572L20.9878 10.4308C21.3703 10.0691 22 10.3403 22 10.8668V19.3684C22 20.8218 20.8218 22 19.3684 22H4.63158C3.1782 22 2 20.8218 2 19.3684V4.63158Z" fill="black"></path>
                                <path d="M10.9256 11.1882C10.5351 10.7977 10.5351 10.1645 10.9256 9.77397L18.0669 2.6327C18.8479 1.85165 20.1143 1.85165 20.8953 2.6327L21.3665 3.10391C22.1476 3.88496 22.1476 5.15129 21.3665 5.93234L14.2252 13.0736C13.8347 13.4641 13.2016 13.4641 12.811 13.0736L10.9256 11.1882Z" fill="black"></path><path d="M8.82343 12.0064L8.08852 14.3348C7.8655 15.0414 8.46151 15.7366 9.19388 15.6242L11.8974 15.2092C12.4642 15.1222 12.6916 14.4278 12.2861 14.0223L9.98595 11.7221C9.61452 11.3507 8.98154 11.5055 8.82343 12.0064Z" fill="black"></path>
                                </svg></span>
                          </button>

                            <a  title="Xóa Hồ Sơ" href="javascript:;" onclick='removeItem("${data.id_device}");' class="btn btn-icon btn-active-light-danger btn-sm"><span class="svg-icon svg-icon-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="black"/>
                            <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="black"/>
                            <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="black"/>
                            </svg></span>
                            </a>`;
                    }
                }
            ],
            scrollCollapse: true,
            fixedColumns: {
                left: 2,
                right: 1
            },
         /*   order: [[0, 'asc']],*/
            lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "All"]],
            buttons: ["copy", "excel", "pdf"],
            initComplete: function () {
                $('#Table_Device').DataTable().buttons().container().appendTo("#dt_tools");
            }
        });

       /* table = dt.$;*/
    }

    var HandleSearchDatatable = function () {
        $('#input_search').keyup(function (e) {
            $('#Table_Device').DataTable().search(e.target.value).draw();
        });
    };
    //upload file excel
    var handleUpload = function () {
        const uploadBtn = $('#btn_modal_add_excel');
        uploadBtn.click(function (e) {
            $('#upl-product-list-modal').modal('show');
        });
    }


    //Get data
    var handleGetData = function () {
        var oTable = $('#Table_Device').DataTable();
        let getDataBtn = $("#search-btn");
        getDataBtn.click(function (e) {

            getDataBtn.attr("data-kt-indicator", "on");
            getDataBtn.prop("disabled", true);

            if (intialTable) {
                dt.ajax.url({
                    url: "../Device/GetDevice",
                    type: "POST",
                    data: function (d) {
                        d.ip_address = $('#inp_ip_address').val();
                        d.name_device = $('#inp_name_device').val();

                    },
                    //columnDefs: [],
                    dataSrc: "",
                    dataFilter: function (response) {
                        // this to see what exactly is being sent back
                        console.log(response);
                        return response
                    },
                    error: function (error) {
                        // to see what the error is
                        //console.log(error);
                        ToastrAlertTopRight("error", error);

                        getDataBtn.attr("data-kt-indicator", "off");
                        getDataBtn.prop("disabled", false);
                    }
                }).load(function () {
                    getDataBtn.attr("data-kt-indicator", "off");
                    getDataBtn.prop("disabled", false);
                });

                intialTable = false;
            } else {
                dt.ajax.reload(function () {
                    getDataBtn.attr("data-kt-indicator", "off");
                    getDataBtn.prop("disabled", false);
                });
            }
            dt.buttons().container().appendTo("#dt_tools_detail");
  

        });
    }


    return {
        init: function () {
            initDatatable();
            HandleSearchDatatable();
            InsertNewPartInfo();
        /*    updateInfo();*/
            handleGetData();
            handleUpload();
            //Insert Preview
            Insert_Update();
        }
    }

}();

//On document loaded
KTUtil.onDOMContentLoaded(function () {
    DataTable.init();


    var dropzoneInit = new Dropzone("#kt_file_upload_pl", {
        url: "../Device/UploadDeviceExcel", // Set the url for your upload script location
        paramName: "file", // The name that will be used to transfer the file
        maxFiles: 1,
        maxFilesize: 10, // MB
        autoQueue: false,
        addRemoveLinks: true,
        accept: function (file, done) {
            if (file.name == "wow.jpg") {
                done("Naha, you don't.");
            } else {
            }
                done();
        },
        success: function (result) {
            const rs = JSON.parse(result.xhr.response);

            $("#btn_insert").attr("data-kt-indicator", "off");
            $("#btn_insert").prop("disabled", false);

            SweetAlert(rs.type, rs.message);

            if (rs.type == "success") {
                $('#upl-product-list-modal').modal('hide');
                Dropzone.forElement('#kt_file_upload_pl').removeAllFiles(true);
            }
            //    $('#table_product').DataTable().ajax.reload();
        },


    });
    $("#btn_insert").click(function () {
        var $this = $(this);
        dropzoneInit.enqueueFiles(dropzoneInit.getFilesWithStatus(Dropzone.ADDED));
        $this.attr("data-kt-indicator", "on");
        $this.prop("disabled", true);
    });


})

//SHOW MODAL INSERT
var showModalInsert = function () {
    $('#kt-modal-insert').modal('show');

    $('#inp_IP_insert').val('');
    $('#inp_device_insert').val('');
    $('#inp_location_insert').val('');


}
//Close Model Insert
var closeInsertModal = function () {
    $('#kt-modal-insert').modal('hide');
}
//Insert device
var InsertNewPartInfo = function () {
    $('#btn-insert').click(function () {
        let IP_address = $('#inp_IP_insert').val();
        let Name_device = $('#inp_device_insert').val();
        let Location = $('#inp_location_insert').val();

        if (IP_address == "") {
            SweetAlert("error", "Hãy nhập địa chỉ IP")
        }
        //else if (Name_device == "") {
        //    SweetAlert("error", "Hãy nhập tên thiết bị")

        //}
        else {
            $.ajax({
                type: "POST",
                data: {
                    ip_address: IP_address, 
                    name_device: Name_device,                
                    location: Location

                },
                url: "../Device/InsertDevice",
                success: function (response) {
                    SweetAlert(response.type, response.message);
                    $('#kt-modal-insert').modal('hide');
                    SweetAlert(response.type, response.message)
                    $('#Table_Device').DataTable().ajax.reload();
                },
                failure: function (response) {
                    console.log(response);
                },
                error: function (response) {
                    console.log(response);
                }
            });
            closeInsertModal();
        }
    });

}

//Insert Playlist

var Insert_Update = function () {

    const insert_update = document.getElementById('btn-update');
    insert_update.addEventListener('click', function () {
        Update();

       /* Insert();*/
    })

}
//function Insert() {
//    let IP_address = $('#inp_IP_preview').val()
//    let URL = $('#select_playlist_preview').val()


//    $.ajax({
//        type: "POST",
//        data: {
//            ip_address: IP_address,
//            url: URL

//        },
//        url: "../Device/InsertLink",
//        success: function (response) {
//            SweetAlert(response.type, response.message);
//            $('#kt-modal-insert').modal('hide');
//            SweetAlert(response.type, response.message)
//           /* $('#Table_Device').DataTable().ajax.reload();*/
//        },
//        failure: function (response) {
//            console.log(response);
//        },
//        error: function (response) {
//            console.log(response);
//        }
//    });
//    closePreviewModal();

//}
function Update() {

 /*   let ID_device = $('#id_edit').text();*/
    let IP_address = $('#inp_IP_edit').text();
    let Name_device = $('#inp_device_edit').val();
    let Location = $('#inp_location_edit').val();
    let Status = $('#inp_status_edit').val();
    let Url_PlayList = $('#select_playlist_edit').val()
   
    $.ajax({
        type: "PUT",
        data: {
           /* id_device: ID_device,*/
            ip_address: IP_address,
            name_device: Name_device,
            location: Location,
            url_playlist: Url_PlayList,
            status: Status,



        },
        url: "../Device/UpdateDevice",
        success: function (response) {
            SweetAlert(response.type, response.message);
            $('#kt-modal-edit').modal('hide');
            SweetAlert(response.type, response.message);

            $("#Table_Device").DataTable().ajax.reload();
        },
        failure: function (response) {
            console.log(response);
        },
        error: function (response) {
            console.log(response);
        }
    });
    closeEditModal();
}   


var closeEditModal = function () {
    $('#kt-modal-edit').modal('hide');

}


//ShowModalEdit
var ShowModalEdit = function (IP_address, Name_device, Location, Url_PlayList, Status) {
    $('#kt-modal-edit').modal('show');
    //document.getElementById("id_edit").innerHTML = ID_device;
    document.getElementById("inp_IP_edit").innerHTML = IP_address;
   /* document.getElementById("inp_location_edit").innerHTML = Location;*/

    /* document.getElementById("inp_IP_edit").disabled = true;*/
   /* $('#inp_IP_edit').val((IP_address == "null") ? "" : IP_address);*/
   
    $('#inp_device_edit').val((Name_device == "null") ? "" : Name_device);
    $('#inp_location_edit').val((Location == "null") ? "" : Location);

    $('#select_playlist_edit').select2().val(Url_PlayList).change();
    $('#select2-option').val();

    /* $('#inp_status_edit').val((Status == "null") ? "" : Status);*/
    //$('#inp_status_edit:checked').filter('[value="false"]').attr('checked', Status)
    //document.getElementById("inp_status_edit").checked = Status
    /*    $("#inp_status_edit").prop("checked", Status);*/
    if (Status == "false") {
        $("#inp_status_edit").attr('checked', false);
    } else {
        $("#inp_status_edit").attr('checked', true);
    }


     /*$("#inp_status_edit").filter('[value="' + Status + '"]').prop('checked', true);*/
  
    $("#inp_status_edit").on('change', function () {
        if ($(this).is(':checked')) {
            $(this).attr('value', 'true');
        } else {
            $(this).attr('value', 'false');
        }
    })

}



// Delete
var removeItem = function (ID_device) {
    Swal.fire({
        title: "Xác nhận xoá",
        text: "Bạn có chắc chắn muốn xóa thiết bị này  ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xác nhận'
    }).then((result) => {

        if (result.isConfirmed) {
            $.ajax({
                type: "DELETE",
                data: {
                       id_device: ID_device
/*                    ip_address: IP_address*/

                },

                url: "../Device/DeleteDevice",
                success: function (response) {
                    ToastrAlertTopRight(response.type, response.message);
                    if (response.type == "success") {
                        $('#Table_Device').DataTable().ajax.reload();
                    }
                },
                failure: function (response) {
                    console.log(response);
                },
                error: function (response) {
                    console.log(response);
                }
            });
        }
    })
}
