cc.Class({
    extends: cc.Component,
    properties: {
        uid: null,
        nickname: null,
        fangka: 0,
        integral: 0,
        bgm: 1.0,
        sfx: 1.0,
        style_mj: "big",
        style_bg: "blue",
        style_sss:'big',
        style_sssbg:'blue',
    },
    statics: {
        init: function () {
            let volume_bgm = cc.sys.localStorage.getItem("volume_bgm")
            let volume_sfx = cc.sys.localStorage.getItem("volume_sfx")
            this.setVolumeBGM(volume_bgm ? volume_bgm : 1.0)
            this.setVolumeSFX(volume_sfx ? volume_sfx : 1.0)
            let style_mj = cc.sys.localStorage.getItem("style_mj")
            this.style_mj = style_mj ? style_mj : "big"
            let style_bg = cc.sys.localStorage.getItem("style_bg")
            this.style_bg = style_bg ? style_bg : "green"

            let style_sss = cc.sys.localStorage.getItem("style_sss")
            this.style_sss = style_sss ? style_sss : "big"
            let style_sssbg = cc.sys.localStorage.getItem("style_sssbg")
            this.style_sssbg = style_sssbg ? style_sssbg : "blue"
        },
        // 麻将
        mjStyleBig: function () {
            return this.style_mj == "big"
        },
        setStyleMJ: function (v) {
            cc.sys.localStorage.setItem("style_mj", v)
            this.style_mj = v
        },
        getStyleBg: function (v) {
            return this.style_bg
        },
        setStyleBg: function (v) {
            cc.sys.localStorage.setItem("style_bg", v)
            this.style_bg = v
        },
        // 十三水
        sssStyleBig: function () {
            return this.style_sss == "big"
        },
        setStylesss: function (v) {
            cc.sys.localStorage.setItem("style_sss", v)
            this.style_sss = v
        },
        getStylesssBg: function (v) {
            return this.style_sssbg
        },
        setStylesssBg: function (v) {
            cc.sys.localStorage.setItem("style_sssbg", v)
            this.style_sssbg = v
            cc.emitter.emit('settingBg')
        },

        setVolumeBGM: function (v) {
            v = parseFloat(v)
            cc.sys.localStorage.setItem("volume_bgm", v)
            cc.audio.setBGMVolume(v, true)
            this.bgm = v
        },
        setVolumeSFX: function (v) {
            v = parseFloat(v)
            cc.sys.localStorage.setItem("volume_sfx", v)
            cc.audio.setSFXVolume(v)
            this.sfx = v
        },
        login: function (resp) {
            cc.log(resp)
            cc.sys.localStorage.setItem("token", resp.token)
            http.login(resp)
            this.uid = resp.id
            this.nickname = resp.nickname
            this.fangka = resp.fangka
            this.icon = resp.icon
            this.ip = resp.ip
            this.integral = resp.integral
            cc.director.loadScene("hall");
        },
        logout: function (resp) {
            try {
                this.wx_agent = anysdk.agentManager;
                this.wx_user_plugin = this.wx_agent.getUserPlugin();
                this.wx_user_plugin.logout()
            } catch (e) { cc.log(e) }
            http.logout(resp)
            this.uid = null
            this.nickname = null
            this.fangka = 0
            this.integral = 0
            cc.sys.localStorage.removeItem("token")
            cc.director.loadScene("login")
        }
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
