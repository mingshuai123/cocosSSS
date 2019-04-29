(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Report2.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ccaebbX0J1CEYZO8B9KCUgz', 'Report2', __filename);
// Script/Report2.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        report_role_prefab: {
            default: null,
            type: cc.Prefab
        },
        btn_exit: {
            default: null,
            type: cc.Node
        },
        game_info: {
            default: null,
            type: cc.Label
        },
        btn_share: {
            default: null,
            type: cc.Node
        },
        label_path: cc.Label
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },
    onLoad: function onLoad() {
        var _this = this;

        this.btn_exit.on(cc.Node.EventType.TOUCH_START, function () {
            cc.mjroom = null;
            http.sendGame({ method: "exit_game" }, function (resp) {});
            if (_this.type == "PERSONAL") {
                cc.director.loadScene("hall");
            } else {
                cc.club_type = _this.type;
                cc.director.loadScene("club");
            }
        });

        this.btn_share.on(cc.Node.EventType.TOUCH_START, this.share.bind(this));
    },
    init: function init(final) {
        this.final = final;
        this.type = final.option.type;
        var panel = this.node.getChildByName("roles");
        var layout = panel.getComponent(cc.Layout);
        var role_num = final.roles.length;
        if (role_num == 2) {
            layout.paddingLeft = 238;
            layout.spacingX = 168;
        } else if (role_num == 3) {
            layout.paddingLeft = 130;
            layout.spacingX = 58;
        }
        for (var i = 0; i < role_num; i++) {
            var role = final.roles[i];
            var role_node = cc.instantiate(this.report_role_prefab);
            role_node.getComponent("Report2Role").init(role, final.owner_uid == role.id, final.winer == role.id, final.paoer == role.id);
            role_node.parent = panel;
        }
        var room_info = "";
        room_info += "房号 " + final.id + " 第 " + final.cur_round + "/" + final.option.round + "局\n";
        room_info += (final.mode == "fzmj" ? "福州麻将" : "宁德麻将") + " " + final.option_text + "\n";
        room_info += final.time;
        this.game_info.string = room_info;
    },
    share: function share() {
        var text = "总结算分享：";
        text += "福宁娱乐：房号" + this.final.id + "\n";
        for (var i = 0; i < this.final.roles.length; i++) {
            var role = this.final.roles[i];
            text += role.name + "：" + role.score + "\n";
        }

        var share_plugin = anysdk.agentManager.getSharePlugin();
        share_plugin.setListener(this.onShareResult, this);

        cc.screenShoot(function (path) {
            var info = {
                shareTo: "0",
                mediaType: "1",
                title: "福宁娱乐", // title 标题，印象笔记、邮箱、信息、微信、人人网和 QQ 空间使用
                text: text, // text 是分享文本，所有平台都需要这个字段\
                imagePath: path
            };
            share_plugin.share(info);
        });
        //let path = cc.screenShoot()
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
        //# sourceMappingURL=Report2.js.map
        