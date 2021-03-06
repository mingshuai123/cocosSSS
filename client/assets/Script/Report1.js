cc.Class({
    extends: cc.Component,

    properties: {
        report_prefab: {
            default: null,
            type: cc.Prefab
        },
        btn_exit: {
            default: null,
            type: cc.Node
        },
        btn_continue: {
            default: null,
            type: cc.Node
        },
        btn_check_hua: {
            default: null,
            type: cc.Node
        },
        hua_show_prefab: {
            default: null,
            type: cc.Prefab
        },
        final_prefab: {
            default: null,
            type: cc.Prefab
        },
        btn_final_check: {
            default: null,
            type: cc.Node
        },
        btn_share: {
            default: null,
            type: cc.Node
        },
        detail_info: {
            default: null,
            type: cc.Label
        }
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
        if (cc.mjroom.option.mj != "fzmj") {
            this.btn_check_hua.active = false
        } else {
            this.btn_check_hua.on(cc.Node.EventType.TOUCH_START, this.onCheckHua.bind(this))
        }
        this.result = cc.mj.result
        let result = cc.mj.result
        if (result.handle == "EXIT_OR_CONTINUE") {
            this.btn_exit.active = true
            this.btn_exit.on(cc.Node.EventType.TOUCH_START, this.onExitGame.bind(this))

            this.btn_continue.active = true
            this.btn_continue.on(cc.Node.EventType.TOUCH_START, this.onContinueGame.bind(this))
        } else if (result.handle == "SHARE_OR_CONTINUE") {
            this.btn_share.active = true
            this.btn_share.on(cc.Node.EventType.TOUCH_START, this.share.bind(this))

            this.btn_continue.active = true
            this.btn_continue.on(cc.Node.EventType.TOUCH_START, this.onContinueGame.bind(this))
        } else if (result.handle == "SHARE_OR_FINAL_CHECK") {
            this.btn_share.active = true
            this.btn_share.on(cc.Node.EventType.TOUCH_START, this.share.bind(this))

            this.btn_final_check.active = true
            this.btn_final_check.on(cc.Node.EventType.TOUCH_START, this.onCheckFinal.bind(this))
        }

        let banker = result.banker
        let win = result.role
        let resport_panel = cc.find("Canvas/bg/report")
        let role_num = result.roles.length
        let resport_layout = resport_panel.getComponent(cc.Layout)
        if (role_num == 2) {
            resport_layout.spacingY = 150
        } else if (role_num == 3) {
            resport_layout.spacingY = 50
        }
        for (let i = 0; i < role_num; i++) {
            let role = result.roles[i]
            let rp = cc.instantiate(this.report_prefab)
            let cs = rp.getComponent("Report1Prefab")
            cs.init(role.seat, role.name, role.seat == banker.seat, role.seat == win.seat, role.cards, role.score, role.detail)
            rp.parent = resport_panel
        }
        if (win.seat == cc.mj.mgr.self_seat) {
            cc.find("Canvas/bg/result/win").active = true
            cc.audio.playSFX("common/audio_win.mp3")
        } else if (win.seat == null) {
            cc.find("Canvas/bg/result/liuju").active = true
            cc.audio.playSFX("common/audio_liuju.mp3")
        } else {
            cc.find("Canvas/bg/result/lose").active = true
            cc.audio.playSFX("common/audio_lose.mp3")
        }
        cc.mj.evt.regEvt("ExitRoom", (data) => {
            cc.director.loadScene("hall")
        })

        let detail = ""
        detail += "房号 " + result.detail.id + " 当前局数: 第" + result.detail.cur_round + "/" + result.detail.option.round + "局\n"
        detail += result.detail.option_text + "\n"
        detail += result.detail.time + "\n"
        this.detail_info.string = detail
        cc.mj.result = null
    },
    init: function () {

    },
    onExitGame: function () {
        http.sendGame({ method: "exit_game" }, (resp) => { cc.mjroom = null; cc.director.loadScene("hall") })
    },
    onContinueGame: function () {
        http.sendGame({ method: "continue_game" }, (resp) => { cc.mjroom.cur_round += 1; cc.director.loadScene("mjgame") })
    },
    onCheckHua: function () {
        http.sendGame({ method: "check_hua" }, (resp) => {
            let hua_show = cc.instantiate(this.hua_show_prefab)
            hua_show.parent = this.node
            let cs = hua_show.getComponent("RoleHuaShow")
            cs.init(resp.roles)
        })
    },
    onCheckFinal: function () {
        http.sendGame({ method: "final_balance" }, (resp) => {
            let node = cc.instantiate(this.final_prefab)
            node.getComponent("Report2").init(resp)
            node.parent = this.node
        })
    },

    share: function () {
        let text = ""
        text += "福宁娱乐：房号" + this.result.detail.id + "\n"
        for (let i = 0; i < this.result.roles.length; i++) {
            let role = this.result.roles[i]
            text += (role.name + " 得分：" + role.score + " " + (role.detail.indexOf("点炮") != -1 ? "点炮" : role.detail.indexOf("接炮") != -1 ? "接炮" : "")) + "\n"
        }
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
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
