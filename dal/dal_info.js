var corsURL = 'https://cors-anywhere.herokuapp.com/';
var dataUrl = 'https://script.google.com/macros/s/AKfycbzjahmcJGC2P61gIWSRfezHS_PfM-lYZQDeyGrpUYrDs_CuE00oFajoo8PvvK8Z2dQ/exec';
let tempdata = "";
$.ajax({
    url: corsURL + dataUrl,
    method: 'GET',
    dataType: 'json',
    data: '',
    async: true,　

    success: res =>{
        console.log(res)

        tempdata = res.data.temperature;
        humiditydata = res.data.humidity;
        pm10pdata = res.data.pm10;
        pm25data = res.data.pm25;

        const temp = document.querySelector('.temperature');
        const hum = document.querySelector('.humidity');
        const pm10 = document.querySelector('.pm10');
        const pm25 = document.querySelector('.pm25');

        temp.innerHTML = `<div class="temperature">${tempdata}</div>`;
        hum.innerHTML = `<div class="humidity">${humiditydata}</div>`;
        pm10.innerHTML = `<div class="pm10">${pm10pdata}</div>`;
        pm25.innerHTML = `<div class="pm25">${pm25data}</div>`;
    },
    error: err =>{
        console.log(err)
    },
});