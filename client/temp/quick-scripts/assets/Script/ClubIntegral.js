(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/ClubIntegral.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '50d77UJviVH4o95+RgzNHXV', 'ClubIntegral', __filename);
// Script/ClubIntegral.js

"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

cc.Class({
    extends: cc.Component,

    properties: _defineProperty({
        editbox: cc.EditBox,
        title: cc.Label,
        usericon: cc.Sprite,
        nickname: cc.Label
    }, "title", cc.Label),
    onLoad: function onLoad() {},
    init: function init(is_inc, club_id, uid, name, icon, cb) {
        var _this = this;

        this.is_inc = is_inc;
        this.club_id = club_id;
        this.uid = uid;
        this.name = name;
        this.nickname.string = name;
        this.editbox.placeholder = is_inc > 0 ? "增加积分" : "扣除积分";
        this.title.string = is_inc > 0 ? "增加积分" : "扣除积分";
        Utils.UrlImage(icon, function (err, sprite) {
            !err && (_this.usericon.spriteFrame = sprite);
        });
        this.icon = icon;
        this.cb = cb;
    },
    onCommit: function onCommit() {
        var _this2 = this;

        var value = isNaN(parseInt(this.editbox.string)) ? 1 : Math.max(1, parseInt(this.editbox.string));
        this.editbox.string = value;
        var content = "玩家:" + this.name + "\nID:" + this.uid + (this.is_inc > 0 ? "\n增加积分数:" : "\n扣除积分数:") + this.editbox.string;
        cc.scene.onShowTips("OK_CANCEL", content, function () {
            http.sendHall({ method: "admin_add_integral", club_id: _this2.club_id, tarid: _this2.uid, value: _this2.is_inc > 0 ? value : -value }, function () {});
            cc.scene.closePopWin(_this2.node);
            _this2.cb(_this2.is_inc > 0 ? value : -value);
        }, null, this.icon);
        // cs.init(content, "OK_CANCEL", () => {
        //     http.sendHall({ method: "admin_add_integral", club_id: this.club_id, tarid: this.uid, value: (this.is_inc > 0 ? value : -value) }, () => { })
        //     tips.parent = null;
        //     this.close()
        //     this.cb(this.is_inc > 0 ? value : -value)
        // }, () => { tips.parent = null }, this.icon)
        // tips.parent = this.node
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
        //# sourceMappingURL=ClubIntegral.js.map
        