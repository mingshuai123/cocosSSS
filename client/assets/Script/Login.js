cc.Class({
    extends: cc.Component,

    properties: {
        btn_guest: {
            default: null,
            type: cc.Node
        },
        btn_phone: {
            default: null,
            type: cc.Node
        },
        btn_wx: {
            default: null,
            type: cc.Node
        },
        waiting_prefab: {
            default: null,
            type: cc.Prefab
        },
        tips_prefab: {
            default: null,
            type: cc.Prefab
        },
        label_ver_error: cc.Label
    },
    onLoad: function () {
        if (cc.ver_valid) {

            let token = cc.sys.localStorage.getItem("token")
            if (token != null) {
                let waiting = cc.instantiate(this.waiting_prefab)
                waiting.getComponent("Waiting").init("正在登陆")
                waiting.parent = this.node
                http.sendHall({ method: "token_login", token: token, platform: cc.sys.os }, (resp) => {
                    setTimeout(() => {
                        waiting.parent = null
                    }, 1000)
                    if (resp.id == null) {
                        cc.sys.localStorage.removeItem("token")
                        return
                    }
                    if (resp.errmsg) {
                        let tips = cc.instantiate(this.tips_prefab)
                        let cs = tips.getChildByName("Tips").getComponent("Tips")
                        cs.init(resp.errmsg, "OK", () => { tips.parent = null; })
                        tips.parent = this.node
                    } else {
                        cc.mj.user.login(resp)
                    }
                })
            }
            this.btn_guest.active = true
            // if (cc.sys.isNative) {
            //     this._initWXLogin()
            // }else{
            //     this.btn_guest.active = true
            // }
            this.btn_guest.on(cc.Node.EventType.TOUCH_START, this.onGuestLogin.bind(this))
            this.btn_phone.on(cc.Node.EventType.TOUCH_START, this.onPhoneLogin.bind(this))
        } else {
            let tips = cc.instantiate(this.tips_prefab)
            let cs = tips.getChildByName("Tips").getComponent("Tips")
            cs.init("当前版本不可用，需重新下载新版本游戏，具体请联系官方微信：" + cc.mj.game_cfg.system_wx, "OK", () => { tips.parent = null; })
            tips.parent = this.node
        }
    },
    _initWXLogin: function () {
        this.wx_agent = anysdk.agentManager;
        this.wx_user_plugin = this.wx_agent.getUserPlugin();
        this.wx_user_plugin.setListener(this._WXLoginResult.bind(this));
        this.btn_wx.active = true
        this.btn_wx.on(cc.Node.EventType.TOUCH_START, this.onWXLogin.bind(this))
    },
    _WXLoginResult: function (code, msg) {
        switch (code) {
            case anysdk.UserActionResultCode.kInitSuccess://初始化 SDK 成功回调
                cc.find("Canvas/log").getComponent(cc.Label).string = "kInitSuccess"
                //SDK 初始化成功，login方法需要在初始化成功之后调用
                break;
            case anysdk.UserActionResultCode.kInitFail://初始化 SDK 失败回调
                cc.find("Canvas/log").getComponent(cc.Label).string = "kInitFail"
                //SDK 初始化失败，游戏相关处理
                break;
            case anysdk.UserActionResultCode.kLoginSuccess: //登陆成功回调
                this.WXLoginStatus(msg)
                //登陆成功后，可使用getUserID()获取用户ID
                break;
            case anysdk.UserActionResultCode.kLoginNetworkError: //登陆网络出错回调
            case anysdk.UserActionResultCode.kLoginCancel: //登陆取消回调
            case anysdk.UserActionResultCode.kLoginFail: //登陆失败回调
                //登陆失败后，游戏相关处理
                break;
        }
    },
    onGuestLogin: function () {
        let token = cc.sys.localStorage.getItem("token")
        if (token != null) {
            http.sendHall({ method: "token_login", token: token, platform: cc.sys.os }, (resp) => {
                if (resp.id == null) {
                    cc.sys.localStorage.removeItem("token")
                    return
                }
                cc.mj.user.login(resp)
            })
        } else {
            http.sendHall({ method: "guest_login" }, (resp) => {
                if (resp.id == null) {
                    return
                }
                cc.mj.user.login(resp)
            })
        }
    },
    onPhoneLogin: function () {
    },

    onWXLogin: function () {
        this.wx_user_plugin.login();
        this.waiting = cc.instantiate(this.waiting_prefab)
        this.waiting.getComponent("Waiting").init("正在登陆")
        this.waiting.parent = this.node
        setTimeout(() => {
            this.waiting && (this.waiting.parent = null)
        }, 3000);
    },
    WXLoginStatus: function (msg) {
        let resp = JSON.parse(msg)
        cc.mj.user.login(resp)
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
