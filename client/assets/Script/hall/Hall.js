var ScenePopWin = require('../lib/ScenePopWin')
cc.Class({
    extends: ScenePopWin,

    properties: {
        btn_create_room: cc.Node,
        btn_back_room: cc.Node,
        hongdian_normal_club: cc.Node,
        hongdian_integral_club: cc.Node,
    },
    _onLoad: function () {
        if (!cc.mj || !cc.mj.user) {
            cc.director.loadScene("login");
            return
        }
        cc.audio.playBGM("bgm1.mp3")
        this.initEvt()
        this.recoverGame()

        Task.onTask(1000, () => { cc.mjroom && this.mjroomStatus() })
        Task.onTask(5000, () => { this.gainUnhandledReqs() })
    },
    gainUnhandledReqs: function () {
        this.hongdian_normal_club.active = false
        this.hongdian_integral_club.active = false
        http.sendHall({ method: "unhandled.reqs" }, resp => {
            for (let i = 0; i < resp.items.length; i++) {
                let item = resp.items[i]
                if (item.club_type == "INTEGRAL_CLUB" && item.num > 0) {
                    this.hongdian_integral_club.active = true
                }
                if (item.club_type == "NORMAL_CLUB" && item.num > 0) {
                    this.hongdian_normal_club.active = true
                }
            }
        })
    },
    updateCreateRoomBtn: function () {
        this.btn_create_room.active = cc.mjroom ? false : true
        this.btn_back_room.active = cc.mjroom ? true : false
    },
    recoverGame: function () {
        this.updateCreateRoomBtn()
        if (cc.recoverChecked) {
            return
        }
        http.recoverGame(() => {
            this.updateCreateRoomBtn()
            if (cc.mj.mgr.recover) {
                cc.scene.gotoGame("正在恢复牌局")
            }
        })
        cc.recoverChecked = true
    },
    onClickClub: function (e, club_type) {
        cc.club_type = club_type
        club_type == "INTEGRAL_CLUB" ? this.hongdian_integral_club.active = false : this.hongdian_normal_club.active = false
        cc.director.loadScene("club")
    },
    onCreateSSSRoom: function () {
        var self = this;
        var onCreate = function (ret) {
            console.log(ret)
            if (ret.errcode !== 0) {
                if (ret.errcode == 2222) {
                    cc.scene.onShowTips("OK", "钻石不足，创建房间失败!");
                }
                else {
                    cc.scene.onShowTips("OK", "创建房间失败,错误码:" + ret.errcode);
                }
            }
            else {
                cc.sssNetMgr.connectGameServer(ret);
            }
        };

        let conf = {}
        var data = {
            uid: cc.mj.user.uid,
            club_id: 0,
        };
        console.log(data);
        cc.sssHttp.sendRequest("/create_private_room", data, onCreate);

    },
    onJoinSSSRoom: function () {
        cc.gametype = 'SSS'
        cc.scene.showPrefab("加入房间")
    },
    onShare: function () {

    },
    onBackRoom: function () {
        http.sendGame({ method: "recover_game" }, (resp) => {
            if (!resp.errno) {
                cc.mjroom = resp.detail
                for (let i = 0; i < resp.msgs.length; i++) {
                    let msg = resp.msgs[i]
                    cc.mj.evt.newEvt(msg)
                }
                cc.mj.mgr.recover = true
                cc.director.loadScene("mjgame");
            } else {
                http.tryJoinRoom(cc.mjroom_id, (resp) => {
                    if (resp.errno) {
                        let content = resp.errno == 20002 ? "房间满员，无法加入房间" : "积分不足，无法加入积分圈房间"
                        cc.scene.onShowTips("OK", content)
                    } else {
                        cc.scene.gotoGame("正在恢复牌局")
                        // cc.director.loadScene("mjgame")
                    }
                })
            }
        })
    },
    onShowCreateRoom: function () {
        cc.scene.showPrefab("创建房间")
    },
    onClickShowTips: function (e, type) {
        cc.scene.onShowTips("OK", TEXT[type])
    },
    onShowAgent: function () {
        cc.scene.showPrefab("代理申请")
    },
    onShowPlayMode: function () {
        cc.scene.showPrefab("玩法介绍")
    },
    onShowJoinRoom: function () {
        cc.scene.showPrefab("加入房间")
    },
    onShowGameHistory: function () {
        cc.scene.showPrefab("战绩")
    },
    mjroomStatus: function () {
        if (cc.mj.mgr.replay) return
        http.sendGame({ method: "mjroom_status" }, (resp) => {
            if (resp.status) {
                http.sendGame({ method: "recover_game" }, (resp) => {
                    if (!resp.errno) {
                        cc.mjroom = resp.detail
                        for (let i = 0; i < resp.msgs.length; i++) {
                            let msg = resp.msgs[i]
                            cc.mj.evt.newEvt(msg)
                        }
                        cc.mj.mgr.recover = true
                        cc.director.loadScene("mjgame");
                    }
                })
            }
        })
    },
    share: function () {
        let text = "福宁娱乐邀请您一起体验福建本地玩法的娱乐游戏，玩法简单刺激，朋友对战PK，快来体验！"
        text += "安卓手机点击：" + cc.mj.game_cfg.url_android + "，"
        text += "苹果手机点击：" + cc.mj.game_cfg.url_ios
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

    initEvt: function () {
        cc.mj.evt.regTickEvt("RoomInvite", (data) => {
            cc.scene.showPrefab("牌局邀请", true, (node) => {
                node.getComponent("InviteMsg").init(data)
            })
        })
        cc.mj.evt.regTickEvt("JoinClub", (data) => {
            cc.scene.onShowTips("OK", data.content)
        })

        cc.mj.evt.regTickEvt("ExitClub", (data) => {
            cc.scene.onShowTips("OK", data.content)
        })
        http.startHallTick()
    },
    onOpenSetting: function () {
        cc.scene.showPrefab("设置", (node) => {
            node.getComponent("Setting").init("HALL")
        })
    },
    // showPrefab: function (name, cb) {
    //     cc.loader.loadRes("Prefab/" + name, cc.Prefab, (err, prefab) => {
    //         if (err) {
    //             console.log(err.message || err);
    //             return;
    //         }
    //         let node = cc.instantiate(prefab)
    //         cb && cb(node)
    //         this.showPopWin(node)
    //     });
    // },
    // showPopWin: function (node) {
    //     if (this.node_popwin._children.length > 1) {
    //         this.delay_popwin.push(node)
    //         return
    //     }
    //     if (!this.popwin_mask.active) {
    //         this.popwin_mask.active = true
    //         this.popwin_mask.opacity = 0
    //         this.popwin_mask.runAction(cc.fadeTo(0.3, 180))
    //     }
    //     node.parent = this.node_popwin
    //     node.runAction(cc.sequence([cc.scaleTo(0.1, 1.15), cc.scaleTo(0.1, 1.0)]))
    // },
    // closePopWin: function (node) {
    //     node.runAction(cc.sequence(cc.scaleTo(0.15, 0.0), cc.callFunc(() => {
    //         node.parent = null
    //         if (this.delay_popwin.length) {
    //             let new_node = this.delay_popwin[0]
    //             this.delay_popwin.splice(0, 1)
    //             return this.showPopWin(new_node)
    //         }
    //         if (this.node_popwin._children.length <= 1) {
    //             this.popwin_mask.active = false
    //         }
    //     })))
    // },
});
