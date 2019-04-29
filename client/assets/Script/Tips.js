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
        ok_cancel: cc.Node,
        ok: cc.Node,
        content: cc.Label,
        icon: cc.Sprite,
        bg: cc.Node,
        layout: cc.Layout
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

    // LIFE-CYCLE CALLBACKS:
    init: function (tips, type, ok_cb, cancel_cb, icon) {
        this.content.string = tips
        this.ok_cancel.active = type == "OK_CANCEL"
        this.ok.active = !(type == "OK_CANCEL")
        this.ok_cb = ok_cb
        this.cancel_cb = cancel_cb
        if (icon) {
            this.icon.node.active = true
            Utils.UrlImage(icon, (err, sprite) => {
                !err && (this.icon.spriteFrame = sprite)
            })
            this.layout.spacingY = 30
            this.bg.height = 543
        }
    },
    onClickOk: function () {
        if (this.ok_cb) {
            this.ok_cb()
        }
        cc.scene.closePopWin(this.node)
    },
    onClickCancel: function () {
        if (this.cancel_cb) {
            this.cancel_cb()
        }
        cc.scene.closePopWin(this.node)
    },
    start() {

    },

    // update (dt) {},
});
