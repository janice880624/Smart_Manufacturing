Code.ga = function (blockArea, toolManu, i) {
    blockArea = document.querySelector('.blocklySvg');
    toolManu = document.querySelectorAll('.toolMenu');
    blockArea.addEventListener('mouseup', function () {
      ga('send', 'event', 'Webduino-blockly', 'editing');
    });
    for (i = 0; i < toolManu.length; i++) {
      toolManu[i].addEventListener('click', function () {
        var thisID = this.getAttribute('id');
        ga('send', 'event', 'Webduino-blockly', 'menu click', thisID);
      });
    }
  };

!(function (e) {
    "undefined" == typeof exports ? e(window) : (module.exports = e);
})(function (e) {
    "use strict";
    var n, o;
    function t() {
        var e = document.getElementById("input-device");
        "1" === localStorage.boardCheckOpen
            ? ((localStorage.boardCheckOpen = "0"), e.classList.remove("open"))
            : ((localStorage.boardCheckOpen = "1"), e.classList.add("open"));
    }
    function r() {
        var e = document.getElementById("input-device").value;
        clearTimeout(o),
            (localStorage.boardState = e),
            n &&
            (n.removeAllListeners(webduino.TransportEvent.CLOSE),
                n.removeAllListeners(webduino.TransportEvent.ERROR),
                n.removeAllListeners(webduino.TransportEvent.MESSAGE),
                n.close(),
                (n = null)),
            e.length > 3 && -1 === e.indexOf(".")
                ? (o = setTimeout(function () {
                    var o;
                    (o = e),
                        c("offline"),
                        (n = (function (e) {
                            return new webduino.transport.mqtt({
                                autoReconnect: !0,
                                device: e,
                                login: "admin",
                                multi: !0,
                                password: "password",
                                server:
                                    ((n = webduino.WebArduino.DEFAULT_SERVER),
                                        -1 === n.indexOf("://") &&
                                        (n =
                                            ("undefined" != typeof location &&
                                                "https:" === location.protocol
                                                ? "wss:"
                                                : "ws:") +
                                            "//" +
                                            n),
                                        (n = webduino.util.parseURL(n)).protocol +
                                        "//" +
                                        n.host +
                                        "/"),
                            });
                            var n;
                        })(o)).once(webduino.TransportEvent.CLOSE, function () {
                            r();
                        }),
                        n.on(webduino.TransportEvent.ERROR, function (e) {
                            "Error: board connection failed." === e.toString() &&
                                c("offline");
                        }),
                        n.on(webduino.TransportEvent.OPEN, function () {
                            n.send([240, 14, 7, 247]),
                                n.on(webduino.TransportEvent.MESSAGE, function () {
                                    c("online");
                                });
                        });
                }, 500))
                : c("clear");
    }
    function c(e) {
        var n = document.getElementById("check-icon");
        switch (e) {
            case "online":
                n.setAttribute("class", "check icon-power board-online");
                break;
            case "offline":
                n.setAttribute("class", "check icon-power board-error");
                break;
            case "clear":
                n.setAttribute("class", "check icon-power");
        }
    }
    e.Code.checkDeviceOnline = function () {
        var e;
        !(function () {
            var e = document.getElementById("input-device");
            localStorage.boardState && ((e.value = localStorage.boardState), r());
            (!localStorage.boardCheckOpen || e.value.length < 4) &&
                (localStorage.boardCheckOpen = "0");
            "0" === localStorage.boardCheckOpen
                ? e.classList.remove("open")
                : e.classList.add("open");
        })(),
            (e = document.getElementById("input-device")),
            document.getElementById("check-btn").addEventListener("click", t),
            e.addEventListener("input", r);
    };
});
