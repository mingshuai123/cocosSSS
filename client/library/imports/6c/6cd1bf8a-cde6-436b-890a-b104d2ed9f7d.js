"use strict";
cc._RF.push(module, '6cd1b+KzeZDa4kKsQTS7Z99', 'UserMgr');
// Script/UserMgr.js

"use strict";

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
        style_sss: 'big',
        style_sssbg: 'blue'
    },
    statics: {
        init: function init() {
            var volume_bgm = cc.sys.localStorage.getItem("volume_bgm");
            var volume_sfx = cc.sys.localStorage.getItem("volume_sfx");
            this.setVolumeBGM(volume_bgm ? volume_bgm : 1.0);
            this.setVolumeSFX(volume_sfx ? volume_sfx : 1.0);
            var style_mj = cc.sys.localStorage.getItem("style_mj");
            this.style_mj = style_mj ? style_mj : "big";
            var style_bg = cc.sys.localStorage.getItem("style_bg");
            this.style_bg = style_bg ? style_bg : "green";

            var style_sss = cc.sys.localStorage.getItem("style_sss");
            this.style_sss = style_sss ? style_sss : "big";
            var style_sssbg = cc.sys.localStorage.getItem("style_sssbg");
            this.style_sssbg = style_sssbg ? style_sssbg : "blue";
        },
        // 麻将
        mjStyleBig: function mjStyleBig() {
            return this.style_mj == "big";
        },
        setStyleMJ: function setStyleMJ(v) {
            cc.sys.localStorage.setItem("style_mj", v);
            this.style_mj = v;
        },
        getStyleBg: function getStyleBg(v) {
            return this.style_bg;
        },
        setStyleBg: function setStyleBg(v) {
            cc.sys.localStorage.setItem("style_bg", v);
            this.style_bg = v;
        },
        // 十三水
        sssStyleBig: function sssStyleBig() {
            return this.style_sss == "big";
        },
        setStylesss: function setStylesss(v) {
            cc.sys.localStorage.setItem("style_sss", v);
            this.style_sss = v;
        },
        getStylesssBg: function getStylesssBg(v) {
            return this.style_sssbg;
        },
        setStylesssBg: function setStylesssBg(v) {
            cc.sys.localStorage.setItem("style_sssbg", v);
            this.style_sssbg = v;
            cc.emitter.emit('settingBg');
        },

        setVolumeBGM: function setVolumeBGM(v) {
            v = parseFloat(v);
            cc.sys.localStorage.setItem("volume_bgm", v);
            cc.audio.setBGMVolume(v, true);
            this.bgm = v;
        },
        setVolumeSFX: function setVolumeSFX(v) {
            v = parseFloat(v);
            cc.sys.localStorage.setItem("volume_sfx", v);
            cc.audio.setSFXVolume(v);
            this.sfx = v;
        },
        login: function login(resp) {
            cc.log(resp);
            cc.sys.localStorage.setItem("token", resp.token);
            http.login(resp);
            this.uid = resp.id;
            this.nickname = resp.nickname;
            this.fangka = resp.fangka;
            this.icon = resp.icon;
            this.ip = resp.ip;
            this.integral = resp.integral;
            cc.director.loadScene("hall");
        },
        logout: function logout(resp) {
            try {
                this.wx_agent = anysdk.agentManager;
                this.wx_user_plugin = this.wx_agent.getUserPlugin();
                this.wx_user_plugin.logout();
            } catch (e) {
                cc.log(e);
            }
            http.logout(resp);
            this.uid = null;
            this.nickname = null;
            this.fangka = 0;
            this.integral = 0;
            cc.sys.localStorage.removeItem("token");
            cc.director.loadScene("login");
        }

        // LIFE-CYCLE CALLBACKS:

        // onLoad () {},

        // start () {

        // },

        // update (dt) {},
    } });

cc._RF.pop();