// 震動訊號

let y_value = 0;
var firebaseConfig = {
    apiKey: "AIzaSyCWWeW13rvGx7_zPpm8E9-SpQMaW8OsVs0",
    authDomain: "test-project-97787.firebaseapp.com",
    databaseURL: "https://test-project-97787-default-rtdb.firebaseio.com",
    projectId: "test-project-97787",
    storageBucket: "test-project-97787.appspot.com",
    messagingSenderId: "779357488250",
    appId: "1:779357488250:web:e626239795aa6054b5e7c3",
    measurementId: "G-84NJGP3BPD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
console.log(database);

onValue(dbRef, snapshot => {
    console.log(snapshot.val());
});




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
        text: '機台震動情況'   
    };  

    var credits={
        enabled: false
    };
    


    var xAxis = {
        type: 'datetime',
        tickPixelInterval: 150
    };
    var yAxis = {
        title: {
            text: 'Z 軸數值'
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
    json.credits = credits; 
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

    $('#container').highcharts(json);
    
});