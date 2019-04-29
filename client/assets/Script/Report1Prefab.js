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
    onLoad: function () {

    },
    init: function (seat, name, zhuang, hu, cards, score, detail) {
        this.user_name.string = name
        this.zhuang.active = zhuang
        if (seat != cc.mj.mgr.self_seat) {
            this.self_bg.getComponent(cc.Sprite).spriteFrame = null
        }
        this.hu.active = hu
        this.score.string = score
        this.detail.string = detail

        if (cards) {
            let x = 0
            for (let i = 0; i < cards.length;) {
                let card = Utils.parseCard(cards[i])
                if (card.state != 0 && card.state != 5 && card.state != 6) {
                    let num = (card.state == 1 || card.state == 2) ? 3 : 4
                    for (let j = 0; j < num; j++) {
                        let card_ = Utils.parseCard(cards[i + j])
                        let card_node = cc.instantiate(this.card_prefab)
                        let cs = card_node.getComponent("ReportCard")
                        cs.init(card_.type, card_.value, card_.state == 5, card_.state == 6)
                        card_node.parent = this.cards
                        card_node.x = x
                        x += card_node.width
                    }
                    x += 20
                    i += num
                } else if (card.state == 0 || card.state == 5) {
                    let card_node = cc.instantiate(this.card_prefab)
                    let cs = card_node.getComponent("ReportCard")
                    cs.init(card.type, card.value, card.laizi, card.state == 6)
                    card_node.parent = this.cards
                    card_node.x = x
                    x += card_node.width
                    i += 1
                } else {
                    let card_node = cc.instantiate(this.card_prefab)
                    let cs = card_node.getComponent("ReportCard")
                    cs.init(card.type, card.value, card.laizi, card.state == 6)
                    card_node.parent = this.cards
                    card_node.x = x + 20
                    break
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
