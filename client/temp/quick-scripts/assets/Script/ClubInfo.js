(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/ClubInfo.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'eea33NfTT9KX4RtCIAr5Vf2', 'ClubInfo', __filename);
// Script/ClubInfo.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        club_member_prefab: cc.Prefab,
        integral_history_prefab: cc.Prefab,
        label_title: cc.Label,
        member_layout: cc.Node,
        node_info: cc.Node,
        node_member: cc.Node,
        node_integral: cc.Node,

        label_integral: cc.Label,
        label_club_name: cc.Label,
        label_club_id: cc.Label,
        lable_created: cc.Label,
        labale_member_num: cc.Label
    },
    init: function init(club) {
        this.club = club;
        this.node_integral.active = club.club_type == "INTEGRAL_CLUB";
        this.label_integral.string = club.integral;

        var name = club.club_type == "INTEGRAL_CLUB" ? "积分圈" : "朋友圈";
        this.label_title.string = name + " 详情";

        this.label_club_name.string = name + "名称: " + club.club_name;
        this.label_club_id.string = name + "ID: " + club.club_id;
        this.lable_created.string = "创建时间: " + club.created.slice(0, 11);
        this.labale_member_num.string = "人数: " + (club.cur_num + " / " + club.max_num);
    },
    instantiate_member: function instantiate_member(data) {
        this.load_idx += 1;
        var member = cc.instantiate(this.club_member_prefab);
        member.parent = this.member_layout;
        member.getChildByName("name").getComponent(cc.Label).string = data.nickname;
        Utils.UrlImage(data.icon, function (err, sprite) {
            !err && (member.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = sprite);
        });
        member.getChildByName("uid").getComponent(cc.Label).string = "ID: " + data.uid;
        member.getChildByName("created").getComponent(cc.Label).string = data.created.slice(0, 11);
        var status = member.getChildByName(data.status);
        status ? status.active = true : null;
    },
    showInfo: function showInfo() {
        this.node_info.active = true;
        this.node_member.active = false;
    },
    showMembers: function showMembers() {
        var _this = this;

        this.node_info.active = false;
        this.node_member.active = true;
        if (!this.members) {
            this.load_idx = 0;
            http.sendTick({ "method": "club.members", club_id: this.club.club_id }, function (resp) {
                resp.members.unshift({ uid: cc.mj.user.uid, "icon": cc.mj.user.icon, "nickname": cc.mj.user.nickname, "status": cc.mjroom ? "PLAYING" : "ONLINE" });
                _this.members = resp.members;
            });
        }
    },
    onCheckIntegralHistory: function onCheckIntegralHistory() {
        var node = cc.instantiate(this.integral_history_prefab);
        node.getComponent("IntegralRecord").init(this.club.club_id);
        node.parent = this.node;
    },
    onReqExit: function onReqExit() {
        var _this2 = this;

        var content = this.club.integral > 0 ? "尚有积分未兑换，是否确认退出积分圈" : "是否确认退出" + (this.club.club_type == "INTEGRAL_CLUB" ? "积分圈" : "朋友圈");
        cc.scene.onShowTips("OK_CANCEL", content, function () {
            http.sendHall({ "method": "exit_club", club_id: _this2.club.club_id }, function (resp) {
                cc.scene.onShowTips("OK", "退出俱乐部申请已提交，等待管理员处理");
            });
        });
    },

    update: function update(dt) {
        if (this.members && this.load_idx < this.members.length) {
            this.instantiate_member(this.members[this.load_idx]);
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=ClubInfo.js.map
        