cc.Class({
    extends: cc.Component,
    properties: {

    },
    statics: {
        initCards: function (cards) {
            this.self_cards = []
            for (let i = 0; i < cards.length; i++) {
                this.self_cards.push(Utils.parseCard(cards[i]))
            }
            this.new_card = null
            this.sortCards()
            if (this.self_discard()) {
                this.new_card = this.self_cards[this.self_cards.length - 1]
                this.self_cards = this.self_cards.slice(0, -1)
            }
        },
        self_discard: function () {
            return this.cur_seat == this.self_seat
        },
        sortCards: function () {
            this.self_cards.sort((c1, c2) => {
                if (c1.laizi) {
                    return -1
                }
                if (c2.laizi) {
                    return 1
                }
                if (c1.type > c2.type) {
                    return 1
                } else if (c1.type == c2.type) {
                    return c1.value < c2.value ? -1 : (c1.value == c2.value ? 0 : 1)
                } else {
                    return -1
                }
            })
        },
        getNewCard: function (card) {
            if (this.new_card) {
                this.self_cards.push(this.new_card)
            }
            this.new_card = card
            if (this.new_card.laizi) {
                this.self_cards.push(this.new_card)
                this.sortCards()
                this.new_card = this.self_cards[this.self_cards.length - 1]
                this.self_cards = this.self_cards.slice(0, -1)
            }
        },
        discard: function (card) {
            if (this.new_card && this.new_card.type == card.type && this.new_card.value == card.value) {
                this.new_card = null
            } else {
                if (this.new_card) {
                    this.self_cards.push(this.new_card)
                    this.sortCards()
                }
                this.new_card = null
                for (let i = 0; i < this.self_cards.length; i++) {
                    let card_ = this.self_cards[i]
                    if (card_.type != card.type || card_.value != card.value) {
                        continue
                    }
                    this.self_cards.splice(i, 1)
                    break
                }
            }
        },
        replaceCard: function (card1, card2) {
            // for (let i = 0; i < this.self_cards.length; i++) {
            //     let card_ = this.self_cards[i]
            //     if (card_.type != card1.type || card_.value != card1.value) {
            //         continue
            //     }
            //     this.self_cards[i] = card2
            //     return
            // }
            // if (this.new_card && this.new_card.type == card1.type, this.new_card.value == card1.value) {
            this.new_card = card2
            // }
        },
        removeCard: function (type, value, num) {
            if (this.new_card && this.new_card.type == type && this.new_card.value == value) {
                this.new_card = null
                num -= 1
            }
            if (!num) {
                return
            }
            for (let i = 0; i < this.self_cards.length; i++) {
                if (this.self_cards[i].type != type || this.self_cards[i].value != value) {
                    continue
                }
                this.self_cards.splice(i, num)
                return
            }
        },
        peng: function (type, value) {
            this.removeCard(type, value, 2)
        },
        chi: function (type, value1, value2) {
            this.removeCard(type, value1, 1)
            this.removeCard(type, value2, 1)
        },
        gang: function (type, value, remove_num) {
            this.removeCard(type, value, remove_num)
        },
        kaijin: function (type, value) {
            if (this.new_card) {
                this.self_cards.push(this.new_card)
            }
            for (let i = 0; i < this.self_cards.length; i++) {
                if (this.self_cards[i].type != type || this.self_cards[i].value != value) {
                    continue
                }
                this.self_cards[i].laizi = true
            }
            this.sortCards()
            if (this.self_discard()) {
                this.new_card = this.self_cards[this.self_cards.length - 1]
                this.self_cards = this.self_cards.slice(0, -1)
            }
        },
        debug: function () {
            console.log(this.self_cards, this.new_card)
        },
        reset: function () {
            this.self_cards = null
            this.new_card = null
        }
    },
    init: function () {
        this.cur_seat = null
        this.self_seat = null
        this.self_cards = []
        this.new_card = null
        this.recover = false
        this.paused = false
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
