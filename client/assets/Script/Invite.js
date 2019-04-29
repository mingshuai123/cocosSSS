
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
        },
    },
    onLoad: function () {
        cc.scene.showWaiting("正在获取俱乐部成员", (node) => {
            this.waiting = node
        })
        http.sendTick({ method: "club.members", club_id: cc.mj.user.club_id }, (resp) => {
            this.load_idx = 0
            this.items = resp.members
            Task.runAfter(500, () => { cc.scene.closePopWin(this.waiting) })
        })
    },
    showMembers: function (resp) {
        for (let i = 0; i < resp.members.length; i++) {
            let member = resp.members[i]
            let node = cc.instantiate(this.invite_club_member_prefab)
            node.getComponent("InviteClubMember").init(member)
            node.parent = this.content
            node.setPosition(0, -(node.height + 15) * i);
            this.content.height = (node.height + 15) * (i + 1)
        }
    },
    scrollEvent: function (sender, event) {
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },
    update(dt) {
        if (this.items && this.load_idx < this.items.length) {
            let node = cc.instantiate(this.invite_club_member_prefab)
            node.getComponent("InviteClubMember").init(this.items[this.load_idx])
            node.parent = this.content
            this.load_idx += 1
        }
    },
});
