(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Toggle.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '957afLlunpOyqPI94+HDl8/', 'Toggle', __filename);
// Script/Toggle.js

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
        bg: {
            default: null,
            type: cc.Node
        },
        checkmark: {
            default: null,
            type: cc.Node
        },
        title: {
            default: null,
            type: cc.Label
        },
        checked_title: {
            default: null,
            type: cc.Label
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

    // LIFE-CYCLE CALLBACKS:

    init: function init(bg_sprite, checkmark_sprite, content, cb) {
        var _this = this;

        this._checked = false;
        this.content = content;
        this.cb = cb;
        this.bg.getComponent(cc.Sprite).spriteFrame = bg_sprite;
        this.checkmark.getComponent(cc.Sprite).spriteFrame = checkmark_sprite;
        this.title.string = content.content;
        this.checked_title.string = content.content;
        this.bg.on(cc.Node.EventType.TOUCH_START, function () {
            _this.cb(_this);
        });
        this.checkmark.on(cc.Node.EventType.TOUCH_START, function () {
            _this.cb(_this);
        });
        this.title.node.on(cc.Node.EventType.TOUCH_START, function () {
            _this.cb(_this);
        });
        this.checked_title.node.on(cc.Node.EventType.TOUCH_START, function () {
            _this.cb(_this);
        });
    },
    checked: function checked() {
        this._checked = true;
        this._refresh();
    },
    uncheck: function uncheck() {
        this._checked = false;
        this._refresh();
    },
    isChecked: function isChecked() {
        return this._checked;
    },
    _refresh: function _refresh() {
        this.title.node.active = !this._checked;
        this.checked_title.node.active = this._checked;
        this.checkmark.active = this._checked;
    },
    start: function start() {}
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
        //# sourceMappingURL=Toggle.js.map
        