var listItems = null;
var Elements = null;
var Resp = null;
window.onload = () => {
    var header = document.getElementById("vidoesTitle");
    let loading = document.getElementsByClassName('loading')[0];
    loading.style.display = 'block';
    eel.getMyData()((resp) => {
        Resp = resp
        if (header != null) {
            listItems = resp;
            loading.style.display = 'none';
            buildVideoTitle(resp, resp.length);
        }
    });
}
function updateAllDescription(desc) {
    if (listItems != null) {
        let titles = document.getElementsByClassName('active');
        console.log(titles)
        _updateSingledesc(titles, 0,desc)
    }
}

current = null;
i = 0;
p = null
function _updateSingledesc(elements, index, desc) {
    Elements = elements;
    let Loading = (elements[index] == null || elements[index] == undefined) ? undefined : elements[index].nextElementSibling;
    if (Loading != null || Loading != undefined) Loading.style.display = 'block';
    
    if (index != elements.length && Loading != undefined || Loading != null){
         obj = {
            "id":elements[index].parentNode.id,
            "description":desc
        }
        eel.updateAllvideos(obj)((resp)=>{
            if(resp!=null){
                Loading.style.display = 'none';
                _updateSingledesc(elements, index + 1,desc)
            }
        });
    }else if(index == elements.length){
        if (selectAllcb.checked) {
            selectAllcb.checked = false;
            _selectAll = false;
            NothingSelected()

            var header = document.getElementById("vidoesTitle");
            let loading = document.getElementsByClassName('loading')[0];
            
            let c = document.getElementById('vidoesTitle');
            if(c.childElementCount > 1) for(var i = 0; i < Resp.length; i++) c.removeChild(document.getElementsByClassName('videoTitle')[0])
    
            loading.style.display = 'block';
            eel.getMyData()((resp) => {
                if (header != null) {
                    listItems = resp;
                    loading.style.display = 'none';
                    buildVideoTitle(resp, resp.length);
                }
            });
        }
        return;
    }
}

function updateSingleDesc(element, desc) {
    let ele = element;
    let Loading = ele.nextElementSibling;
    Loading.style.display = 'block';
    
    obj = {
        "id":element.parentNode.id,
        "description":desc
    }

    eel.updateDesc(obj)(
        (response)=>{
            Loading.style.display = 'none';
            NothingSelected()

            var header = document.getElementById("vidoesTitle");
            let loading = document.getElementsByClassName('loading')[0];
            
            let c = document.getElementById('vidoesTitle');
            if(c.childElementCount > 1) for(var i = 0; i < Resp.length; i++) c.removeChild(document.getElementsByClassName('videoTitle')[0])
    
            loading.style.display = 'block';
            eel.getMyData()((resp) => {
                if (header != null) {
                    listItems = resp;
                    loading.style.display = 'none';
                    console.log(response['id'],response['snippet']['description']);
                    buildVideoTitle(resp, resp.length);
                    aa = document.getElementById(response['id']);
                    updateDesc(aa,response['snippet']['title'],response['snippet']['description'])
                }
            });
        });
}

        
