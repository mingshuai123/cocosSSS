"use strict";
cc._RF.push(module, 'bf72714t+NASJp+J1e5wv0I', 'HTTP');
// Script/lib/HTTP.js

"use strict";

var _md = require("./md5");

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var URL = "http://127.0.0.1:9000";
// var URL = "http://106.75.133.193:8128/hall";
// var URL ="http://192.168.1.128:1279/hall"
var URL = "http://106.75.101.90:1279/hall";
// var URL = "http://192.168.1.7:8775/hall";


var HTTP = cc.Class({
    extends: cc.Component,

    statics: {
        server_token: "543037c262e95170c6d0a4889e67bef9",

        uid: null,
        hall_token: null,
        hall_url: [URL],
        // tick_url: ['http://106.75.133.193:26647/tick'],
        // h_tick_url: 'http://106.75.133.193:26641/tick',
        tick_url: ['http://106.75.101.90:1277/tick'],
        h_tick_url: 'http://106.75.101.90:1277/tick',
        tick_idx: 0,
        hall_idx: 0,
        game_token: null,
        game_url: null,
        send: function send(url, data, cb, token) {
            if (token) {
                data['uid'] = this.uid;
                // 签名
                var timestamp = Math.round(new Date().getTime() / 1000);
                data["__timestamp"] = timestamp;
                var vstring = "token=" + token + "&timestamp=" + timestamp + "&uid=" + this.uid + "&" + this.server_token;
                data["__sign"] = (0, _md2.default)(vstring);
            }
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.timeout = 60000;
            var str = "?";
            for (var k in data) {
                if (str != "?") {
                    str += "&";
                }
                str += k + "=" + data[k];
            }
            var requestURL = url + encodeURI(str);
            // console.log("RequestURL:" + requestURL);
            xhr.open("POST", requestURL, true);
            if (cc.sys.isNative) {
                xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                    // console.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);
                    try {
                        var ret = JSON.parse(xhr.responseText);
                        if (cb !== null) {
                            cb(ret);
                        } /* code */
                    } catch (e) {
                        console.log(e);
                        console.log("err:" + e);
                        //handler(null);
                    } finally {
                        if (cc.vv && cc.vv.wc) {
                            //       cc.vv.wc.hide();    
                        }
                    }
                }
            };

            if (cc.vv && cc.vv.wc) {
                //cc.vv.wc.show();
            }
            xhr.send();
            return xhr;
        },
        g_heartbeat: function g_heartbeat() {
            var _this = this;

            var url = this.h_tick_url + '/heartbeat';
            // let url = this.h_tick_url 
            http.send(url, { method: 'heartbeat', uid: this.uid, login: 1 }, function () {});
            setInterval(function () {
                http.send(url, { method: 'heartbeat', uid: _this.uid }, function () {});
            }, cc.mj.game_cfg.g_tick ? cc.mj.game_cfg.g_tick : 30000);
        },
        set_tick_host: function set_tick_host(hosts) {
            // cc.log(hosts)
            if (hosts && hosts.length) {
                this.tick_url = hosts;
                // this.hall_url = hosts
            }
        },
        set_hall_host: function set_hall_host(hosts) {
            if (hosts && hosts.length) {
                this.hall_url = hosts;
                // this.tick_url = hosts
            }
        },
        startHallTick: function startHallTick() {
            var _this2 = this;

            Task.onTask(3000, function () {
                _this2._hallTick();
            });
        },
        _hallTick: function _hallTick() {
            http.sendTick({ method: "event.list" }, function (resp) {
                if (resp.action) {
                    cc.mj.evt.newTickEvt(resp);
                }
            });
            cc.mj.evt.handleTickEvt();
        },
        sendTick: function sendTick(data, cb) {
            this.tick_idx = (this.tick_idx + 1) % this.tick_url.length;
            var url = this.tick_url[this.tick_idx];
            if (typeof url != "string") {
                url = this.tick_url[this.hall_idx].host;
            }
            this.send(url + '/' + data.method, data, cb, this.hall_token);
            // this.send(url, data, cb, this.hall_token)
        },
        sendHall: function sendHall(data, cb) {
            this.hall_idx = (this.hall_idx + 1) % this.hall_url.length;
            var url = this.hall_url[this.hall_idx];
            if (typeof url != "string") {
                url = this.hall_url[this.hall_idx].host;
            }
            this.send(url, data, cb, this.hall_token);
        },
        sendGame: function sendGame(data, cb) {
            this.send(this.game_url, data, cb, this.game_token);
        },
        joinRoom: function joinRoom(host, token, cb) {
            this.game_url = host;
            this.game_token = token;
            this.sendGame({ method: "join_room", uid: this.uid, token: this.game_token }, cb);
        },
        tryJoinRoom: function tryJoinRoom(room_id, cb) {
            var _this3 = this;

            var req = { method: "join_room" };
            if (room_id) {
                req["room_id"] = room_id;
            }
            http.sendHall(req, function (resp) {
                if (!resp.errno) {
                    cc.mj.mgr.self_seat = resp.seat;
                    cc.mjroom = resp.detail.detail;
                    _this3.game_url = resp.host;
                    _this3.game_token = resp.token;
                    cb && cb(resp);
                } else {
                    cb && cb(resp);
                }
            });
        },
        onJoinSSSRoom: function onJoinSSSRoom(roomId) {
            var serverType = 'SSS_SERVER_TYPE';
            var onEnter = function onEnter(ret) {
                if (ret.errcode !== 0) {} else {
                    cc.sssNetMgr.connectGameServer(ret);
                }
            };
            var data = {
                uid: cc.mj.user.uid,
                serverType: serverType,
                roomid: roomId
            };
            cc.sssHttp.sendRequest("/enter_private_room", data, onEnter);
        },
        recoverGame: function recoverGame(cb) {
            var _this4 = this;

            var timeout_timer = setTimeout(function () {
                cb();
            }, 1500);
            this.sendHall({ method: "recover_game" }, function (resp) {
                clearTimeout(timeout_timer);
                if (!resp.errno) {
                    cc.log(resp.game_type);
                    if (resp.game_type == "sss") {
                        cc.log(resp.roomid);
                        _this4.onJoinSSSRoom(resp.roomid);
                    } else {
                        _this4.game_url = resp.host;
                        _this4.game_token = resp.token;
                        cc.mj.mgr.self_seat = resp.seat;
                        cc.mjroom = resp.room;
                        _this4.sendGame({ method: "recover_game" }, function (resp) {
                            if (!resp.errno && resp.detail) {
                                cc.mjroom = resp.detail;
                                for (var i = 0; i < resp.msgs.length; i++) {
                                    var msg = resp.msgs[i];
                                    cc.mj.evt.newEvt(msg);
                                }
                                cc.mj.mgr.recover = true;
                            }
                            cb();
                        });
                    }
                } else {
                    cb();
                }
            });
        },
        heartbeat: function heartbeat(cb) {
            http.sendGame({ method: "heartbeat" }, function (resp) {
                if (resp.msgs) {
                    for (var i = 0; i < resp.msgs.length; i++) {
                        var msg = resp.msgs[i];
                        cc.mj.evt.newEvt(msg);
                    }
                }
                cb && cb();
            }, this.game_token);
        },
        startHeartbeat: function startHeartbeat() {
            if (this.game_heartbeat) return;
            var self = this;
            this.game_heartbeat = function (cb) {
                self.sendGame({ method: "heartbeat" }, function (resp) {
                    if (resp.msgs) {
                        for (var i = 0; i < resp.msgs.length; i++) {
                            var msg = resp.msgs[i];
                            cc.mj.evt.newEvt(msg);
                        }
                    }
                    cb && cb();
                }, self.game_token);
            };
            Task.onTask(200, this.game_heartbeat);
        },
        stopHeartbeat: function stopHeartbeat() {
            this.game_heartbeat && this.game_heartbeat(function () {
                cc.mj.evt.clear_evts();
            });
            if (this.game_heartbeat) {
                Task.offTask(this.game_heartbeat);
                this.game_heartbeat = null;
            }
        },
        login: function login(resp) {
            this.uid = resp.id;
            this.hall_token = resp.token;
            this.g_heartbeat();
        },
        logout: function logout() {
            this.uid = null;
            this.hall_token = null;
        }
    }
});

cc._RF.pop();