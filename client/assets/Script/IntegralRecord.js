
cc.Class({
    extends: cc.Component,

    properties: {
        one_record_prefab: {
            default: null,
            type: cc.Prefab
        },
        content: {
            default: null,
            type: cc.Node
        },
        waiting_prefab: {
            default: null,
            type: cc.Prefab
        },
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
    init: function (club_id) {
        this.node.on(cc.Node.EventType.TOUCH_START, () => { this.node.parent = null })
        let waiting = cc.instantiate(this.waiting_prefab)
        waiting.getComponent("Waiting").init("正在获取积分记录")
        waiting.parent = this.node
        setTimeout(() => {
            waiting.parent = null
        }, 300)
        http.sendHall({ method: "integral_history", club_id: club_id }, (resp) => {
            this.showHistories(resp)
        })
    },
    showHistories: function (resp) {
        this.load_idx = 0
        this.records = resp.records
        for (let i = 0; i < 20 && i < resp.records.length; i++) {
            let record = resp.records[i]
            let node = cc.instantiate(this.one_record_prefab)
            node.getComponent("OneRecord").init(record)
            node.parent = this.content
            node.setPosition(0, -(node.height + 15) * i);
            this.content.height = (node.height + 15) * (i + 1)
        }
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    update(dt) {
        if (this.records && this.load_idx < this.records.length) {
            let record = this.records[this.load_idx]
            let node = cc.instantiate(this.one_record_prefab)
            node.getComponent("OneRecord").init(record)
            node.parent = this.content
            node.setPosition(0, -(node.height + 15) * this.load_idx);
            this.content.height = (node.height + 15) * (this.load_idx + 1)
            this.load_idx += 1
        }
    },
});
