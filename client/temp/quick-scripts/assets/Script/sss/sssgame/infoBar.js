(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/sss/sssgame/infoBar.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7ceb0BjiWpNE5ffQxrE+Yto', 'infoBar', __filename);
// Script/sss/sssgame/infoBar.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        roomIdTxt: {
            type: cc.Label,
            default: null
        },
        gameType: {
            type: cc.Label,
            default: null
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.refreshInfo();
    },
    refreshInfo: function refreshInfo() {
        this.roomIdTxt.string = "房间号: " + cc.sssNetMgr.roomId;
        var str = '';
        str = this.gametype(cc.sssNetMgr.conf.type) + cc.sssNetMgr.conf.siteNum + '人桌  ' + this.paytype(cc.sssNetMgr.conf.koufeixuanze) + ' 打枪倍数 ' + cc.sssNetMgr.conf.shootMulti + '  超时托管';
        this.gameType.string = str;
    },
    gametype: function gametype(type) {
        var str = '';
        switch (type) {
            case 1:
                str = "经典场 ";
                break;
            case 2:
                str = "循环场 ";
                break;
            case 3:
                str = "全一色 ";
                break;
            default:
                str = "其他";
                break;
        }
        return str;
    },
    paytype: function paytype(type) {
        var str = '';
        switch (type) {
            case 1:
                str = "房主支付 ";
                break;
            case 2:
                str = "AA支付 ";
                break;
            case 3:
                str = "赢家支付 ";
                break;
            default:
                str = "其他 ";
                break;
        }
        return str;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

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
        //# sourceMappingURL=infoBar.js.map
        