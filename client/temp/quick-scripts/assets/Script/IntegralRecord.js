(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/IntegralRecord.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ffbd5J9nCdDtJjNybE8AyaD', 'IntegralRecord', __filename);
// Script/IntegralRecord.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        one_record_prefab: {
            default: null,
            type: cc.Prefab
        },
        content: {
            default: null,
            type: cc.Node
        },
        waiting_prefab: {
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
    init: function init(club_id) {
        var _this = this;

        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            _this.node.parent = null;
        });
        var waiting = cc.instantiate(this.waiting_prefab);
        waiting.getComponent("Waiting").init("正在获取积分记录");
        waiting.parent = this.node;
        setTimeout(function () {
            waiting.parent = null;
        }, 300);
        http.sendHall({ method: "integral_history", club_id: club_id }, function (resp) {
            _this.showHistories(resp);
        });
    },
    showHistories: function showHistories(resp) {
        this.load_idx = 0;
        this.records = resp.records;
        for (var i = 0; i < 20 && i < resp.records.length; i++) {
            var record = resp.records[i];
            var node = cc.instantiate(this.one_record_prefab);
            node.getComponent("OneRecord").init(record);
            node.parent = this.content;
            node.setPosition(0, -(node.height + 15) * i);
            this.content.height = (node.height + 15) * (i + 1);
        }
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    update: function update(dt) {
        if (this.records && this.load_idx < this.records.length) {
            var record = this.records[this.load_idx];
            var node = cc.instantiate(this.one_record_prefab);
            node.getComponent("OneRecord").init(record);
            node.parent = this.content;
            node.setPosition(0, -(node.height + 15) * this.load_idx);
            this.content.height = (node.height + 15) * (this.load_idx + 1);
            this.load_idx += 1;
        }
    }
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
        //# sourceMappingURL=IntegralRecord.js.map
        