"use strict";
cc._RF.push(module, '89d84FQZ91LVaG0fFDWms2Q', 'ReportCard');
// Script/ReportCard.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        atlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        jin: {
            default: null,
            type: cc.Node
        },
        hu: {
            default: null,
            type: cc.Node
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
    init: function init(type, value, jin, hu) {
        var sprite_name = 'p4s' + type + '_' + value + "_big";
        var cardframe = this.atlas.getSpriteFrame(sprite_name);
        this.getComponent(cc.Sprite).spriteFrame = cardframe;
        this.jin.active = jin;
        this.hu.active = hu;
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});

cc._RF.pop();