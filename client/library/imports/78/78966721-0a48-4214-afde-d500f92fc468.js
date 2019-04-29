"use strict";
cc._RF.push(module, '78966chCkhCFK/e1QD5L8Ro', 'Invite');
// Script/Invite.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        invite_club_member_prefab: {
            default: null,
            type: cc.Prefab
        },
        content: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function onLoad() {
        var _this = this;

        cc.scene.showWaiting("正在获取俱乐部成员", function (node) {
            _this.waiting = node;
        });
        http.sendTick({ method: "club.members", club_id: cc.mj.user.club_id }, function (resp) {
            _this.load_idx = 0;
            _this.items = resp.members;
            Task.runAfter(500, function () {
                cc.scene.closePopWin(_this.waiting);
            });
        });
    },
    showMembers: function showMembers(resp) {
        for (var i = 0; i < resp.members.length; i++) {
            var member = resp.members[i];
            var node = cc.instantiate(this.invite_club_member_prefab);
            node.getComponent("InviteClubMember").init(member);
            node.parent = this.content;
            node.setPosition(0, -(node.height + 15) * i);
            this.content.height = (node.height + 15) * (i + 1);
        }
    },
    scrollEvent: function scrollEvent(sender, event) {},
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },
    update: function update(dt) {
        if (this.items && this.load_idx < this.items.length) {
            var node = cc.instantiate(this.invite_club_member_prefab);
            node.getComponent("InviteClubMember").init(this.items[this.load_idx]);
            node.parent = this.content;
            this.load_idx += 1;
        }
    }
});

cc._RF.pop();