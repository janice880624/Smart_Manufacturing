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

function adjustIframe(){
    var ifm = document.getElementById("value_iframe");
    ifm.height = document.documentElement.clientHeight;
    ifm.width = document.documentElement.clientWidth;
}
