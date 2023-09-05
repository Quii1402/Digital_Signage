var Link = function () {

    var InitDataTable = function () {
        $.ajax(
            {
                type: "POST",
                url: "../Device/GetDevice", 
                data: {
                    ip_address: $('#ip_get_url')[0].innerText,
                   
                },
                
                success: function (data) {
                    console.log(data[0].url_playlist)
                    var get_url = (data[0].url_playlist).split('.').pop()
                    console.log(get_url)
                    console.log(data[0].status)
                    var contain = $('#contain-link')[0]
                    if (data[0].status == true) {
                        if (get_url === 'jpg' || get_url === 'png') {
                            var html = data.map((item) => {
                                return `
                                            <img id="image" src="../imgs/${item.url_playlist}" class="d-block" alt="..." style="
                                                top: 0; left: 0; right: 0; bottom: 0; margin: auto; min-width: 50%;min-height: 50%;
                                            "/>
                                        `
                            })

                            contain.innerHTML = `

                            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" style="
                                    ">
                         
                              <div class="carousel-inner">
                                <div class="carousel-item active" style=" position: fixed; top: -50%; left: -50%; width: 200%; height: 200%;">
                                  ${html[0]}
                                 </div>
                        
                              </div> 
                            </div>
                           `
                        }

                        else {
                            contain.innerHTML = `<video id="video" muted controls loop preload="auto" style="width:100vw; height:100vh;  object-fit: cover; position: absolute;">
                                                    <source id="link" src="" type="video/mp4" autoplay="true"
                                                                                  >
                                                </video>`
                            var link = $('#link')[0]
                            link.setAttribute('src', `../imgs/${data[0].url_playlist}`)
                            var video = document.getElementById('video');
                            video.load();
                            video.play();
                        }
                    } else {
                        alert('trạng thái thiết bị đã bị tắt')
                    }
                       
                },
                    error: function (error) {
                        ToastrAlertTopRight("error", error);
                        alert(' thất bại')
                    }
                });
         return true;
  
    };
    return {
        init: function () {
            let result = InitDataTable();
            if (result) {
                setInterval(InitDataTable, 50000)
            }

        }
    }

}();


KTUtil.onDOMContentLoaded((function () {
    Link.init();
}));

//$(document).ready(function () {
//    // Tạo một RTCPeerConnection object
//    const peerConnection = new RTCPeerConnection();

//    // Thêm một track vào connection
//    const fakeVideoTrack = peerConnection.addTransceiver('video').receiver.track;

//    // Lắng nghe sự kiện onicecandidate để thu thập địa chỉ IP
//    peerConnection.onicecandidate = (event) => {
//        if (event.candidate) {
//            const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
//            const match = ipRegex.exec(event.candidate.candidate);
//            if (match) {
//                const ipAddress = match[1];
//                console.log('Địa chỉ IP:', ipAddress);
//                // Gửi địa chỉ IP lên máy chủ nếu cần
//            }
//        }
//    };

//    // Bắt đầu quá trình truyền nhận để kích hoạt sự kiện onicecandidate
//    peerConnection.createOffer()
//        .then(offer => peerConnection.setLocalDescription(offer))
//        .catch(error => console.error(error));

//});