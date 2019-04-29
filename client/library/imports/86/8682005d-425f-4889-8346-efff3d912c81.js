"use strict";
cc._RF.push(module, '86820BdQl9IiYNG7/89kSyB', 'gameStart');
// Script/sss/sssgame/gameStart.js

'use strict';

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
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.node.getChildByName('gameSeats').active = true;
        this.gameSeatsCom = this.node.getChildByName('gameSeats').getComponent('gameSeats');
    },

    initNode: function initNode() {},

    gameNormol: function gameNormol(data) {
        this.gameSeatsCom.setResultData(data);
    },

    resetGameSeats: function resetGameSeats() {
        this.gameSeatsCom.resetGameSeats();
    },

    setPaibei: function setPaibei(data) {
        this.gameSeatsCom.setPaibei(data);
    },

    receiveDaQiangData: function receiveDaQiangData(data) {
        this.gameSeatsCom.receiveDaQiangData(data);
    },

    expression: function expression(data) {
        //表情
        var self = this;
        var seatIndex0 = cc.sssNetMgr.getSeatIndexByID(data.sendId);
        var sendIdindex = cc.sssNetMgr.getLocalIndex(seatIndex0); //发送人的位置
        var seatIndex1 = cc.sssNetMgr.getSeatIndexByID(data.receiveId);
        var receiveIdindex = cc.sssNetMgr.getLocalIndex(seatIndex1); //接收人的位置
        var type = data.type;

        var LiWu = cc.find("Canvas/liwu" + sendIdindex + "/liwu" + type);
        var LiWu0 = cc.find("Canvas/liwu/liwu");
        LiWu.active = true;

        var startPoint = this.setBiaoqingPosition(sendIdindex, type); //出发点
        var endPoint = this.setBiaoqingPosition(receiveIdindex, type); //结束点

        LiWu.setPosition(startPoint.Row, startPoint.Col);
        var actionBy = cc.moveTo(0.5, cc.p(endPoint.Row, endPoint.Col));
        LiWu.runAction(actionBy);

        var mySch = function mySch() {
            LiWu.active = false;
            var animation = window.sssGame.Animation;

            var sex = "M";
            if (cc.vv.userMgr.sex == 1) {
                //男
                sex = "M";
            } else if (cc.vv.userMgr.sex == 2) {
                //女
                sex = "F";
            }

            if (type === 0) {
                var zhadan = animation.zhadan;
                zhadan.active = true;
                zhadan.setPosition(endPoint.Row, endPoint.Col);
                animation.zhadan.getComponent(cc.Animation).play('zhadan');
                cc.audio.playSFX("liwu/" + sex + "_zhadan.mp3");

                var aud = function aud() {
                    cc.audio.playSFX("liwu/zhadan.mp3");
                };
                self.scheduleOnce(aud, 1.0);
            } else if (type === 1) {
                var dangao = animation.dangao;
                dangao.active = true;
                dangao.setPosition(endPoint.Row, endPoint.Col);
                animation.dangao.getComponent(cc.Animation).play('dangao');
                cc.audio.playSFX("liwu/" + sex + "_xianhua.mp3");

                var aud = function aud() {
                    cc.audio.playSFX("liwu/kiss_dangao.mp3");
                };
                self.scheduleOnce(aud, 1.0);
            } else if (type === 2) {
                var dianzan = animation.dianzan;
                dianzan.active = true;
                dianzan.setPosition(endPoint.Row, endPoint.Col);
                animation.dianzan.getComponent(cc.Animation).play('dianzan');
                cc.audio.playSFX("liwu/" + sex + "_dianzan.mp3");

                var aud = function aud() {
                    cc.audio.playSFX("liwu/hua_dianzan.mp3");
                };
                self.scheduleOnce(aud, 1.0);
            } else if (type === 3) {
                var feiwen = animation.feiwen;
                feiwen.active = true;
                feiwen.setPosition(endPoint.Row, endPoint.Col);
                animation.feiwen.getComponent(cc.Animation).play('feiwen');
                cc.audio.playSFX("liwu/" + sex + "_kiss.mp3");

                var aud = function aud() {
                    cc.audio.playSFX("liwu/kiss_dangao.mp3");
                };
                self.scheduleOnce(aud, 1.0);
            } else if (type === 4) {
                var songhua = animation.songhua;
                songhua.active = true;
                songhua.setPosition(endPoint.Row, endPoint.Col);
                animation.songhua.getComponent(cc.Animation).play('songhua');
                cc.audio.playSFX("liwu/" + sex + "_xianhua.mp3");
                var aud = function aud() {
                    cc.audio.playSFX("liwu/hua_dianzan.mp3");
                };
                self.scheduleOnce(aud, 1.0);
            } else if (type === 5) {
                var fanqie = animation.fanqie;
                fanqie.active = true;
                fanqie.setPosition(endPoint.Row, endPoint.Col);
                animation.fanqie.getComponent(cc.Animation).play('fanqie');
                cc.audio.playSFX("liwu/" + sex + "_fanqie.mp3");
                var aud = function aud() {
                    cc.audio.playSFX("liwu/fanqie.mp3");
                };
                self.scheduleOnce(aud, 1.0);
            }
        };
        this.scheduleOnce(mySch, 0.5);
    },

    //改变表情位置
    setBiaoqingPosition: function setBiaoqingPosition(index, type) {
        var data = {};
        if (cc.sssNetMgr.wanfa === 1) {
            if (index === 0) {
                data.Row = 200;
                data.Col = -280;
            } else if (index === 1) {
                data.Row = 570;
                data.Col = 0;
            } else if (index === 2) {
                data.Row = -200;
                data.Col = 280;
            } else if (index === 3) {
                data.Row = -580;
                data.Col = 0;
            }
        } else {
            if (index === 0) {
                data.Row = 0;
                data.Col = -255;
            } else if (index === 5) {
                data.Row = 564;
                data.Col = -200;
            } else if (index === 3) {
                data.Row = 564;
                data.Col = 164;
            } else if (index === 1) {
                data.Row = 0;
                data.Col = 250;
            } else if (index === 2) {
                data.Row = -564;
                data.Col = 164;
            } else if (index === 4) {
                data.Row = -564;
                data.Col = -200;
            }
        }
        return data;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();