cc.Class({
    extends: cc.Component,

    properties: {
        report_role_prefab: {
            default: null,
            type: cc.Prefab
        },
        btn_exit: {
            default: null,
            type: cc.Node
        },
        game_info: {
            default: null,
            type: cc.Label
        },
        btn_share: {
            default: null,
            type: cc.Node
        },
        label_path: cc.Label
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
        this.btn_exit.on(cc.Node.EventType.TOUCH_START, () => {
            cc.mjroom = null
            http.sendGame({ method: "exit_game" }, (resp) => { })
            if (this.type == "PERSONAL") {
                cc.director.loadScene("hall")
            } else {
                cc.club_type = this.type
                cc.director.loadScene("club")
            }
        })

        this.btn_share.on(cc.Node.EventType.TOUCH_START, this.share.bind(this))
    },
    init: function (final) {
        this.final = final
        this.type = final.option.type
        let panel = this.node.getChildByName("roles")
        let layout = panel.getComponent(cc.Layout)
        let role_num = final.roles.length
        if (role_num == 2) {
            layout.paddingLeft = 238
            layout.spacingX = 168
        } else if (role_num == 3) {
            layout.paddingLeft = 130
            layout.spacingX = 58
        }
        for (let i = 0; i < role_num; i++) {
            let role = final.roles[i]
            let role_node = cc.instantiate(this.report_role_prefab)
            role_node.getComponent("Report2Role").init(role, final.owner_uid == role.id, final.winer == role.id, final.paoer == role.id)
            role_node.parent = panel
        }
        let room_info = ""
        room_info += "房号 " + final.id + " 第 " + final.cur_round + "/" + final.option.round + "局\n"
        room_info += (final.mode == "fzmj" ? "福州麻将" : "宁德麻将") + " " + final.option_text + "\n"
        room_info += final.time
        this.game_info.string = room_info
    },
    share: function () {
        let text = "总结算分享："
        text += "福宁娱乐：房号" + this.final.id + "\n"
        for (let i = 0; i < this.final.roles.length; i++) {
            let role = this.final.roles[i]
            text += role.name + "：" + role.score + "\n"
        }

        var share_plugin = anysdk.agentManager.getSharePlugin();
        share_plugin.setListener(this.onShareResult, this);

        cc.screenShoot((path) => {
            var info = {
                shareTo: "0",
                mediaType: "1",
                title: "福宁娱乐",   // title 标题，印象笔记、邮箱、信息、微信、人人网和 QQ 空间使用
                text: text,            // text 是分享文本，所有平台都需要这个字段\
                imagePath: path
            }
            share_plugin.share(info)

        })
        //let path = cc.screenShoot()
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
