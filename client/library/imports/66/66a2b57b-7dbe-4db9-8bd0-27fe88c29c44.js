"use strict";
cc._RF.push(module, '66a2bV7fb5NuYvQJ/6IwpxE', 'GameChat');
// Script/GameChat.js

"use strict";

var conf = require("Conf");
var OFFSET = { 1: 20, 2: 40, 3: 40, 4: 40 };

cc.Class({
    extends: cc.Component,

    properties: {
        emoji_prefab: {
            default: null,
            type: cc.Prefab
        },
        atlas_emoji: {
            default: null,
            type: cc.SpriteAtlas
        },
        emoji: {
            default: null,
            type: cc.Node
        },
        bubble: {
            default: null,
            type: cc.Node
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
    init: function init(dir, msg) {
        var _this = this;

        if (msg[0] == "E") {
            this.emoji.active = true;
            var sprite = this.atlas_emoji.getSpriteFrame(msg);
            this.emoji.getComponent(cc.Sprite).spriteFrame = sprite;
        } else {
            this.bubble.active = true;
            this.bubble.width = 35 * msg.length;
            this.bubble.getChildByName("msg").getComponent(cc.Label).string = msg;
        }
        setTimeout(function () {
            _this.node.parent = null;
        }, 1000);
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});

cc._RF.pop();