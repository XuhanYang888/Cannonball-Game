var gamePause = false;
var level = localStorage.getItem("lvl");
if (!level) {
    level = 1;
    localStorage.setItem("lvl", 1);
}

function changeRes() {
    var width = window.screen.availWidth;
    const canvas = document.getElementById("defaultCanvas0");
    const title = document.getElementById("title");
    canvas.style.width = String(width - 100) + "px";
    canvas.style.height = String((width - 100) / 2) + "px";
    title.focus();
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


