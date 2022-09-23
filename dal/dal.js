var status_text;
var adxl;
var myData;
var x;
var y;

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

function write() {
    if (x > 0.03) {
        myData.column0 = get_date("ymd");
        myData.column1 = get_time("hms");
        myData.column2 = adxl._z;
        myData.column3 = x;
        myData.column4 = status_text;
        writeSheetData(myData);
    }
    x = 0;
}

function status2() {
    if (x > 0.03) {
        status_text = "someone in and out";
    } else {
        status_text = "";
    }
}

boardReady(
    { board: "Smart", device: "10QGMYby", transport: "mqtt" },
    function (board) {
    board.samplingInterval = 1000;
    status_text = "";
    adxl = getADXL345(board);
    myData = {};
    myData.sheetUrl =
        "https://docs.google.com/spreadsheets/d/1FwnrehFAzFVsYTk0mcMIqiEITqR6LWGKqeNQ4nH0jLc/edit?usp=sharing";
    myData.sheetName = "DAL";
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
        x = Math.round(Math.abs(adxl._z - y) * 100000) / 100000;
        document.getElementById("demo-area-01-show").innerHTML = [
            x,
            "<br/>",
            String("status : ") + String(status_text),
        ].join("");
        status2();
        y = adxl._z;
        });
        setInterval(function () {
        write();
        }, 1000 * 30);
    }
);
