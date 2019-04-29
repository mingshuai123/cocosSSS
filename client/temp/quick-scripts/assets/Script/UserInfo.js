(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/UserInfo.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5150dTHMrFOv5i6uOugpENP', 'UserInfo', __filename);
// Script/UserInfo.js

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
        icon: cc.Node,
        nickname: cc.Label,
        uid: cc.Label,
        ip: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad: function onLoad() {
        var _this = this;

        this.nickname.string = "昵称：" + cc.mj.user.nickname;
        this.uid.string = "ID：" + cc.mj.user.uid;
        this.ip.string = "IP：" + cc.mj.user.ip;
        Utils.UrlImage(cc.mj.user.icon, function (err, sprite) {
            !err && (_this.icon.getComponent(cc.Sprite).spriteFrame = sprite);
        });
    }
}
// update (dt) {},
);

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
        //# sourceMappingURL=UserInfo.js.map
        