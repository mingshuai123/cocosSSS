cc.Class({
    extends: cc.Component,

    properties: {
        bg_selected: cc.Node,
        club_name: cc.Label,
    },
    init: function (data, cb) {
        this.type = data.type
        this.club_name.string = data.type == 0 ? '麻将' :data.type == 1 ? '经典场' : data.type == 2 ? '循环场' : data.type == 3 ? '全一色' :'王牌场'
        this.cb = cb
    },
    selected: function () {
        this.bg_selected.active = true
    },
    unSelected: function () {
        this.bg_selected.active = false
    },
    onClick: function () {
        this.cb && this.cb(this)
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
