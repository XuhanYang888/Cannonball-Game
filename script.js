var gamePause = false;
var level = localStorage.getItem("lvl");
if (!level) {
    level = 1;
    localStorage.setItem("lvl", 1);
}

function changeRes() {
    var width = window.screen.availWidth;
    const canvas = document.getElementById("defaultCanvas0");
    const body = document.getElementById("body");
    var roundedWidth = width * 0.85;
    canvas.style.width = String(roundedWidth) + "px";
    canvas.style.height = String(roundedWidth / 2) + "px";
    var margin = (width - roundedWidth) / 2;
    body.style.marginLeft = String(margin) + "px";
    body.style.marginRight = String(margin) + "px";
    document.getElementById("levelIndicator").innerHTML = "Level: " + String(level);
}

function levelChange(newLevel) {
    localStorage.setItem("lvl", newLevel);
    window.location.reload();
}

function Pause() {
    const activeArea = document.activeElement;
    if (activeArea.id == "defaultCanvas0") {
        gamePause = false;
    } else {
        gamePause = true;
    }
}
window.addEventListener("click", Pause);


function showToast() {
    const toast = document.getElementById('toast');
    toast.style.display = 'block';
}
