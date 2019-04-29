
cc.Class({
    extends: cc.Component,

    properties: {
        one_round_prefab: {
            default: null,
            type: cc.Prefab
        },
        content: {
            default: null,
            type: cc.Node
        },
        btn_close: {
            default: null,
            type: cc.Node
        },
        waiting_prefab: {
            default: null,
            type: cc.Prefab
        },
        other_replay_prefab: {
            default: null,
            type: cc.Prefab
        },
        btn_other_replay: {
            default: null,
            type: cc.Node
        },
    },
    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, () => { })
        this.btn_close.on(cc.Node.EventType.TOUCH_START, () => { this.node.parent = null })
        this.btn_other_replay.on(cc.Node.EventType.TOUCH_START, () => {
            let node = cc.instantiate(this.other_replay_prefab)
            node.parent = this.node
        })
    },
    init: function (data, names) {
        for (let i = 0; i < names.length; i++) {
            let name = this.node.getChildByName("name" + (i + 1))
            name.active = true
            name.getComponent(cc.Label).string = names[i]

            let line = this.node.getChildByName("icon_line_" + (i + 1))
            line && (line.active = true)
        }
        for (let i = 0; i < data.rounds.length; i++) {
            let round = data.rounds[i]
            let node = cc.instantiate(this.one_round_prefab)
            node.getComponent("OneRound").init(round)
            node.parent = this.content
            node.setPosition(0, -(node.height + 15) * i);
            this.content.height = (node.height + 15) * (i + 1)
        }
    },
    scrollEvent: function (sender, event) {
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
