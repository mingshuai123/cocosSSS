(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/OneRound.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b4907BGCXVHDYixx11G3fI9', 'OneRound', __filename);
// Script/OneRound.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        round: {
            default: null,
            type: cc.Label
        },
        created: {
            default: null,
            type: cc.Label
        },
        btn_shared: {
            default: null,
            type: cc.Node
        },
        btn_check: {
            default: null,
            type: cc.Node
        },
        replay_prefab: {
            default: null,
            type: cc.Prefab
        }
    },
    onLoad: function onLoad() {},
    init: function init(data) {
        this.data = data;
        this.round.string = data.round;
        this.created.string = data.created.slice(5, 16);
        for (var i = 1; i <= 4; i++) {
            var score = data["role" + i + "_score"];
            if (score == "") {
                continue;
            }
            var node_score = this.node.getChildByName("score" + i);
            node_score.active = true;
            node_score.getComponent(cc.Label).string = score;
        }
        this.btn_check.on(cc.Node.EventType.TOUCH_END, this.onReplay.bind(this));
        this.btn_shared.on(cc.Node.EventType.TOUCH_END, this.onShare.bind(this));
    },
    onReplay: function onReplay() {
        http.sendHall({ method: "game_replay", game_id: this.data.game_id, round: this.data.round }, function (resp) {
            if (resp.errno) return;
            cc.mjroom = resp.room_info;
            cc.mj.mgr.self_seat = resp.seat;
            cc.mj.mgr.replay = true;
            try {
                cc.scene.showPrefab("录像", true, function (node) {
                    node.getComponent("Replay").init(resp.detail);
                });
            } catch (e) {
                console.log(e);
            }
        });
    },
    onShare: function onShare() {
        var share_plugin = anysdk.agentManager.getSharePlugin();
        share_plugin.setListener(this.onShareResult, this);
        var text = "福宁娱乐，快乐游戏，" + cc.mj.user.nickname + "邀请共同查看历史战绩回放，回放码为：" + this.data.share_code;
        var info = {
            shareTo: "0",
            mediaType: "0",
            title: "福宁娱乐", // title 标题，印象笔记、邮箱、信息、微信、人人网和 QQ 空间使用
            text: text // text 是分享文本，所有平台都需要这个字段
        };
        share_plugin.share(info);
    },
    onShareResult: function onShareResult() {
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
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
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
        //# sourceMappingURL=OneRound.js.map
        