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
    onLoad: function () {

    },
    init: function (name, cards) {
        this.role_name.string = name
        let total_hua = 0
        for (let i = 0; i < cards.length; i++) {
            let card = cards[i]
            let card_node = cc.instantiate(this.card_prefab)
            card_node.scale = 1.5
            let cs = card_node.getComponent("OutCard")
            cs.init(4, card.type, card.value, card.num)
            card_node.parent = this.huas

            total_hua += card.num
        }
        this.num.string = "花番x" + total_hua
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
