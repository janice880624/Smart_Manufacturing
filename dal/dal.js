var status_text;
var adxl;
var myData;
var x;
var myFirebase;
var y;

//  display use var
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



function get_time(t) {
    var varTime = new Date(),
        varHours = varTime.getHours(),
        varMinutes = varTime.getMinutes(),
        varSeconds = varTime.getSeconds();
    var varNow;
    if (t == "hms") {
        varNow = varHours + ":" + varMinutes + ":" + varSeconds;
    } else if (t == "h") {
        varNow = varHours;
    } else if (t == "m") {
        varNow = varMinutes;
    } else if (t == "s") {
        varNow = varSeconds;
    }
    return varNow;
}

function get_date(t) {
    var varDay = new Date(),
        varYear = varDay.getFullYear(),
        varMonth = varDay.getMonth() + 1,
        varDate = varDay.getDate();
    var varNow;
    if (t == "ymd") {
        varNow = varYear + "/" + varMonth + "/" + varDate;
    } else if (t == "mdy") {
        varNow = varMonth + "/" + varDate + "/" + varYear;
    } else if (t == "dmy") {
        varNow = varDate + "/" + varMonth + "/" + varYear;
    } else if (t == "y") {
        varNow = varYear;
    } else if (t == "m") {
        varNow = varMonth;
    } else if (t == "d") {
        varNow = varDate;
    }
    return varNow;
}

function write() {
    if (x > 0.03) {
        myData.column0 = get_date("ymd");
        myData.column1 = get_time("hms");
        myData.column2 = adxl._z;
        myData.column3 = x;
        myData.column4 = status_text;
        writeSheetData(myData);
        myFirebase.push({
        date: get_date("ymd"),
        time: get_time("hms"),
        status: status_text
        });
    }
    x = 0;
}

function status2() {
    if (x > 0.03) {
        status_text = 'someone in and out';
    } else {
        status_text = '';
    }
}


boardReady({board: 'Smart', device: '10QGMYby', transport: 'mqtt'}, function (board) {
    board.samplingInterval = 1000;
    status_text = '';
    adxl = getADXL345(board);
    myData= {};
    myData.sheetUrl = 'https://docs.google.com/spreadsheets/d/1FwnrehFAzFVsYTk0mcMIqiEITqR6LWGKqeNQ4nH0jLc/edit?usp=sharing';
    myData.sheetName = 'DAL';
    myFirebase = new Firebase('https://dal-smart-manufacturing-default-rtdb.firebaseio.com/door');
    x = 0;
    y = 0;
    adxl.setSensitivity = 0;
    adxl.setBaseAxis = "x";
    adxl.detect(function (_x, _y, _z, _r, _p) {
        adxl._x = _x;
        adxl._y = _y;
        adxl._z = _z;
        adxl._r = _r;
        adxl._p = _p;
        x = (Math.round(((Math.abs(adxl._z - y)))*100000))/100000;
        status2();
        document.getElementById('demo-area-01-show').innerHTML = ([get_time("hms"),("<br/>"),x,("<br/>"),String('status : ') + String(status_text)].join(''));
        y = adxl._z;
    });
    setInterval(function () {
        write();
    }, 1000 * 30);
});