var url = "https://webduino.io/device/10QGMYby";

var time = 100;
var timeout = false;
var request = new XMLHttpRequest();
var timer = setTimeout(function () {
    timeout = true;
    request.abort();
}, time);

request.open("GET", url);
request.onreadystatechange = function () {
    if (request.status === 200) {
        console.log(request.responseText);
    }
};

request.send(null);
