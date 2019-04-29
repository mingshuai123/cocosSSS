"use strict";
cc._RF.push(module, 'd22568jvIhEb54k8bR6KRNe', 'Chat');
// Script/Chat.js

"use strict";

var COMMON_MSG = ["你太牛了", "哈哈，手气真好", "快点出牌噢", "今天真高兴", "这个吃的好", "你放炮我不胡", "你家里是开银行的吧", "不好意思，我有事要先走一步", "你的牌打的太好啦", "大家好，很高兴见到各位", "怎么又断线了啊，网络怎么这么差啊", "抱歉，刚接了个电话"];
var conf = require("Conf");
cc.Class({
    extends: cc.Component,

    properties: {
        one_msg_prefab: {
            default: null,
            type: cc.Prefab
        },
        content: {
            default: null,
            type: cc.Node
        },
        toggle_common: {
            default: null,
            type: cc.Node
        },
        toggle_emoji: {
            default: null,
            type: cc.Node
        },
        toggle_histroy: {
            default: null,
            type: cc.Node
        },
        atlas_emoji: {
            default: null,
            type: cc.SpriteAtlas
        },
        emoji_prefab: {
            default: null,
            type: cc.Prefab
        },
        chat_atlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        history_msg_prefab: {
            default: null,
            type: cc.Prefab
        }
    },
    onLoad: function onLoad() {
        this.onShowCommonMsg();
        this.toggle_dict = {
            COMMON: this.toggle_common,
            EMOJI: this.toggle_emoji,
            HISTORY: this.toggle_histroy
        };
        this.toggle_common.setLocalZOrder(99);
        this.toggle_common.x = 287;
    },
    init: function init(msgs) {
        this.history_msgs = msgs;
    },
    changeToggleBg: function changeToggleBg(cur_toggle) {
        for (var k in this.toggle_dict) {
            var toggle = this.toggle_dict[k];
            if (k == cur_toggle) {
                toggle.getComponent(cc.Sprite).spriteFrame = this.chat_atlas.getSpriteFrame("new_chat_selected");
                toggle.setLocalZOrder(99);
                toggle.x = 287;
            } else {
                toggle.getComponent(cc.Sprite).spriteFrame = this.chat_atlas.getSpriteFrame("new_chat_not_selected");
                toggle.setLocalZOrder(0);
                toggle.x = 286;
            }
        }
    },
    onShowCommonMsg: function onShowCommonMsg() {
        this.content.removeAllChildren();
        this.content.height = 0;
        for (var i = 0; i < COMMON_MSG.length; i++) {
            var common_msg = cc.instantiate(this.one_msg_prefab);
            common_msg.getComponent("OneMsg").init(COMMON_MSG[i], this.onSendMsg.bind(this, COMMON_MSG[i]));
            common_msg.parent = this.content;
            common_msg.y = -(common_msg.height + 10) * i;
            this.content.height += common_msg.height + 10;
        }
        this.changeToggleBg("COMMON");
    },
    onShowHistory: function onShowHistory() {
        this.content.removeAllChildren();
        this.content.height = 0;
        for (var i = 0; i < this.history_msgs.length; i++) {
            var history_msg = cc.instantiate(this.history_msg_prefab);
            history_msg.getComponent("OneHistoryMsg").init(this.history_msgs[i]);
            history_msg.parent = this.content;
            history_msg.y = -history_msg.height * i;
            this.content.height += history_msg.height;
        }
        this.changeToggleBg("HISTORY");
    },
    onShowEmoji: function onShowEmoji() {
        this.content.removeAllChildren();
        this.content.height = 0;
        var EMOJI_ID = conf.EMOJI_ID;
        for (var i = 0; i < EMOJI_ID.length; i++) {
            var emoji = cc.instantiate(this.emoji_prefab);
            var sprite = this.atlas_emoji.getSpriteFrame(EMOJI_ID[i]);
            emoji.getComponent(cc.Sprite).spriteFrame = sprite;
            emoji.parent = this.content;
            emoji.x = (64 + 10) * (i % 5);
            emoji.y = -64 * parseInt(i / 5) - 10;
            this.content.height += emoji.height;
            emoji.on(cc.Node.EventType.TOUCH_END, this.onSendMsg.bind(this, EMOJI_ID[i]));
        }
        this.content.height = parseInt(this.content.height / 5) + EMOJI_ID.length * 2;
        this.changeToggleBg("EMOJI");
    },
    onSendMsg: function onSendMsg(msg) {
        http.sendGame({ method: "send_msg", msg: msg }, function () {});
        cc.scene.closePopWin(this.node);
    },
    onClickSend: function onClickSend() {
        this.input_msg && this.onSendMsg(this.input_msg);
    },
    onInputEnd: function onInputEnd(editbox) {
        this.input_msg = editbox.string;
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});

cc._RF.pop();