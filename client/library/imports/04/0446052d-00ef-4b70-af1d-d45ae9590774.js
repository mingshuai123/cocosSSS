"use strict";
cc._RF.push(module, '04460UtAO9LcK8d1FrpWQd0', 'Hall_User');
// Script/hall/Hall_User.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        label_uid: cc.Label,
        label_nickname: cc.Label,
        icon: cc.Sprite,
        label_fangka: cc.Label
    },

    onLoad: function onLoad() {
        var _this = this;

        this.label_uid.string = "ID: " + cc.mj.user.uid;
        this.label_nickname.string = cc.mj.user.nickname;
        this.label_fangka.string = '-';
        Utils.UrlImage(cc.mj.user.icon, function (err, sprite) {
            !err && (_this.icon.priteFrame = sprite);
        });
        this.onSyncFangka();
    },

    onSyncFangka: function onSyncFangka() {
        var _this2 = this;

        http.sendHall({ method: "sync_money" }, function (resp) {
            if (!resp.errno) {
                cc.mj.user.fangka = resp.fangka;
                _this2.label_fangka.string = cc.mj.user.fangka;
            }
        });
    },
    onCheckUser: function onCheckUser() {
        cc.scene.showPrefab("个人信息");
    }
});

cc._RF.pop();