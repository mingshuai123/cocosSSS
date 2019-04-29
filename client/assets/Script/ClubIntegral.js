cc.Class({
    extends: cc.Component,

    properties: {
        editbox: cc.EditBox,
        title: cc.Label,
        usericon: cc.Sprite,
        nickname: cc.Label,
        title: cc.Label,
    },
    onLoad: function () {

    },
    init: function (is_inc, club_id, uid, name, icon, cb) {
        this.is_inc = is_inc
        this.club_id = club_id
        this.uid = uid
        this.name = name
        this.nickname.string = name
        this.editbox.placeholder = is_inc > 0 ? "增加积分" : "扣除积分"
        this.title.string = is_inc > 0 ? "增加积分" : "扣除积分"
        Utils.UrlImage(icon, (err, sprite) => {
            !err && (this.usericon.spriteFrame = sprite)
        })
        this.icon = icon
        this.cb = cb
    },
    onCommit: function () {
        let value = isNaN(parseInt(this.editbox.string)) ? 1 : Math.max(1, parseInt(this.editbox.string))
        this.editbox.string = value
        let content = "玩家:" + this.name + "\nID:" + this.uid + (this.is_inc > 0 ? "\n增加积分数:" : "\n扣除积分数:") + this.editbox.string
        cc.scene.onShowTips("OK_CANCEL", content, () => {
            http.sendHall({ method: "admin_add_integral", club_id: this.club_id, tarid: this.uid, value: (this.is_inc > 0 ? value : -value) }, () => { })
            cc.scene.closePopWin(this.node)
            this.cb(this.is_inc > 0 ? value : -value)
        }, null, this.icon)
        // cs.init(content, "OK_CANCEL", () => {
        //     http.sendHall({ method: "admin_add_integral", club_id: this.club_id, tarid: this.uid, value: (this.is_inc > 0 ? value : -value) }, () => { })
        //     tips.parent = null;
        //     this.close()
        //     this.cb(this.is_inc > 0 ? value : -value)
        // }, () => { tips.parent = null }, this.icon)
        // tips.parent = this.node
    },
});
