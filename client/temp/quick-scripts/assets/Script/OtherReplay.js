(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/OtherReplay.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f0884hFknhHhpIEy0x51v6y', 'OtherReplay', __filename);
// Script/OtherReplay.js

"use strict";

var RESP_STR = {
    0: "申请成功，请等待俱乐部管理员审核通过",
    10017: "俱乐部ID错误，请联系代理确认ID",
    10016: "已加入其他俱乐部"
};
cc.Class({
    extends: cc.Component,

    properties: {
        input_code: {
            default: null,
            type: cc.EditBox
        },
        replay_prefab: {
            default: null,
            type: cc.Prefab
        }
    },
    onLoad: function onLoad() {
        this.code = null;
    },
    onClickClear: function onClickClear() {
        this.clear();
    },
    onInputEnd: function onInputEnd(e) {
        this.code = e.string;
    },
    onCheckOtherReplay: function onCheckOtherReplay() {
        http.sendHall({ method: "game_replay_with_code", code: this.input_code.string }, function (resp) {
            if (resp.errno) {
                cc.scene.onShowTips("OK", "你输入的分享码有错");
            } else {
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
            }
        });
    },
    clear: function clear() {
        this.input = [];
        this.input_id.string = "请输入俱乐部ID(数字)";
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
        //# sourceMappingURL=OtherReplay.js.map
        