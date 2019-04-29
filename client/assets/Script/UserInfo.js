// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        icon: cc.Node,
        nickname: cc.Label,
        uid: cc.Label,
        ip: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.nickname.string = "昵称：" + cc.mj.user.nickname
        this.uid.string = "ID：" + cc.mj.user.uid
        this.ip.string = "IP：" + cc.mj.user.ip
        Utils.UrlImage(cc.mj.user.icon, (err, sprite) => {
            !err && (this.icon.getComponent(cc.Sprite).spriteFrame = sprite)
        })
    },
    // update (dt) {},
});
