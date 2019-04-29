var ScenePopWin = require('./lib/ScenePopWin')

cc.Class({
    extends: ScenePopWin,
    seat: null,
    properties: {
        right: {
            default: null,
            type: cc.Node
        },
        up: {
            default: null,
            type: cc.Node
        },
        left: {
            default: null,
            type: cc.Node
        },
        bottom: {
            default: null,
            type: cc.Node
        },
        self_cur_card_prefab: {
            default: null,
            type: cc.Prefab
        },
        self_out_card_prefab: {
            default: null,
            type: cc.Prefab
        },
        self_peng_prefab: {
            default: null,
            type: cc.Prefab
        },
        self_out_card_big_prefab: {
            default: null,
            type: cc.Prefab
        },
        left_cur_card_prefab: {
            default: null,
            type: cc.Prefab
        },
        left_peng_prefab: {
            default: null,
            type: cc.Prefab
        },
        left_out_card_prefab: {
            default: null,
            type: cc.Prefab
        },
        left_out_card_big_prefab: {
            default: null,
            type: cc.Prefab
        },
        up_peng_gang_prefab: {
            default: null,
            type: cc.Prefab
        },
        up_cur_card_prefab: {
            default: null,
            type: cc.Prefab
        },
        up_out_card_prefab: {
            default: null,
            type: cc.Prefab
        },
        up_out_card_big_prefab: {
            default: null,
            type: cc.Prefab
        },
        right_peng_gang_prefab: {
            default: null,
            type: cc.Prefab
        },
        right_cur_card_prefab: {
            default: null,
            type: cc.Prefab
        },
        right_out_card_prefab: {
            default: null,
            type: cc.Prefab
        },
        right_out_card_big_prefab: {
            default: null,
            type: cc.Prefab
        },
        self_turn: {
            default: null,
            type: cc.Node
        },
        left_turn: {
            default: null,
            type: cc.Node
        },
        up_turn: {
            default: null,
            type: cc.Node
        },
        right_turn: {
            default: null,
            type: cc.Node
        },
        deadline: {
            default: null,
            type: cc.Label
        },
        ani_hua_prefab: {
            default: null,
            type: cc.Prefab
        },
        ani_kaijin_prefab: {
            default: null,
            type: cc.Prefab
        },
        header_prefab: {
            default: null,
            type: cc.Prefab
        },
        event_handler_prefab: {
            default: null,
            type: cc.Prefab
        },
        remainder_cards: {
            default: null,
            type: cc.Label
        },
        total_round: {
            default: null,
            type: cc.Label
        },
        cur_round: {
            default: null,
            type: cc.Label
        },
        jin_card: {
            default: null,
            type: cc.Node
        },
        ani_event_prefab: {
            default: null,
            type: cc.Prefab
        },
        tips_prefab: {
            default: null,
            type: cc.Prefab
        },
        hua_show_prefab: {
            default: null,
            type: cc.Prefab
        },
        invite_prefab: {
            default: null,
            type: cc.Prefab
        },
        dismiss_msg_prefab: {
            default: null,
            type: cc.Prefab
        },
        game_setting_prefab: {
            default: null,
            type: cc.Prefab
        },
        chat_prefab: {
            default: null,
            type: cc.Prefab
        },
        right_chat_prefab: {
            default: null,
            type: cc.Prefab
        },
        up_chat_prefab: {
            default: null,
            type: cc.Prefab
        },
        left_chat_prefab: {
            default: null,
            type: cc.Prefab
        },
        bottom_chat_prefab: {
            default: null,
            type: cc.Prefab
        },
        biaoqing_prefab: {
            default: null,
            type: cc.Prefab
        },
        btn_back: cc.Node,
        btn_dismiss: cc.Node,
        btn_invite_club: cc.Node,
        btn_invite_wx: cc.Node
    },
    findNode: function (dir, name) {
        let node_names = name.split(".")
        let node = this.dir_dict[dir]
        for (let i = 0; i < node_names.length; i++) {
            node = node.getChildByName(node_names[i])
        }
        return node
    },
    randomInit: function (dir) {
        let peng_pang_num = parseInt(Math.random() * 5)
        if (!peng_pang_num) {
            this.findNode(dir, "cur.event").active = false
        }
        for (let i = 0; i < peng_pang_num; i++) {
            let peng = cc.instantiate(this.peng_prefab_dict[dir])
            peng.getComponent("EventCard").init(dir, parseInt(Math.random() * 3 + 1), parseInt(Math.random() * 9 + 1))
            peng.parent = this.findNode(dir, "cur.event")
        }
        for (let i = 0; i < 17 - peng_pang_num * 3 - 1; i++) {
            let self_cur_card_prefab = cc.instantiate(this.cur_card_prefab_dict[dir]);
            let card_script = self_cur_card_prefab.getComponent("CurCard")
            if (card_script) {
                card_script.init(dir, parseInt(Math.random() * 3 + 1), parseInt(Math.random() * 9 + 1))
            }
            self_cur_card_prefab.parent = this.findNode(dir, "cur.normal.old")
        }

        let self_new_card = cc.instantiate(this.cur_card_prefab_dict[dir]);
        self_new_card.parent = this.findNode(dir, "cur.normal.new")

        let out_cards_num = parseInt(Math.random() * 12 + 2)
        if (dir != 1) {
            for (let i = 0; i < out_cards_num; i++) {
                let self_cur_card_prefab = cc.instantiate(this.out_card_prefab_dict[dir]);
                let card_script = self_cur_card_prefab.getComponent("OutCard")
                if (card_script) {
                    card_script.init(dir, parseInt(Math.random() * 3 + 1), parseInt(Math.random() * 9 + 1))
                }
                self_cur_card_prefab.parent = this.findNode(dir, "out")
            }
        } else {
            let cards_arr = []
            for (let i = 0; i < out_cards_num; i++) {
                cards_arr.push({ type: parseInt(Math.random() * 3 + 1), value: parseInt(Math.random() * 9 + 1) })
            }
            out_cards_num = parseInt(out_cards_num / 10 + 1) * 10
            for (let i = cards_arr.length; i < out_cards_num; i++) {
                cards_arr.push({ type: null, value: null })
            }
            for (let i = 0; i < parseInt(out_cards_num / 10); i++) {
                for (let j = 9; j >= 0; j--) {
                    let self_cur_card_prefab = cc.instantiate(this.out_card_prefab_dict[dir]);
                    let card_script = self_cur_card_prefab.getComponent("OutCard")
                    let idx = i * 10 + j
                    if (card_script) {
                        card_script.init(dir, cards_arr[idx].type, cards_arr[idx].value)
                    }
                    self_cur_card_prefab.parent = this.out_cards_pathis.findNode(dir, "out")
                }
            }
        }

    },
    refreshRightOutCard: function (data) {
        for (let i = 0; i < this.right_out_cards.length; i++) {
            this.right_out_cards[i].last_discard = false
        }
        data.last_discard = true
        this.right_out_cards.push(data)
        let dir = 1
        let cards_arr = JSON.parse(JSON.stringify(this.right_out_cards))
        let out_cards_num = cards_arr.length
        out_cards_num = parseInt(out_cards_num / 10 + 1) * 10
        for (let i = cards_arr.length; i < out_cards_num; i++) {
            cards_arr.push({ type: null, value: null })
        }
        let out_panel = this.findNode(dir, "out")
        let node_out_cards = []
        for (let i = 0; i < out_panel._children.length; i++) {
            node_out_cards.push(out_panel._children[i])
        }
        out_panel.removeAllChildren()

        let num = 0
        for (let i = 0; i < parseInt(out_cards_num / 10); i++) {
            for (let j = 9; j >= 0; j--) {
                num += 1
                let idx = i * 10 + j
                let card = cards_arr[idx]
                let out_card = null
                if (card.last_discard) {
                    out_card = this.last_out_card
                    out_card.getComponent("OutCard").start_play()
                } else {
                    if (num <= node_out_cards.length) {
                        out_card = node_out_cards[num - 1]
                    } else {
                        out_card = cc.instantiate(this.out_card_prefab_dict[dir]);
                    }
                    let cs = out_card.getComponent("OutCard")
                    cs.init(dir, card.type, card.value)
                }
                out_card.parent = out_panel
            }
        }

        // for (let i = 0; i < parseInt(out_cards_num / 10); i++) {
        //     for (let j = 9; j >= 0; j--) {
        //         let idx = i * 10 + j
        //         let card = cards_arr[idx]
        //         let out_card = null
        //         if (card.last_discard) {
        //             out_card = this.last_out_card
        //             out_card.getComponent("OutCard").start_play()
        //         } else {
        //             out_card = cc.instantiate(this.out_card_prefab_dict[dir]);
        //             let cs = out_card.getComponent("OutCard")
        //             cs.init(dir, card.type, card.value)
        //         }
        //         out_card.parent = out_panel
        //     }
        // }
    },
    initComponents: function () {
        this.dir_dict = {
            1: this.right,
            2: this.up,
            3: this.left,
            4: this.bottom
        }
        this.peng_prefab_dict = {
            1: this.right_peng_gang_prefab,
            2: this.up_peng_gang_prefab,
            3: this.left_peng_prefab,
            4: this.self_peng_prefab
        }
        this.cur_card_prefab_dict = {
            1: this.right_cur_card_prefab,
            2: this.up_cur_card_prefab,
            3: this.left_cur_card_prefab,
            4: this.self_cur_card_prefab
        }
        this.out_card_prefab_dict = {
            1: this.right_out_card_prefab,
            2: this.up_out_card_prefab,
            3: this.left_out_card_prefab,
            4: this.self_out_card_prefab,
        }
        this.out_card_big_prefab_dict = {
            1: this.right_out_card_big_prefab,
            2: this.up_out_card_big_prefab,
            3: this.left_out_card_big_prefab,
            4: this.self_out_card_big_prefab,
        }
        this.turn_dict = {
            1: this.right_turn,
            2: this.up_turn,
            3: this.left_turn,
            4: this.self_turn
        }
        this.chat_dict = {
            1: this.right_chat_prefab,
            2: this.up_chat_prefab,
            3: this.left_chat_prefab,
            4: this.bottom_chat_prefab
        }
    },
    // use this for initialization
    initSelfCards: function (resp) {
        this.findNode(this.dir, "cur.event").removeAllChildren()
        this.findNode(this.dir, "cur.normal.old").removeAllChildren()
        this.findNode(this.dir, "cur.normal.new").removeAllChildren()
        this.findNode(this.dir, "out").removeAllChildren()

        for (let i = 0; i < resp.roles.length; i++) {
            if (resp.roles[i].uid == cc.mj.mgr.uid) {
                cc.mj.mgr.initCards(resp.roles[i].cards)
                break
            }
        }
        this.findNode(this.dir, "cur.event").active = false
        let card_len = cc.mj.mgr.self_cards.length
        for (let i = 0; i < card_len; i++) {
            let card = cc.mj.mgr.self_cards[i]
            let cur_card_prefab = cc.instantiate(this.cur_card_prefab_dict[this.dir]);
            cur_card_prefab.getComponent("CurCard").init(this.dir, card.type, card.value, card.laizi, this)
            cur_card_prefab.parent = this.findNode(this.dir, "cur.normal.old")
        }
        if (cc.mj.mgr.new_card) {
            let card = cc.mj.mgr.new_card
            let new_card = cc.instantiate(this.cur_card_prefab_dict[this.dir]);
            new_card.getComponent("CurCard").init(this.dir, card.type, card.value, card.laizi, this)
            new_card.parent = this.findNode(this.dir, "cur.normal.new")
        }

    },
    initOtherCards: function (resp) {
        for (let i = 0; i < resp.roles.length; i++) {
            let role = resp.roles[i]
            if (role.uid == cc.mj.mgr.uid) {
                continue
            }
            let dir = Utils.dirFromSeat(role.seat)
            this.findNode(dir, "cur.event").removeAllChildren()
            this.findNode(dir, "cur.normal.old").removeAllChildren()
            this.findNode(dir, "out").removeAllChildren()
            this.findNode(dir, "cur.normal.new").removeAllChildren()
            this.findNode(dir, "hua").active = false

            let role_cards = role.cards
            this.findNode(dir, "cur.event").active = false
            for (let i = 0; i < role_cards.length; i++) {
                let card = role_cards[i]
                let cur_card_prefab = cc.instantiate(this.cur_card_prefab_dict[dir]);
                cur_card_prefab.parent = this.findNode(dir, "cur.normal.old")
            }
        }
    },
    _onLoad: function () {
        cc.mj.game = this
        this.room = cc.mjroom
        this.bg = cc.find("Canvas/bg_" + cc.mj.user.getStyleBg())
        this.bg.active = true
        this.initTitle()
        cc.audio.playBGM("bgm2.mp3")
        cc.mj.mgr.uid = cc.mj.user.uid
        this.laizi_show = cc.find("Canvas/gaming/laizi")
        this.laizi_show.active = false
        this.right_out_cards = [] //右侧出牌特殊处理
        this.ignore_animation = false
        this.timer_dict = {}
        this.chat_msgs = []

        this.dir = 4
        this.initComponents()
        this.initEvt()
        // this.recoverGame()
        cc.find("Canvas/prepare/option").getComponent(cc.Label).string = this.room.option_text
        this.initBtn()
        this.initInvitionBtn()
        this.regHideShowEvent()

        this.start()
    },
    initBtn: function () {
        this.btn_dismiss.active = this.room.cur_round == 0
        this.btn_invite_club.active = this.room.cur_round == 0 && this.room.club_id != '0'
        this.btn_invite_wx.active = this.room.cur_round == 0
        this.btn_back.active = this.room.owner_uid == cc.mj.user.uid
    },
    onShowChat: function () {
        cc.scene.showPrefab("聊天框", false, (node) => {
            node.getComponent("Chat").init(this.chat_msgs)
        })
    },
    onDismiss: function () {
        let type = this.room.option.type
        if (type == "PERSONAL") {
            if (this.room.owner_uid == cc.mj.user.uid) {
                cc.scene.onShowTips("OK_CANCEL", "解散房间不扣房卡，是否确定解散？", () => {
                    http.sendGame({ method: "exit_game" }, () => { cc.mjroom = null; cc.director.loadScene("hall") })
                })
            } else {
                http.sendGame({ method: "exit_game" }, () => { cc.mjroom = null; cc.director.loadScene("hall") })
            }
        } else {
            cc.club_type = this.room.option.type
            http.sendGame({ method: "exit_game" }, () => { cc.mjroom = null; cc.director.loadScene("club") })
        }
    },
    onShowClubMembers: function () {
        cc.mj.user.club_id = this.room.club_id
        cc.scene.showPrefab("邀请俱乐部成员")
    },
    initInvitionBtn: function () {
        if (this.room.cur_round == 0) {
            let btn_wx = cc.find("Canvas/prepare/invite/btn_invite_wx")
            btn_wx.active = true
            btn_wx.on(cc.Node.EventType.TOUCH_END, this.onShare.bind(this))
        }
    },
    makeShareText() {
        let text = "福宁娱乐："
        text += this.room.option.mj == "fzmj" ? "福州" : "宁德"
        text += (this.room.option.max_role == 2 ? "二" : this.room.option.max_role == 3 ? "三" : "四") + "人, "
        text += "房号：" + this.room.id + "(" + this.room.option.round + "局), "
        text += this.room.option_text + "\n"
        text += "安卓手机点击：" + cc.mj.game_cfg.url_android + "，"
        text += "苹果手机点击：" + cc.mj.game_cfg.url_ios
        return text
    },
    onShare: function () {
        let text = this.makeShareText()
        cc.log(text)

        var share_plugin = anysdk.agentManager.getSharePlugin();
        share_plugin.setListener(this.onShareResult, this);

        var info = {
            shareTo: "0",
            mediaType: "0",
            title: "福宁娱乐",   // title 标题，印象笔记、邮箱、信息、微信、人人网和 QQ 空间使用
            text: text,            // text 是分享文本，所有平台都需要这个字段
        }
        share_plugin.share(info)
    },
    onShareResult: function () {
        switch (code) {
            case anysdk.ShareResultCode.kShareSuccess:
                //do something
                break;
            case anysdk.ShareResultCode.kShareFail:
                //do something
                break;
            case anysdk.ShareResultCode.kShareCancel:
                //do something
                break;
            case anysdk.ShareResultCode.kShareNetworkError:
                //do something
                break;
        }
    },

    init: function (evts) {
        this.evts = evts
    },
    recover: function () {
        if (cc.mj.mgr.recover) {
            cc.log("恢复游戏")
            this.ignore_animation = true
            while (cc.mj.evt.hasEvt()) {
                cc.mj.evt.handleEvt()
            }
            this.ignore_animation = false
            cc.mj.mgr.recover = false
        }
    },
    start: function () {
        this.recover()
        if (!this.finished) {
            Task.resume()
            http.startHeartbeat()
            this.handle_next()
        }
    },
    initTitle: function () {
        let title = this.bg.getChildByName("title").getComponent(cc.Label)
        let _0 = (v) => { return v > 9 ? v : ("0" + v) }
        let cur_time_string = () => {
            var date = new Date();
            let month = _0(date.getMonth() + 1)
            let day = _0(date.getDate())
            let hour = _0(date.getHours())
            let min = _0(date.getMinutes())
            let t = "" + month + "-" + day + " " + hour + ":" + min
            return t
        }
        this.room.room_text ? this.room.room_text:''
        title.string = this.room.room_text + "   " + cur_time_string()
        Task.onTask(60 * 1000, () => {
            title.string = this.room.room_text + "   " + cur_time_string()
        })
    },
    regHideShowEvent: function () {
        cc.game.on(cc.game.EVENT_HIDE, this.onHide, this)
        cc.game.on(cc.game.EVENT_SHOW, this.onShow, this)
    },
    onHide: function () {
        Task.pause()
    },
    onShow: function () {
        http.heartbeat(() => {
            cc.mj.mgr.recover = true
            this.start()
        })
    },
    onRecover: function () {
        cc.recoverChecked = false
        cc.director.loadScene("hall")
    },
    onClickBack: function () {
        cc.scene.onShowTips("OK_CANCEL", "返回大厅您的房间仍会保留哦！", () => {
            let type = this.room.option.type
            if (type == "PERSONAL") {
                cc.director.loadScene("hall")
            } else {
                cc.club_type = this.room.option.type
                cc.director.loadScene("club")
            }
        })
    },
    runAfter: function (func, t) {
        if (!t) {
            func()
            return null
        }
        else {
            Task.runAfter(t, func)
        }
    },
    handle_event: function () {
        if (cc.mj.evt.hasEvt()) cc.mj.evt.handleEvt()
        else this.handle_next()
    },
    handle_next: function () {
        let self = this
        this.handle_next_cb = function () {
            self.handle_event()
        }
        Task.runAfter(16, this.handle_next_cb)
    },
    newTurn: function () {
        let dir = Utils.dirFromSeat(cc.mj.mgr.cur_seat)
        for (let k in this.turn_dict) {
            this.turn_dict[k].active = k == dir ? true : false
        }
        this.newDeadline()
    },
    newDeadline: function (cb) {
        this.deadline.string = 10
        if (this.deadline_cb) return
        let self = this
        this.deadline_cb = function () {
            let deadline_sec = parseInt(self.deadline.string) - 1
            if (deadline_sec == 3) {
                cc.audio.playSFX("common/timeup_alarm.mp3")
            }
            self.deadline.string = '' + Math.max(0, deadline_sec)
        }
        Task.onTask(1000, this.deadline_cb)
    },
    play_animation: function (seat, animation_prefab, timeout, cb) {
        if (!this.ignore_animation) {
            let dir = Utils.dirFromSeat(seat)
            let animation = cc.instantiate(animation_prefab)
            let animation_node = this.findNode(dir, "ani_event")
            animation_node.removeAllChildren()
            animation.parent = animation_node
            this.runAfter(() => {
                animation.parent = null
                cb && cb()
            }, timeout)
        } else {
            cb && cb()
        }

    },
    refreshSelfCards: function () {
        let dir = Utils.dirFromSeat(cc.mj.mgr.self_seat)
        let cur_normal_old_node = this.findNode(dir, "cur.normal.old")
        let cur_len = cur_normal_old_node._children.length
        let card_len = cc.mj.mgr.self_cards.length
        let len = cur_len >= card_len ? cur_len : card_len

        for (let i = 0; i < len; i++) {
            let card = null
            if (i >= cur_len) {
                card = cc.instantiate(this.cur_card_prefab_dict[dir])
                card.parent = this.findNode(dir, "cur.normal.old")
            } else {
                card = cur_normal_old_node._children[i]
            }
            if (i >= card_len) {
                card.active = false
            } else {
                card.active = true
                let card_script = card.getComponent("CurCard")
                card_script.init(this.dir, cc.mj.mgr.self_cards[i].type, cc.mj.mgr.self_cards[i].value, cc.mj.mgr.self_cards[i].laizi, this)
            }
        }
        if (cc.mj.mgr.new_card) {
            let card_script = this.findNode(dir, "cur.normal.new")._children[0].getComponent("CurCard")
            card_script.init(this.dir, cc.mj.mgr.new_card.type, cc.mj.mgr.new_card.value, cc.mj.mgr.new_card.laizi, this)
        }
    },
    onPrepare: function () {
        http.sendGame({ method: "prepare" }, (resp) => { })
    },
    checkHua: function () {
        http.sendGame({ method: "check_hua" }, (resp) => {
            cc.scene.showPrefab("查看花牌", false, (node) => {
                node.getComponent("RoleHuaShow").init(resp.roles)
            })
        })
    },
    PreDiscard: function (type, value) {
        return
        let out_card_big = cc.instantiate(this.out_card_big_prefab_dict[4]);
        out_card_big.getComponent("OutCard").init(4, type, value, null, true)
        out_card_big.parent = this.findNode(4, "out_big")
    },
    onShowSetting: function () {
        cc.scene.showPrefab("设置", false, (node) => {
            node.getComponent("Setting").init("GAME")
        })
    },
    initEvt: function () {
        // 初始化牌局
        cc.mj.evt.regEvt("InitGame", (data) => {
            cc.log(data);
            this.no_waiting = true
            this.right_out_cards = [] //右侧出牌特殊处理
            let invite_node = this.node.getChildByName("invite_cluber")
            invite_node && (invite_node.parent = null)
            cc.find("Canvas/prepare").active = false
            let btn_check_hua = cc.find("Canvas/gaming/btn_check_hua")
            if (this.room.option.mj != "fzmj") {
                btn_check_hua.active = false
            } else {
                !btn_check_hua.active && (btn_check_hua.active = true) && (btn_check_hua.on(cc.Node.EventType.TOUCH_END, this.checkHua.bind(this)))
            }
            cc.mj.mgr.cur_seat = data.banker.seat
            this.remainder_cards.string = data.card_num
            this.initSelfCards(data)
            this.initOtherCards(data)
            for (let i = 1; i <= 4; i++) {
                this.findNode(i, "prepare").active = false
            }
            for (let i = 0; i < data.roles.length; i++) {
                let role = data.roles[i]
                let dir = Utils.dirFromSeat(role.seat)
                let prepare_header = this.findNode(dir, 'prepare_header')
                if (!this.findNode(dir, 'gaming_header')._children.length) {
                    if (!prepare_header._children.length) {
                        prepare_header.active = true
                        let header = cc.instantiate(this.header_prefab)
                        let cs = header.getComponent("Header")
                        cs.init(this, dir, role.uid, role.name, role.icon, role.money)
                        header.parent = this.findNode(dir, 'gaming_header')
                    } else {
                        prepare_header._children[0].parent = this.findNode(dir, 'gaming_header')
                    }
                }
                prepare_header.active = false
            }
            this.cur_round.string = data.cur_round
            this.total_round.string = this.room.option.round
            cc.find("Canvas/gaming/turn/option").getComponent(cc.Label).string = this.room.option_text
            cc.find("Canvas/gaming/turn").active = true
            this.newTurn()

            try {
                let banker_dir = Utils.dirFromSeat(data.banker.seat)
                if (banker_dir != this.dir) {
                    this.findNode(banker_dir, "cur.normal.old")._children[0].parent = null
                    let new_card = cc.instantiate(this.cur_card_prefab_dict[banker_dir]);
                    new_card.parent = this.findNode(banker_dir, "cur.normal.new")
                }
                this.findNode(banker_dir, "gaming_header")._children[0].getComponent("Header").set_banker(data.banker.hu_times)
            } catch (e) { console.log(e) }

            !this.ignore_animation && this.handle_next()
        })
        // 玩家出牌
        cc.mj.evt.regEvt("UserDiscard", (data) => {
            cc.mj.mgr.cur_seat = null
            this.last_out_card && this.last_out_card.getComponent("OutCard").stop_play()
            this.last_out_card = null
            this.out_card_big && (this.out_card_big.parent = null)

            let dir = Utils.dirFromSeat(data.seat)
            this.findNode(dir, "out_big").removeAllChildren()
            // 移除操作确定
            let event_handler_node = this.findNode(this.dir, "event_handler")
            event_handler_node.removeAllChildren()

            let self = this
            let _discard = (dir, data) => {
                if (dir != 1) {
                    this.last_out_card.parent = self.findNode(dir, "out")
                    this.last_out_card.getComponent("OutCard").start_play()
                } else {
                    this.refreshRightOutCard(data)
                }
                !this.ignore_animation && this.handle_next()
            }
            let card = Utils.parseCard(data.card)
            this.last_out_card = cc.instantiate(self.out_card_prefab_dict[dir]);
            this.last_out_card.getComponent("OutCard").init(dir, card.type, card.value)
            if (!this.ignore_animation && dir != this.dir) {
                this.out_card_big = cc.instantiate(this.out_card_big_prefab_dict[4]);
                this.out_card_big.getComponent("OutCard").init(4, card.type, card.value, null, true)
                this.out_card_big.parent = this.findNode(dir, "out_big")
                this.runAfter(() => {
                    _discard(dir, card)
                })
                this.runAfter(() => {
                    this.out_card_big.parent = null
                }, 800)
            } else {
                _discard(dir, card)
            }
            !this.ignore_animation && cc.audio.playCard(card.type, card.value)
            if (this.findNode(dir, "cur.normal.new")._children.length && this.findNode(dir, "cur.normal.new")._children[0].active) {
                this.findNode(dir, "cur.normal.new")._children[0].active = false
            } else if (dir != 4) {
                this.findNode(dir, "cur.normal.old")._children[this.findNode(dir, "cur.normal.old")._children.length - 1].parent = null
            }

            if (data.uid == cc.mj.mgr.uid) {
                if (cc.mj.mgr.self_selected_card) {
                    cc.mj.mgr.self_selected_card.reset(this.findNode(dir, "cur.normal.old"))
                }
                cc.mj.mgr.initCards(data.cards)
                // 刷新手牌
                // cc.mj.mgr.discard({ type: data.type, value: data.value })
                this.refreshSelfCards()
            }
        })
        // 抓牌
        cc.mj.evt.regEvt("NewDiscard", (data) => {
            this.findNode(this.dir, "event_handler").removeAllChildren()
            let dir = Utils.dirFromSeat(data.seat)
            cc.mj.mgr.cur_seat = data.seat
            let node_new = this.findNode(dir, "cur.normal.new")

            if (dir == this.dir && node_new._children.length && !node_new._children[0].active) {
                let node = this.findNode(this.dir, "cur.normal.old")
                let node_card = node._children[cc.mj.mgr.self_cards.length - 1]
                node_card.active = false
                let card_cs = node_card.getComponent("CurCard")
                let new_card = node_new._children[0]
                new_card.getComponent("CurCard").init(this.dir, card_cs.type, card_cs.value, card_cs.laizi, this)
                new_card.active = true
            } else if (dir != this.dir && node_new._children.length && !node_new._children[0].active) {

                // this.findNode(dir, "cur.normal.old")._children[this.findNode(dir, "cur.normal.old")._children.length - 1].parent = null
                // node_new._children[0].active = true

                // console.log(node_new)
            }
            this.newTurn()
            this.handle_next()
        })

        // 抓牌
        cc.mj.evt.regEvt("SupplyCard", (data) => {
            this.findNode(this.dir, "event_handler").removeAllChildren()

            this.remainder_cards.string = data.card_num
            let dir = Utils.dirFromSeat(data.seat)
            if (data.card) {
                let card = Utils.parseCard(data.card)
                let node_new = this.findNode(dir, "cur.normal.new")
                let new_card = null
                if (node_new._children.length) {
                    node_new._children[0].active = true
                    new_card = node_new._children[0]
                } else {
                    new_card = cc.instantiate(this.cur_card_prefab_dict[dir]);
                    new_card.parent = node_new
                }
                if (data.uid == cc.mj.mgr.uid) {
                    new_card.getComponent("CurCard").init(this.dir, card.type, card.value, card.laizi, this)
                    !this.ignore_animation && cc.audio.playHandleCard("deal_card")
                    //cc.mj.mgr.getNewCard({ type: card.type, value: card.value, laizi: card.laizi })
                    //this.refreshSelfCards()
                }
            }
            this.newTurn()
            this.handle_next()
        })
        // 补花
        cc.mj.evt.regEvt("ReplaceHua", (data) => {
            this.remainder_cards.string = data.card_num
            let dir = Utils.dirFromSeat(data.seat)
            this.play_animation(data.seat, this.ani_hua_prefab, 600, () => {
                this.handle_next()
            })
            this.findNode(dir, "hua").active = true
            this.findNode(dir, "hua.num")._components[0].string = data.cur_hua
            if (data.uid == cc.mj.mgr.uid && data.rpl_cards) {
                if (data.cards) {
                    cc.mj.mgr.initCards(data.cards)
                } else {
                    for (let i = 0; i < data.rpl_cards.length; i++) {
                        let rpl_card = data.rpl_cards[i]
                        cc.mj.mgr.replaceCard({ type: rpl_card.type0, value: rpl_card.value0 }, { type: rpl_card.type1, value: rpl_card.value1, laizi: rpl_card.laizi })
                    }
                }
                this.refreshSelfCards()
            }
        })
        cc.mj.evt.regEvt("MakeSureHandler", (data) => {
            if (data.uid != cc.mj.mgr.uid)
                return this.handle_next()

            let event_handler_node = this.findNode(this.dir, "event_handler")
            for (let i = 0; i < data.evts.length; i++) {
                let event = data.evts[i]
                let event_btn = cc.instantiate(this.event_handler_prefab)
                let cs = event_btn.getComponent('Handler')
                cs.init(event.event, event.type, event.selects, event.state, event_handler_node)
                event_btn.parent = event_handler_node
            }
            let guo_btn = cc.instantiate(this.event_handler_prefab)
            let cs_guo = guo_btn.getComponent('Handler')
            cs_guo.init(0, null, null, null, event_handler_node)
            guo_btn.parent = event_handler_node
            this.newDeadline()
            this.handle_next()
        })

        cc.mj.evt.regEvt("HandleEvent", (data) => {
            if (!data.event) return !this.ignore_animation && this.handle_next()

            let dir = Utils.dirFromSeat(data.seat)
            let from_dir = Utils.dirFromSeat(data.from_seat)
            let event_cards_node = this.findNode(dir, "cur.event")
            event_cards_node.active = true
            if (dir != from_dir) {
                this.last_out_card && (this.last_out_card.parent = null) && (this.last_out_card = null)
                if (from_dir == 1) {
                    for (let i = 0; i < this.right_out_cards.length; i++) {
                        if (this.right_out_cards[i].last_discard) {
                            this.right_out_cards.splice(i, 1)
                        }
                    }
                }
            }
            if (!this.ignore_animation) {
                cc.audio.playEvent(data.event)
                let ani_event = cc.instantiate(this.ani_event_prefab)
                ani_event.parent = this.findNode(dir, "ani_event")
                ani_event.getComponent("AniEvent").init(data.event)
                this.runAfter(() => { ani_event.parent = null; this.handle_next() }, 500)
            }
            // 杠
            if (data.event == 4) {
                let state = data.state
                let remove_num = state == null ? (dir == from_dir ? 1 : 0) : (state == 4 ? 4 : 3)
                if (state == null) {
                    for (let i = 0; i < event_cards_node._children.length; i++) {
                        let event_card = event_cards_node._children[i]
                        let cs = event_card.getComponent("EventCard")
                        if (cs.type == data.type && cs.value == data.value) {
                            cs.init(dir, from_dir, data.event, data.type, data.value, state)
                            break
                        }
                    }
                    remove_num = 1
                } else {
                    let peng = cc.instantiate(this.peng_prefab_dict[dir])
                    peng.getComponent("EventCard").init(dir, from_dir, data.event, data.type, data.value, state)
                    peng.parent = event_cards_node
                }
                if (dir == from_dir) this.findNode(dir, "cur.normal.new")._children[0].active = false
                data.uid == cc.mj.mgr.uid ? cc.mj.mgr.gang(data.type, data.value, remove_num) : this.otherEvent(dir, from_dir, data.event, state)
            } else if (data.event == 3) {
                // 碰
                let peng = cc.instantiate(this.peng_prefab_dict[dir])
                peng.getComponent("EventCard").init(dir, from_dir, data.event, data.type, data.value)
                peng.parent = event_cards_node

                data.uid == cc.mj.mgr.uid ? cc.mj.mgr.peng(data.type, data.value) : this.otherEvent(dir, from_dir, data.event, null)
            } else if (data.event == 2) {
                // 吃
                let peng = cc.instantiate(this.peng_prefab_dict[dir])
                peng.getComponent("EventCard").init(dir, from_dir, data.event, data.type, data.value, null, data.value1, data.value2)
                peng.parent = event_cards_node

                data.uid == cc.mj.mgr.uid ? cc.mj.mgr.chi(data.type, data.value1, data.value2) : this.otherEvent(dir, from_dir, data.event, null)
            }
            // 移除手牌
            if (data.uid == cc.mj.mgr.uid) {
                cc.mj.mgr.initCards(data.cards)
                this.refreshSelfCards()
            }
            !this.ignore_animation && this.handle_next()
        })
        cc.mj.evt.regEvt("UserWin", (data) => {
            let seat = data.role.seat
            let ani_event = null
            if (seat != null) {
                cc.audio.playEvent(5)
                let dir = Utils.dirFromSeat(seat)
                ani_event = cc.instantiate(this.ani_event_prefab)
                ani_event.parent = this.findNode(dir, "ani_event")
                ani_event.getComponent("AniEvent").init(data.event, data.state)
            }
            this.exit()
            this.runAfter(() => {
                ani_event && (ani_event.parent = null)
                cc.game.off(cc.game.EVENT_SHOW, this.onShow, this)
                cc.mj.result = data
                cc.director.loadScene("report1")
            }, seat && !this.ignore_animation ? 1000 : 0)
        })
        cc.mj.evt.regEvt("KaiJin", (data) => {
            this.play_animation(data.seat, this.ani_kaijin_prefab, 800, () => {
                this.handle_next()
            })

            let dir = Utils.dirFromSeat(cc.mj.mgr.self_seat)
            cc.mj.mgr.kaijin(data.type, data.value)
            this.refreshSelfCards()
            let cs = this.laizi_show.getComponent("OutCard")
            cs.init(dir, data.type, data.value)
            this.laizi_show.active = true
        })

        cc.mj.evt.regEvt("Prepare", (data) => {
            cc.log(data)
            for (let i = 0; i < data.roles.length; i++) {
                let role = data.roles[i]
                let dir = Utils.dirFromSeat(role.seat)
                let prepare_header = this.findNode(dir, 'prepare_header')
                prepare_header.active = true
                prepare_header.removeAllChildren()
                if (role.uid) {
                    let header = cc.instantiate(this.header_prefab)
                    let cs = header.getComponent("Header")
                    cs.init(this, dir, role.uid, role.name, role.icon, role.money)
                    header.parent = prepare_header
                    this.findNode(dir, "prepare").active = role.prepare
                } else {
                    this.findNode(dir, "prepare").active = false
                }
            }
            this.handle_event()
        })

        cc.mj.evt.regEvt("HaiDiLaoYue", (data) => {
            this.findNode(this.dir, "event_handler").removeAllChildren()
            this.remainder_cards.string = 0
            for (let i = 0; i < data.roles.length; i++) {
                let role = data.roles[i]
                let dir = Utils.dirFromSeat(role.role.seat)
                let card = role.card
                let card_node = cc.instantiate(this.self_cur_card_prefab);
                card_node.getComponent("CurCard").init(this.dir, card.type, card.value, card.laizi, this)
                card_node.parent = this.findNode(dir, "ani_event")

                if (dir == this.dir) continue

                this.findNode(dir, "cur.normal.old").removeAllChildren()
                for (let j = 0; j < role.cards.length; j++) {
                    let card = role.cards[j]
                    let out_card = cc.instantiate(this.out_card_prefab_dict[dir]);
                    out_card.parent = this.findNode(dir, "cur.normal.old")
                    if (dir == 1 || dir == 3) {
                        this.findNode(dir, "cur.normal.old").getComponent(cc.Layout).spacingY = -15
                    }
                    out_card.getComponent("OutCard").init(dir, card.type, card.value)
                }
            }
            this.runAfter(() => { this.handle_next() }, 2500);
        })
        // 解散房间
        cc.mj.evt.regEvt("MakeSureDismiss", (data) => {
            cc.scene.showPrefab("解散房间", false, (node) => {
                node.getComponent("DismissMsg").init(data)
            })
            this.handle_next()
        })

        cc.mj.evt.regEvt("ExitGame", (data) => {
            console.log("ExitGame")
            if (data.uid != cc.mj.user.uid) return
            this.exit()
            let room_type = this.room.option.type
            cc.mjroom = null
            if (room_type == "PERSONAL") {
                cc.director.loadScene("hall")
            } else {
                cc.club_type = room_type
                cc.director.loadScene("club")
            }
        })

        cc.mj.evt.regEvt("DismissResult", (data) => {
            let content = ""
            if (data.dismissed) {
                content = "经玩家"
                let names = []
                for (let i = 0; i < data.roles.length; i++) {
                    names.push("【" + data.roles[i].name + "】")
                }
                content += names.join(",")
                content += "同意，房间解散成功"
            } else {
                content = "由于玩家【" + data.refused.name + "】拒绝，解散房间失败，游戏继续"
            }
            Task.pause()
            cc.scene.onShowTips("OK", content, () => {
                this.handle_next()
                Task.resume()
            })
        })


        cc.mj.evt.regEvt("SendMsg", (data) => {
            if (!this.ignore_animation) {
                this.chat_msgs.push(data)
                if (this.ignore_animation) return this.handle_next()
                let dir = Utils.dirFromSeat(data.seat)
                let chat_node = cc.instantiate(this.chat_dict[dir])
                chat_node.parent = this.findNode(dir, "gaming_chat")
                chat_node.getComponent("GameChat").init(dir, data.msg)
                cc.audio.playSFX(this.msgSFX(data.msg))

                this.handle_next()
            }
        })

        cc.mj.evt.regEvt("Offline", (data) => {
            if (!this.ignore_animation) {
                let dir = Utils.dirFromSeat(data.seat)
                try {
                    this.findNode(dir, "gaming_header")._children[0].getComponent("Header").set_offline(data.offline)
                } catch (e) { }

                this.handle_event()
            }
        })

        cc.mj.evt.regEvt("SendBiaoQing", (data) => {
            if (!this.ignore_animation) {
                let from_dir = Utils.dirFromSeat(data.from_seat)
                let to_dir = Utils.dirFromSeat(data.to_seat)
                for (let i = 0; i < data.times; i++) {
                    this.runAfter(() => {
                        let biaoqing = cc.instantiate(this.biaoqing_prefab)
                        biaoqing.getComponent("BiaoQing").init(data.biaoqing, from_dir, to_dir)
                        biaoqing.parent = this.node

                    }, i * 180)
                }

                this.handle_next()
            }
        })
    },
    otherEvent: function (dir, from_dir, event, state) {
        // chi or peng
        if (event != 4) {
            let remove_num = 2;
            let cur_cards_node = this.findNode(dir, "cur.normal.old")
            while (remove_num) {
                if (dir != 4) {
                    cur_cards_node._children[cur_cards_node._children.length - 1].parent = null
                } else {
                    cur_cards_node._children[0].active = false
                }
                remove_num -= 1
            }
        } else {
            let remove_num = state == null ? 0 : 3;
            let cur_cards_node = this.findNode(dir, "cur.normal.old")
            if (dir != 4) {
                while (remove_num) {
                    cur_cards_node._children[cur_cards_node._children.length - 1].parent = null
                    remove_num -= 1
                }
            } else {
                for (let i = 0; i < remove_num; i++) {
                    cur_cards_node._children[i].active = false
                }
            }
            // 自己抓杠
            if (dir == from_dir) {
                this.findNode(dir, "cur.normal.new")._children[0].active = false
            }
        }
    },
    exit: function () {
        cc.log("exit")
        http.stopHeartbeat()
        this.finished = true
    },
    msgSFX: function (msg) {
        var COMMON_MSG = [
            "你太牛了",
            "哈哈，手气真好",
            "快点出牌噢",
            "今天真高兴",
            "这个吃的好",
            "你放炮我不胡",
            "你家里是开银行的吧",
            "不好意思，我有事要先走一步",
            "你的牌打的太好啦",
            "大家好，很高兴见到各位",
            "怎么又断线了啊，网络怎么这么差啊",
        ]
        for (let i = 0; i < COMMON_MSG.length; i++) {
            if (msg == COMMON_MSG[i]) return "common_woman/fix_msg_" + (i + 1) + ".mp3"
        }
        return null
    },
    _onDisable: function () {
        this.exit()
    },
    // called every frame
    update: function (dt) {
    },
});
