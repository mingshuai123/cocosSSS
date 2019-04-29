"use strict";
cc._RF.push(module, '0f009LMWq1HEL+tCSu0wHU2', 'Handler');
// Script/Handler.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        event_atlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        card_atlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        event: {
            default: null,
            type: cc.Node
        },
        card: {
            default: null,
            type: cc.Node
        },
        multi_select_panel: {
            default: null,
            type: cc.Node
        },
        multi_select_prefab: {
            default: null,
            type: cc.Prefab
        },
        modi: {
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

    onLoad: function onLoad() {
        this.event.on(cc.Node.EventType.TOUCH_START, this.onClick.bind(this));
    },
    init: function init(event, type, selects, state, father) {
        this.father = father;
        this.event_type = event;
        this.card_type = type;
        this.selects = selects;
        this.multi_select_panel.active = false;
        var sprite_name = "";
        if (this.event_type != 5) {
            var evt_sprite = {
                4: 'gang', 3: 'peng', 2: 'eat', 0: 'pass'
            };
            sprite_name = "btn_" + evt_sprite[this.event_type] + "_cs";
            this.event.scale = 1.3;
        } else {
            this.modi.active = true;
            var win_type = {
                1: "tianhu", 2: "qingyise", 3: "hunyise", 4: "qiangjin", 5: "jinlong", 6: "jinque", 7: "threejinhu", 8: "fourjin", 9: "jingang",
                10: "pinghu", 11: "pinghu", 12: "qidui", 13: "dandiao", 14: "dihu", 98: "zimohu", 99: "pinghu"
            };
            sprite_name = win_type[state];
        }
        var eventframe = this.event_atlas.getSpriteFrame(sprite_name);
        this.event.getComponent(cc.Sprite).spriteFrame = eventframe;

        if (this.event_type != 0) {
            var cardfame = this.card_atlas.getSpriteFrame('p4s' + type + '_' + this.selects[0].value + '_big');
            this.card.getComponent(cc.Sprite).spriteFrame = cardfame;
        } else {
            this.card.active = false;
        }
    },
    onClick: function onClick() {
        var old_scale = this.event.scale;
        var action1 = cc.scaleTo(0.1, old_scale + 0.1);
        var action2 = cc.scaleTo(0.1, old_scale);
        var actionsArray = [action1, action2];
        this.event.runAction(cc.sequence(actionsArray));

        if (this.event_type == 0 || this.selects.length == 1) {
            var req = { method: "handle_event", event: this.event_type };
            if (this.selects && this.selects[0].evt_id) {
                req.evt_id = this.selects[0].evt_id;
            }
            http.sendGame(req, function (resp) {});
            this.father.removeAllChildren();
        } else {
            if (this.multi_select_panel.active) return;
            for (var i = 0; i < this.selects.length; i++) {
                var select_result = this.selects[i];
                var multi_select = cc.instantiate(this.multi_select_prefab);
                multi_select.getComponent("MultiHandler").init(this.event_type, select_result.evt_id, this.card_type, select_result.value, select_result.value1, select_result.value2, this.father);
                multi_select.parent = this.multi_select_panel;
            }
            this.multi_select_panel.active = true;
        }
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});

cc._RF.pop();