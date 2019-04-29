"use strict";
cc._RF.push(module, '28afchSLKVBGK1+58C6OkCS', 'MJMgr');
// Script/MJMgr.js

"use strict";

cc.Class({
    extends: cc.Component,
    properties: {},
    statics: {
        initCards: function initCards(cards) {
            this.self_cards = [];
            for (var i = 0; i < cards.length; i++) {
                this.self_cards.push(Utils.parseCard(cards[i]));
            }
            this.new_card = null;
            this.sortCards();
            if (this.self_discard()) {
                this.new_card = this.self_cards[this.self_cards.length - 1];
                this.self_cards = this.self_cards.slice(0, -1);
            }
        },
        self_discard: function self_discard() {
            return this.cur_seat == this.self_seat;
        },
        sortCards: function sortCards() {
            this.self_cards.sort(function (c1, c2) {
                if (c1.laizi) {
                    return -1;
                }
                if (c2.laizi) {
                    return 1;
                }
                if (c1.type > c2.type) {
                    return 1;
                } else if (c1.type == c2.type) {
                    return c1.value < c2.value ? -1 : c1.value == c2.value ? 0 : 1;
                } else {
                    return -1;
                }
            });
        },
        getNewCard: function getNewCard(card) {
            if (this.new_card) {
                this.self_cards.push(this.new_card);
            }
            this.new_card = card;
            if (this.new_card.laizi) {
                this.self_cards.push(this.new_card);
                this.sortCards();
                this.new_card = this.self_cards[this.self_cards.length - 1];
                this.self_cards = this.self_cards.slice(0, -1);
            }
        },
        discard: function discard(card) {
            if (this.new_card && this.new_card.type == card.type && this.new_card.value == card.value) {
                this.new_card = null;
            } else {
                if (this.new_card) {
                    this.self_cards.push(this.new_card);
                    this.sortCards();
                }
                this.new_card = null;
                for (var i = 0; i < this.self_cards.length; i++) {
                    var card_ = this.self_cards[i];
                    if (card_.type != card.type || card_.value != card.value) {
                        continue;
                    }
                    this.self_cards.splice(i, 1);
                    break;
                }
            }
        },
        replaceCard: function replaceCard(card1, card2) {
            // for (let i = 0; i < this.self_cards.length; i++) {
            //     let card_ = this.self_cards[i]
            //     if (card_.type != card1.type || card_.value != card1.value) {
            //         continue
            //     }
            //     this.self_cards[i] = card2
            //     return
            // }
            // if (this.new_card && this.new_card.type == card1.type, this.new_card.value == card1.value) {
            this.new_card = card2;
            // }
        },
        removeCard: function removeCard(type, value, num) {
            if (this.new_card && this.new_card.type == type && this.new_card.value == value) {
                this.new_card = null;
                num -= 1;
            }
            if (!num) {
                return;
            }
            for (var i = 0; i < this.self_cards.length; i++) {
                if (this.self_cards[i].type != type || this.self_cards[i].value != value) {
                    continue;
                }
                this.self_cards.splice(i, num);
                return;
            }
        },
        peng: function peng(type, value) {
            this.removeCard(type, value, 2);
        },
        chi: function chi(type, value1, value2) {
            this.removeCard(type, value1, 1);
            this.removeCard(type, value2, 1);
        },
        gang: function gang(type, value, remove_num) {
            this.removeCard(type, value, remove_num);
        },
        kaijin: function kaijin(type, value) {
            if (this.new_card) {
                this.self_cards.push(this.new_card);
            }
            for (var i = 0; i < this.self_cards.length; i++) {
                if (this.self_cards[i].type != type || this.self_cards[i].value != value) {
                    continue;
                }
                this.self_cards[i].laizi = true;
            }
            this.sortCards();
            if (this.self_discard()) {
                this.new_card = this.self_cards[this.self_cards.length - 1];
                this.self_cards = this.self_cards.slice(0, -1);
            }
        },
        debug: function debug() {
            console.log(this.self_cards, this.new_card);
        },
        reset: function reset() {
            this.self_cards = null;
            this.new_card = null;
        }
    },
    init: function init() {
        this.cur_seat = null;
        this.self_seat = null;
        this.self_cards = [];
        this.new_card = null;
        this.recover = false;
        this.paused = false;
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});

cc._RF.pop();