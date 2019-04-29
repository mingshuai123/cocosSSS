"use strict";
cc._RF.push(module, 'bf13b9YrEdCka2qS3xzuF79', 'RoleHuaPrefab');
// Script/RoleHuaPrefab.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        role_name: {
            default: null,
            type: cc.Label
        },
        num: {
            default: null,
            type: cc.Label
        },
        huas: {
            default: null,
            type: cc.Node
        },
        card_prefab: {
            default: null,
            type: cc.Prefab
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
        } },
    onLoad: function onLoad() {},
    init: function init(name, cards) {
        this.role_name.string = name;
        var total_hua = 0;
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            var card_node = cc.instantiate(this.card_prefab);
            card_node.scale = 1.5;
            var cs = card_node.getComponent("OutCard");
            cs.init(4, card.type, card.value, card.num);
            card_node.parent = this.huas;

            total_hua += card.num;
        }
        this.num.string = "花番x" + total_hua;
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});

cc._RF.pop();