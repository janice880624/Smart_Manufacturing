var date;
var time;
var status_f;
var myFirebase2;
var val_1;
var val_2;
var val_3;
var tem;
var hum;
var pm25;
var pm10;

date = '';
myFirebase2 = new Firebase('https://dal-smart-manufacturing-default-rtdb.firebaseio.com/microheat');
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

function adjustIframe(){
    var ifm = document.getElementById("value_iframe");
    ifm.height = document.documentElement.clientHeight;
    ifm.width = document.documentElement.clientWidth;
}
