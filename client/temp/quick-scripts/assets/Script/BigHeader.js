(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/BigHeader.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cb9bf1dj1ZHcI5KoVRavp6j', 'BigHeader', __filename);
// Script/BigHeader.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        father: {
            default: null,
            type: cc.Node
        },
        icon: {
            default: null,
            type: cc.Node
        },
        nickname: {
            default: null,
            type: cc.Label
        },
        label_uid: {
            default: null,
            type: cc.Label
        },
        toggle_ten: {
            default: null,
            type: cc.Toggle
            // foo: {
            //     // ATTRIBUTES:
            //     default: null,        // The default value will be used only when the component attaching
            //                           // to a node for the first time
            //     type: cc.SpriteFrame, // optional, default is typeof default
            //     serializable: true,   // optional, default is true
            // },
            // bar: {
            //     get () {
            //         return this._bar;
            //     },
            //     set (value) {
            //         this._bar = value;
            //     }
            // },
        } },
    onLoad: function onLoad() {
        var _this = this;

        this.father.on(cc.Node.EventType.TOUCH_START, function () {
            _this.father.parent = null;
        });
    },
    init: function init(mjnode, dir, uid, name, icon) {
        var _this2 = this;

        this.mjnode = mjnode;
        this.dir = dir;
        this.nickname.string = name;
        this.uid = uid;
        this.label_uid.string = "ID：" + uid;
        Utils.UrlImage(icon, function (err, sprite) {
            !err && (_this2.icon.getComponent(cc.Sprite).spriteFrame = sprite);
        });
    },
    onSendBiaoQing: function onSendBiaoQing(e, biaoqing) {
        var _this3 = this;

        http.sendGame({ method: "send_biaoqing", tarid: this.uid, biaoqing: biaoqing, times: this.toggle_ten.isChecked ? 10 : 1 }, function (resp) {
            _this3.father.parent = null;
        });
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
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
        //# sourceMappingURL=BigHeader.js.map
        