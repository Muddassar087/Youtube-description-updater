const DropDownText = document.getElementById('dropdown-text');
const selectAllcb = document.getElementById('selectAll')
const mainWindow = document.getElementById('mainWin')
const desc = document.getElementById('desc')
const loading = document.getElementsByClassName('loading');
const dtitle = document.getElementById('dtitle');
const ntPanel = document.getElementById('ntPanel')
const descA= document.getElementById("descriptionArea")

_selectAll = false;

function toggle(id) {
    let contentToToggle = document.getElementById(id);

    if (contentToToggle.style.display === "none") {
        contentToToggle.style.display = "block";
    } else {
        contentToToggle.style.display = "none";
    }
}

function NothingSelected() {
    document.getElementById('ns').style.display = 'block';
    loading[1].style.display = 'none'
    desc.style.display = 'none';
}


function AddDataWithDelay(text, descr) {
    document.getElementById('ns').style.display = 'none';
    desc.style.display = 'none';
    loading[1].style.display = 'block';
    dtitle.innerText = text;
    descA.value = descr.replaceAll('&','\n').replaceAll("~","'").replaceAll('#','"');
    setTimeout(() => {
        desc.style.display = 'block';
        loading[1].style.display = 'none';
    }, 500);
}

function logout() {
    toggle('logoutPanel');
    eel.deleteClient();
    window.location = './index.html';
}

function selectAllVideos() {
    const titles = document.getElementsByClassName('videoTitle');
    if (selectAllcb.checked) {
        for (var title = 0; title < titles.length; title++) {
            titles[title].firstElementChild.classList.add('active');
        }
        _selectAll = true;
        AddDataWithDelay("All vidoes has been selected", '')
    }

    if (!selectAllcb.checked) {
        _selectAll = false;
        for (var title = 0; title < titles.length; title++){
            titles[title].firstElementChild.classList.remove('active')}
        NothingSelected()
    }
    setTimeout(() => {
        toggle('dropdown-content')
    }, 300);
}

function updateDesc(element, title, desc) {
    var header = document.getElementById("vidoesTitle");
    var btns = header.getElementsByClassName("videoTitle");
    for (var i = 0; i < btns.length; i++) {
        var current = document.getElementsByClassName("active");

        if (current != null && current.length > 0) {
            current[0].classList.remove('active');
        }
    }
    element.classList.add('active');
    AddDataWithDelay(title, desc);
}

function showNotf(link) {

    buildNotification("https://youtu.be/" + link)

    ntPanel.style.display = 'block';

    setTimeout(() => {
        ntPanel.style.display = 'none';
    }, 1000);
}

function authurizeUser() {
    let auth = document.getElementById('auth');
    auth.style.display = 'none';
    loading[0].style.display = 'block';

    // fetch data from python
    eel.loadClient()((resp)=>{
        console.log(resp)
        if(resp!=null){
            loading[0].style.display = 'none';
            window.location = './Main.html'
        }
    });
}

document.getElementById("updateAllBtn").onclick = () => {
    if (_selectAll) {
        updateAllDescription(descA.value)
    } else {
        let active = document.getElementsByClassName('active')[0];
        updateSingleDesc(active, descA.value)
    }
}