var ratio = window.devicePixelRatio;

function changeRes() {
    console.log("aa");
    var canvas = document.getElementById("defaultCanvas0");
    canvas.style.width = String(Math.floor(1600/ratio)) + "px";
    canvas.style.height = String(Math.floor(900/ratio)) + "px";
}