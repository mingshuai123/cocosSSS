(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Round.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4bc25uKJJVAj7KbhznAD/39', 'Round', __filename);
// Script/Round.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        one_round_prefab: {
            default: null,
            type: cc.Prefab
        },
        content: {
            default: null,
            type: cc.Node
        },
        btn_close: {
            default: null,
            type: cc.Node
        },
        waiting_prefab: {
            default: null,
            type: cc.Prefab
        },
        other_replay_prefab: {
            default: null,
            type: cc.Prefab
        },
        btn_other_replay: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function onLoad() {
        var _this = this;

        this.node.on(cc.Node.EventType.TOUCH_START, function () {});
        this.btn_close.on(cc.Node.EventType.TOUCH_START, function () {
            _this.node.parent = null;
        });
        this.btn_other_replay.on(cc.Node.EventType.TOUCH_START, function () {
            var node = cc.instantiate(_this.other_replay_prefab);
            node.parent = _this.node;
        });
    },
    init: function init(data, names) {
        for (var i = 0; i < names.length; i++) {
            var name = this.node.getChildByName("name" + (i + 1));
            name.active = true;
            name.getComponent(cc.Label).string = names[i];

            var line = this.node.getChildByName("icon_line_" + (i + 1));
            line && (line.active = true);
        }
        for (var _i = 0; _i < data.rounds.length; _i++) {
            var round = data.rounds[_i];
            var node = cc.instantiate(this.one_round_prefab);
            node.getComponent("OneRound").init(round);
            node.parent = this.content;
            node.setPosition(0, -(node.height + 15) * _i);
            this.content.height = (node.height + 15) * (_i + 1);
        }
    },
    scrollEvent: function scrollEvent(sender, event) {}
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
        //# sourceMappingURL=Round.js.map
        