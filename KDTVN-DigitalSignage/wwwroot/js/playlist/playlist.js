//GET Playlist

var DataTable = function () {
    var dt;
    let intialTable = true;
    var initDatatable = function () {
        dt = $("#Table_PlayList").DataTable({

            searchDelay: 500,
            processing: true,
            searching: true,
            order: [[3, 'asc']],
            //ajax: {
            //    url: "../Device/GetDevice",
            //    type: "POST",
            //    data: "",
            //    dataSrc: "",

            //},
            ajax: null, 
            columns: [
                { data: "id_playlist" },
                { data: "name_playlist" },
                { data: "name_content" },             
                { data: "url" },
              /*  { data: "status" },*/
                { data: "create_by" },
                { data: "create_at" },

                {
                    data: {
                        Id_playlist: "id_playlist",
                        Name_playlist: "name_playlist",
                        Name_content: "name_content",                      
                        Url: "url",
                      /*  Status: "status",*/
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
                    targets: [5],
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
                           <button onclick="ShowModalEdit('${data.id_playlist
                            }','${data.name_playlist
                            }','${data.name_content
                            }','${data.url
                           /* }','${data.status*/
                            //}','${data.last_modify_by 
                            //}','${data.last_modify_at

                            }');"

                                title="Cập nhật Hồ Sơ"
                                class="btn btn-icon btn-active-light-danger btn-sm">
                                <span class="svg-icon svg-icon-muted svg-icon-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M2 4.63158C2 3.1782 3.1782 2 4.63158 2H13.47C14.0155 2 14.278 2.66919 13.8778 3.04006L12.4556 4.35821C11.9009 4.87228 11.1726 5.15789 10.4163 5.15789H7.1579C6.05333 5.15789 5.15789 6.05333 5.15789 7.1579V16.8421C5.15789 17.9467 6.05333 18.8421 7.1579 18.8421H16.8421C17.9467 18.8421 18.8421 17.9467 18.8421 16.8421V13.7518C18.8421 12.927 19.1817 12.1387 19.7809 11.572L20.9878 10.4308C21.3703 10.0691 22 10.3403 22 10.8668V19.3684C22 20.8218 20.8218 22 19.3684 22H4.63158C3.1782 22 2 20.8218 2 19.3684V4.63158Z" fill="black"></path>
                                <path d="M10.9256 11.1882C10.5351 10.7977 10.5351 10.1645 10.9256 9.77397L18.0669 2.6327C18.8479 1.85165 20.1143 1.85165 20.8953 2.6327L21.3665 3.10391C22.1476 3.88496 22.1476 5.15129 21.3665 5.93234L14.2252 13.0736C13.8347 13.4641 13.2016 13.4641 12.811 13.0736L10.9256 11.1882Z" fill="black"></path><path d="M8.82343 12.0064L8.08852 14.3348C7.8655 15.0414 8.46151 15.7366 9.19388 15.6242L11.8974 15.2092C12.4642 15.1222 12.6916 14.4278 12.2861 14.0223L9.98595 11.7221C9.61452 11.3507 8.98154 11.5055 8.82343 12.0064Z" fill="black"></path>
                                </svg></span>
                            </button>
                            <a  title="Xóa Hồ Sơ" id="remove_id" href="javascript:;" onclick='removeItem("${data.id_playlist}", "${data.url}");' class="btn btn-icon btn-active-light-danger btn-sm"><span class="svg-icon svg-icon-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
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
            order: [[0, 'asc']],
            lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "All"]],
            buttons: ["copy", "excel", "pdf", "colvis"]
        });

       /* table = dt.$;*/
    }

    var HandleSearchDatatable = function () {
        $('#input_search').keyup(function (e) {
            $('#Table_PlayList').DataTable().search(e.target.value).draw();
        });
    };


    //Get data
    var handleGetData = function () {
        var oTable = $('#Table_PlayList').DataTable();
        let getDataBtn = $("#search-btn");
        //switch checkbox
        //$("#inp_status").on('change', function () {
        //    if ($(this).is(':checked')) {
        //        $(this).attr('value', 'true');
        //    } else {
        //        $(this).attr('value', 'false');
        //    }
        //})


        getDataBtn.click(function (e) {

            getDataBtn.attr("data-kt-indicator", "on");
            getDataBtn.prop("disabled", true);

            if (intialTable) {
                dt.ajax.url({
                    url: "../PlayList/GetPlayList",
                    type: "POST",
                    data: function (d) {
                      
                        d.name_playlist = $('#inp_name_playlist').val();
                        d.name_content = $('#inp_name_content').val();
                     /*   d.status = $('#inp_status').val();*/

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
            updateInfo();
            handleGetData();
         
        }
    }

}();

//On document loaded
KTUtil.onDOMContentLoaded(function () {
    DataTable.init();

})

//SHOW MODAL INSERT
var showModalInsert = function () {
    $('#kt-modal-insert').modal('show');
    //clear
    $('#inp_url_insert').val('');
    document.getElementById("uploadPreview_insert").style.display = "none";
    document.getElementById("id_video_insert").style.display = "";

    $('#inp_name_playlist_insert').val('');
    $('#inp_name_content_insert').val('');


}
//Close Model Insert
var closeInsertModal = function () {
    $('#kt-modal-insert').modal('hide');
}
//Insert
var InsertNewPartInfo = function () {
    const insertBtn = document.getElementById('btn-insert');
    insertBtn.addEventListener('click', function () {

        insert();

        insertfile();
    })
}
function insert() {
    let Name_playlist = $('#inp_name_playlist_insert').val();
    let Name_content = $('#inp_name_content_insert').val();
    let Url = $('#inp_url_insert').val().split(/(\\|\/)/g).pop();

    if (Name_playlist == "") {
        SweetAlert("error", "Hãy nhập tên bài phát")
    }
    else if (Name_content == "") {
        SweetAlert("error", "Hãy nhập tên thiết bị")

    }
    else {
        $.ajax({
            type: "POST",
            data: {
                name_playlist: Name_playlist,
                name_content: Name_content,
                url: Url,



            },
            url: "../PlayList/InsertPlayList",
            success: function (response) {
                //SweetAlert(response.type, response.message);
                $('#kt-modal-insert').modal('hide');
                SweetAlert(response.type, response.message)
                $('#Table_PlayList').DataTable().ajax.reload();
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

}

function insertfile() {
   
    var formdata = new FormData(); //FormData object
    var fileInput = document.getElementById('inp_url_insert');
    //Iterating through each files selected in fileInput
    for (i = 0; i < fileInput.files.length; i++) {
        //Appending each file to FormData object
        formdata.append(fileInput.files[i].name, fileInput.files[i]);
    }
    //Creating an XMLHttpRequest and sending
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../PlayList/UploadFile');
    xhr.send(formdata);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
    }
    return false;
}






//ShowModalEdit
var ShowModalEdit = function (ID_Playlist, Name_playlist, Name_content, Url, Status) {
    //clear
    $('#inp_url_edit').val('');
    document.getElementById("uploadPreview_edit").style.display = "none";
    document.getElementById("id_video_edit").style.display = "";

    $('#kt-modal-edit').modal('show');
    document.getElementById("id_edit_playlist").innerHTML = ID_Playlist;
    $('#inp_name_playlist_edit').val((Name_playlist == "null") ? "" : Name_playlist);
    $('#inp_name_content_edit').val((Name_content == "null") ? "" : Name_content);
   /* $('#inp_url_edit').val((Url == "null") ? "" : Url);*/
    //$('#inp_url_edit').val((Url == "null") ? "" : Url).split(/(\\|\/)/g).pop();
    // document.getElementById("inp_url_edit").files = Url;
   // document.getElementById("inp_url_edit").files[0] = Url;

    $('#select2-option').val();

    //$('#inp_status_edit').val((Status == "null") ? "" : Status);

    //$("#inp_status_edit").on('change', function () {
    //    if ($(this).is(':checked')) {
    //        $(this).attr('value', 'true');
    //    } else {
    //        $(this).attr('value', 'false');
    //    }
    //})

}

var closeEditModal = function () {
    $('#kt-modal-edit').modal('hide');

}

//Update

var updateInfo = function () {
    const updateBtn = document.getElementById('btn-update');
    updateBtn.addEventListener('click', function () {

        Update();

        UpdateFile();

    })
}
function Update() {
        let ID_playlist = $('#id_edit_playlist').text();
        let Name_playlist = $('#inp_name_playlist_edit').val();
        let Name_content = $('#inp_name_content_edit').val();
        let Url = $('#inp_url_edit').val().split(/(\\|\/)/g).pop();
        //let Status = $('#inp_status_edit').val();

        $.ajax({
            type: "POST",
            data: {
                id_playlist: ID_playlist,
                name_playlist: Name_playlist ,
                name_content: Name_content ,
                url: Url,
             /*   status: Status*/



            },
            url: "../PlayList/UpdatePlayList",
            success: function (response) { 
                $('#kt-modal-edit').modal('hide');
                SweetAlert(response.type, response.message);

                $("#Table_PlayList").DataTable().ajax.reload();
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

function UpdateFile() {
    var formdata = new FormData(); //FormData object
    var fileInput = document.getElementById('inp_url_edit');
    //Iterating through each files selected in fileInput
    for (i = 0; i < fileInput.files.length; i++) {
        //Appending each file to FormData object
        formdata.append(fileInput.files[i].name, fileInput.files[i]);
    }
    //Creating an XMLHttpRequest and sending
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../PlayList/UploadFile');
    xhr.send(formdata);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
    }
    return false;

   
}   


//Preview-Edit
$("#inp_url_edit").change(function () {
             var get_url = $('#inp_url_edit').val().split(/(\\|\/)/g).pop()
             var get_url1 = get_url.split('.').pop()
            if (get_url1 === 'jpg' || get_url1 === 'png') {
              //hình ảnh

                var oFReader = new FileReader();
                oFReader.readAsDataURL(document.getElementById("inp_url_edit").files[0]);

                oFReader.onload = function (oFREvent) {
                    document.getElementById("uploadPreview_edit").src = oFREvent.target.result;
                };
                document.getElementById("id_video_edit").style.display = "none";
                document.getElementById("uploadPreview_edit").style.display = "";
            }
            else {
                let file = event.target.files[0];
                let blobURL = URL.createObjectURL(file);
                document.querySelector("#video_edit").style.display = 'block';
                document.querySelector("#video_edit").src = blobURL;
                //remove picture
                document.getElementById("uploadPreview_edit").style.display = "none";
                document.getElementById("id_video_edit").style.display = "";
            }
 })
//Preview-Edit
$("#inp_url_insert").change(function () {
    var get_url = $('#inp_url_insert').val().split(/(\\|\/)/g).pop()
    var get_url1 = get_url.split('.').pop()
    if (get_url1 === 'jpg' || get_url1 === 'png') {
        //hình ảnh

        var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById("inp_url_insert").files[0]);

        oFReader.onload = function (oFREvent) {
            document.getElementById("uploadPreview_insert").src = oFREvent.target.result;
        };
        document.getElementById("id_video_insert").style.display = "none";
        document.getElementById("uploadPreview_insert").style.display = "";
    }
    else {
        let file = event.target.files[0];
        let blobURL = URL.createObjectURL(file);
        document.querySelector("#video_insert").style.display = 'block';
        document.querySelector("#video_insert").src = blobURL;
        //remove picture
        document.getElementById("uploadPreview_insert").style.display = "none";
        document.getElementById("id_video_insert").style.display = "";
    }
})



//document.getElementById("inp_url_edit").onchange = function (event) {
//    let file = event.target.files[0];
//    let blobURL = URL.createObjectURL(file);
//    document.querySelector("video").style.display = 'block';
//    document.querySelector("video").src = blobURL;


//}


//ShowModalPreview = function (ID_device, ID_playlist) {
//    $('#kt-modal-preview').modal('show');
//    document.getElementById("id_preview_playlist").innerHTML = ID_Playlist;


//    $('#inp_name_playlist_preview').val((Name_playlist == "null") ? "" : Name_playlist);
//    $('#inp_name_content_preview').val((Name_content == "null") ? "" : Name_content);
//    $('#inp_url_preview').val((Url == "null") ? "" : Url);

//    $('#inp_type_preview').select2().val(Type).change();
//    $('#select2-option').val();

//    $('#inp_status_preview').val((Status == "null") ? "" : Status);

//    $("#inp_status_preview").on('change', function () {
//        if ($(this).is(':checked')) {
//            $(this).attr('value', 'true');
//        } else {
//            $(this).attr('value', 'false');
//        }
//    })

//}





// Delete
var removeItem = function (ID_playlist,URL) {
  
    Swal.fire({
        title: "Xác nhận xoá",
        text: "Bạn có chắc chắn muốn xóa thiết bị này  ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xác nhận'
    }).then((result) => {
        /*let URL = $("#remove_id").attr("data_url");*/
        if (result.isConfirmed) {
            $.ajax({
                type: "DELETE",
                data: {
                    id_playlist: ID_playlist

                },

                url: "../PlayList/DeletePlayList",
                success: function (response) {
                    ToastrAlertTopRight(response.type, response.message);
                    if (response.type == "success") {
                        $('#Table_PlayList').DataTable().ajax.reload();
                    }
                },
                failure: function (response) {
                    console.log(response);
                },
                error: function (response) {
                    console.log(response);
                }
            });

        
            $.ajax({
                type: "DELETE",
                data: {
                    id_playlist: ID_playlist,
                    url: URL

                },

                url: "../PlayList/DeleteFile",
                success: function (response) {
                    ToastrAlertTopRight(response.type, response.message);
                    if (response.type == "success") {
                        /*$('#Table_PlayList').DataTable().ajax.reload();*/
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
