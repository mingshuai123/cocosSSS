"use strict";
cc._RF.push(module, '53a41dALZpA5ptWpFuseAu/', 'InviteMsg');
// Script/InviteMsg.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        icon: {
            default: null,
            type: cc.Node
        },
        msg: {
            default: null,
            type: cc.Label
        },
        mode: {
            default: null,
            type: cc.Label
        },
        club: {
            default: null,
            type: cc.Label
        },
        max_role: {
            default: null,
            type: cc.Label
        },
        option: {
            default: null,
            type: cc.Label
        }
    },
    onLoad: function onLoad() {},
    init: function init(data) {
        data = data.query;
        this.room_id = data.info.id;
        var dt = ~~(new Date().valueOf() / 1000);
        if (cc.invition_delay[this.room_id] && cc.invition_delay[this.room_id] > dt - 15) {
            this.node.parent = null;
        } else {

            var mode_name = data.info.option.mj == 'fzmj' ? "福州麻将" : "宁德麻将";
            this.msg.string = "我在俱乐部等你，快来跟我一起玩" + mode_name + "吧~";
            this.mode.string = "玩法名称：" + mode_name;
            this.club.string = "俱乐部ID：" + data.club_id;
            this.max_role.string = "人       数：" + data.info.option.max_role + "人";
            this.option.string = data.info.option_text;

            cc.invition_delay[this.room_id] = dt;
        }
    },
    onJoinRoom: function onJoinRoom() {
        http.tryJoinRoom(this.room_id, function (resp) {
            if (!resp.errno) {
                cc.director.loadScene("mjgame");
            } else {
                var content = "哎呀，来迟了，该房间已满人";
                cc.scene.onShowTips("OK", content);
            }
        });
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },
});

cc._RF.pop();