var ratio = window.devicePixelRatio;
var gamePause = false;

function changeRes() {
    var width = window.screen.availWidth;
    const canvas = document.getElementById("defaultCanvas0");
    canvas.focus();
    canvas.style.width = String(width - 40) + "px";
    canvas.style.height = String((width - 40) / 2) + "px";
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