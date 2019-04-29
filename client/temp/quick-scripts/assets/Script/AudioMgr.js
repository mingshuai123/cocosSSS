(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AudioMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b6e01HI1FZJb6Qz2dH952c0', 'AudioMgr', __filename);
// Script/AudioMgr.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        bgmVolume: 1.0,
        sfxVolume: 1.0,

        bgmAudioID: -1
    },

    // use this for initialization
    init: function init() {
        var t = cc.sys.localStorage.getItem("bgmVolume");
        if (t != null) {
            this.bgmVolume = parseFloat(t);
        }

        var t = cc.sys.localStorage.getItem("sfxVolume");
        if (t != null) {
            this.sfxVolume = parseFloat(t);
        }

        cc.game.on(cc.game.EVENT_HIDE, function () {
            // console.log("cc.audioEngine.pauseAll");
            cc.audioEngine.pauseAll();
        });
        cc.game.on(cc.game.EVENT_SHOW, function () {
            // console.log("cc.audioEngine.resumeAll");
            cc.audioEngine.resumeAll();
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    getUrl: function getUrl(url) {
        return cc.url.raw("resources/sounds/" + url);
    },

    playCard: function playCard(type, value) {
        this.playSFX("common_woman/mjt" + type + '_' + value + '.mp3');
    },

    playHandleCard: function playHandleCard(type) {
        this.playSFX("common/audio_" + type + '.mp3');
    },
    playEvent: function playEvent(event) {
        var event_name_dict = {
            2: ['chi', 3],
            3: ['peng', 4],
            4: ['gang', 2],
            5: ['hu', 2]
        };
        var event_name = event_name_dict[event];
        var sfx_name = 'common_woman/' + event_name[0] + parseInt(Math.random() * event_name[1] + 1) + '.mp3';
        this.playSFX(sfx_name);
    },
    playBGM: function playBGM(url) {
        this.audioUrl = this.getUrl(url);
        if (this.bgmAudioID >= 0) {
            cc.audioEngine.stop(this.bgmAudioID);
        }
        if (this.bgmVolume > 0) {
            this.bgmAudioID = cc.audioEngine.play(this.audioUrl, true, this.bgmVolume);
            cc.audioEngine.setVolume(this.bgmAudioID, this.bgmVolume);
        }
    },
    playSFX: function playSFX(url) {
        var audioUrl = this.getUrl(url);
        if (this.sfxVolume > 0) {
            var audioId = cc.audioEngine.play(audioUrl, false, this.sfxVolume);
        }
    },


    setSFXVolume: function setSFXVolume(v) {
        if (this.sfxVolume != v) {
            cc.sys.localStorage.setItem("sfxVolume", v);
            this.sfxVolume = v;
        }
    },

    setBGMVolume: function setBGMVolume(v, force) {
        if (this.bgmAudioID >= 0 && v < 0.00000001) {
            cc.audioEngine.stop(this.bgmAudioID);
            this.bgmAudioID = -1;
        }

        if (v > 0 && this.bgmAudioID < 0) {
            this.bgmAudioID = cc.audioEngine.play(this.audioUrl, true, v);
        }

        if (this.bgmVolume != v || force) {
            cc.sys.localStorage.setItem("bgmVolume", v);
            this.bgmVolume = v;
            cc.audioEngine.setVolume(this.bgmAudioID, v);
        }
    },

    pauseAll: function pauseAll() {
        cc.audioEngine.pauseAll();
    },

    resumeAll: function resumeAll() {
        cc.audioEngine.resumeAll();
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=AudioMgr.js.map
        