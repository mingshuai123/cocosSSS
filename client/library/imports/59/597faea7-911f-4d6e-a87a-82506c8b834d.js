"use strict";
cc._RF.push(module, '597fa6nkR9Nbqh6glBsi4NN', 'DismissMsg');
// Script/DismissMsg.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        content: {
            default: null,
            type: cc.Label
        },
        num: {
            default: null,
            type: cc.Label
        },
        btn_agree: {
            default: null,
            type: cc.Node
        },
        btn_refuse: {
            default: null,
            type: cc.Node
        },
        isSSS: false
    },
    onLoad: function onLoad() {
        this.deadline = 300;
        this.state = null;
        this.dismiss_uid = null;

        var self = this;
        this.timer_cb = function () {
            self.deadline -= 1;
            self.num.string = self.deadline;
            if (self.deadline == 0) {
                Task.offTask(self.timer_cb);
                self.dismiss_uid != cc.mj.user.uid && self.state == null && self.agree();
            }
        };
        Task.onTask(1000, this.timer_cb);
    },
    init: function init(data, type) {
        if (type && type == "SSS") {
            this.isSSS = true;
        } else {
            this.dismiss_uid = data.dismiss_user.uid;
            if (this.dismiss_uid == cc.mj.user.uid || this.state != null) {
                this.btn_agree.active = false;
                this.btn_refuse.active = false;
            }
            var content = "玩家【" + data.dismiss_user.name + "】申请解散房间，";
            content += this.dismiss_uid == cc.mj.user.uid || this.state != null ? "请等待其他玩家确认" : "请问是否同意？";
            content += "(超过5分钟未做选择，则默认同意)\n";
            for (var i = 0; i < data.roles.length; i++) {
                var role = data.roles[i];
                content += "【" + role.name + "】" + (role.state == null ? "等待选择" : role.state ? "同意解散" : "拒绝解散") + "\n";
            }
            this.content.string = content;
        }
    },
    onGgree: function onGgree() {
        if (this.isSSS) {
            cc.sssNet.send("dissolve_agree");
            return;
        }
        this.state = true;
        http.sendGame({ method: "agree_dismiss" }, function (resp) {});
    },
    onRefuse: function onRefuse() {
        if (this.isSSS) {
            cc.sssNet.send("dissolve_reject");
            return;
        }
        this.state = false;
        http.sendGame({ method: "refuse_dismiss" }, function (resp) {});
    },
    onDisable: function onDisable() {
        this.timer_cb && Task.offTask(this.timer_cb);
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});

cc._RF.pop();