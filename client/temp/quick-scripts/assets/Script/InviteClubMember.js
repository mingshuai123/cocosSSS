(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/InviteClubMember.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '633d0a7ZRpC0owca7j1bH9w', 'InviteClubMember', __filename);
// Script/InviteClubMember.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        user_name: {
            default: null,
            type: cc.Label
        },
        icon: {
            default: null,
            type: cc.Node
        },
        uid: {
            default: null,
            type: cc.Label
        },
        status: {
            default: null,
            type: cc.Label
        },
        btn_invite: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function onLoad() {
        this.btn_invite.on(cc.Node.EventType.TOUCH_END, this.invite.bind(this));
    },
    init: function init(data) {
        var _this = this;

        this.tarid = data.uid;
        this.user_name.string = data.nickname;
        this.uid.string = "ID：" + data.uid;
        if (data.status == "ONLINE") {
            this.btn_invite.active = true;
        } else {
            this.status.node.active = true;
            this.status.string = data.status == "PLAYING" ? "牌局中" : "离线";
        }
        Utils.UrlImage(data.icon, function (err, sprite) {
            !err && (_this.icon.getComponent(cc.Sprite).spriteFrame = sprite);
        });
    },
    invite: function invite() {
        var info = {};
        info.info = cc.mjroom;
        info.name = cc.mj.user.nickname;
        info.club_id = cc.mj.user.club_id;
        this.status.node.active = true;
        this.btn_invite.active = false;
        this.status.string = "已邀请";
        http.sendHall({ method: "invite", tarid: this.tarid, info: JSON.stringify(info) }, function (resp) {});
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
        //# sourceMappingURL=InviteClubMember.js.map
        