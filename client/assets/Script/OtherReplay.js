var RESP_STR = {
    0: "申请成功，请等待俱乐部管理员审核通过",
    10017: "俱乐部ID错误，请联系代理确认ID",
    10016: "已加入其他俱乐部"
}
cc.Class({
    extends: cc.Component,

    properties: {
        input_code: {
            default: null,
            type: cc.EditBox
        },
        replay_prefab: {
            default: null,
            type: cc.Prefab
        }
    },
    onLoad: function () {
        this.code = null
    },
    onClickClear: function () {
        this.clear()
    },
    onInputEnd: function (e) {
        this.code = e.string
    },
    onCheckOtherReplay: function () {
        http.sendHall({ method: "game_replay_with_code", code: this.input_code.string }, (resp) => {
            if (resp.errno) {
                cc.scene.onShowTips("OK", "你输入的分享码有错")
            } else {
                cc.mjroom = resp.room_info
                cc.mj.mgr.self_seat = resp.seat
                cc.mj.mgr.replay = true
                try {
                    cc.scene.showPrefab("录像", true, (node) => {
                        node.getComponent("Replay").init(resp.detail)
                    })
                } catch (e) {
                    console.log(e)
                }
            }
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
