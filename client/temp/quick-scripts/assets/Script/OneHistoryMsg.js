(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/OneHistoryMsg.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1a1a6EanoRNGqkQGLHw0zTv', 'OneHistoryMsg', __filename);
// Script/OneHistoryMsg.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        msg: {
            default: null,
            type: cc.Label
        },
        bubble: {
            default: null,
            type: cc.Node
        },
        role_name: {
            default: null,
            type: cc.Label
        },
        emoji: {
            default: null,
            type: cc.Node
        },
        emoji_prefab: {
            default: null,
            type: cc.Prefab
        },
        atlas_emoji: {
            default: null,
            type: cc.SpriteAtlas
        }
    },
    onLoad: function onLoad() {},
    init: function init(data) {
        if (data.msg[0] == "E") {
            this.emoji.active = true;
            var emoji_node = cc.instantiate(this.emoji_prefab);
            var sprite = this.atlas_emoji.getSpriteFrame(data.msg);
            emoji_node.getComponent(cc.Sprite).spriteFrame = sprite;
            emoji_node.parent = this.emoji;
        } else {
            this.bubble.active = true;
            this.msg.string = data.msg;
            this.bubble.width = 32 * data.msg.length + 10;
        }
        this.role_name.string = data.name + ":";
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
        //# sourceMappingURL=OneHistoryMsg.js.map
        