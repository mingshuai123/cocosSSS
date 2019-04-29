(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/sss/sssgame/gameSeat.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b69d3cyleNLV4L1rQ3BQ+6M', 'gameSeat', __filename);
// Script/sss/sssgame/gameSeat.js

"use strict";

var PaiType = require("define").PaiType;
var numSprites = [];
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
        userId: null,

        _sprIcon: null,
        _zhuang: null,
        _offline: null,
        _lblName: null,
        _lblScore: null,
        _scoreBg: null,
        _nddayingjia: null,
        _voicemsg: null,

        _chatBubble: null,
        _emoji: null,
        _lastChatTime: -1,

        _userName: "",
        _score: 0,
        _dayingjia: false,
        _isOffline: false,
        _isShowpaibei: true,
        _isReady: false,
        _isZhuang: false,
        _ready: null,
        _headBox: null,
        _touXiangKuang: null,
        numAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        _isclickpb: false
    },

    // use this for initialization
    onLoad: function onLoad() {
        this._lblName = this.node.getChildByName("lbUserName").getComponent(cc.Label);
        this._lblScore = this.node.getChildByName('score').getComponent(cc.Label);
        this.imgLoader = this.node.getChildByName("headBox").getComponent("ImageLoader");
        this.zhuang = this.node.getChildByName("zhuang");
        this.comparPaiNode = this.node.getChildByName("comparPai");
        this.paiBei = this.node.getChildByName("paiBei");
        this.dankong = this.node.getChildByName("dankong");
        this.teshupaiNode = this.node.getChildByName("teshupai");
        this.teshupaixing = this.node.getChildByName("teshupaixing");
        // this.tspType = this.node.getChildByName("tspType");

        this._voicemsg = this.node.getChildByName("voicemsg");
        this._ready = this.node.getChildByName('ready');
        this._headBox = this.node.getChildByName('headBox');
        this._touXiangKuang = this.node.getChildByName('touxiangkuang');

        this._offline = this.node.getChildByName("offline");
        this._offline.active = false;
        this._timeChild = this._offline.getChildByName('time'); //离线闹钟
        this._shiwei = this._timeChild.getChildByName("shiwei");
        this._gewei = this._timeChild.getChildByName("gewei");

        if (this.imgLoader && this.imgLoader.getComponent(cc.Button)) {
            cc.vv.utils.addClickEvent(this.imgLoader, this.node, "gameSeat", "onIconClicked");
        }

        numSprites.push("mjks-0");
        numSprites.push("mjks-1");
        numSprites.push("mjks-2");
        numSprites.push("mjks-3");
        numSprites.push("mjks-4");
        numSprites.push("mjks-5");
        numSprites.push("mjks-6");
        numSprites.push("mjks-7");
        numSprites.push("mjks-8");
        numSprites.push("mjks-9");

        this.arrTSPNode = [];

        this.arrPaiNode = [];
        this.arrNode = [];

        this.arrPaiNodeShow = [];
        this.arrNodeShow = [];

        this.arrScoreNodeZ = [];
        this.arrScoreLabelZ = [];
        this.arrScoreNodeF = [];
        this.arrScoreLabelF = [];
        this.arrFuHaoNode = [];
        this.arrFuHaoSprite = [];
        this.arrTeXiaoNode = [];
        this.arrTeXiaoSprite = [];
        var PaiNode = ["tdPai", "zdPai", "wdPai"];
        var PaiNodeshow = ["tdPai2", "zdPai2", "wdPai2"];
        for (var i = 0; i < PaiNode.length; i++) {
            var Node = this.comparPaiNode.getChildByName(PaiNode[i]);
            var NodeShow = this.paiBei.getChildByName(PaiNodeshow[i]);
            var arrTemp = [];
            var nodearrtemp = [];
            for (var j = 0; j < Node.childrenCount; j++) {
                var pai = Node.getChildByName("pai" + j);
                arrTemp.push(pai);
            }
            Node.active = false;
            this.arrPaiNode.push(arrTemp);
            this.arrNode.push(Node);

            if (NodeShow) {
                for (var j = 0; j < NodeShow.childrenCount; j++) {
                    var pai = NodeShow.getChildByName("pai" + j);
                    nodearrtemp.push(pai);
                }

                NodeShow ? NodeShow.active = false : '';
                this.arrPaiNodeShow.push(nodearrtemp);
                this.arrNodeShow.push(NodeShow);
            }
        }

        var scoreNodeZ = this.comparPaiNode.getChildByName("zhengScore");
        for (var i = 0; i < scoreNodeZ.childrenCount; i++) {
            var ScoreNode = scoreNodeZ.getChildByName("score" + i);
            var label = ScoreNode.getComponent(cc.Label);
            this.arrScoreNodeZ.push(ScoreNode);
            this.arrScoreLabelZ.push(label);
            ScoreNode.active = false;
        }

        var scoreNodeF = this.comparPaiNode.getChildByName("FuScore");
        for (var i = 0; i < scoreNodeF.childrenCount; i++) {
            var ScoreNode = scoreNodeF.getChildByName("score" + i);
            var label = ScoreNode.getComponent(cc.Label);
            this.arrScoreNodeF.push(ScoreNode);
            this.arrScoreLabelF.push(label);
            ScoreNode.active = false;
        }

        var FuHaoNode = this.comparPaiNode.getChildByName("fuhao");
        for (var i = 0; i < FuHaoNode.childrenCount; i++) {
            var Node = FuHaoNode.getChildByName("fuhao" + i);
            var Sprite = Node.getComponent(cc.Sprite);
            this.arrFuHaoNode.push(Node);
            this.arrFuHaoSprite.push(Sprite);
            Node.active = false;
        }

        var texiaoNode = this.comparPaiNode.getChildByName("texiao");
        for (var i = 0; i < texiaoNode.childrenCount; i++) {
            var Node = texiaoNode.getChildByName("Texiao" + i);
            var Sprite = Node.getComponent(cc.Sprite);
            this.arrTeXiaoNode.push(Node);
            this.arrTeXiaoSprite.push(Sprite);
            Node.active = false;
        }

        for (var _i = 0; _i < this.teshupaiNode.childrenCount; _i++) {
            var _Node = this.teshupaiNode.getChildByName("pai" + _i);
            this.arrTSPNode.push(_Node);
        }

        this.beShoot = this.node.getChildByName("beShoot");
        this.doShoot = this.node.getChildByName("doShoot");

        this.tdPB = this.paiBei.getChildByName("tdPai");
        this.zdPB = this.paiBei.getChildByName("zdPai");
        this.wdPB = this.paiBei.getChildByName("wdPai");
        this.beShoot.active = false;
        this.doShoot.active = false;
        this.teshupaiNode.active = false;

        this.tdPB.active = false;
        this.zdPB.active = false;
        this.wdPB.active = false;

        if (this.dankong) {
            this.dankong.active = false;
        }

        if (this.zhuang) {
            this.zhuang.active = false;
        }

        this.allScore = 0;
        this._ready.active = false;
        this._headBox.active = false;
        this._touXiangKuang.active = false;
    },

    onIconClicked: function onIconClicked() {
        cc.log(this.userId);
        var iconSprite = this.imgLoader.node.getComponent(cc.Sprite);
        if (this.userId != null && this.userId > 0) {
            var seat = cc.sssNetMgr.getSeatByID(this.userId);
            cc.log(seat);
            cc.vv.userinfoShow.show(seat.name, seat.userid, iconSprite);
        }
    },

    //设置倒计时
    setCountdown: function setCountdown(data) {
        this.lixianTime = data;
        var gewei = null;
        var shiwei = null;
        var t = Math.ceil(this.lixianTime);
        if (t >= 10) {
            shiwei = Math.floor(t / 10);
            gewei = t % 10;
        } else {
            shiwei = 0;
            gewei = t % 10;
        }
        if (this._shiwei && this._gewei) {
            var spriteS = this._shiwei.getComponent(cc.Sprite);
            var spriteG = this._gewei.getComponent(cc.Sprite);
            var spriteFrameS = this.numAtlas.getSpriteFrame(this.getNumSpriteByNum(shiwei));
            var spriteFrameG = this.numAtlas.getSpriteFrame(this.getNumSpriteByNum(gewei));
            spriteS.spriteFrame = spriteFrameS;
            spriteG.spriteFrame = spriteFrameG;
        }
    },

    getNumSpriteByNum: function getNumSpriteByNum(data) {
        for (var i = 0; i < 10; i++) {
            if (data === i) {
                return numSprites[i];
            }
        }
    },

    resetGameSeat: function resetGameSeat() {
        for (var _i2 = 0; _i2 < this.arrScoreNodeZ.length; _i2++) {
            this.arrScoreNodeZ[_i2].active = false;
        }
        for (var _i3 = 0; _i3 < this.arrScoreNodeF.length; _i3++) {
            this.arrScoreNodeF[_i3].active = false;
        }
        for (var _i4 = 0; _i4 < this.arrFuHaoNode.length; _i4++) {
            this.arrFuHaoNode[_i4].active = false;
        }
        for (var _i5 = 0; _i5 < this.arrTeXiaoNode.length; _i5++) {
            this.arrTeXiaoNode[_i5].active = false;
        }
        for (var _i6 = 0; _i6 < this.arrScoreLabelZ.length; _i6++) {
            this.arrScoreLabelZ[_i6].string = 0;
        }
        for (var _i7 = 0; _i7 < this.arrScoreLabelF.length; _i7++) {
            this.arrScoreLabelF[_i7].string = 0;
        }

        for (var _i8 = 0; _i8 < this.arrNode.length; _i8++) {
            this.arrNode[_i8].active = false;
        }
        var paiAtlas = window.sssGame.paiAtlas;
        var spriteFrame = paiAtlas.getSpriteFrame('paibei');
        // 初始化牌背
        this._isclickpb = false;
        window.sssGame.outpaidata = null;
        for (var i = 0; i < this.tdPB.childrenCount; i++) {
            var paiNode = this.tdPB.children[i];
            var paiCom = paiNode.getComponent("pai");
            paiCom.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }
        for (var i = 0; i < this.zdPB.childrenCount; i++) {
            var paiNode = this.zdPB.children[i];
            var paiCom = paiNode.getComponent("pai");
            paiCom.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }
        for (var i = 0; i < this.wdPB.childrenCount; i++) {
            var paiNode = this.wdPB.children[i];
            var paiCom = paiNode.getComponent("pai");
            paiCom.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }

        this.beShoot.active = false;
        this.doShoot.active = false;
        this.teshupaiNode.active = false;
        this.teshupaixing.active = false;
        if (this.dankong) {
            this.dankong.active = false;
        }
        if (this.zhuang) {
            this.zhuang.active = false;
        }
        this.allScore = 0;
        this._ready.active = false;

        if (this._offline) {
            this._offline.active = this._isOffline && this._userName != "";
        }
    },

    setReady: function setReady(isReady) {
        this._isReady = isReady;
        if (this._ready) {
            this._ready.active = this._isReady && cc.sssNetMgr.numOfGames >= 0;
        }
    },

    setInfo: function setInfo(data) {
        var name = data.name;
        if (name) {
            var len = name.length;
            if (len > 6) {
                var str = name.substring(0, 6);
                this._userName = str + '...';
            } else {
                this._userName = name;
            }
        }
        this._lblName.string = this._userName;
        this.userId = data.userid;
        this._headBox.active = true;
        this._touXiangKuang.active = true;
        if (this.imgLoader && data.userid) {
            this.imgLoader.setUserID(data.userid, data.icon);
        }
        sssGame.uidSeats[data.userid] = this;
    },
    setNullInfo: function setNullInfo(data) {
        cc.log(data);
        this.userId = 0;
        this._lblName.string = '';
        this._headBox.active = false;
        this._touXiangKuang.active = false;
        this._ready.active = false;
        // this._lblScore = '';
    },


    setOffline: function setOffline(isOffline) {
        // cc.log(isOffline);
        this._isOffline = isOffline;
        if (this._offline) {
            this._offline.active = this._isOffline && this._userName != "";
        }
    },
    setTotalScore: function setTotalScore(data) {
        this._lblScore.string = data;
    },
    sortres: function sortres(arr) {
        arr.sort(function (a, b) {
            return b.value - a.value;
        });
        var a1 = [],
            a2 = [],
            a3 = [],
            a4 = [],
            a5 = [];

        function addNum(value, index) {
            if (index == 0) {
                a1.push(value);
            } else if (index == 1) {
                a2.push(value);
            } else if (index == 2) {
                a3.push(value);
            } else if (index == 3) {
                a4.push(value);
            } else if (index == 4) {
                a5.push(value);
            } else {
                return;
            }
        }

        var tmp = [];
        var len = arr.length;
        var index = 0;
        for (var i = 0; i < len; i++) {
            addNum(arr[i], i);
            index = 0;
            for (var j = i + 1; j < len; j++) {
                if (arr[i].value == arr[j].value) {
                    addNum(arr[j], i);
                    index++;
                }
            }
            i = i + index;
        }
        var arrs = [a1, a2, a3, a4, a5];
        arrs.sort(function (a, b) {
            return b.length - a.length;
        });
        for (var x = 0; x < arrs.length; x++) {
            tmp = tmp.concat(arrs[x]);
        }
        return tmp;
    },
    showTD: function showTD(arrPai, score, paiType) {
        this.allScore = 0;
        var arrPaiData = this.sortres(arrPai);
        for (var i = 0; i < this.arrPaiNode[0].length; i++) {
            var paiNode = this.arrPaiNode[0][i];
            var paiCom = paiNode.getComponent("pai");
            paiCom.setInfo(arrPaiData[i]);
        }
        if (this.arrPaiNodeShow[0]) {
            for (var i = 0; i < this.arrPaiNodeShow[0].length; i++) {
                var paiNodeShow = this.arrPaiNodeShow[0][i];
                var paiCom2 = paiNodeShow.getComponent("pai");
                paiCom2.setInfo(arrPaiData[i]);
            }
            this.arrNodeShow[0].active = true;
            this.showtddh = function () {
                this.arrNodeShow[0].active = false;
                this.arrNode[0].active = true;
            };
            this.scheduleOnce(this.showtddh, 0.5);
        } else {
            this.arrNode[0].active = true;
        }

        if (score < 0) {
            this.arrScoreNodeF[0].active = true;
            this.arrScoreNodeZ[0].active = false;
            this.arrScoreLabelF[0].string = 0 - score;
        } else {
            this.arrScoreNodeF[0].active = false;
            this.arrScoreNodeZ[0].active = true;
            this.arrScoreLabelZ[0].string = score;
        }
        if (paiType > 7) {
            //播放动画
        }
        this.arrFuHaoNode[0].active = true;
        this.arrTeXiaoNode[0].active = true;

        this.setFuHao(score, 0);
        this.addAllScore(score);
        this.showAllScore();
        this.paiTexiaoTD(paiType);
        this.tdPB.active = false;

        cc.audio.playSFX("sssMusic/bipai.mp3");
    },
    showZD: function showZD(arrPai, score, paiType) {
        this.zdPB.active = false;
        cc.audio.playSFX("sssMusic/bipai.mp3");
        var arrPaiData = this.sortres(arrPai);
        for (var i = 0; i < this.arrPaiNode[1].length; i++) {
            var paiNode = this.arrPaiNode[1][i];
            var paiCom = paiNode.getComponent("pai");
            paiCom.setInfo(arrPaiData[i]);
        }
        if (this.arrPaiNodeShow[1]) {
            for (var i = 0; i < this.arrPaiNodeShow[1].length; i++) {
                var paiNodeShow = this.arrPaiNodeShow[1][i];
                var paiCom2 = paiNodeShow.getComponent("pai");
                paiCom2.setInfo(arrPaiData[i]);
            }
            this.arrNodeShow[1].active = true;
            this.showtddh = function () {
                this.arrNodeShow[1].active = false;
                this.arrNode[1].active = true;
            };
            this.scheduleOnce(this.showtddh, 0.5);
        } else {
            this.arrNode[1].active = true;
        }

        // @@@@@@@@@@@@@@@@@@@@@@@@@
        if (score < 0) {
            this.arrScoreNodeF[1].active = true;
            this.arrScoreNodeZ[1].active = false;
            this.arrScoreLabelF[1].string = 0 - score;
        } else {
            this.arrScoreNodeF[1].active = false;
            this.arrScoreNodeZ[1].active = true;
            this.arrScoreLabelZ[1].string = score;
        }
        this.arrFuHaoNode[1].active = true;
        this.arrTeXiaoNode[1].active = true;

        this.setFuHao(score, 1);
        this.addAllScore(score);
        this.showAllScore();
        this.paiTexiaoZD(paiType);
    },
    showWD: function showWD(arrPai, score, paiType) {
        this.wdPB.active = false;
        cc.audio.playSFX("sssMusic/bipai.mp3");
        var arrPaiData = this.sortres(arrPai);
        for (var i = 0; i < this.arrPaiNode[2].length; i++) {
            var paiNode = this.arrPaiNode[2][i];
            var paiCom = paiNode.getComponent("pai");
            paiCom.setInfo(arrPaiData[i]);
        }
        if (this.arrPaiNodeShow[2]) {
            for (var i = 0; i < this.arrPaiNodeShow[2].length; i++) {
                var paiNodeShow = this.arrPaiNodeShow[2][i];
                var paiCom2 = paiNodeShow.getComponent("pai");
                paiCom2.setInfo(arrPaiData[i]);
            }
            this.arrNodeShow[2].active = true;
            this.showtddh = function () {
                this.arrNodeShow[2].active = false;
                this.arrNode[2].active = true;
            };
            this.scheduleOnce(this.showtddh, 0.5);
        } else {
            this.arrNode[2].active = true;
        }
        // @@@@@@@@@@@@@@@@@@@@@@
        if (score < 0) {
            this.arrScoreNodeF[2].active = true;
            this.arrScoreNodeZ[2].active = false;
            this.arrScoreLabelF[2].string = 0 - score;
        } else {
            this.arrScoreNodeF[2].active = false;
            this.arrScoreNodeZ[2].active = true;
            this.arrScoreLabelZ[2].string = score;
        }
        this.arrFuHaoNode[2].active = true;
        this.arrTeXiaoNode[2].active = true;
        this.setFuHao(score, 2);
        this.addAllScore(score);
        this.showAllScore();
        this.paiTexiaoWD(paiType);
    },
    // 点击牌背
    onClickPaibei: function onClickPaibei(event) {
        cc.log('click paibei');
        var target = event.target;
        var data = window.sssGame.outpaidata;
        if (data == null) {
            cc.log('data is null');
            return false;
        }
        data[0] = this.sortres(data[0]);
        data[1] = this.sortres(data[1]);
        data[2] = this.sortres(data[2]);
        if (this._isShowpaibei) {
            for (var i = 0; i < this.tdPB.childrenCount; i++) {
                var paiNode = this.tdPB.children[i];
                var paiCom = paiNode.getComponent("pai");
                paiCom.setInfo(data[0][i]);
            }
            for (var i = 0; i < this.zdPB.childrenCount; i++) {
                var paiNode = this.zdPB.children[i];
                var paiCom = paiNode.getComponent("pai");
                paiCom.setInfo(data[1][i]);
            }
            for (var i = 0; i < this.wdPB.childrenCount; i++) {
                var paiNode = this.wdPB.children[i];
                var paiCom = paiNode.getComponent("pai");
                paiCom.setInfo(data[2][i]);
            }
            this.tdPB.active = true;
            this.zdPB.active = true;
            this.wdPB.active = true;
            this.tdPB.runAction(cc.sequence([cc.scaleTo(0.3, 1.2), cc.scaleTo(0.3, 1.0)]));
            this.zdPB.runAction(cc.sequence([cc.scaleTo(0.3, 1.2), cc.scaleTo(0.3, 1.0)]));
            this.wdPB.runAction(cc.sequence([cc.scaleTo(0.3, 1.2), cc.scaleTo(0.3, 1.0)]));
            this._isShowpaibei = false;
        } else {
            var paiAtlas = window.sssGame.paiAtlas;
            var spriteFrame = paiAtlas.getSpriteFrame('paibei');
            for (var i = 0; i < this.tdPB.childrenCount; i++) {
                var paiNode = this.tdPB.children[i];
                var paiCom = paiNode.getComponent("pai");
                paiCom.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
            for (var i = 0; i < this.zdPB.childrenCount; i++) {
                var paiNode = this.zdPB.children[i];
                var paiCom = paiNode.getComponent("pai");
                paiCom.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
            for (var i = 0; i < this.wdPB.childrenCount; i++) {
                var paiNode = this.wdPB.children[i];
                var paiCom = paiNode.getComponent("pai");
                paiCom.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
            this._isShowpaibei = true;
        }
    },

    //改变符号
    setFuHao: function setFuHao(Score, Index) {
        var shuzi = window.sssGame.shuzi;
        if (Score < 0) {
            var spriteFrame = shuzi.getSpriteFrame("fuhao");
            this.arrFuHaoSprite[Index].spriteFrame = spriteFrame;
        } else {
            var spriteFrame = shuzi.getSpriteFrame("zhenghao");
            this.arrFuHaoSprite[Index].spriteFrame = spriteFrame;
        }
    },
    paiTexiaoTD: function paiTexiaoTD(paiType) {
        var paiTexiao = window.sssGame.paiTexiao;
        var paiName = "texiao_" + paiType;
        var spriteFrame = paiTexiao.getSpriteFrame(paiName);
        var animation = window.sssGame.Animation;
        if (paiType == 9) {
            this.arrTeXiaoNode[0].setContentSize(82.5, 35);
        } else {
            this.arrTeXiaoNode[0].setContentSize(55, 35);
        }
        this.arrTeXiaoSprite[0].spriteFrame = spriteFrame;

        if (paiType > 7) {
            var paiGuangS = animation.paiguangS;
            paiGuangS.active = true;
            var pos = this.arrTeXiaoNode[0].getPosition();
            var worldPos = this.arrTeXiaoNode[0].parent.convertToWorldSpaceAR(pos);
            var animNode = window.sssGame.AnimationNode;
            var guangPos = animNode.convertToNodeSpaceAR(worldPos);
            paiGuangS.setPosition(guangPos);
            paiGuangS.getComponent(cc.Animation).play();
        }
        var audioUrl = "sssMusic/" + "texiao/" + paiType + ".mp3";
        cc.audio.playSFX(audioUrl);
    },
    paiTexiaoZD: function paiTexiaoZD(paiType) {
        var paiTexiao = window.sssGame.paiTexiao;
        var paiName = "texiao_" + paiType;
        var spriteFrame = paiTexiao.getSpriteFrame(paiName);
        var animation = window.sssGame.Animation;
        if (paiType == 12 || paiType == 15 || paiType == 16) {
            this.arrTeXiaoNode[1].setContentSize(110, 35);
        } else if (paiType == 13) {
            this.arrTeXiaoNode[1].setContentSize(137.5, 35);
        } else if (paiType == 9) {
            this.arrTeXiaoNode[1].setContentSize(82.5, 35);
        } else {
            this.arrTeXiaoNode[1].setContentSize(55, 35);
        }
        this.arrTeXiaoSprite[1].spriteFrame = spriteFrame;

        if (paiType === 8 || paiType === 10) {
            var paiGuangS = animation.paiguangS;
            paiGuangS.active = true;
            var pos = this.arrTeXiaoNode[1].getPosition();
            var worldPos = this.arrTeXiaoNode[1].parent.convertToWorldSpaceAR(pos);
            var animNode = window.sssGame.AnimationNode;
            var guangPos = animNode.convertToNodeSpaceAR(worldPos);
            paiGuangS.setPosition(guangPos);
            paiGuangS.getComponent(cc.Animation).play();
        } else if (paiType === 9 || paiType === 11) {
            var paiGuangM = animation.paiguangM;
            paiGuangM.active = true;
            var pos = this.arrTeXiaoNode[1].getPosition();
            var worldPos = this.arrTeXiaoNode[1].parent.convertToWorldSpaceAR(pos);
            var animNode = window.sssGame.AnimationNode;
            var guangPos = animNode.convertToNodeSpaceAR(worldPos);
            paiGuangM.setPosition(guangPos);
            paiGuangM.getComponent(cc.Animation).play();
        } else if (paiType > 12) {
            var paiGuangL = animation.paiguangL;
            paiGuangL.active = true;
            var pos = this.arrTeXiaoNode[1].getPosition();
            var worldPos = this.arrTeXiaoNode[1].parent.convertToWorldSpaceAR(pos);
            var animNode = window.sssGame.AnimationNode;
            var guangPos = animNode.convertToNodeSpaceAR(worldPos);
            paiGuangL.setPosition(guangPos);
            paiGuangL.getComponent(cc.Animation).play();
        }
        var audioUrl = "sssMusic/" + "texiao/" + paiType + ".mp3";
        cc.audio.playSFX(audioUrl);
    },
    paiTexiaoWD: function paiTexiaoWD(paiType) {
        var paiTexiao = window.sssGame.paiTexiao;
        var paiName = "texiao_" + paiType;
        var spriteFrame = paiTexiao.getSpriteFrame(paiName);
        var animation = window.sssGame.Animation;
        if (paiType == 9) {
            this.arrTeXiaoNode[2].setContentSize(82.5, 35);
        } else {
            this.arrTeXiaoNode[2].setContentSize(55, 35);
        }
        this.arrTeXiaoSprite[2].spriteFrame = spriteFrame;

        if (paiType === 8 || paiType === 10) {
            var paiGuangS = animation.paiguangS;
            paiGuangS.active = true;
            var pos = this.arrTeXiaoNode[2].getPosition();
            var worldPos = this.arrTeXiaoNode[2].parent.convertToWorldSpaceAR(pos);
            var animNode = window.sssGame.AnimationNode;
            var guangPos = animNode.convertToNodeSpaceAR(worldPos);
            paiGuangS.setPosition(guangPos);
            paiGuangS.getComponent(cc.Animation).play();
        } else if (paiType === 9 || paiType === 11) {
            var paiGuangM = animation.paiguangM;
            paiGuangM.active = true;
            var pos = this.arrTeXiaoNode[2].getPosition();
            var worldPos = this.arrTeXiaoNode[2].parent.convertToWorldSpaceAR(pos);
            var animNode = window.sssGame.AnimationNode;
            var guangPos = animNode.convertToNodeSpaceAR(worldPos);
            paiGuangM.setPosition(guangPos);
            paiGuangM.getComponent(cc.Animation).play();
        }
        var audioUrl = "sssMusic/" + "texiao/" + paiType + ".mp3";
        cc.audio.playSFX(audioUrl);
    },
    showShoot: function showShoot(bShoot, index0, index1) {
        var self = this;
        // 打枪
        var animation = window.sssGame.Animation;
        if (bShoot) {
            cc.audio.playSFX("sssMusic/daqiang.mp3");
            var qiang = animation.daqiang;
            qiang.active = true;
            this.setQiangDir(qiang, index0, index1);
            this.setDaQiangPosition(qiang, index0);
            qiang.getComponent(cc.Animation).play('daqiang');
            cc.audio.playSFX("sssMusic/daqiangsheng.mp3");
        } else if (!bShoot) {
            var keng = animation.dankeng;
            keng.active = true;
            this.setDanKnegPosition(keng, index1);
            keng.getComponent(cc.Animation).play('dangkeng');
            this.kong = function () {
                self.dankong.active = true;
            };
            this.scheduleOnce(this.kong, 0.58);
        }
    },

    //改变打枪动画位置
    setDaQiangPosition: function setDaQiangPosition(qiangA, index) {
        if (cc.sssNetMgr.wanfa === 1) {
            if (index === 0) {
                qiangA.setPosition(-120, -160);
            } else if (index === 1) {
                qiangA.setPosition(320, 0);
            } else if (index === 2) {
                qiangA.setPosition(-50, 150);
            } else if (index === 3) {
                qiangA.setPosition(-410, 0);
            }
        } else {
            if (index === 0) {
                qiangA.setPosition(-33, -114);
            } else if (index === 1) {
                qiangA.setPosition(-50, 50);
            } else if (index === 2) {
                qiangA.setPosition(-300, 0);
            } else if (index === 3) {
                qiangA.setPosition(200, 0);
            } else if (index === 4) {
                qiangA.setPosition(-300, 114);
            } else if (index === 5) {
                qiangA.setPosition(200, -114);
            } else if (index === 6) {
                qiangA.setPosition(200, 114);
            } else if (index === 7) {
                qiangA.setPosition(-300, -114);
            }
        }
    },
    setDanKnegPosition: function setDanKnegPosition(qiangA, index) {
        if (index === 0) {
            qiangA.setPosition(-50, -150);
        } else if (index === 1) {
            qiangA.setPosition(-50, 250);
        } else if (index === 2) {
            qiangA.setPosition(-500, 0);
        } else if (index === 3) {
            qiangA.setPosition(450, 0);
        } else if (index === 4) {
            qiangA.setPosition(-400, 150);
        } else if (index === 5) {
            qiangA.setPosition(350, -150);
        } else if (index === 6) {
            qiangA.setPosition(350, 250);
        } else if (index === 7) {
            qiangA.setPosition(-400, -150);
        }
    },
    //改变枪方向
    setQiangDir: function setQiangDir(qiangA, index0, index1) {
        if (cc.sssNetMgr.wanfa === 1) {
            if (index0 === 0) {
                if (index1 === 1) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(30);
                } else if (index1 === 2) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(-20);
                } else if (index1 === 3) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(-20);
                }
            } else if (index0 === 1) {
                if (index1 === 0) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(-80);
                } else if (index1 === 2) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(-20);
                } else if (index1 === 3) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(-40);
                }
            } else if (index0 === 2) {
                if (index1 === 0) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(-120);
                } else if (index1 === 1) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(70);
                } else if (index1 === 3) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(-70);
                }
            } else if (index0 === 3) {
                if (index1 === 0) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(90);
                } else if (index1 === 1) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(40);
                } else if (index1 === 2) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(20);
                }
            }
        } else {
            if (index0 == 0) {
                if (index1 == 1) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(45);
                } else if (index1 == 2) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(-15);
                } else if (index1 == 3) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(15);
                } else if (index1 == 4) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(15);
                } else if (index1 == 5) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(60);
                } else if (index1 == 6) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(0);
                } else if (index1 == 7) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(-60);
                }
            } else if (index0 == 1) {
                if (index1 == 0) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(-120);
                } else if (index1 == 2) {
                    qiangA.setScale(1, -1);
                    qiangA.setRotation(30);
                } else if (index1 == 3) {
                    qiangA.setScale(-1, -1);
                    qiangA.setRotation(-30);
                } else if (index1 == 4) {
                    qiangA.setScale(1, -1);
                    qiangA.setRotation(60);
                } else if (index1 == 5) {
                    qiangA.setScale(-1, -1);
                    qiangA.setRotation(0);
                } else if (index1 == 6) {
                    qiangA.setScale(-1, -1);
                    qiangA.setRotation(-60);
                } else if (index1 == 7) {
                    qiangA.setScale(1, -1);
                    qiangA.setRotation(0);
                }
            } else if (index0 == 2) {
                if (index1 == 0) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(90);
                } else if (index1 == 1) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(90);
                } else if (index1 == 3) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(30);
                } else if (index1 == 4) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(30);
                } else if (index1 == 5) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(60);
                } else if (index1 == 6) {
                    qiangA.setScale(-1, -1);
                    qiangA.setRotation(-60);
                } else if (index1 == 7) {
                    qiangA.setScale(1, -1);
                    qiangA.setRotation(0);
                }
            } else if (index0 == 3) {
                if (index1 == 0) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(-90);
                } else if (index1 == 1) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(-90);
                } else if (index1 == 2) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(-30);
                } else if (index1 == 4) {
                    qiangA.setScale(1, -1);
                    qiangA.setRotation(60);
                } else if (index1 == 5) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(180);
                } else if (index1 == 6) {
                    qiangA.setScale(1, -1);
                    qiangA.setRotation(150);
                } else if (index1 == 7) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(-60);
                }
            } else if (index0 == 4) {
                if (index1 == 0) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(90);
                } else if (index1 == 5) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(60);
                } else if (index1 == 1) {
                    qiangA.setScale(-1, -1);
                    qiangA.setRotation(-60);
                } else if (index1 == 2) {
                    qiangA.setScale(1, -1);
                    qiangA.setRotation(0);
                } else if (index1 == 3) {
                    qiangA.setScale(-1, -1);
                    qiangA.setRotation(30);
                } else if (index1 == 6) {
                    qiangA.setScale(-1, -1);
                    qiangA.setRotation(-45);
                } else if (index1 == 7) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(150);
                }
            } else if (index0 == 5) {
                if (index1 == 0) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(-75);
                } else if (index1 == 7) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(-40);
                } else if (index1 == 2) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(-20);
                } else if (index1 == 1) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(15);
                } else if (index1 == 3) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(0);
                } else if (index1 == 6) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(-30);
                } else if (index1 == 4) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(0);
                }
            } else if (index0 == 6) {
                if (index1 == 0) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(-90);
                } else if (index1 == 1) {
                    qiangA.setScale(1, -1);
                    qiangA.setRotation(90);
                } else if (index1 == 2) {
                    qiangA.setScale(1, -1);
                    qiangA.setRotation(30);
                } else if (index1 == 3) {
                    qiangA.setScale(-1, -1);
                    qiangA.setRotation(0);
                } else if (index1 == 4) {
                    qiangA.setScale(1, -1);
                    qiangA.setRotation(45);
                } else if (index1 == 5) {
                    qiangA.setScale(-1, -1);
                    qiangA.setRotation(30);
                } else if (index1 == 7) {
                    qiangA.setScale(-1, -1);
                    qiangA.setRotation(110);
                }
            } else if (index0 == 7) {
                if (index1 == 0) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(75);
                } else if (index1 == 1) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(15);
                } else if (index1 == 2) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(0);
                } else if (index1 == 3) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(15);
                } else if (index1 == 4) {
                    qiangA.setScale(1, 1);
                    qiangA.setRotation(45);
                } else if (index1 == 5) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(45);
                } else if (index1 == 6) {
                    qiangA.setScale(-1, 1);
                    qiangA.setRotation(0);
                }
            }
        }
    },

    paibei: function paibei(len) {
        this.tdPB.active = true;
        this.zdPB.active = true;
        this.wdPB.active = true;
        if (len === 13) {
            this.teshupaixing.active = true;
        }
    },
    addAllScore: function addAllScore(score) {
        this.allScore += score;
    },
    setAllScore: function setAllScore(score) {
        this.allScore = score;
        this.showAllScore();
    },
    showAllScore: function showAllScore() {
        if (this.allScore < 0) {
            this.arrScoreNodeF[3].active = true;
            this.arrScoreNodeZ[3].active = false;
            this.arrScoreLabelF[3].string = 0 - this.allScore;
        } else {
            this.arrScoreNodeF[3].active = false;
            this.arrScoreNodeZ[3].active = true;
            this.arrScoreLabelZ[3].string = this.allScore;
        }
        this.arrFuHaoNode[3].active = true;
        this.setFuHao(this.allScore, 3);
    },

    showSpecialResult: function showSpecialResult(holds, type) {
        console.log("showSpecialResult");
        for (var i = 0; i < this.arrTSPNode.length; i++) {
            var paiCom = this.arrTSPNode[i].getComponent("pai");
            paiCom.setInfo(holds[i]);
        }

        this.teshupaiNode.active = true;
        this.tdPB.active = false;
        this.zdPB.active = false;
        this.wdPB.active = false;
        this.teshupaixing.active = false;

        var animation = window.sssGame.Animation;
        if (type == PaiType.STH) {
            animation.santonghua.active = true;
            animation.santonghua.getComponent(cc.Animation).play('santonghua');
            cc.audio.playSFX("sssMusic/santonghua.mp3");
        } else if (type == PaiType.SSZ) {
            animation.sanshunzi.active = true;
            animation.sanshunzi.getComponent(cc.Animation).play('sanshunzi');
            cc.audio.playSFX("sssMusic/sanshunzi.mp3");
        } else if (type == PaiType.LDB) {
            animation.liuduiban.active = true;
            animation.liuduiban.getComponent(cc.Animation).play('liuduiban');
            cc.audio.playSFX("sssMusic/luiduiban.mp3");
        } else if (type == PaiType.QX) {
            animation.quanxiao.active = true;
            animation.quanxiao.getComponent(cc.Animation).play('quanxiao');
            cc.audio.playSFX("sssMusic/quanxiao.mp3");
        } else if (type == PaiType.QD) {
            animation.quanda.active = true;
            animation.quanda.getComponent(cc.Animation).play('quanda');
            cc.audio.playSFX("sssMusic/quanda.mp3");
        } else if (type == PaiType.CYS) {
            animation.cuoyise.active = true;
            animation.cuoyise.getComponent(cc.Animation).play('cuoyise');
            cc.audio.playSFX("sssMusic/cuoyise.mp3");
        } else if (type == PaiType.SFTX) {
            animation.sanfentianxia.active = true;
            animation.sanfentianxia.getComponent(cc.Animation).play('sanfentianxia');
            cc.audio.playSFX("sssMusic/sanfentianxia.mp3");
        } else if (type == PaiType.STHS) {
            animation.santonghuashun.active = true;
            animation.santonghuashun.getComponent(cc.Animation).play('santonghuashun');
            cc.audio.playSFX("sssMusic/santonghuashun.mp3");
        } else if (type == PaiType.YTL) {
            animation.long.active = true;
            animation.long.getComponent(cc.Animation).play('long');
            cc.audio.playSFX("sssMusic/long.mp3");
        } else if (type == PaiType.ZZQL) {
            animation.zzlong.active = true;
            animation.zzlong.getComponent(cc.Animation).play('long');
            cc.audio.playSFX("sssMusic/zzlong.mp3");
        } else if (type == PaiType.LLDS || type == PaiType.QXGZ || type == PaiType.BXGH) {
            animation.tiezhi.active = true;
            animation.tiezhi.getComponent(cc.Animation).play('tiezhi');
            cc.audio.playSFX("sssMusic/tiezi.mp3");
        } else if (type == PaiType.THS) {
            animation.tonghuashun.active = true;
            animation.tonghuashun.getComponent(cc.Animation).play('tonghuashun');
            cc.audio.playSFX("sssMusic/tonghuashun.mp3");
        } else if (type == PaiType.WT) {
            animation.wutong.active = true;
            animation.wutong.getComponent(cc.Animation).play('wutong');
            cc.audio.playSFX("sssMusic/wutong.mp3");
        } else if (type == PaiType.LLDS) {
            animation.llds.active = true;
            animation.llds.getComponent(cc.Animation).play('liuduiban');
            cc.audio.playSFX("sssMusic/wutong.mp3");
        } else if (type == PaiType.QXGZ) {
            animation.qxgz.active = true;
            animation.qxgz.getComponent(cc.Animation).play('liuduiban');
            cc.audio.playSFX("sssMusic/wutong.mp3");
        } else if (type == PaiType.BXGH) {
            animation.bxgh.active = true;
            animation.bxgh.getComponent(cc.Animation).play('liuduiban');
            cc.audio.playSFX("sssMusic/wutong.mp3");
        }
    },

    chat: function chat(content) {
        if (this._chatBubble == null || this._emoji == null) {
            return;
        }
        this._emoji.active = false;
        this._chatBubble.active = true;
        this._chatBubble.getComponent(cc.Label).string = content;
        this._chatBubble.getChildByName("New Label").getComponent(cc.Label).string = content;
        this._lastChatTime = 3;
    },

    emoji: function emoji(_emoji) {
        if (this._emoji == null || this._emoji == null) {
            return;
        }
        console.log(_emoji);
        this._chatBubble.active = false;
        this._emoji.active = true;
        this._emoji.getComponent(cc.Animation).play(_emoji);
        this._lastChatTime = 3;
    },

    voiceMsg: function voiceMsg(show) {
        if (this._voicemsg) {
            this._voicemsg.active = show;
        }
    },

    update: function update(dt) {
        if (this._lastChatTime > 0) {
            this._lastChatTime -= dt;
            if (this._lastChatTime < 0) {
                this._chatBubble.active = false;
                this._emoji.active = false;
                this._emoji.getComponent(cc.Animation).stop();
            }
        }

        if (this.lixianTime && this.lixianTime > 0) {
            this.lixianTime -= dt;
        }
        this.setCountdown(this.lixianTime);
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
        //# sourceMappingURL=gameSeat.js.map
        