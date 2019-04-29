"use strict";
cc._RF.push(module, 'e7209ycDa5CeJ0m3zeVXa0Z', 'Emoji');
// Script/Emoji.js

"use strict";

var EMOJI_ID = ["E00E", "E02B", "E043", "E04F", "E051", "E052", "E053", "E056", "E057", "E058", "E059", "E105", "E106", "E107", "E108", "E252", "E401", "E402", "E403", "E404", "E405", "E406", "E407", "E408", "E409", "E40A", "E40B", "E40C", "E40D", "E40E", "E40F", "E410", "E411", "E412", "E413", "E414", "E415", "E416", "E417", "E418", "E41D", "E41F", "E420", "E421", "E428", "E52B", "E52D", "E52E"];

cc.Class({
    extends: cc.Component,

    properties: {
        atlas_emoji: {
            default: null,
            type: cc.SpriteAtlas
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
    init: function init(name, value) {
        this.nickname.string = name;
        this.money.string = this.value_ab(value);
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
    send_msg: function send_msg(dir, msg) {
        var bubble = this.node.getChildByName("dir" + dir);
        bubble.active = true;
        if (msg[0] == "E") {
            var emoji = cc.instantiate(this.emoji_prefab);
            var sprite = this.atlas_emoji.getSpriteFrame(EMOJI_ID[i]);
            emoji.getComponent(cc.Sprite).spriteFrame = sprite;
            emoji.parent = bubble;
        } else {
            bubble.width = 26 * msg.length + 40;
            var msg_node = bubble.getChildByName("msg");
            msg_node.active = true;
            msg_node.getComponent(cc.Label).string = msg;
        }
        setTimeout(function () {
            bubble.active = false;
        }, 1000);
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});

cc._RF.pop();