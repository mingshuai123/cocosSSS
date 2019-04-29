(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/MultiHandler.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c12b7JU3LhAQbePTILDmMpp', 'MultiHandler', __filename);
// Script/MultiHandler.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        atlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        card1: {
            default: null,
            type: cc.Node
        },
        card2: {
            default: null,
            type: cc.Node
        },
        card3: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onClick.bind(this));
    },
    init: function init(event, event_id, type, value, value1, value2, father) {
        this.father = father;
        this.event_type = event;
        this.event_id = event_id;
        this.value = value;
        this.value1 = value1;
        this.value2 = value2;

        var card1frame = this.atlas.getSpriteFrame('p4s' + type + '_' + value1 + '_big');
        this.card1.getComponent(cc.Sprite).spriteFrame = card1frame;
        var card2frame = this.atlas.getSpriteFrame('p4s' + type + '_' + value + '_big');
        this.card2.getComponent(cc.Sprite).spriteFrame = card2frame;
        var card3frame = this.atlas.getSpriteFrame('p4s' + type + '_' + value2 + '_big');
        this.card3.getComponent(cc.Sprite).spriteFrame = card3frame;
    },

    onClick: function onClick() {
        var req = { method: "handle_event", event: this.event_type, evt_id: this.event_id };
        http.sendGame(req, function (resp) {});
        this.father.removeAllChildren();
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
        //# sourceMappingURL=MultiHandler.js.map
        