var RESP_STR = {
    0: "申请成功，请等待俱乐部管理员审核通过",
    10017: "俱乐部ID错误，请联系代理确认ID",
    10016: "已加入其他俱乐部"
}
cc.Class({
    extends: cc.Component,

    properties: {
        editbox: {
            default: null,
            type: cc.EditBox
        },
        notice: {
            default: null,
            type: cc.Label
        },
    },
    onLoad: function () {
        this.notice.string = "请联系官方微信号成为代理：" + cc.mj.game_cfg.system_wx + "【微信】"
        http.sendHall({ method: "agent_info" }, (resp) => {
            if (resp.info) {
                this.editbox.placeholder = "您已提交过个人联系信息：" + resp.info
            }
        })
    },
    onCommit: function () {
        http.sendHall({ method: "agent_req", info: this.editbox.string }, (resp) => {
            this.editbox.placeholder = "您已提交过个人联系信息：" + this.editbox.string
            this.editbox.string = ""
            cc.scene.onShowTips("OK", "您提交信息已上传，稍后我们会与您联系。")
        })
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
