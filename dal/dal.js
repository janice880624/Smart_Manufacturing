var date;
var time;
var status_f;
var myFirebase2;
var val_1;
var val_2;
var val_3;
var val_4;
var val_5;
var val_6;
var val_7;
var tem;
var hum;
var pm25;
var pm10;
var tem_Firebase;
var hum_Firebase;
var pm25_Firebase;
var pm10_Firebase;

date = '';
myFirebase2 = new Firebase('https://dal-smart-manufacturing-default-rtdb.firebaseio.com/door');
myFirebase2.limitToLast(1).on('child_added', function (snapshot) {
    val_1 = snapshot.val().date;
    document.getElementById('firebase-date-show').innerHTML = val_1;
    date = val_1;
});
myFirebase2.limitToLast(1).on('child_added', function (snapshot) {
    val_2 = snapshot.val().time;
    document.getElementById('firebase-time-show').innerHTML = val_2;
    time = val_2;
});
myFirebase2.limitToLast(1).on('child_added', function (snapshot) {
    val_3 = snapshot.val().status;
    document.getElementById('firebase-status-show').innerHTML = val_3;
    status_f = val_3;
});

tem_Firebase = new Firebase('https://dal-smart-manufacturing-default-rtdb.firebaseio.com/tem');
tem_Firebase.limitToLast(1).on('child_added', function (snapshot) {
    val_4 = snapshot.val().data;
    document.getElementById('firebase-tem-show').innerHTML = val_4;
    status_f = val_4;
});

hum_Firebase = new Firebase('https://dal-smart-manufacturing-default-rtdb.firebaseio.com/hum');
hum_Firebase.limitToLast(1).on('child_added', function (snapshot) {
    val_5 = snapshot.val().data;
    document.getElementById('firebase-hum-show').innerHTML = val_5;
    status_f = val_5;
});

pm25_Firebase = new Firebase('https://dal-smart-manufacturing-default-rtdb.firebaseio.com/pm25');
pm25_Firebase.limitToLast(1).on('child_added', function (snapshot) {
    val_6 = snapshot.val().data;
    document.getElementById('firebase-pm25-show').innerHTML = val_6;
    status_f = val_6;
});

pm10_Firebase = new Firebase('https://dal-smart-manufacturing-default-rtdb.firebaseio.com/pm10');
pm10_Firebase.limitToLast(1).on('child_added', function (snapshot) {
    val_7 = snapshot.val().data;
    document.getElementById('firebase-pm10-show').innerHTML = val_7;
    status_f = val_7;
});

// DAL 門震動訊號
let y_value = 0;
let url = "https://script.google.com/macros/s/AKfycbxg7-ZyPi1iudEVDJ7gqQIvOmXALMHeMhiUh1XyRHLHnceQh7rWd5C7SUnJSMcIK8JO7w/exec";

function makeRequest() {
    xhr = new XMLHttpRequest();
    xhr.onload = function() {
        let response = JSON.parse(this.response);
        y_value = response
        console.log(response)
    };
    xhr.open("GET", url, true);

    xhr.send();
}
makeRequest();

setInterval(function () {
    makeRequest();
}, 1000);

$(document).ready(function() {  
    var chart = {
        type: 'spline',
        animation: Highcharts.svg,
        marginRight: 10,
        events: {
            load: function () {
                var series = this.series[0];
                setInterval(function () {
                var x = (new Date()).getTime(), 
                y = y_value;
                series.addPoint([x, y], true, true);
                }, 1000);
            }
        }
    };
    var title = {
        text: 'Live random data'   
    };   
    var xAxis = {
        type: 'datetime',
        tickPixelInterval: 150
    };
    var yAxis = {
        title: {
            text: 'Value'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    };
    var tooltip = {
        formatter: function () {
        return '<b>' + this.series.name + '</b><br/>' +
            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
            Highcharts.numberFormat(this.y, 2);
        }
    };
    var plotOptions = {
        area: {
            pointStart: 1940,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                hover: {
                    enabled: true
                }
                }
            }
        }
    };
    var legend = {
        enabled: false
    };
    var exporting = {
        enabled: false
    };
    var series= [{
        name: 'Random data',
        data: (function () {
            // generate an array of random data
            var data = [],time = (new Date()).getTime(),i;
            for (i = -19; i <= 0; i += 1) {
                data.push({
                    x: time + i * 2000,
                    y: Math.random(0, 1.5)
                });
            }
            return data;
        }())    
    }];     
        
    var json = {};   
    json.chart = chart; 
    json.title = title;     
    json.tooltip = tooltip;
    json.xAxis = xAxis;
    json.yAxis = yAxis; 
    json.legend = legend;  
    json.exporting = exporting;   
    json.series = series;
    json.plotOptions = plotOptions;
    
    
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    $('#data_value').highcharts(json);
    
});