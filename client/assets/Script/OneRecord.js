cc.Class({
    extends: cc.Component,

    properties: {
        created: {
            default: null,
            type: cc.Label
        },
        value: {
            default: null,
            type: cc.Label
        },
        remainder_value: {
            default: null,
            type: cc.Label
        },
        usage: {
            default: null,
            type: cc.Label
        },
    },
    onLoad: function () {

    },
    init: function (data) {
        this.created.string = data.created.slice(5, 16)
        if (data.integral > 0) {
            this.value.string = '+' + data.integral
            this.value.node.color = new cc.color(0, 0, 255, 255)
        } else {
            this.value.string = data.integral
            this.value.node.color = new cc.color(0, 255, 0, 255)
        }
        this.remainder_value.string = data.remainder_value
        this.usage.string = data.usage
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
