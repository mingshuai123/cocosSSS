cc.Class({
    extends: cc.Component,

    properties: {
        icon: {
            default: null,
            type: cc.Node
        },
        created: {
            default: null,
            type: cc.Label
        },
        btn_kick: {
            default: null,
            type: cc.Node
        },
        label_integral: cc.Label,
        node_integral: cc.Node,
        node_xx: cc.Node,
        btn_integral_inc: {
            default: null,
            type: cc.Node
        },
        btn_integral_dec: {
            default: null,
            type: cc.Node
        },
        btn_agree: {
            default: null,
            type: cc.Node
        },
        btn_refuse: {
            default: null,
            type: cc.Node
        },
        role_name: {
            default: null,
            type: cc.Label
        },
        role_id: {
            default: null,
            type: cc.Label
        },
        admin: {
            default: null,
            type: cc.Node
        },
        value1: {
            default: null,
            type: cc.Label
        },
        value2: {
            default: null,
            type: cc.Label
        },
        inc_integral_prefab: {
            default: null,
            type: cc.Prefab
        },
        dec_integral_prefab: {
            default: null,
            type: cc.Prefab
        },
        tips_prefab: cc.Prefab,
    },
    onLoad: function () {

    },
    init: function (club_type, club_id, data, type) {
        this.data = data
        this.club_type = club_type
        if (type == "MGR_MEMBER") {
            this.showMember(data)
        } else if (type == "MGR_TIXIAN") {
            this.showTixian()
        }
        else {
            this.showReq(data)
        }
        this.club_id = club_id
        this.role_name.string = data.nickname
        this.role_id.string = "ID：" + data.uid
        this.created.string = data.created.slice(0, 10)
        this.admin.active = data.admin
        Utils.UrlImage(data.icon, (err, sprite) => {
            !err && (this.icon.getComponent(cc.Sprite).spriteFrame = sprite)
        })
    },
    showMember: function () {
        this.integral = ~~this.data.integral
        this.label_integral.string = this.data.integral
        if (this.data.integral < 0) this.label_integral.node.color = new cc.Color(255, 0, 0)
        this.node_integral.active = this.club_type == "INTEGRAL_CLUB"
        this.node_xx.active = this.club_type != "INTEGRAL_CLUB"
        this.btn_integral_inc.on(cc.Node.EventType.TOUCH_START, this.addIntegral.bind(this, 1))
        this.btn_integral_dec.on(cc.Node.EventType.TOUCH_START, this.addIntegral.bind(this, -1))
        this.btn_kick.active = !this.data.admin
        this.btn_kick.on(cc.Node.EventType.TOUCH_START, this.kick.bind(this))
    },
    addIntegral: function (is_inc) {
        cc.scene.showPrefab("增减积分", true, (node) => {
            node.getComponent("ClubIntegral").init(is_inc, this.club_id, this.data.uid, this.data.nickname, this.data.icon, (val) => {
                this.integral += val
                this.label_integral.string = this.integral
            })
        })
    },
    showReq: function () {
        this.btn_agree.active = true
        this.btn_agree.on(cc.Node.EventType.TOUCH_START, this.agree.bind(this))
        this.btn_refuse.active = true
        this.btn_refuse.on(cc.Node.EventType.TOUCH_START, this.refuse.bind(this))
    },
    showTixian: function () {
        this.btn_agree.active = true
        this.btn_agree.on(cc.Node.EventType.TOUCH_START, this.handle_tixian_req.bind(this, "AGREE"))
        this.btn_refuse.active = true
        this.btn_refuse.on(cc.Node.EventType.TOUCH_START, this.handle_tixian_req.bind(this, "REFUSE"))
        this.value1.node.active = true
        this.value2.node.active = true
        this.value1.string = pad(this.data.total_integral, 4)
        this.value2.string = pad(this.data.remainder_integral, 4)
    },
    kick: function () {
        let tips = cc.instantiate(this.tips_prefab)
        tips.parent = this.node.parent.parent.parent.parent
        let cs = tips.getChildByName("Tips").getComponent("Tips")
        let content = "是否确认踢出该成员"
        cs.init(content, "OK_CANCEL", () => {
            tips.parent = null
            http.sendHall({ method: "kick_club_member", club_id: this.club_id, tarid: this.data.uid }, (resp) => { this.zIndex = 999; this.remove_self() })
        }, () => {
            tips.parent = null
        })

        // http.sendHall({ method: "kick_club_member", club_id: this.club_id, tarid: this.data.uid }, (resp) => { this.remove_self() })
    },
    agree: function () {
        http.sendHall({ method: "handle_club_req", club_id: this.club_id, tarid: this.data.uid, status: "AGREE" }, (resp) => { this.remove_self() })
    },
    refuse: function () {
        http.sendHall({ method: "handle_club_req", club_id: this.club_id, tarid: this.data.uid, status: "REFUSE" }, (resp) => { this.remove_self() })
    },
    handle_tixian_req: function (status) {
        http.sendHall({ method: "handle_tixian_req", club_id: this.club_id, order_id: this.data.order_id, status: status }, (resp) => { this.remove_self() })
    },
    remove_self: function () {
        this.node.parent = null
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
