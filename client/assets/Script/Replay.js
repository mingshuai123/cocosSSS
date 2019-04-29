
cc.Class({
    extends: cc.Component,
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
        jin_card: {
            default: null,
            type: cc.Node
        },
        ani_event_prefab: {
            default: null,
            type: cc.Prefab
        },
        hua_show_prefab: {
            default: null,
            type: cc.Prefab
        },
        label_progress: cc.Label,
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
                card_script.init(this.dir, parseInt(Math.random() * 3 + 1), parseInt(Math.random() * 9 + 1))
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
        // cc.log(node_out_cards)

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
    },
    clearAllTask: function () {
        for (let k in this.timer_dict) {
            clearTimeout(k)
        }
        this.timer_dict = {}
    },
    runAfter: function (func, t) {
        if (!t) {
            func()
            return null
        }
        else {
            let timer = setTimeout(func, t)
            this.timer_dict[timer] = func
            return timer
        }

    },
    initNode: function (dir) {
        this.findNode(dir, "cur.event").removeAllChildren()
        this.findNode(dir, "out").removeAllChildren()
        this.findNode(dir, "cur.normal.old").removeAllChildren()
        this.findNode(dir, "cur.normal.new").removeAllChildren()
        this.findNode(dir, "hua").active = false
        this.findNode(dir, "cur.event").active = false
        this.findNode(dir, "out_big").removeAllChildren()
        this.findNode(dir, "event_handler").removeAllChildren()
        this.findNode(dir, "ani_event").removeAllChildren()
    },
    // use this for initialization
    initSelfCards: function (resp) {
        this.initNode(this.dir)

        for (let i = 0; i < resp.roles.length; i++) {
            if (resp.roles[i].seat == cc.mj.mgr.self_seat) {
                cc.mj.mgr.initCards(resp.roles[i].cards)
                break
            }
        }
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
            if (role.seat == cc.mj.mgr.self_seat) {
                continue
            }
            let dir = Utils.dirFromSeat(role.seat)
            this.initNode(dir)
            let role_cards = role.cards
            this.findNode(dir, "cur.event").active = false
            this._refreshOtherCards(dir, role_cards)
        }
    },
    _refreshOtherCards: function (dir, cards) {
        if (dir != 1) {
            for (let i = 0; i < cards.length; i++) {
                let card = Utils.parseCard(cards[i])
                let cur_card_prefab = cc.instantiate(this.cur_card_prefab_dict[dir]);
                cur_card_prefab.getComponent("CurCard").init(dir, card.type, card.value, card.laizi)
                cur_card_prefab.parent = this.findNode(dir, "cur.normal.old")
            }
        } else {
            for (let i = cards.length - 1; i >= 0; i--) {
                let card = Utils.parseCard(cards[i])
                let cur_card_prefab = cc.instantiate(this.cur_card_prefab_dict[dir]);
                cur_card_prefab.getComponent("CurCard").init(dir, card.type, card.value, card.laizi)
                cur_card_prefab.parent = this.findNode(dir, "cur.normal.old")
            }
        }

    },
    refreshOtherCards: function (dir, cards) {
        let node_cards = this.findNode(dir, "cur.normal.old")
        let nodes = node_cards._children
        if (dir != 1) {
            for (let i = 0; i < nodes.length; i++) {
                if (i < cards.length) {
                    let card = Utils.parseCard(cards[i])
                    nodes[i].getComponent("CurCard").init(dir, card.type, card.value, card.laizi)
                    nodes[i].active = true
                } else {
                    nodes[i].active = false
                }
            }
        } else {
            for (let i = nodes.length - 1; i >= 0; i--) {
                let idx = nodes.length - i - 1
                if (idx < cards.length) {
                    let card = Utils.parseCard(cards[idx])
                    nodes[i].getComponent("CurCard").init(dir, card.type, card.value, card.laizi)
                    nodes[i].active = true
                } else {
                    nodes[i].active = false
                }
            }
        }
        // } else {
        //     for (let i = nodes.length - 1; i >= 0; i--) {
        //         let idx = nodes.length - i
        //         let card = Utils.parseCard(cards[i])
        //         let cur_card_prefab = cc.instantiate(this.cur_card_prefab_dict[dir]);
        //         cur_card_prefab.getComponent("CurCard").init(dir, card.type, card.value, card.laizi)
        //         cur_card_prefab.parent = this.findNode(dir, "cur.normal.old")
        //     }
        // }
        //.removeAllChildren()
        // if (dir != 1) {
        //     for (let i = 0; i < cards.length; i++) {
        //         let card = Utils.parseCard(cards[i])
        //         let cur_card_prefab = cc.instantiate(this.cur_card_prefab_dict[dir]);
        //         cur_card_prefab.getComponent("CurCard").init(dir, card.type, card.value, card.laizi)
        //         cur_card_prefab.parent = this.findNode(dir, "cur.normal.old")
        //     }
        // } else {
        //     for (let i = cards.length - 1; i >= 0; i--) {
        //         let card = Utils.parseCard(cards[i])
        //         let cur_card_prefab = cc.instantiate(this.cur_card_prefab_dict[dir]);
        //         cur_card_prefab.getComponent("CurCard").init(dir, card.type, card.value, card.laizi)
        //         cur_card_prefab.parent = this.findNode(dir, "cur.normal.old")
        //     }
        // }

    },
    find: function (name) {
        let node_names = name.split("/")
        let node = this.node
        for (let i = 1; i < node_names.length; i++) {
            node = node.getChildByName(node_names[i])
        }
        return node
    },
    onLoad: function () {
        return
        this.room = cc.mjroom
        this.bg = this.find("录像/bg_" + cc.mj.user.getStyleBg())
        this.bg.active = true
        this.timer_dict = {}
        this.initTitle()
        cc.audio.playBGM("bgm1.mp3")
        this.laizi_show = this.find("Canvas/gaming/laizi")
        this.laizi_show.active = false
        this.right_out_cards = [] //右侧出牌特殊处理
        this.ignore_animation = false
        this.dir = 4
        this.prepared = false
        this.initComponents()
        this.initEvt()
        this.initControl()
    },
    goto_progress: function (progress) {
        this.clearAllTask()
        this.right_out_cards = []
        let step = Math.max(2, progress)
        this.evt_idx = 0;
        this.handleEvt(step);
        this.runAfter(() => { this.play_next() }, 1500)
    },
    _init: function () {
        this.room = cc.mjroom
        this.bg = this.find("录像/bg_" + cc.mj.user.getStyleBg())
        this.bg.active = true
        this.timer_dict = {}
        this.initTitle()
        cc.audio.playBGM("bgm1.mp3")
        this.laizi_show = this.find("Canvas/gaming/laizi")
        this.laizi_show.active = false
        this.right_out_cards = [] //右侧出牌特殊处理
        this.ignore_animation = false
        this.dir = 4
        this.prepared = false
        this.initComponents()
        this.initEvt()
        this.initControl()
    },
    init: function (evts) {
        this._init()
        this.evts = evts
        this.goto_progress(2)
    },
    forward: function () {
        this.find("mjgame/control/forward").getComponent(cc.Button).interactable = false
        this.clearAllTask()
        for (let dir = 1; dir <= 4; dir++) {
            this.findNode(dir, "out_big").removeAllChildren()
            this.findNode(dir, "event_handler").removeAllChildren()
            this.findNode(dir, "ani_event").removeAllChildren()
        }
        this.handleEvt(~~(this.evts.length * 0.1));
        this.runAfter(() => { this.play_next() }, 1500)
        this.runAfter(() => {
            this.find("mjgame/control/forward").getComponent(cc.Button).interactable = true
        }, 500)
        // this.goto_progress(this.evt_idx + 5)
    },
    back: function () {
        this.find("mjgame/control/back").getComponent(cc.Button).interactable = false
        this.goto_progress(this.evt_idx - 15)
        this.runAfter(() => {
            this.find("mjgame/control/back").getComponent(cc.Button).interactable = true
        }, 500)
    },
    pause: function () {
        for (let i = 1; i <= 4; i++) this.findNode(i, "ani_event").removeAllChildren()
        this.clearAllTask();
        this.btn_pause.active = false;
        this.btn_play.active = true;
    },
    resume: function () {
        this.play_next();
        this.btn_play.active = false;
        this.btn_pause.active = true;
    },
    initControl: function () {
        this.find("mjgame/control/exit").on(cc.Node.EventType.TOUCH_START, () => {
            cc.scene.closePopWin(this.node)
            this.exit()
        })
        this.btn_pause = this.find("mjgame/control/pause")
        this.btn_play = this.find("mjgame/control/play")
        this.btn_pause.on(cc.Node.EventType.TOUCH_START, this.pause.bind(this))
        this.btn_play.on(cc.Node.EventType.TOUCH_START, this.resume.bind(this))

        // this.find("mjgame/control/forward").on(cc.Node.EventType.TOUCH_START, this.forward.bind(this))
        // this.find("mjgame/control/back").on(cc.Node.EventType.TOUCH_START, this.back.bind(this))
    },
    initTitle: function () {
        let title = this.bg.getChildByName("title").getComponent(cc.Label)
        title.string = this.room.room_text
    },
    regHideShowEvent: function () {
        cc.game.on(cc.game.EVENT_HIDE, this.onHide, this)
        cc.game.on(cc.game.EVENT_SHOW, this.onShow, this)
    },
    handleEvt: function (step) {
        let step_ = 0
        !step && (step = 1)
        step > 1 && (this.ignore_animation = true)
        while (step_ < step) {
            if (this.evt_idx < this.evts.length) {
                let evt = this.evts[this.evt_idx]
                let cb = cc.mj.evt_cbs[evt.action]
                if (cb) {
                    cb(evt)
                }
                this.evt_idx += 1
            }
            step_ += 1
        }
        this.ignore_animation = false
        this.label_progress.string = "进度：" + this.evt_idx + " / " + this.evts.length
    },
    play_next: function () {
        this.timer && clearTimeout(this.timer)
        this.timer = this.runAfter(this.handleEvt.bind(this), 1000)
    },
    newTurn: function () {
        let dir = Utils.dirFromSeat(cc.mj.mgr.cur_seat)
        for (let k in this.turn_dict) {
            this.turn_dict[k].active = k == dir ? true : false
        }
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
        if (cur_len > card_len) {
            let num = cur_len - card_len
            while (num) {
                cur_normal_old_node._children[0].parent = null
                num -= 1
            }
        }
        if (cur_normal_old_node._children.length != card_len) {
            cur_normal_old_node.removeAllChildren()
        }
        for (let i = 0; i < card_len; i++) {
            var card = null
            if (i < cur_normal_old_node._children.length) {
                card = cur_normal_old_node._children[i]
            } else {
                card = cc.instantiate(this.self_cur_card_prefab)
                card.parent = cur_normal_old_node
            }
            let card_script = card.getComponent("CurCard")
            card_script.init(this.dir, cc.mj.mgr.self_cards[i].type, cc.mj.mgr.self_cards[i].value, cc.mj.mgr.self_cards[i].laizi, this)
        }
        if (cc.mj.mgr.new_card) {
            let card_script = this.findNode(dir, "cur.normal.new")._children[0].getComponent("CurCard")
            card_script.init(this.dir, cc.mj.mgr.new_card.type, cc.mj.mgr.new_card.value, cc.mj.mgr.new_card.laizi, this)
        }
    },
    checkHua: function () {
        http.sendGame({ method: "check_hua" }, (resp) => {
            let hua_show = cc.instantiate(this.hua_show_prefab)
            hua_show.parent = this.node
            let cs = hua_show.getComponent("RoleHuaShow")
            cs.init(resp.roles)
        })
    },
    openSetting: function () {
        let node = cc.instantiate(this.game_setting_prefab)
        node.getComponent("Setting").init("GAME")
        node.parent = this.node
    },
    initEvt: function () {
        cc.mj.evt.clear()
        // 初始化牌局
        cc.mj.evt.regEvt("InitGame", (data) => {
            let btn_check_hua = this.find("Canvas/gaming/btn_check_hua")
            if (this.room.option.mj != "fzmj") {
                btn_check_hua.active = false
            } else {
                !btn_check_hua.active && (btn_check_hua.active = true) && (btn_check_hua.on(cc.Node.EventType.TOUCH_END, this.checkHua.bind(this)))
            }
            cc.mj.mgr.cur_seat = data.banker.seat
            this.initSelfCards(data)
            this.initOtherCards(data)
            // for (let i = 1; i <= 4; i++) {
            //     this.findNode(i, "gaming_header").removeAllChildren()
            //     this.findNode(i, "prepare").active = false
            //     this.findNode(i, "prepare_header").active = false
            //     this.findNode(i, "prepare_header")._children.length && (this.findNode(i, "prepare_header")._children[0].parent = this.findNode(i, "gaming_header"))
            // }
            this.find("Canvas/gaming/turn/option").getComponent(cc.Label).string = this.room.option_text
            this.find("Canvas/gaming/turn").active = true
            this.newTurn()

            let banker_dir = Utils.dirFromSeat(data.banker.seat)
            this.findNode(banker_dir, "gaming_header")._children[0].getComponent("Header").set_banker(data.banker.hu_times)

            !this.ignore_animation && this.play_next()
        })
        // 玩家出牌
        cc.mj.evt.regEvt("UserDiscard", (data) => {
            cc.mj.mgr.cur_seat = null
            this.last_out_card && this.last_out_card.getComponent("OutCard").stop_play()
            this.last_out_card = null

            let dir = Utils.dirFromSeat(data.seat)
            // 移除操作确定
            let event_handler_node = this.findNode(this.dir, "event_handler")
            event_handler_node.removeAllChildren()

            let self = this
            let _discard = (dir, data) => {
                if (!this.last_out_card) return
                if (dir != 1) {
                    this.last_out_card.parent = self.findNode(dir, "out")
                    this.last_out_card.getComponent("OutCard").start_play()
                } else {
                    this.refreshRightOutCard(data)
                }
                !this.ignore_animation && this.play_next()
            }
            let card = Utils.parseCard(data.card)
            this.last_out_card = cc.instantiate(self.out_card_prefab_dict[dir]);
            this.last_out_card.getComponent("OutCard").init(dir, card.type, card.value)

            if (!this.ignore_animation) {
                let out_card_big = cc.instantiate(this.out_card_big_prefab_dict[4]);
                out_card_big.getComponent("OutCard").init(4, card.type, card.value, null, true)
                this.findNode(dir, "out_big").removeAllChildren()
                out_card_big.parent = this.findNode(dir, "out_big")
                this.runAfter(() => {
                    out_card_big.parent = null
                    _discard(dir, card)
                }, 1000)
            } else {
                _discard(dir, card)
            }

            !this.ignore_animation && cc.audio.playCard(card.type, card.value)
            if (this.findNode(dir, "cur.normal.new")._children.length) {
                this.findNode(dir, "cur.normal.new").removeAllChildren()
            } else {
                // console.log(this.findNode(dir, "cur.normal.old")._children)
                // this.findNode(dir, "cur.normal.old")._children[0].parent = null
            }

            if (data.seat == cc.mj.mgr.self_seat) {
                if (cc.mj.mgr.self_selected_card) {
                    cc.mj.mgr.self_selected_card.reset(this.findNode(dir, "cur.normal.old"))
                }
                cc.mj.mgr.initCards(data.cards)
                // 刷新手牌
                // cc.mj.mgr.discard({ type: data.type, value: data.value })
                this.refreshSelfCards()
            } else {
                this.refreshOtherCards(dir, data.cards)
            }
        })
        // 抓牌
        cc.mj.evt.regEvt("NewDiscard", (data) => {
            this.findNode(this.dir, "event_handler").removeAllChildren()
            cc.mj.mgr.cur_seat = data.seat
            this.newTurn()
            !this.ignore_animation && this.play_next()
        })

        // 抓牌
        cc.mj.evt.regEvt("SupplyCard", (data) => {
            if (this.ignore_animation) return
            this.findNode(this.dir, "event_handler").removeAllChildren()
            let dir = Utils.dirFromSeat(data.seat)
            let card = Utils.parseCard(data.card)
            this.findNode(dir, "cur.normal.new").removeAllChildren()
            let new_card = cc.instantiate(this.cur_card_prefab_dict[dir]);
            new_card.parent = this.findNode(dir, "cur.normal.new")
            if (data.seat == cc.mj.mgr.self_seat) {
                cc.mj.mgr.getNewCard({ type: card.type, value: card.value, laizi: card.laizi })
                this.refreshSelfCards()
            } else {
                new_card.getComponent("CurCard").init(dir, card.type, card.value, card.laizi)
            }

            this.newTurn()
            !this.ignore_animation && this.play_next()
        })
        // 补花
        cc.mj.evt.regEvt("ReplaceHua", (data) => {
            let dir = Utils.dirFromSeat(data.seat)
            this.play_animation(data.seat, this.ani_hua_prefab, 600, () => {
                this.play_next()
            })
            this.findNode(dir, "hua").active = true
            this.findNode(dir, "hua.num")._components[0].string = data.cur_hua
            if (data.seat == cc.mj.mgr.self_seat && data.rpl_cards) {
                if (data.cards) {
                    cc.mj.mgr.initCards(data.cards)
                } else {
                    for (let i = 0; i < data.rpl_cards.length; i++) {
                        let rpl_card = data.rpl_cards[i]
                        cc.mj.mgr.replaceCard({ type: rpl_card.type0, value: rpl_card.value0 }, { type: rpl_card.type1, value: rpl_card.value1, laizi: rpl_card.laizi })
                    }
                }
                this.refreshSelfCards()
            } else {
                if (data.cards) {
                    this.refreshOtherCards(dir, data.cards)
                } else {
                    for (let i = 0; i < data.rpl_cards.length; i++) {
                        let rpl_card = data.rpl_cards[i]
                        console.log(rpl_card)
                        this.findNode(dir, "cur.normal.new")._children[0].getComponent("CurCard").init(dir, rpl_card.type1, rpl_card.value1, rpl_card.laizi)
                    }
                }
            }
        })
        cc.mj.evt.regEvt("MakeSureHandler", (data) => {
            if (this.ignore_animation) return

            let dir = Utils.dirFromSeat(data.seat)
            let event_handler_node = this.findNode(dir, "event_handler")
            event_handler_node.removeAllChildren()
            let event_handler = cc.instantiate(this.event_handler_prefab)
            let cs = event_handler.getComponent("HandlerReplay")
            for (let i = 0; i < data.evts.length; i++) {
                let event = data.evts[i]
                cs.able(event.event)
            }
            cs.able(0)
            if (dir == 1) event_handler.rotation = 270
            else if (dir == 3) event_handler.rotation = 90
            event_handler.parent = event_handler_node
            !this.ignore_animation && this.play_next()
        })

        cc.mj.evt.regEvt("HandleEvent", (data) => {
            !this.ignore_animation && this.seatHandleEvt(data)
            if (!data.event) return this.play_next()
            this.runAfter(() => {
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
                    this.runAfter(() => { ani_event.parent = null }, 500)
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
                    data.seat == cc.mj.mgr.self_seat ? cc.mj.mgr.gang(data.type, data.value, remove_num) : this.otherEvent(dir, from_dir, data.event, state)
                } else if (data.event == 3) {
                    // 碰
                    let peng = cc.instantiate(this.peng_prefab_dict[dir])
                    peng.getComponent("EventCard").init(dir, from_dir, data.event, data.type, data.value)
                    peng.parent = event_cards_node

                    data.seat == cc.mj.mgr.self_seat ? cc.mj.mgr.peng(data.type, data.value) : this.otherEvent(dir, from_dir, data.event, null)
                } else if (data.event == 2) {
                    // 吃
                    let peng = cc.instantiate(this.peng_prefab_dict[dir])
                    peng.getComponent("EventCard").init(dir, from_dir, data.event, data.type, data.value, null, data.value1, data.value2)
                    peng.parent = event_cards_node

                    data.seat == cc.mj.mgr.self_seat ? cc.mj.mgr.chi(data.type, data.value1, data.value2) : this.otherEvent(dir, from_dir, data.event, null)
                }
                // 移除手牌
                if (data.seat == cc.mj.mgr.self_seat) {
                    cc.mj.mgr.initCards(data.cards)
                    this.refreshSelfCards()
                } else {
                    this.refreshOtherCards(dir, data.cards)
                }
                !this.ignore_animation && this.play_next()
            }, this.ignore_animation ? 0 : 500)
        })
        cc.mj.evt.regEvt("UserWin", (data) => {
            let seat = data.role.seat
            if (seat != null) {
                cc.audio.playEvent(5)
                let dir = Utils.dirFromSeat(seat)
                this.seatHandleEvt({ event: 5, seat: seat })
                this.runAfter(() => {
                    let ani_event = cc.instantiate(this.ani_event_prefab)
                    ani_event.parent = this.findNode(dir, "ani_event")
                    ani_event.getComponent("AniEvent").init(data.event, data.state)
                    this.runAfter(() => { ani_event.parent = null }, 500)
                }, 300)
            }
        })
        cc.mj.evt.regEvt("KaiJin", (data) => {
            this.play_animation(data.seat, this.ani_kaijin_prefab, 800, () => {
                this.play_next()
            })

            let dir = Utils.dirFromSeat(cc.mj.mgr.self_seat)
            cc.mj.mgr.kaijin(data.type, data.value)
            this.refreshSelfCards()
            let cs = this.laizi_show.getComponent("OutCard")
            cs.init(dir, data.type, data.value)
            this.laizi_show.active = true
        })

        cc.mj.evt.regEvt("Prepare", (data) => {
            if (!this.prepared) {
                for (let i = 0; i < data.roles.length; i++) {
                    let role = data.roles[i]
                    let dir = Utils.dirFromSeat(role.seat)
                    // let prepare_header = this.findNode(dir, 'prepare_header')
                    // prepare_header.parent = this.findNode(dir, 'game_header')
                    // prepare_header.active = true
                    // prepare_header.removeAllChildren()
                    if (role.uid) {
                        let header = cc.instantiate(this.header_prefab)
                        let cs = header.getComponent("Header")
                        cs.init(this, dir, role.uid, role.name, role.icon, role.money)
                        header.parent = this.findNode(dir, 'gaming_header')
                        // this.findNode(dir, "prepare").active = role.prepare
                    } else {
                        this.findNode(dir, "prepare").active = false
                    }
                }
                this.prepared = true
            }
            this.play_next()
        })

        cc.mj.evt.regEvt("HaiDiLaoYue", (data) => {
            this.findNode(this.dir, "event_handler").removeAllChildren()
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
            this.runAfter(() => { this.play_next() }, 300)
        })
    },
    seatHandleEvt: function (data) {
        let dir = Utils.dirFromSeat(data.seat)
        for (let i = 1; i <= 4; i++) {
            if (i == dir) {
                continue
            }
            this.findNode(i, "event_handler").removeAllChildren()
        }
        let event_node = this.findNode(dir, "event_handler")
        for (let i = 0; i < event_node._children.length; i++) {
            event_node._children[i].getComponent("HandlerReplay").handled(data.event)
        }
        this.runAfter(() => { event_node.removeAllChildren() }, 200)
    },
    otherEvent: function (dir, from_dir, event, state) {
        // chi or peng
        if (event != 4) {
            let remove_num = 2;
            let cur_cards_node = this.findNode(dir, "cur.normal.old")
            while (remove_num) {
                cur_cards_node._children[0].parent = null
                remove_num -= 1
            }
        } else {

            let remove_num = state == null ? 0 : 3;
            let cur_cards_node = this.findNode(dir, "cur.normal.old")
            while (remove_num) {
                cur_cards_node._children[0].parent = null
                remove_num -= 1
            }
            // 自己抓杠
            if (dir == from_dir) {
                this.findNode(dir, "cur.normal.new").removeAllChildren()
            }
        }
    },
    exit: function () {
        this.clearAllTask()
        cc.mjroom = null
        cc.mj.mgr.replay = false
    },
    onDestroy: function () {
    },
    // called every frame
    update: function (dt) {
    },
});
