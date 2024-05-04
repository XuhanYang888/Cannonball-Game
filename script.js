var ratio = window.devicePixelRatio;

function changeRes() {
    const canvas = document.getElementById("defaultCanvas0");
    canvas.style.width = String(Math.floor(1600 / ratio)) + "px";
    canvas.style.height = String(Math.floor(900 / ratio)) + "px";
}

function update() {
    var height = window.screen.availHeight;
    var width = window.screen.availWidth;
    const display = document.getElementById("display");
    display.innerHTML = height + " " + width;
}