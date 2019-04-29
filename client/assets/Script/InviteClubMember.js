cc.Class({
    extends: cc.Component,

    properties: {
        user_name: {
            default: null,
            type: cc.Label
        },
        icon: {
            default: null,
            type: cc.Node
        },
        uid: {
            default: null,
            type: cc.Label
        },
        status: {
            default: null,
            type: cc.Label
        },
        btn_invite: {
            default: null,
            type: cc.Node
        },
    },
    onLoad: function () {
        this.btn_invite.on(cc.Node.EventType.TOUCH_END, this.invite.bind(this))
    },
    init: function (data) {
        this.tarid = data.uid
        this.user_name.string = data.nickname
        this.uid.string = "ID：" + data.uid
        if (data.status == "ONLINE") {
            this.btn_invite.active = true
        } else {
            this.status.node.active = true
            this.status.string = data.status == "PLAYING" ? "牌局中" : "离线"
        }
        Utils.UrlImage(data.icon, (err, sprite) => {
            !err && (this.icon.getComponent(cc.Sprite).spriteFrame = sprite)
        })
    },
    invite: function () {
        let info = {}
        info.info = cc.mjroom
        info.name = cc.mj.user.nickname
        info.club_id = cc.mj.user.club_id
        this.status.node.active = true
        this.btn_invite.active = false
        this.status.string = "已邀请"
        http.sendHall({ method: "invite", tarid: this.tarid, info: JSON.stringify(info) }, (resp) => { })
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
