(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/OutCard.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6a5af331otG1p2pl/g6WAv7', 'OutCard', __filename);
// Script/OutCard.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        card: {
            default: null,
            type: cc.Node
        },
        atlas_big: {
            default: null,
            type: cc.SpriteAtlas
        },
        atlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        icon: {
            default: null,
            type: cc.Node
        },
        hua: {
            default: null,
            type: cc.Label
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
    onLoad: function onLoad() {},
    init: function init(dir, type, value, num, big) {
        this.value = value;
        var ext = cc.mj.user.mjStyleBig() ? "_big" : "";
        var atlas = cc.mj.user.mjStyleBig() ? this.atlas_big : this.atlas;
        if (value != null) {
            var sprite_name = 'p' + dir + 's' + type + '_' + value + ext;
            if (type == 4 && value > 7) {
                sprite_name = 'p' + dir + 's5_' + (value - 7) + ext;
            }
            var cardframe = atlas.getSpriteFrame(sprite_name);
            this.card.getComponent(cc.Sprite).spriteFrame = cardframe;
        } else {
            this.card.getComponent(cc.Sprite).spriteFrame = null;
        }
        if (this.icon) {
            this.icon.active = false;
        }
        try {
            if (num > 1) {
                this.hua.node.parent.active = true;
                this.hua.string = num;
            }
        } catch (e) {}
    },
    start_play: function start_play() {
        if (this.icon) {
            this.icon.active = true;
            var action1 = cc.moveBy(0.3, cc.p(0, 15));
            var action2 = cc.moveBy(0.3, cc.p(0, -15));
            var actionsArray = cc.sequence([action1, action2]);
            this.action = this.icon.runAction(cc.repeatForever(actionsArray));
        }
    },
    stop_play: function stop_play() {
        if (this.icon) {
            this.icon.stopAction(this.action);
            this.icon.active = false;
        }
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
        //# sourceMappingURL=OutCard.js.map
        