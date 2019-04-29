cc.Class({
    extends: cc.Component,

    properties: {
        msg: {
            default: null,
            type: cc.Label
        }
    },
    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick.bind(this))
    },
    init: function (msg, cb) {
        this.msg.string = msg
        this.cb = cb
        this.node.width = 32 * msg.length + 4
    },
    onClick: function () {
        this.cb && this.cb()
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
