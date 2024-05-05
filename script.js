var ratio = window.devicePixelRatio;
var gamePause = false;

function changeRes() {
    var width = window.screen.availWidth;
    const canvas = document.getElementById("defaultCanvas0");
    canvas.focus();
    canvas.style.width = String(width - 100) + "px";
    canvas.style.height = String((width - 100) / 2) + "px";
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