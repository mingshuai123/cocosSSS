"use strict";
cc._RF.push(module, 'ade86TA+25LcbIRujr6fVx+', 'PaoMaDeng');
// Script/hall/PaoMaDeng.js

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
        content: cc.Label
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

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        http.sendHall({ method: "system_notice" }, function (resp) {
            _this.notice_list = resp.notices;
            _this.reset();
        });
    },
    reset: function reset() {
        this.idx = this.idx != undefined ? (this.idx + 1) % this.notice_list.length : 0;
        this.content.string = this.notice_list[this.idx];
        this.content.node.x = 500;
    },
    update: function update(dt) {
        if (!this.notice_list) return;
        this.content.node.x -= 1;
        if (this.content.node.x < -500 - this.content.string.length * 40) {
            this.reset();
        }
    }
});

cc._RF.pop();