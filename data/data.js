var data = [
    {"Time": "2020–09–01 00:00", "Volume": 1523},
    {"Time": "2020–09–01 01:00", "Volume": 1010},
    {"Time": "2020–09–01 02:00", "Volume": 1304},
    {"Time": "2020–09–01 03:00", "Volume": 1106},
    {"Time": "2020–09–01 04:00", "Volume": 1312},
    {"Time": "2020–09–01 05:00", "Volume": 1017},
    {"Time": "2020–09–01 06:00", "Volume": 1066},
    {"Time": "2020–09–01 07:00", "Volume": 1475},
    {"Time": "2020–09–01 08:00", "Volume": 1270},
    {"Time": "2020–09–01 09:00", "Volume": 1496},
    {"Time": "2020–09–01 10:00", "Volume": 1712},
    {"Time": "2020–09–01 11:00", "Volume": 1068},
    {"Time": "2020–09–01 12:00", "Volume": 1018},
    {"Time": "2020–09–01 13:00", "Volume": 1283},
    {"Time": "2020–09–01 14:00", "Volume": 1659},
    {"Time": "2020–09–01 15:00", "Volume": 1050},
    {"Time": "2020–09–01 16:00", "Volume": 1200},
    {"Time": "2020–09–01 17:00", "Volume": 1138},
    {"Time": "2020–09–01 18:00", "Volume": 1386},
    {"Time": "2020–09–01 19:00", "Volume": 1041},
    {"Time": "2020–09–01 20:00", "Volume": 1734},
    {"Time": "2020–09–01 21:00", "Volume": 1372},
    {"Time": "2020–09–01 22:00", "Volume": 1270},
    {"Time": "2020–09–01 23:00", "Volume": 1207}];

var ctx = document.getElementById('myChart').getContext('2d');

var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: data.map(x=>x.Time.slice(11,16)),
        datasets: [{
            label: '交通量',
            data: data.map(x=>x.Volume),
            // Line
            lineTension: 0,
            backgroundColor: '#0000D6',
            borderColor: '#6363FF',
            fill: false,
            borderWidth: 2,
            // Point
            pointRadius: 5,
            pointHoverRadius: 7,
        }]
    },
    options:{
        title:{
            display: true,
            text: '震動訊號',
            position: 'bottom',
            fontSize: 24,
            fontStyle: 'normal',
            fontFamily: 'Century Gothic'
        },
        legend:{
            display: false
        },
        responsive: false
    }
});