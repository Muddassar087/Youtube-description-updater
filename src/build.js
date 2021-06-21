// this is to build elements
function buildVideoTitle(list, len) {
    let vtitle = document.getElementById("vidoesTitle");

    for (var i = 0; i < len; i++) {
        var _videoTitlle = `<h2 class="videoTitle" id='${list[i]['id']}'>
                                <span id='${list[i]['id']}' 
                                onclick="updateDesc(this,'${list[i]['title']}',`+`'${list[i]['description']}')"> ${list[i]['title'].substr(0, 27) + ".."} </span> 
                                <div class="descriptionloading" style="   
                                font-weight: bold;
                                cursor: pointer;
                                color: #1270cf;
                                display: none;
                                margin: 0px;
                                font-family: Roboto, sans-serif;
                                padding: 0px;
                                border-width: 2px;
                                border-style: solid;
                                border-color: rgb(255, 255, 255) rgb(52, 152, 219) rgb(52, 152, 219);
                                border-image: initial;
                                border-radius: 50%;
                                width: 22px;
                                height: 22px;
                                animation: 1.1s linear 0s infinite normal none running spin;
                                position: relative;
                                float: right;
                                    ">
                                </div>
                                <span>
                                    <a href="#" class="copy" onclick="showNotf('${list[i]['id']}')">copy link</a>
                                </span>
                            </h2>`;
        vtitle.innerHTML += _videoTitlle;
    }
}
function buildNotification(link) {
    let ntext = document.getElementById('nttext');
    ntext.innerText = link;

    let inp = document.createElement('input');
    document.getElementsByTagName('div')[0].appendChild(inp);
    inp.value = link;
    inp.select();
    document.execCommand("copy");
    inp.remove();
}
