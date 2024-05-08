var ratio = window.devicePixelRatio;
var gamePause = false;
var level = 1;

function changeRes() {
    var width = window.screen.availWidth;
    const canvas = document.getElementById("defaultCanvas0");
    const title = document.getElementById("title");
    canvas.style.width = String(width - 100) + "px";
    canvas.style.height = String((width - 100) / 2) + "px";
    title.focus();
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


