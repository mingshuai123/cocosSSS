(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/EventCard.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '09cbbBKFXNI9pvoPwrd6ZUS', 'EventCard', __filename);
// Script/EventCard.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
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
        },
        card4: {
            default: null,
            type: cc.Node
        },
        atlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        atlas_big: {
            default: null,
            type: cc.SpriteAtlas
        },
        dir: {
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
    init: function init(dir, from_dir, event, type, value, state, value1, value2) {
        var atlas = cc.mj.user.mjStyleBig() ? this.atlas_big : this.atlas;
        var ext = cc.mj.user.mjStyleBig() ? "_big" : "";
        this.event = event;
        this.type = type;
        this.value = value;

        this.card4.active = false;
        // 杠
        if (event == 4) {
            this.state = state;
            this.card4.active = true;
            // 暗杆
            if (this.state == 4) {
                var cardframe = this.atlas.getSpriteFrame('tdbgs_' + dir);
                this.card1.getComponent(cc.Sprite).spriteFrame = cardframe;
                this.card2.getComponent(cc.Sprite).spriteFrame = cardframe;
                this.card3.getComponent(cc.Sprite).spriteFrame = cardframe;

                if (dir == 4) {
                    var cardframe1 = atlas.getSpriteFrame('p' + dir + 's' + type + '_' + value + ext);
                    this.card4.getComponent(cc.Sprite).spriteFrame = cardframe1;
                } else {
                    this.card4.getComponent(cc.Sprite).spriteFrame = cardframe;
                }
            } else {
                var _cardframe = atlas.getSpriteFrame('p' + dir + 's' + type + '_' + value + ext);
                this.card1.getComponent(cc.Sprite).spriteFrame = _cardframe;
                this.card2.getComponent(cc.Sprite).spriteFrame = _cardframe;
                this.card3.getComponent(cc.Sprite).spriteFrame = _cardframe;
                this.card4.getComponent(cc.Sprite).spriteFrame = _cardframe;
            }
        } else if (event == 3) {
            var _cardframe2 = atlas.getSpriteFrame('p' + dir + 's' + type + '_' + value + ext);
            this.card1.getComponent(cc.Sprite).spriteFrame = _cardframe2;
            this.card2.getComponent(cc.Sprite).spriteFrame = _cardframe2;
            this.card3.getComponent(cc.Sprite).spriteFrame = _cardframe2;
            //碰
        } else if (event == 2) {
            // 吃
            this.value1 = value1;
            this.value2 = value2;

            var card1frame = atlas.getSpriteFrame('p' + dir + 's' + type + '_' + value1 + ext);
            this.card1.getComponent(cc.Sprite).spriteFrame = card1frame;
            var card2frame = atlas.getSpriteFrame('p' + dir + 's' + type + '_' + value + ext);
            this.card2.getComponent(cc.Sprite).spriteFrame = card2frame;
            var card3frame = atlas.getSpriteFrame('p' + dir + 's' + type + '_' + value2 + ext);
            this.card3.getComponent(cc.Sprite).spriteFrame = card3frame;
        }
        if (from_dir == dir) {
            this.dir.active = false;
        } else {
            var dir_angle = {
                1: { 2: 0, 3: -90, 4: 180 },
                2: { 1: 90, 3: -90, 4: 180 },
                3: { 1: 90, 2: 0, 4: 180 },
                4: { 1: 90, 2: 0, 3: -90 }
            };
            var sprite = this.dir.getComponent(cc.Sprite);
            this.dir && (sprite.node.rotation = dir_angle[dir][from_dir]);
        }
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
        //# sourceMappingURL=EventCard.js.map
        