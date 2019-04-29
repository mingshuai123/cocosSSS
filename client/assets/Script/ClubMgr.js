
cc.Class({
    extends: cc.Component,

    properties: {
        club_member_prefab: {
            default: null,
            type: cc.Prefab
        },
        club_join_exit_prefab: {
            default: null,
            type: cc.Prefab
        },
        club_tixian_prefab: {
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
        time_title: {
            default: null,
            type: cc.Label
        },
        title_4: {
            default: null,
            type: cc.Node
        },
        title_5: cc.Node,
        title_6: {
            default: null,
            type: cc.Node
        },
        toggle_tixian: {
            default: null,
            type: cc.Node
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
    onLoad: function () {
        cc.cur_club.club_type == "INTEGRAL_CLUB" && (this.toggle_tixian.active = true)
        this.onMgrMember()
    },
    showXX: function (items, type) {
        this.content.removeAllChildren()
        this.load_idx = 0
        this.items = items
        this.type = type
        for (let i = 0; i < 20 && i < items.length; i++) {
            let node = cc.instantiate(this.club_xx_prefab)
            node.getComponent("OneClubXX").init(cc.cur_club.club_type, cc.cur_club.club_id, items[i], type)
            node.parent = this.content
            this.load_idx += 1
        }
    },
    onMgrMember: function () {
        this.title_5.active = true
        this.title_4.active = false
        this.title_6.active = false
        this.time_title.string = "加入时间"
        http.sendTick({ method: "club.members", club_id: cc.cur_club.club_id }, (resp) => {
            this.club_xx_prefab = this.club_member_prefab


            let dayu_0_arr = []
            let xiaoyu_0_arr = []
            let dengyu_0_arr = []
            for (let i = 0; i < resp.members.length; i++) {
                let req = resp.members[i]
                req.integral = ~~req.integral
                if (req.integral > 0) dayu_0_arr.push(req)
                else if (req.integral == 0) dengyu_0_arr.push(req)
                else xiaoyu_0_arr.push(req)
            }
            dayu_0_arr.sort((m1, m2) => { return m1.integral < m2.integral ? 1 : m1.integral == m2.integral ? 0 : -1 })

            xiaoyu_0_arr.sort((m1, m2) => { return m1.integral < m2.integral ? -1 : m1.integral == m2.integral ? 0 : 1 })
            let members = []
            members = members.concat(xiaoyu_0_arr)
            members = members.concat(dayu_0_arr)
            members = members.concat(dengyu_0_arr)

            this.showXX(members, "MGR_MEMBER")
        })
    },
    onMgrJoin: function () {
        this.title_4.active = true
        this.title_5.active = false
        this.title_6.active = false
        this.time_title.string = "申请时间"
        http.sendHall({ method: "club_reqs", club_id: cc.cur_club.club_id , type: "JOIN" }, (resp) => {
            this.club_xx_prefab = this.club_join_exit_prefab
            this.showXX(resp.reqs, "JOIN")
        })
    },
    onMgrExit: function () {
        this.title_4.active = true
        this.title_5.active = false
        this.title_6.active = false
        this.time_title.string = "申请时间"
        http.sendHall({ method: "club_reqs", club_id: cc.cur_club.club_id , type: "EXIT" }, (resp) => {
            this.club_xx_prefab = this.club_join_exit_prefab
            this.showXX(resp.reqs, "EXIT")
        })
    },
    onMgrTixian: function () {
        this.title_4.active = false
        this.title_5.active = false
        this.title_6.active = true
        http.sendHall({ method: "tixian_reqs", club_id: this.club_id }, (resp) => {
            this.club_xx_prefab = this.club_tixian_prefab
            this.showXX(resp.reqs, "MGR_TIXIAN")
        })
    },
    onBack: function () {
        this.node.parent.parent = null
    },
    scrollEvent: function (sender, event) {
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    update(dt) {
        if (this.items && this.load_idx < this.items.length) {
            let node = cc.instantiate(this.club_xx_prefab)
            node.getComponent("OneClubXX").init(this.club_type, this.club_id, this.items[this.load_idx], this.type)
            node.parent = this.content
            this.load_idx += 1
        }
    },
});
