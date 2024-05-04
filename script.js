var ratio = window.devicePixelRatio;

function changeRes() {
  var height = window.screen.availHeight;
  var width = window.screen.availWidth;
  const display = document.getElementById("display");
  display.innerHTML = height + " " + width;
  const canvas = document.getElementById("defaultCanvas0");
  canvas.style.width = String(width - 40) + "px";
  canvas.style.height = String((width - 40) / 2) + "px";
}
