(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Header.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a980fIjNzVAcY//qzblK5+d', 'Header', __filename);
// Script/Header.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        money: {
            default: null,
            type: cc.Label
        },
        nickname: {
            default: null,
            type: cc.Label
        },
        atlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        icon: {
            default: null,
            type: cc.Node
        },
        banker: {
            default: null,
            type: cc.Node
        },
        hu_times: {
            default: null,
            type: cc.Label
        },
        offline: {
            default: null,
            type: cc.Node
        },
        big_header_prefab: {
            default: null,
            type: cc.Prefab
        }
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
    },
    init: function init(mjnode, dir, uid, name, icon, value) {
        var _this = this;

        this.node.active = false;
        this.mjnode = mjnode;
        this.dir = dir;
        this.uid = uid;
        this.nickname.string = name;
        this.src_icon = icon;
        this.money.string = this.value_ab(value);
        Utils.UrlImage(icon, function (err, sprite) {
            !err && (_this.icon.getComponent(cc.Sprite).spriteFrame = sprite);
            _this.node.active = true;
        });
        this.node.on(cc.Node.EventType.TOUCH_START, this.showBigHeader.bind(this));
    },
    value_ab: function value_ab(value) {
        if (value < 10000) {
            return '' + value;
        } else {
            var value_ = Math.floor(value / 1000) * 1000;
            return '' + value_ / 10000 + '万';
        }
    },
    set_banker: function set_banker(hu_times) {
        this.banker.active = true;
        if (hu_times > 0) {
            this.hu_times.node.parent.active = true;
            this.hu_times.string = 'x ' + hu_times;
        }
    },
    set_offline: function set_offline(offline) {
        this.offline.active = offline;
    },
    showBigHeader: function showBigHeader() {
        if (this.dir == 4 || !this.mjnode.no_waiting) return;
        var header = cc.instantiate(this.big_header_prefab);
        header.parent = this.mjnode.node;
        header.getChildByName("BigHeader").getComponent("BigHeader").init(this.mjnode.node, this.dir, this.uid, this.nickname.string, this.src_icon);
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
        //# sourceMappingURL=Header.js.map
        