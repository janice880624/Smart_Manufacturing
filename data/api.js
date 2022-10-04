let url = "https://script.google.com/macros/s/AKfycbzXo5mlWfBCJJfiFpH7K_9W920Ab_0H11NA_VcDgFKbpSGKIo_aJgzvHkMixX53udiAEg/exec";

function makeRequest() {
    xhr = new XMLHttpRequest();
    xhr.onload = function() {
        let response = JSON.parse(this.response);
        console.log(response)
    };
    xhr.open("GET", url, true);

    xhr.send();
}
makeRequest();