var RESP_STR = {
    0: "申请成功，请等待俱乐部管理员审核通过",
    10017: "俱乐部ID错误，请联系代理确认ID",
    10016: "已加入该俱乐部"
}
cc.Class({
    extends: cc.Component,

    properties: {
        input_id: cc.Label,
    },
    onLoad: function () {
        this.input = []
    },
    onClickClear: function () {
        this.clear()
    },
    onClickNum: function (e, num) {
        this.input.push(num)
        this.input_id.string = this.input.join("")
    },
    onClickClose: function () {
        this.father.parent = null
    },
    onClickDel: function () {
        this.input.splice(this.input.length - 1, 1)
        this.input_id.string = this.input.join("")
    },
    onRequestJoin: function () {
        http.sendHall({ method: "join_club", club_id: this.input.join("") }, (resp) => {
            let tips_content = RESP_STR[resp.errno]
            cc.scene.onShowTips("OK", tips_content)
        })
    },
    clear: function () {
        this.input = []
        this.input_id.string = "请输入俱乐部ID(数字)"
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
