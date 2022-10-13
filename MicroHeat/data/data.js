// DAL 門震動訊號
var y_value = 0;
var myFirebase;
var val_1 = "";
var aseKey = "39398890";

myFirebase = new Firebase('https://test-project-97787-default-rtdb.firebaseio.com/microheat');
myFirebase.limitToLast(1).on('child_added', function (snapshot) {
    val_1 = snapshot.val().valus;
    console.log("val_1 => ", val_1);
    console.log("type of val_1 =>", typeof(val_1));

    var decrypt = CryptoJS.AES.decrypt(val_1, CryptoJS.enc.Utf8.parse(aseKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
    console.log("decrypt => ", decrypt);
    
    
    y_value = Number(decrypt);
    console.log(y_value);
    console.log(typeof(y_value));
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
        text: '微熱流機電實驗室'   
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