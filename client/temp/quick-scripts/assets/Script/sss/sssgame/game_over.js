(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/sss/sssgame/game_over.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a6bf0vMIgtLeImvrWolnF27', 'game_over', __filename);
// Script/sss/sssgame/game_over.js

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
        this.ScrollView = this.node.getChildByName('ScrollView');
        this.victory = this.node.getChildByName('shengli');
        this.lose = this.node.getChildByName('shibai');
        this.pingju = this.node.getChildByName('pingju');

        this.view = this.ScrollView.getChildByName('view');
        this.content = this.view.getChildByName('content');
        this._seats = [];
        for (var i = 0; i < 8; ++i) {
            var s = "s" + i;
            var sn = this.content.getChildByName(s);
            sn.active = false;
            var viewdata = {};
            viewdata.username = sn.getChildByName('userName').getComponent(cc.Label);
            viewdata.imgLoader = sn.getChildByName("headBox").getComponent("ImageLoader");
            viewdata.score = sn.getChildByName('score').getComponent(cc.Label);
            var arrPaiNode = sn.getChildByName('comparPai');

            viewdata.tdPai = arrPaiNode.getChildByName('tdPai');
            viewdata.zdPai = arrPaiNode.getChildByName('zdPai');
            viewdata.wdPai = arrPaiNode.getChildByName('wdPai');
            viewdata.teshuPai = sn.getChildByName('teshuPai');

            viewdata.username.string = "";
            this._seats.push(viewdata);
            sn.getChildByName('comparPai').active = true;
            sn.getChildByName('teshuPai').active = false;
        }
    },

    reset: function reset() {
        this.node.active = false;
        this.victory.active = false;
        this.pingju.active = false;
        this.lose.active = false;
        for (var i = 0; i < 8; ++i) {
            var s = "s" + i;
            var sn = this.content.getChildByName(s);
            sn.active = false;
            sn.getChildByName('comparPai').active = true;
            sn.getChildByName('teshuPai').active = false;
        }
    },

    showOver: function showOver(data) {
        // cc.log(data);
        var len = data.length;
        this.victory.active = false;
        this.pingju.active = false;
        this.lose.active = false;
        //显示牌
        for (var i = 0; i < len; i++) {
            var s = "s" + i;
            var sn = this.content.getChildByName(s);
            sn.active = true;

            var name = data[i].userName;
            // var nameLen = name.length;
            // if (nameLen > 6) {
            //     var str = name.substring(0, 6);
            //     this._seats[i].username.string = str + '...';
            // }
            // else {
            //     this._seats[i].username.string = name;
            // }
            this._seats[i].username.string = name;
            this._seats[i].score.string = data[i].score;
            if (this._seats[i].imgLoader && data[i].userId) {
                this._seats[i].imgLoader.setUserID(data[i].userId, data.icon);
            }
            if (cc.mj.user.uid === data[i].userId) {
                if (data[i].win === 1) {
                    this.victory.active = true;
                    cc.audio.playSFX("sssMusic/shengli.mp3");
                } else if (data[i].flat === 1) {
                    this.pingju.active = true;
                    cc.audio.playSFX("sssMusic/pingju.mp3");
                } else if (data[i].lose === 1) {
                    this.lose.active = true;
                    cc.audio.playSFX("sssMusic/sibai.mp3");
                }
            }

            //特殊牌
            if (data[i].arrPai.length == 13) {
                sn.getChildByName('comparPai').active = false;
                sn.getChildByName('teshuPai').active = true;
                var arrpai = data[i].arrPai;

                for (var m = 0; m < arrpai.length; m++) {
                    var paiNode = this._seats[i].teshuPai.getChildByName("pai" + m);
                    var paiCom = paiNode.getComponent('pai');
                    paiCom.setInfo(arrpai[m]);
                }
            } else {
                var tdPai = this.sortres(data[i].arrPai[0]);
                var zdPai = this.sortres(data[i].arrPai[1]);
                var wdPai = this.sortres(data[i].arrPai[2]);
                //显示相关的牌
                for (var _m = 0; _m < tdPai.length; _m++) {
                    var paiNode = this._seats[i].tdPai.getChildByName("pai" + _m);
                    var paiCom = paiNode.getComponent('pai');
                    paiCom.setInfo(tdPai[_m]);
                }
                for (var n = 0; n < zdPai.length; n++) {
                    var paiNode = this._seats[i].zdPai.getChildByName("pai" + n);
                    var paiCom = paiNode.getComponent('pai');
                    paiCom.setInfo(zdPai[n]);
                }
                for (var k = 0; k < wdPai.length; k++) {
                    var paiNode = this._seats[i].wdPai.getChildByName("pai" + k);
                    var paiCom = paiNode.getComponent('pai');
                    paiCom.setInfo(wdPai[k]);
                }
            }
        }
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
    hiddenPai: function hiddenPai(isHidd) {
        //隐藏牌
        for (var i = 0; i < 8; ++i) {
            cc.find("Canvas/gameStart/gameSeats/seat" + i + "/comparPai").active = isHidd;
            cc.find("Canvas/gameStart/gameSeats/seat" + i + "/teshupai").active = false;
            cc.find("Canvas/gameStart/gameSeats/seat" + i + "/dankong").active = false;
        }
    },

    btnClick: function btnClick(event) {
        if (event.target.name === "btn_close") {
            this.reset();
            if (!window.sssGame.showTotalResult()) {
                this.hiddenPai(false);
            }
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
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
        //# sourceMappingURL=game_over.js.map
        