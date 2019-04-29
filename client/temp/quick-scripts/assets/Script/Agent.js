(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Agent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5855d4KdgJM4YDYDfVkRGko', 'Agent', __filename);
// Script/Agent.js

"use strict";

var RESP_STR = {
    0: "申请成功，请等待俱乐部管理员审核通过",
    10017: "俱乐部ID错误，请联系代理确认ID",
    10016: "已加入其他俱乐部"
};
cc.Class({
    extends: cc.Component,

    properties: {
        editbox: {
            default: null,
            type: cc.EditBox
        },
        notice: {
            default: null,
            type: cc.Label
        }
    },
    onLoad: function onLoad() {
        var _this = this;

        this.notice.string = "请联系官方微信号成为代理：" + cc.mj.game_cfg.system_wx + "【微信】";
        http.sendHall({ method: "agent_info" }, function (resp) {
            if (resp.info) {
                _this.editbox.placeholder = "您已提交过个人联系信息：" + resp.info;
            }
        });
    },
    onCommit: function onCommit() {
        var _this2 = this;

        http.sendHall({ method: "agent_req", info: this.editbox.string }, function (resp) {
            _this2.editbox.placeholder = "您已提交过个人联系信息：" + _this2.editbox.string;
            _this2.editbox.string = "";
            cc.scene.onShowTips("OK", "您提交信息已上传，稍后我们会与您联系。");
        });
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
        //# sourceMappingURL=Agent.js.map
        