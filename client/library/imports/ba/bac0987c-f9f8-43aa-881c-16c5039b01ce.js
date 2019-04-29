"use strict";
cc._RF.push(module, 'bac09h8+fhDqogcFsUDmwHO', 'Club');
// Script/Club.js

"use strict";

var ScenePopWin = require('./lib/ScenePopWin');
cc.Class({
    extends: ScenePopWin,

    properties: {
        club_room_prefab: cc.Prefab,
        club_room_prefab2: cc.Prefab,
        btn_create_room: cc.Node,
        btn_mgr: cc.Node,
        one_club_prefab: cc.Prefab,
        label_title: cc.Label,
        label_join: cc.Label,
        room_layout: cc.Node,
        club_layout: cc.Node,
        btn_club_info: cc.Node,
        node_create_back: cc.Node,
        wanfa_layout: cc.Node,
        one_wanfa_prefab: cc.Prefab
    },
    _onLoad: function _onLoad() {
        var _this = this;

        this.club_dict = {};
        var name = cc.club_type == "INTEGRAL_CLUB" ? "积分圈" : "朋友圈";
        this.label_title.string = name;
        this.label_join.string = "加入更多" + name;
        this.btn_join_club = this.club_layout._children[0];
        http.sendTick({ "method": "club.list", club_type: cc.club_type }, this.showClub.bind(this));
        this.room_dict = {};
        this.initEvt();
        this.node_create_back.getChildByName("create").active = !cc.mjroom;
        this.node_create_back.getChildByName("back").active = cc.mjroom != null;

        Task.onTask(1000, function () {
            cc.mjroom && _this.mjroomStatus();
        });
        Task.onTask(2000, function () {
            _this.onRefreshRoom();
        });
    },
    _onDisable: function _onDisable() {
        cc.cur_club = null;
        cc.cur_wanfa = null;
    },
    initEvt: function initEvt() {
        var _this2 = this;

        cc.mj.evt.regTickEvt("RoomInvite", function (data) {
            cc.scene.showPrefab("牌局邀请", true, function (node) {
                node.getComponent("InviteMsg").init(data);
            });
        });
        cc.mj.evt.regTickEvt("JoinClub", function (data) {
            cc.scene.onShowTips("OK", data.content, function () {
                http.sendTick({ "method": "club.list", club_type: cc.club_type }, _this2.showClub.bind(_this2));
            });
        });

        cc.mj.evt.regTickEvt("ExitClub", function (data) {
            cc.scene.onShowTips("OK", data.content, function () {
                http.sendTick({ "method": "club.list", club_type: cc.club_type }, _this2.showClub.bind(_this2));
            });
        });
        http.startHallTick();
    },
    onClose: function onClose() {
        cc.director.loadScene("hall");
        cc.cur_club = null;
        cc.cur_wanfa = null;
    },
    showCreateRoom: function showCreateRoom() {
        if (!cc.mjroom) {
            cc.scene.showPrefab("创建房间");
        } else {
            http.sendGame({ method: "recover_game" }, function (resp) {
                if (!resp.errno) {
                    cc.mjroom = resp.detail;
                    for (var i = 0; i < resp.msgs.length; i++) {
                        var msg = resp.msgs[i];
                        cc.mj.evt.newEvt(msg);
                    }
                    cc.mj.mgr.recover = true;
                    cc.director.loadScene("mjgame");
                } else {
                    http.tryJoinRoom(cc.mjroom_id, function (resp) {
                        if (resp.errno) {
                            var content = resp.errno == 20002 ? "房间满员，无法加入房间" : "积分不足，无法加入积分圈房间";
                            cc.scene.onShowTips("OK", content);
                        } else {
                            cc.scene.gotoGame("正在进入牌局");
                        }
                    });
                }
            });
        }
    },
    mjroomStatus: function mjroomStatus() {
        if (cc.mj.mgr.replay) return;
        http.sendGame({ method: "mjroom_status" }, function (resp) {
            if (resp.status) {
                http.sendGame({ method: "recover_game" }, function (resp) {
                    if (!resp.errno) {
                        cc.mjroom = resp.detail;
                        for (var i = 0; i < resp.msgs.length; i++) {
                            var msg = resp.msgs[i];
                            cc.mj.evt.newEvt(msg);
                        }
                        cc.mj.mgr.recover = true;
                        cc.director.loadScene("mjgame");
                    }
                });
            }
        });
    },
    gainHongdian: function gainHongdian() {
        var _this3 = this;

        http.sendHall({ method: "unhandled.reqs" }, function (resp) {

            for (var k in _this3.club_dict) {
                _this3.club_dict[k].hongdian.active = false;
            }
            for (var i = 0; i < resp.items.length; i++) {
                var item = resp.items[i];
                if (_this3.club_dict[item.club_id]) _this3.club_dict[item.club_id].hongdian.active = item.num > 0;
            }
        });
    },
    showClub: function showClub(resp) {
        this.club_layout.removeAllChildren();
        if (resp.clubs.length) {
            this.btn_create_room.active = true;
            this.btn_club_info.active = true;
            var club_id = ~~cc.sys.localStorage.getItem(cc.club_type + "_club_id");
            this.btn_join_club.parent = null;

            var clubs = resp.clubs;
            for (var i = 0; i < clubs.length; i++) {
                var node = cc.instantiate(this.one_club_prefab);
                var cs = node.getComponent("OneClub");
                cs.init(clubs[i], this.selectClub.bind(this));
                if (club_id == cs.club_id || i == club_id || club_id == 0) {
                    this.selectClub(cs);
                }
                node.parent = this.club_layout;
                this.club_dict[cs.club_id] = cs;
            }
        }
        this.btn_join_club.parent = this.club_layout;
    },
    selectClub: function selectClub(club) {
        if (cc.cur_club) cc.cur_club.unSelected();
        cc.cur_club = club;
        this.admin = cc.cur_club.admin;
        this.btn_mgr.active = this.admin;
        cc.cur_club.selected();
        // for (let k in this.room_dict) {
        //     this.room_dict[k].parent = null
        // }
        // this.room_dict = {}
        cc.sys.localStorage.setItem(cc.club_type + "_club_id", cc.cur_club.club_id);
        http.sendHall({ "method": "sss.room.get.setting", club_id: cc.cur_club.club_id }, this.showWanfa.bind(this));
    },
    showWanfa: function showWanfa(res) {
        this.wanfa_layout.removeAllChildren();
        if (res.setting_list) {
            var wanfa_type = ~~cc.sys.localStorage.getItem("wanfa");
            var item = res.setting_list;
            var mj_wanfa = { type: 0, uid: 0, clubId: cc.cur_club.club_id };
            item.push(mj_wanfa);
            for (var i = 0; i < item.length; i++) {
                var node = cc.instantiate(this.one_wanfa_prefab);
                var cs = node.getComponent("ClubWanfa");
                cs.init(item[i], this.selectWanfa.bind(this));
                if (wanfa_type == cs.type) {
                    this.selectWanfa(cs);
                }
                node.parent = this.wanfa_layout;
            }
        }
    },
    selectWanfa: function selectWanfa(wanfa) {
        cc.log(wanfa);
        if (cc.cur_wanfa) cc.cur_wanfa.unSelected();
        cc.cur_wanfa = wanfa;
        cc.cur_wanfa.selected();
        for (var k in this.room_dict) {
            this.room_dict[k].parent = null;
        }
        this.room_dict = {};

        this.onRefreshRoom();
        cc.sys.localStorage.setItem("wanfa", cc.cur_wanfa.type);
    },
    onShowJoinClub: function onShowJoinClub() {
        cc.scene.showPrefab("加入俱乐部");
    },
    onRefreshRoom: function onRefreshRoom() {
        if (!cc.cur_club) return;
        if (cc.cur_wanfa.type > 0) {
            http.sendTick({ "method": "club.room", club_id: cc.cur_club.club_id, game: "sss", type: cc.cur_wanfa.type, uid: cc.cur_wanfa.uid }, this.refreshRoom.bind(this));
        } else {
            http.sendTick({ "method": "club.room", club_id: cc.cur_club.club_id }, this.refreshRoom.bind(this));
        }
        this.gainHongdian();
    },
    onShowClubInfo: function onShowClubInfo() {
        if (!cc.cur_club) return;
        http.sendHall({ "method": "club_info", club_id: cc.cur_club.club_id }, function (resp) {
            cc.scene.showPrefab("俱乐部详情", false, function (node) {
                node.getComponent("ClubInfo").init(resp);
            });
        });
    },
    onShowMgr: function onShowMgr() {
        cc.scene.showPrefab("俱乐部管理");
    },
    refreshRoom: function refreshRoom(resp) {
        var _this4 = this;

        var create_room = this.room_layout._children[0];
        this.room_layout.removeAllChildren();
        create_room.parent = this.room_layout;
        if (!resp.rooms) {
            for (var k in this.room_dict) {
                this.room_dict[k].parent = null;
            }
            this.room_dict = {};
            return;
        }
        for (var i = 0; i < resp.rooms.length; i++) {
            var room = resp.rooms[i];
            if (cc.cur_wanfa.type > 0) {
                if (room.roles.length < room.option.siteNum) {
                    room.status = "WAITING";
                    room.index = 1;
                } else {
                    room.status = "PLAYING";
                    room.index = 0;
                }
            } else {
                if (room.roles.length < room.max_role) {
                    room.status = "WAITING";
                    room.index = 1;
                } else {
                    room.status = "PLAYING";
                    room.index = 0;
                }
            }
        }
        resp.rooms.sort(function (r1, r2) {
            return r1.index < r2.index ? 1 : -1;
        });
        for (var _i = 0; _i < resp.rooms.length; _i++) {
            resp.rooms[_i].index = _i;
        }
        var room_id_list = [];

        var _loop = function _loop(_i2) {
            var room = resp.rooms[_i2];
            if (!room.roles) return "continue";
            var member = null;
            var wanfa_type = cc.cur_wanfa.type;
            room_id_list.push(room.room_id);
            if (_this4.room_dict[room.room_id]) {
                member = _this4.room_dict[room.room_id];
                member.parent = _this4.room_layout;

                var btn_mgr = member.getChildByName("btn_dismiss");
                _this4.admin && btn_mgr.on(cc.Node.EventType.TOUCH_START, _this4.forceDismiss.bind(_this4, room));
                btn_mgr.active = _this4.admin && (!cc.mjroom || ~~cc.mjroom.id != ~~room.room_id);
                var btn_join = member.getChildByName("btn_join");
                btn_join.on(cc.Node.EventType.TOUCH_START, _this4.joinClubRoom.bind(_this4, room));
            } else {
                // 单个房间prefab
                if (wanfa_type > 0) {
                    member = cc.instantiate(_this4.club_room_prefab);
                } else {
                    member = cc.instantiate(_this4.club_room_prefab2);
                }
                member.parent = _this4.room_layout;
                _this4.room_dict[room.room_id] = member;
                var _btn_mgr = member.getChildByName("btn_dismiss");
                _this4.admin && _btn_mgr.on(cc.Node.EventType.TOUCH_START, _this4.forceDismiss.bind(_this4, room));
                _btn_mgr.active = _this4.admin && (!cc.mjroom || ~~cc.mjroom.id != ~~room.room_id);
                var _btn_join = member.getChildByName("btn_join");
                _btn_join.on(cc.Node.EventType.TOUCH_START, _this4.joinClubRoom.bind(_this4, room));
            }
            member.zIndex = room.index;
            if (wanfa_type > 0) {
                member.getChildByName("mode").getComponent(cc.Label).string = room.option.siteNum.toString() + "人" + "十三水";
                member.getChildByName("option_text").getComponent(cc.Label).string = _this4.option_text(wanfa_type, room.option);
            } else {
                member.getChildByName("mode").getComponent(cc.Label).string = room.max_role.toString() + "人" + (wanfa_type > 0 ? "十三水" : room.option.mj == "ndmj" ? "宁德" : "福州");
                member.getChildByName("option_text").getComponent(cc.Label).string = _this4.option_text(wanfa_type, room.option);
            }
            if (room.status == "WAITING") {
                member.getChildByName("btn_join").active = cc.mjroom == null;
            } else {
                member.getChildByName("btn_join").active = false;
                !_this4.admin && (member.getChildByName("PLAYING").active = true);
            }
            var u_icon = member.getChildByName("_icon");
            var forlength = wanfa_type > 0 ? room.option.seatNum : room.roles.length;
            cc.log(forlength);

            var _loop2 = function _loop2(j) {
                Utils.UrlImage(room.roles[j].icon, function (err, sprite) {
                    !err && (u_icon._children[j].getChildByName("icon").getComponent(cc.Sprite).spriteFrame = sprite);
                    u_icon._children[j].active = true;
                });
            };

            for (var j = 0; j < room.roles.length; j++) {
                _loop2(j);
            }
            for (var _i3 = room.roles.length; _i3 < u_icon._children.length; _i3++) {
                u_icon._children[_i3].active = false;
            }
        };

        for (var _i2 = 0; _i2 < resp.rooms.length; _i2++) {
            var _ret = _loop(_i2);

            if (_ret === "continue") continue;
        }
        for (var _k in this.room_dict) {
            var x = Number(_k);
            if (room_id_list.indexOf(x) < 0) {
                this.room_dict[_k].parent = null;
                delete this.room_dict[_k];
            }
        }
    },
    joinClubRoom: function joinClubRoom(room) {
        http.tryJoinRoom(room.room_id, function (resp) {
            if (resp.errno) {
                var content = resp.errno == 20002 ? "房间满员，无法加入房间" : "积分不足，无法加入积分圈房间";
                cc.scene.onShowTips("OK", content);
            } else {
                cc.director.loadScene("mjgame");
            }
        });
    },
    forceDismiss: function forceDismiss(room) {
        var content = "确认解散该房间【" + room.room_id + "】";
        cc.scene.onShowTips("OK_CANCEL", content, function () {
            http.sendHall({ method: "admin_dismiss", room_id: room.room_id }, function () {});
        });
    },
    option_text: function option_text(type, option) {
        var text = [];
        if (type > 0) {
            text.push(option.maxGames + "局");
            text.push(option.type == 1 ? "经典场" : option.type == 2 ? "循环场" : option.type == 3 ? "全一色" : "王牌场");
            text.push("俱乐部支付");
        } else {
            text.push(option.round + "局");
            text.push(option.mode == 2 ? "放胡全赔" : option.mode == 3 ? "放胡双倍单赔" : "放胡单赔");
            text.push("俱乐部支付");
        }

        return text.join(" ");
    }
});

cc._RF.pop();