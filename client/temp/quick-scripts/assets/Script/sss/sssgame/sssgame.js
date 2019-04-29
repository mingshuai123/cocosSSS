(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/sss/sssgame/sssgame.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ddd1b9MLHpJRoX0Jc24R1AP', 'sssgame', __filename);
// Script/sss/sssgame/sssgame.js

"use strict";

var PaiType = require("define").PaiType;
var ScenePopWin = require('../../lib/ScenePopWin');

cc.Class({
    extends: ScenePopWin,

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
        canvas: {
            type: cc.Node,
            default: null
        },
        prepare: {
            type: cc.Node,
            default: null
        },
        shezhiPaiNode: {
            type: cc.Node,
            default: null
        },
        NorSeatsNode: {
            type: cc.Node,
            default: null
        },
        myPaiNode: {
            type: cc.Node,
            default: null
        },
        paiAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        BBpaiAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        paiTexiao: {
            default: null,
            type: cc.SpriteAtlas
        },
        shuzi: {
            default: null,
            type: cc.SpriteAtlas
        },
        setType: {
            default: null,
            type: cc.Node
        },
        gameStartNode: {
            default: null,
            type: cc.Node
        },
        AnimationNode: {
            default: null,
            type: cc.Node
        },
        gameOverNode: {
            default: null,
            type: cc.Node
        },
        sssGameResultNode: {
            default: null,
            type: cc.Node
        },
        setZhuangNode: {
            default: null,
            type: cc.Node
        },
        btnMgrNode: {
            default: null,
            type: cc.Node
        },
        cmdNode: {
            default: null,
            type: cc.Node
        },
        startTime: {
            default: null,
            type: cc.Node
        },
        dismiss_msg_prefab: {
            default: null,
            type: cc.Prefab
        },
        game_setting_prefab: {
            default: null,
            type: cc.Prefab
        },
        _timeLabel: null,
        _voiceMsgQueue: [],
        _lastPlayingSeat: null,
        _playingSeat: null,
        _lastPlayTime: null,
        _gamecount: null,
        _startTimeLabel: null

    },

    // use this for initialization
    _onLoad: function _onLoad() {
        window.sssGame = this;

        this.addComponent("UserInfoShow");

        this.settingBg();

        this.initView();
        this.initCanvas();
        this.initSheZhiPai();
        this.initGameStart();
        this.initGameOver();
        this.initSeats();
        this.initMyPai();
        this.initHandler();
        this.initSetType();
        this.initBtnMgr();
        // 解散房间脚本
        this.addComponent("PopupMgr");

        //断线重连脚本
        // this.addComponent('ReConnect');

        // this.addComponent("Status");
        cc.audio.playBGM("sssMusic/BMG1.mp3");

        this.Compare = require("Compare");

        this.totalData = null;

        this.onRefreshSeat();

        console.log("sssgame init");
    },
    initHandler: function initHandler() {
        this.emitter = cc.emitter;
        this.emitter.on('game_holds', this.onGameHolds.bind(this));
        this.emitter.on('refresh_seat', this.onRefreshSeat.bind(this));
        this.emitter.on('self_ready', this.selfReady.bind(this));
        this.emitter.on('other_ready', this.otherReady.bind(this));
        this.emitter.on('game_mapai', this.showMaPai.bind(this));
        this.emitter.on('compare_result', this.setResultData.bind(this));
        this.emitter.on('game_begin', this.resetGame.bind(this));
        this.emitter.on('remove_handler', this.removeHandler.bind(this));
        this.emitter.on('game_num_notify', this.setGameNum.bind(this));
        this.emitter.on('game_over_Notify', this.setOverData.bind(this));
        this.emitter.on('game_result_Notify', this.setTotalResult.bind(this));
        this.emitter.on('quick_swing_notify', this.quickSwing.bind(this));
        this.emitter.on('player_outCard_notify', this.playerOutCardNotify.bind(this));
        this.emitter.on('out_maxPai_Notify', this.outMaxPai.bind(this));
        this.emitter.on('chat_push', this.setChat.bind(this));
        this.emitter.on('quick_chat_push', this.setQuickChat.bind(this));
        this.emitter.on('emoji_push', this.setEmoji.bind(this));
        this.emitter.on('voice_msg', this.setVoice.bind(this));
        this.emitter.on('set_lastTime', this.setLastTime.bind(this));
        this.emitter.on('user_state_offline', this.offline.bind(this));
        this.emitter.on('expression_notify', this.expression.bind(this));
        this.emitter.on('set_lixianTime', this.setlixianTime.bind(this));
        this.emitter.on('set_dissolutionTime', this.setdissolutionTime.bind(this));
        this.emitter.on('limit_login', this.limitLogin.bind(this));
        this.emitter.on('game_start_lastTime', this.gameStartTime.bind(this));
        this.emitter.on('special_card', this.specialcard.bind(this));
        this.emitter.on('settingBg', this.settingBg.bind(this));

        this.emitter.on('user_state_changed', this.userstateChange.bind(this));
    },
    removeHandler: function removeHandler() {
        this.emitter.off('game_holds');
        this.emitter.off('refresh_seat');
        this.emitter.off('self_ready');
        this.emitter.off('other_ready');
        this.emitter.off('game_mapai');
        this.emitter.off('compare_result');
        this.emitter.off('game_begin');
        this.emitter.off('remove_handler');
        this.emitter.off('game_num_notify');
        this.emitter.off('game_over_Notify');
        this.emitter.off('quick_swing_notify');
        this.emitter.off('game_result_Notify');
        this.emitter.off('player_outCard_notify');
        this.emitter.off('out_maxPai_Notify');
        this.emitter.off('chat_push');
        this.emitter.off('quick_chat_push');
        this.emitter.off('emoji_push');
        this.emitter.off('voice_msg');
        this.emitter.off('set_lastTime');
        this.emitter.off('user_state_offline');
        this.emitter.off('expression_notify');
        this.emitter.off('set_lixianTime');
        this.emitter.off('set_dissolutionTime');
        this.emitter.off('limit_login');
        this.emitter.off('game_start_lastTime');
        this.emitter.off('special_card');
        this.emitter.off('settingBg');
        this.emitter.off('user_state_changed');
    },
    userstateChange: function userstateChange(data) {
        cc.log(data);
        cc.log(cc.sssNetMgr.seats);
        if (data.userid == cc.mj.user.uid) {
            cc.scene.onShowTips('OK', '您已被踢出房间', function () {
                cc.director.loadScene("hall");
            });
        } else {
            this.gameSeatsCom.deleteOneSeat(data);
            cc.sssNetMgr.resetOneSeat(data.userid);
            // this.onRefreshSeat();
        }
    },

    settingBg: function settingBg() {
        var color = cc.mj.user.getStylesssBg();
        if (color == 'blue') {
            this.hidenbg = cc.find("Canvas/bg_green");
            this.bg = cc.find("Canvas/bg_blue");
        } else {
            this.hidenbg = cc.find("Canvas/bg_blue");
            this.bg = cc.find("Canvas/bg_green");
        }
        this.hidenbg.active = false;
        this.bg.active = true;
    },
    initView: function initView() {
        this._timeLabel = cc.find("Canvas/infobar/time").getComponent(cc.Label);
        this._gamecount = cc.find("Canvas/gameStart/gamecount").getComponent(cc.Label);
        // this._gamecount.string = "  " + "1" + "/" + cc.sssNetMgr.maxNumOfGames + "局";
        this._gamecount.string = "  " + (cc.sssNetMgr.numOfGames == 0 ? "1" : cc.sssNetMgr.numOfGames) + "/" + cc.sssNetMgr.maxNumOfGames + "局";
        this._min = cc.find("Canvas/notice/minute").getComponent(cc.Label);
        this._second = cc.find("Canvas/notice/second").getComponent(cc.Label);
        this._isExit = 0;

        console.log('initView end');
    },
    onDismiss: function onDismiss() {
        var type = this.room.option.type;
        if (type == "PERSONAL") {
            if (this.room.owner_uid == cc.mj.user.uid) {
                cc.scene.onShowTips("OK_CANCEL", "解散房间不扣房卡，是否确定解散？", function () {
                    http.sendGame({ method: "exit_game" }, function () {
                        cc.mjroom = null;cc.director.loadScene("hall");
                    });
                });
            } else {
                http.sendGame({ method: "exit_game" }, function () {
                    cc.mjroom = null;cc.director.loadScene("hall");
                });
            }
        } else {
            cc.club_type = this.room.option.type;
            http.sendGame({ method: "exit_game" }, function () {
                cc.mjroom = null;cc.director.loadScene("club");
            });
        }
    },
    initCanvas: function initCanvas() {
        this.tspType = cc.find("Canvas/tspType");
    },
    initGameStart: function initGameStart() {
        this.gameStartNode.active = true;
        this.gameStartPaiCom = this.gameStartNode.getComponent('gameStart');
        this.gameStartPaiCom.game = this;
        this.gameStartNode.getChildByName('gameSeats').active = true;
        this.gameSeatsCom = this.gameStartNode.getChildByName('gameSeats').getComponent('gameSeats');
        this.Animation = this.AnimationNode.getComponent('Animation');
    },
    initGameOver: function initGameOver() {
        this.gameOverCom = this.gameOverNode.getComponent('game_over');
        this.sssGameResult = this.sssGameResultNode.getComponent('sssGameResult');
    },
    initSheZhiPai: function initSheZhiPai() {
        this.shezhiPaiCom = this.shezhiPaiNode.getComponent('shezhipai');
        this.shezhiPaiCom.game = this;
    },
    initSeats: function initSeats() {
        this.uidSeats = {};
        this.gameStartNode.active = true;
        this.gameStartPaiCom = this.gameStartNode.getComponent('gameStart');
        this.gameStartPaiCom.game = this;
        this.gameStartNode.getChildByName('gameSeats').active = true;
        this.gameSeatsCom = this.gameStartNode.getChildByName('gameSeats').getComponent('gameSeats');
        this.Animation = this.AnimationNode.getComponent('Animation');
    },
    initMyPai: function initMyPai() {
        this.myPaiCom = this.myPaiNode.getComponent('myPai');
        this.myPaiCom.initDt();
        this.myPaiCom.game = this;
    },
    // 初始化按钮
    initBtnMgr: function initBtnMgr() {
        this.btnMgrNode.active = true;
        this.btnReady = this.btnMgrNode.getChildByName('btnReady');
        this.btnStart = this.btnMgrNode.getChildByName('btnStart');
        this.bthYaoqing = this.btnMgrNode.getChildByName('bthYaoqing');
        this.btnCopy = this.btnMgrNode.getChildByName('btnCopy');
        this.btnDissolve = this.btnMgrNode.getChildByName('btnDissolve');
        this.btnBack = this.btnMgrNode.getChildByName('btnBack');
        if (cc.sssNetMgr.seatIndex !== 0) {
            this.btnDissolve.active = false;
            this.btnReady.active = true;
        } else {
            this.btnReady.active = false;
            this.btnStart.active = true;
        }
    },
    // 打开设置
    onOpenSetting: function onOpenSetting() {
        cc.vv.popupMgr.showSettings();
    },
    dissolveNotice: function dissolveNotice(data) {
        cc.log(data);
        cc.scene.showPrefab("解散房间", false, function (node) {
            node.getComponent("DismissMsg").init(data, "SSS");
        });
    },
    dissolveCancel: function dissolveCancel(data) {
        cc.log(data);
    },
    removedissolveHandler: function removedissolveHandler(data) {
        cc.log(data);
    },
    stopEndTime: function stopEndTime(data) {
        cc.log(data);
    },
    //将游戏刷新，游戏重新开始
    resetGame: function resetGame() {
        cc.log("resetGame");
        window.sssGame.outpaidata = null;
        cc.find("Canvas/notice").active = false;
        cc.find("Canvas/game_over").active = false;
        this.onRefreshSeat();
        this.gameStartPaiCom.resetGameSeats();
        this.gameOverCom.active = false;
        this.prepare.getComponent('touch').reset();
        if (this.zjId) {
            this.zjbiaoshi(this.zjId);
        }
    },

    playerOutCardNotify: function playerOutCardNotify(data) {
        cc.find("Canvas/notice").active = false;
        cc.find("Canvas/btnMgr/btnDissolve").active = false;
        this.setBtnReadyActive(false);
        // console.log(this.uidSeats)
        for (var i = 0; i < data.length; i++) {
            var seat = this.uidSeats[data[i].userId];
            if (data[i].isChuPai == true && seat) {
                seat.paibei();
            }
        }
        // this.seatsCom.setPlayerInfo(data);
    },
    specialcard: function specialcard(data) {
        cc.log(data);
        this.tspType = cc.find("Canvas/tspType");
        if (data.isshow) {
            this.tspType.getComponent(cc.Label).string = this.getspecialname(data.type);
            this.tspType.active = true;
        } else {
            this.tspType.active = false;
        }
    },
    getspecialname: function getspecialname(type) {
        var num = type + "";
        var string = '';
        var dir = {
            '11': '三顺子',
            '12': '三同花',
            '13': '六对半',
            '14': '五对三条',
            '15': '凑一色',
            '16': '全小',
            '17': '全大',
            '18': '六六大顺',
            '19': '四套三条',
            '20': '十二皇族',
            '21': '三同花顺',
            '22': '七星高照',
            '23': '三分天下',
            '24': '一条龙',
            '25': '八仙过海',
            '26': '至尊清龙'
        };
        string = dir[num];
        return string;
    },
    setGameNum: function setGameNum(data) {
        this._gamecount.string = "  " + cc.sssNetMgr.numOfGames + "/" + cc.sssNetMgr.maxNumOfGames + "局";
    },

    offline: function offline(data) {
        cc.log(data);
        var seat = data;
        var isOffline = !seat.online;
        var index = cc.sssNetMgr.getLocalIndex(seat.seatindex);
        this.gameSeatsCom.seatComs[index].setOffline(isOffline);
    },

    expression: function expression(data) {
        //表情
        this.gameStartPaiCom.expression(data);
    },

    outMaxPai: function outMaxPai() {
        // this.seatsNode.active = true;
        this.shezhiPaiCom.reset();

        this.unschedule(this.setkaishi);
        this.unschedule(this.setAnimation);
        this.unschedule(this.setHolds);
    },

    onGameHolds: function onGameHolds() {
        cc.find("Canvas/notice").active = false;
        this.setBtnReadyActive(false);
        this.btnDissolve.active = false;
        this.onRefreshSeat();
        var self = this;

        if (cc.sssNetMgr.wanfa === 1 && cc.sssNetMgr.zjID) {
            this.zjbiaoshi(cc.sssNetMgr.zjID);
        }

        this.setAnimation = function () {
            //发牌动画
            // self.seatsCom.fapaiAnimate();
        };

        this.setHolds = function () {
            console.log('onGameHolds');
            // self.seatsCom.reset();
            if (!self.myPaiCom.setInfo()) {
                return;
            }
            var mapai = cc.find("Canvas/prepare/shezhipai/mapai");
            mapai.active = false;
            if (cc.sssNetMgr.wanfa === 3) {
                //马牌
                mapai.active = true;
                var paiAtlas = window.sssGame.paiAtlas;
                var pai = cc.find("Canvas/prepare/shezhipai/mapai/pai").getComponent(cc.Sprite);
                var arrType = ["hua", "tao", "xin", "fangkuai"];
                var paiName = arrType[cc.sssNetMgr.maPaiData.type] + cc.sssNetMgr.maPaiData.value;
                var spriteFrame = paiAtlas.getSpriteFrame(paiName);
                pai.spriteFrame = spriteFrame;
            }
            self.prepare.active = true;
            self.setType.getType();
            // self.seatsNode.active = false;
            cc.audio.playSFX("sssMusic/qingchupai.mp3");
        };

        this.setkaishi = function () {
            var animation = this.Animation.kaishi.getComponent(cc.Animation);
            this.Animation.kaishi.getComponent(cc.Animation).play('kaishi');
            if (cc.sssNetMgr.wanfa === 2 || cc.sssNetMgr.wanfa === 3) {
                var seq = cc.sequence(cc.delayTime(1.0), cc.callFunc(this.setAnimation), cc.delayTime(4.0), cc.callFunc(this.setHolds));
            } else {
                var seq = cc.sequence(cc.delayTime(1.0), cc.callFunc(this.setAnimation), cc.delayTime(2.0), cc.callFunc(this.setHolds));
            }

            this.Animation.kaishi.active = true;
            this.Animation.kaishi.runAction(seq);

            // this.seatsCom.start();
        };
        // this.scheduleOnce(this.setkaishi, 1.0);
        // this.scheduleOnce(this.setHolds, 1.0);

        this.setHolds();
        this.resetReady();
    },

    onRefreshSeat: function onRefreshSeat() {
        // this.seatsCom.refreshSeats();
        this.gameSeatsCom.refreshSeats();
    },

    onResetAllSeat: function onResetAllSeat() {
        // this.seatsCom.resetALLSeat();
        this.gameSeatsCom.resetALLSeat();
    },

    initSetType: function initSetType() {
        this.setType = this.setType.getComponent('setType');
        this.setType.game = this;
    },

    selfReady: function selfReady(data) {
        console.log("selfReady");
        console.log(data);
        this.setBtnReadyActive(false);
        var userId = data.userid;
        // this.seatsCom.setPlayerReady(userId);
        this.gameSeatsCom.setPlayerReady(userId);
    },

    otherReady: function otherReady(data) {
        console.log("otherReady");
        var userId = data.userid;
        // this.seatsCom.setPlayerReady(userId);
        this.gameSeatsCom.setPlayerReady(userId);
    },

    resetReady: function resetReady() {
        // this.seatsCom.resetReady();
        this.gameSeatsCom.resetReady();
    },

    setBtnReadyActive: function setBtnReadyActive(bActive) {
        this.btnReady.active = bActive;
        this.btnStart.active = bActive;
        this.bthYaoqing.active = bActive;
        this.btnCopy.active = bActive;
        this.btnDissolve.active = false;
        this.btnBack.active = false;
    },

    showMaPai: function showMaPai() {
        console.log("setMaPai");
    },

    setResultData: function setResultData(data) {
        var self = this;
        // this.tspType = cc.find("Canvas/tspType");
        this.tspType.active = false;
        cc.find("Canvas/notice").active = false;
        this.btnDissolve.active = false;
        console.log(data);
        if (this.seatsNode) {
            this.seatsNode.active = false;
        }
        if (this.gameStartNode) {
            this.gameStartNode.active = true;
        }
        this.setBtnReadyActive(false);
        // var resultdata=data;
        // this.showresultAnimation(resultdata);

        // this.seatsCom.emptyChatBubble();
        this.gameStartPaiCom.gameNormol(data);
        this.gameOverCom.hiddenPai(true); //显示牌
    },
    showresultAnimation: function showresultAnimation(data) {
        var self = this;
        // 加个动画
        this.setgamenormol = function () {
            self.gameStartPaiCom.gameNormol(data);
            self.gameOverCom.hiddenPai(true); //显示牌
        };
        this.setkaishibipai = function () {
            var animation = this.Animation.kaishi.getComponent(cc.Animation);
            this.Animation.kaishi.getComponent(cc.Animation).play('kaishi');
            cc.audio.playSFX("sssMusic/kaishibipai.mp3");
            var seq = cc.sequence(cc.delayTime(2.0), cc.callFunc(this.setgamenormol));

            this.Animation.kaishi.active = true;
            this.Animation.kaishi.runAction(seq);
        };

        this.scheduleOnce(this.setkaishibipai, 2.0);
        // this.gameStartPaiCom.gameNormol(data);
        // this.gameOverCom.hiddenPai(true);//显示牌
    },
    setZhuang: function setZhuang() {
        this.setZhuangNode.active = true;
        var seatData = cc.sssNetMgr.seats;
        for (var i = 0; i < 4; i++) {
            var nameNode = this.setZhuangNode.getChildByName("name" + i);
            var nameLabel = nameNode.getChildByName("Label").getComponent(cc.Label);
            seatData[i].imgLoader = nameNode.getComponent("ImageLoader");
            nameLabel.string = seatData[i].name;
            nameNode.tag = seatData[i].userid;
            if (seatData[i].imgLoader && seatData[i].userid) {
                seatData[i].imgLoader.setUserID(seatData[i].userid, data.icon);
            }
        }
    },
    zjbiaoshi: function zjbiaoshi(data) {
        //庄家标识
        this.zjId = data;
        var self = this;
        var seatData = cc.sssNetMgr.seats;
        for (var i = 0; i < seatData.length; i++) {
            if (seatData[i].userid === data) {
                var index = cc.sssNetMgr.getLocalIndex(seatData[i].seatindex);
                // self.seatsCom.seatComs[index].zhuang.active = true;
                self.gameSeatsCom.seatComs[index].zhuang.active = true;
            }
        }
    },

    //单局结算
    setOverData: function setOverData(data) {
        this.btnDissolve.active = false;
        console.log('setOverData: ' + data);
        cc.log(data);
        this.overData = data;
    },
    gameStartTime: function gameStartTime(data) {
        this._startTimeLabel = cc.find("Canvas/time/timeNum").getComponent(cc.Label);
        if (this.btnReady.active && data > 1000) {
            var timenum = data / 1000;
            timenum = timenum >= 10 ? timenum : "0" + timenum;
            this._startTimeLabel.string = timenum;
            this.startTime.active = true;
        } else {
            this.startTime.active = false;
        }
    },

    showOver: function showOver() {
        if (this.overData) {
            this.setBtnReadyActive(false);
            this.gameOverNode.active = true;
            this.gameOverCom.showOver(this.overData);
            this.gameSeatsCom.setAllScoreResult(this.overData);
            // this.seatsCom.setAllScoreResult(this.overData);

            this.btnReady.active = true; //显示准备按钮

            // this.seatsCom.reset();
        }
    },

    //总局结算
    setTotalResult: function setTotalResult(data) {
        this.btnDissolve.active = false;
        console.log('setTotalResult: ' + data);
        this.totalData = data;
        if (cc.sssNetMgr.numOfGames < cc.sssNetMgr.maxNumOfGames) {
            this.showTotalResult();
        }
    },

    showTotalResult: function showTotalResult() {
        if (this.totalData) {
            this.gameOverNode.active = false;
            this.sssGameResultNode.active = true;
            this.sssGameResult.showResult(this.totalData);
            return true;
        } else {
            return false;
        }
    },

    setChat: function setChat(data) {
        var self = this;
        var idx = cc.sssNetMgr.getSeatIndexByID(data.sender);
        var localIdx = cc.sssNetMgr.getLocalIndex(idx);
        // self.seatsCom.seatComs[localIdx].chat(data.content);
        self.gameSeatsCom.seatComs[localIdx].chat(data.content);
    },

    setQuickChat: function setQuickChat(data) {
        var self = this;
        var idx = cc.sssNetMgr.getSeatIndexByID(data.sender);
        var localIdx = cc.sssNetMgr.getLocalIndex(idx);

        var index = data.content;
        var info = cc.vv.chat.getQuickChatInfo(index);
        // self.seatsCom.seatComs[localIdx].chat(info.content);
        self.gameSeatsCom.seatComs[localIdx].chat(info.content);

        cc.audio.playSFX(info.sound);
    },

    setEmoji: function setEmoji(data) {
        var self = this;
        var idx = cc.sssNetMgr.getSeatIndexByID(data.sender);
        var localIdx = cc.sssNetMgr.getLocalIndex(idx);
        console.log(data);
        // self.seatsCom.seatComs[localIdx].emoji(data.content);
        self.gameSeatsCom.seatComs[localIdx].emoji(data.content);
    },

    setVoice: function setVoice(data) {
        var self = this;
        self._voiceMsgQueue.push(data);
        self.playVoice();
    },

    playVoice: function playVoice() {
        if (this._playingSeat == null && this._voiceMsgQueue.length) {
            console.log("playVoice2");
            var data = this._voiceMsgQueue.shift();
            var idx = cc.sssNetMgr.getSeatIndexByID(data.sender);
            var localIndex = cc.sssNetMgr.getLocalIndex(idx);
            this._playingSeat = localIndex;
            // this.seatsCom.seatComs[localIndex].voiceMsg(true);
            this.gameSeatsCom.seatComs[localIndex].voiceMsg(true);

            var msgInfo = JSON.parse(data.content);
            var url = msgInfo.msg;
            cc.vv.voiceMgr.playFromUrl(url);
            this._lastPlayTime = Date.now() + msgInfo.time;
        }
    },

    //快速摆牌
    quickSwing: function quickSwing(data) {
        this.prepare.getComponent('touch').quickSwing(data);
        cc.audio.playSFX("sssMusic/fangpai.mp3");
    },

    onNameBtnClick: function onNameBtnClick(event) {
        console.log("onNameBtnClick event.target.tag:" + event.target.tag);
        var userId = event.target.tag;
        cc.sssNet.send("assign_zj", userId);
        this.setZhuangNode.active = false;
    },

    onBtnClick: function onBtnClick(event) {
        var self = this;
        if (event.target.name == "btnBack") {
            cc.scene.onShowTips("OK_CANCEL", "返回大厅房间仍会保留，快去邀请大伙来玩吧！", function () {
                cc.sssNet.send('backToHall');
                self.removeHandler();
                cc.director.loadScene("hall");
            });
        } else if (event.target.name == "btnDissolve") {
            cc.scene.onShowTips("OK_CANCEL", "解散房间不扣房卡，是否确定解散？", function () {
                cc.sssNet.send("dispress");
            });
        } else if (event.target.name == "btnReady") {
            console.log("onBtnReady");
            // var data = null;
            // cc.sssNet.send('ready',data);
            var data = {};
            var strings = this.cmdNode.getChildByName("cmdype").getComponent(cc.Label).string;
            switch (strings) {
                case 'zzql':
                    data.cmd = "02,03,04,05,06,07,08,09,010,011,012,013,014";
                    break;
                case 'ytl':
                    data.cmd = "12,03,34,25,16,37,08,09,010,111,212,013,014";
                    break;
                case 'ldb':
                    data.cmd = "12,02,33,23,14,34,05,05,09,19,212,012,014";
                    break;
                case 'bxgh':
                    data.cmd = "16,06,36,26,16,36,06,06,15,24,212,012,014";
                    break;
                case 'qxgz':
                    data.cmd = "17,07,37,27,17,37,07,02,13,26,212,012,014";
                    break;
                case 'llds':
                    data.cmd = "16,06,36,26,16,36,02,03,16,26,212,012,014";
                    break;
                case 'SFTX':
                    data.cmd = "16,06,36,26,17,37,07,27,112,212,312,012,05";
                    break;
                case 'SEHZ':
                    data.cmd = "111,011,311,211,112,312,212,012,113,213,313,014,014";
                    break;
                case 'STST':
                    data.cmd = "16,06,36,27,17,37,09,29,19,112,212,012,03";
                    break;
                case 'STHS':
                    data.cmd = "17,18,19,24,25,26,27,28,09,010,012,011,013";
                    break;
                case 'QD':
                    data.cmd = "18,08,39,29,110,310,010,012,112,213,212,012,014";
                    break;
                case 'QX':
                    data.cmd = "16,03,34,27,16,36,02,03,18,26,27,04,05";
                    break;
                case 'CYS':
                    data.cmd = "02,13,04,15,06,07,13,07,18,011,112,013,110";
                    break;
                case 'WDST':
                    data.cmd = "02,02,04,04,06,06,08,08,010,010,112,212,012";
                    break;
                case 'STH':
                    data.cmd = "02,03,06,15,16,17,18,19,310,311,312,35,36";
                    break;
                case 'SSZ':
                    data.cmd = "05,03,04,15,26,07,38,19,110,311,012,213,09";
                    break;
                default:
                    data = null;
                    break;
            }
            cc.log(data);
            cc.sssNet.send('ready', data);
            this.cmdNode.getChildByName("cmdype").getComponent(cc.Label).string = '';
        } else if (event.target.name == "btnStart") {
            console.log("onBtnStart");
            cc.log(cc.sssNetMgr);
            var numOfGames = 0;
            var list = cc.sssNetMgr.seats;
            for (var i = 0; i < list.length; i++) {
                if (list[i].userid != 0) {
                    numOfGames++;
                }
            }
            if (numOfGames > 1) {
                cc.sssNet.send('ready', null);
            } else {
                cc.scene.onShowTips("OK", "玩家数量不够，无法开始");
            }
        } else if (event.target.name == "btnSetting") {
            cc.scene.showPrefab("设置", false, function (node) {
                node.getComponent("Setting").init("GAME");
            });
        } else if (event.target.name == "kickout") {
            //踢出游戏
            var _userId = cc.vv.userinfoShow._userId;
            var data = {};
            data.userId = _userId;
            cc.log("kickout" + "@@@@@@@" + data.userId);
            cc.sssNet.send("kickout", data);
            cc.vv.userinfoShow.onClicked();
        } else if (event.target.name == "useinfo_hide") {
            var userinfo = cc.find("Canvas/userinfo");
            userinfo.active = false;
        } else if (event.target.name == "bthYaoqing") {
            //分享至微信
            //微信分享监听
            console.log('分享至微信: ');
            var SSSwanfa = "普通场";
            if (cc.sssNetMgr.wanfa === 0) {
                SSSwanfa = "普通场";
            } else if (cc.sssNetMgr.wanfa === 3) {
                SSSwanfa = "马牌";
            }

            //保存SSS房间信息
            cc.sys.localStorage.setItem("SSS_wanfa", cc.sssNetMgr.wanfa);
            cc.sys.localStorage.setItem("SSS_roomId", cc.sssNetMgr.roomId);

            //微信浏览器----公众号登录 
            if (cc.sys.browserType == "mqqbrowser" || "wechat" == cc.sys.browserType) {
                console.log("H5分享好友");
                cc.find("Canvas/WebShare").active = true;
                cc.vv.anysdkMgr.getAccess_token("小伙子，我在十三水" + "(" + SSSwanfa + ")" + "【" + cc.sssNetMgr.roomId + "】开好了房间，快来大战三百回合", cc.sssNetMgr.roomId);
            } else if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS) {
                var agent = anysdk.agentManager;
                this.share_plugin = agent.getSharePlugin();
                this.share_plugin.setListener(this.onShareResult, this);
                this.shareUrl("斗斗福建十三水", "小伙子，我在十三水" + "(" + SSSwanfa + ")" + "【" + cc.sssNetMgr.roomId + "】开好了房间，快来大战三百回合", "http://game.doudouyule.wang/?roomId=" + cc.sssNetMgr.roomId, "http://game.doudouyule.wang/icon.png", "0"); //标题 内容 URL 图片路径 发送至
            }
            //其它浏览器----二维码扫码登录 
            else {
                    console.log("H5分享好友");
                    cc.find("Canvas/WebShare").active = true;
                    cc.vv.anysdkMgr.getAccess_token("小伙子，我在十三水" + "(" + SSSwanfa + ")" + "【" + cc.sssNetMgr.roomId + "】开好了房间，快来大战三百回合", cc.sssNetMgr.roomId);
                }
        } else {
            if (event.target.name == "cmdbtn1") {
                this.cmdNode.getChildByName("cmdype").getComponent(cc.Label).string = "zzql";
            } else if (event.target.name == "cmdbtn2") {
                this.cmdNode.getChildByName("cmdype").getComponent(cc.Label).string = "ytl";
            } else if (event.target.name == "cmdbtn3") {
                this.cmdNode.getChildByName("cmdype").getComponent(cc.Label).string = "ldb";
            } else if (event.target.name == "cmdbtn4") {
                this.cmdNode.getChildByName("cmdype").getComponent(cc.Label).string = "bxgh";
            } else if (event.target.name == "cmdbtn5") {
                this.cmdNode.getChildByName("cmdype").getComponent(cc.Label).string = "qxgz";
            } else if (event.target.name == "cmdbtn6") {
                this.cmdNode.getChildByName("cmdype").getComponent(cc.Label).string = "llds";
            } else if (event.target.name == "cmdbtn7") {
                this.cmdNode.getChildByName("cmdype").getComponent(cc.Label).string = "SEHZ";
            } else if (event.target.name == "cmdbtn8") {
                this.cmdNode.getChildByName("cmdype").getComponent(cc.Label).string = "SFTX";
            } else if (event.target.name == "cmdbtn9") {
                this.cmdNode.getChildByName("cmdype").getComponent(cc.Label).string = "STHS";
            } else if (event.target.name == "cmdbtn10") {
                this.cmdNode.getChildByName("cmdype").getComponent(cc.Label).string = "STST";
            } else if (event.target.name == "cmdbtn11") {
                this.cmdNode.getChildByName("cmdype").getComponent(cc.Label).string = "QD";
            } else if (event.target.name == "cmdbtn12") {
                this.cmdNode.getChildByName("cmdype").getComponent(cc.Label).string = "QX";
            } else if (event.target.name == "cmdbtn13") {
                this.cmdNode.getChildByName("cmdype").getComponent(cc.Label).string = "CYS";
            } else if (event.target.name == "cmdbtn14") {
                this.cmdNode.getChildByName("cmdype").getComponent(cc.Label).string = "WDST";
            } else if (event.target.name == "cmdbtn15") {
                this.cmdNode.getChildByName("cmdype").getComponent(cc.Label).string = "STH";
            } else if (event.target.name == "cmdbtn16") {
                this.cmdNode.getChildByName("cmdype").getComponent(cc.Label).string = "SSZ";
            } else if (event.target.name == "clear") {
                this.cmdNode.getChildByName("cmdype").getComponent(cc.Label).string = "";
            }
        }
    },
    //分享事件
    onShareResult: function onShareResult(code, msg) {
        cc.log("share result, resultcode:" + code + ", msg: " + msg);
        switch (code) {
            case anysdk.ShareResultCode.kShareSuccess:
                //do something
                console.log('分享成功');
                break;
            case anysdk.ShareResultCode.kShareFail:
                //do something
                console.log('分享失败');
                break;
            case anysdk.ShareResultCode.kShareCancel:
                //do something
                console.log('分享取消');
                break;
            case anysdk.ShareResultCode.kShareNetworkError:
                //do something
                console.log('分享错误');
                break;
        }
    },
    onBtnHideWebShare: function onBtnHideWebShare() {
        cc.find("Canvas/WebShare").active = false;
    },
    //分享URL
    shareUrl: function shareUrl(title, text, url, imagePath, to) {
        console.log('分享URL: ');
        console.log('title: ' + title);
        console.log('text: ' + text);
        console.log('url: ' + url);
        console.log('imagePath: ' + imagePath);
        console.log('to: ' + to);
        var map = {
            title: title, //标题
            text: text, //文本
            url: url, //链接
            mediaType: '2', //分享类型
            shareTo: to, //分享至 0 聊天 1 朋友圈 2 收藏
            imagePath: imagePath, //图片路径
            thumbImage: jsb.fileUtils.getWritablePath() + 'icon.png' //苹果用
        };
        this.share_plugin.share(map);
    },
    // 出牌剩余时间
    setLastTime: function setLastTime(data) {
        // console.log(data)
        var prepareCom = this.prepare.getComponent('touch');
        var lastTime = data / 1000;
        prepareCom.setCountdown(lastTime);
    },
    setdissolutionTime: function setdissolutionTime(data) {
        this._time = data / 1000;
        if (this._time > 0) {
            var min = null;
            var sec = null;
            var t = Math.ceil(this._time);
            min = Math.floor(t / 60);
            sec = Math.floor(t % 60);
            this._min.string = min;
            this._second.string = sec;
        } else if (this._time <= 0) {
            this._isExit++;
            if (this._isExit === 1) {
                cc.sssNet.send("dispress");
            }
        }
    },

    setlixianTime: function setlixianTime(data) {
        //改变离线时间
        cc.log(date);
        var userId = data.userId; //离线人的ID
        var lastTime = 99; //离线人的剩余时间

        var self = this;
        var seatData = cc.sssNetMgr.seats;
        if (seatData) {
            for (var i = 0; i < seatData.length; i++) {
                if (seatData[i].userid === 0) {
                    continue;
                }
                if (seatData[i].userid === userId) {
                    var index = cc.sssNetMgr.getLocalIndex(seatData[i].seatindex);
                    // self.seatsCom.seatComs[index].setCountdown(lastTime);
                    self.gameSeatsCom.seatComs[index].setCountdown(lastTime);
                }
            }
        }
    },

    limitLogin: function limitLogin(data) {
        var _this = this;

        cc.sssNetMgr.roomId = null;
        cc.scene.onShowTips("OK", "您的账号在异地登录！", function () {
            _this.removeHandler();
            cc.director.loadScene("hall");
        });
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    update: function update(dt) {
        var minutes = Math.floor(Date.now() / 1000 / 60);
        if (this._lastMinute != minutes) {
            this._lastMinute = minutes;
            var date = new Date();
            var h = date.getHours();
            h = h < 10 ? "0" + h : h;

            var m = date.getMinutes();
            m = m < 10 ? "0" + m : m;
            // this._timeLabel.string = "" + h + ":" + m;
        }

        if (this._lastPlayTime != null) {
            if (Date.now() > this._lastPlayTime + 200) {
                this.onPlayerOver();
                this._lastPlayTime = null;
            }
        } else {
            this.playVoice();
        }
    },

    onPlayerOver: function onPlayerOver() {
        cc.audio.resumeAll();
        console.log("onPlayCallback:" + this._playingSeat);
        var localIndex = this._playingSeat;
        this._playingSeat = null;
        // this.seatsCom.seatComs[localIndex].voiceMsg(false);
        this.gameSeatsCom.seatComs[localIndex].voiceMsg(false);
    },

    onDestroy: function onDestroy() {
        cc.vv.voiceMgr.stop();
        //        cc.vv.voiceMgr.onPlayCallback = null;
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
        //# sourceMappingURL=sssgame.js.map
        