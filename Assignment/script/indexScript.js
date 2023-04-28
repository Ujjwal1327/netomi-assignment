document.getElementById("dataFromIframe").style.visibility = "hidden";
window.addEventListener("message", function (event) {
  document.getElementById("dataFromIframe").style.visibility = "visible";
  document.getElementById("dataFromIframe").innerHTML = "Result:" + event.data;
});
