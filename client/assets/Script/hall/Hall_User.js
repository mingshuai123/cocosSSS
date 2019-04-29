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
        label_uid: cc.Label,
        label_nickname: cc.Label,
        icon: cc.Sprite,
        label_fangka: cc.Label,
    },


    onLoad() {
        this.label_uid.string = "ID: " + cc.mj.user.uid
        this.label_nickname.string = cc.mj.user.nickname
        this.label_fangka.string = '-'
        Utils.UrlImage(cc.mj.user.icon, (err, sprite) => {
            !err && (this.icon.priteFrame = sprite)
        })
        this.onSyncFangka()
    },
    onSyncFangka: function () {
        http.sendHall({ method: "sync_money" }, (resp) => {
            if (!resp.errno) {
                cc.mj.user.fangka = resp.fangka
                this.label_fangka.string = cc.mj.user.fangka
            }
        })
    },
    onCheckUser: function(){
        cc.scene.showPrefab("个人信息")
    }
});
