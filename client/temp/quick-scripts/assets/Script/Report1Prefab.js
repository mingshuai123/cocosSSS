(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Report1Prefab.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4395a0ZWRdK26pSjoquh2MA', 'Report1Prefab', __filename);
// Script/Report1Prefab.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        user_name: {
            default: null,
            type: cc.Label
        },
        detail: {
            default: null,
            type: cc.Label
        },
        zhuang: {
            default: null,
            type: cc.Node
        },
        self_bg: {
            default: null,
            type: cc.Node
        },
        hu: {
            default: null,
            type: cc.Node
        },
        score: {
            default: null,
            type: cc.Label
        },
        cards: {
            default: null,
            type: cc.Node
        },
        card_prefab: {
            default: null,
            type: cc.Prefab
        }
    },
    onLoad: function onLoad() {},
    init: function init(seat, name, zhuang, hu, cards, score, detail) {
        this.user_name.string = name;
        this.zhuang.active = zhuang;
        if (seat != cc.mj.mgr.self_seat) {
            this.self_bg.getComponent(cc.Sprite).spriteFrame = null;
        }
        this.hu.active = hu;
        this.score.string = score;
        this.detail.string = detail;

        if (cards) {
            var x = 0;
            for (var i = 0; i < cards.length;) {
                var card = Utils.parseCard(cards[i]);
                if (card.state != 0 && card.state != 5 && card.state != 6) {
                    var num = card.state == 1 || card.state == 2 ? 3 : 4;
                    for (var j = 0; j < num; j++) {
                        var card_ = Utils.parseCard(cards[i + j]);
                        var card_node = cc.instantiate(this.card_prefab);
                        var cs = card_node.getComponent("ReportCard");
                        cs.init(card_.type, card_.value, card_.state == 5, card_.state == 6);
                        card_node.parent = this.cards;
                        card_node.x = x;
                        x += card_node.width;
                    }
                    x += 20;
                    i += num;
                } else if (card.state == 0 || card.state == 5) {
                    var _card_node = cc.instantiate(this.card_prefab);
                    var _cs = _card_node.getComponent("ReportCard");
                    _cs.init(card.type, card.value, card.laizi, card.state == 6);
                    _card_node.parent = this.cards;
                    _card_node.x = x;
                    x += _card_node.width;
                    i += 1;
                } else {
                    var _card_node2 = cc.instantiate(this.card_prefab);
                    var _cs2 = _card_node2.getComponent("ReportCard");
                    _cs2.init(card.type, card.value, card.laizi, card.state == 6);
                    _card_node2.parent = this.cards;
                    _card_node2.x = x + 20;
                    break;
                }
            }
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
        //# sourceMappingURL=Report1Prefab.js.map
        