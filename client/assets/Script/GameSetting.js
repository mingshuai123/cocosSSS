
cc.Class({
    extends: cc.Component,

    properties: {
        btn_close: {
            default: null,
            type: cc.Node
        },
        btn_try_dismiss: {
            default: null,
            type: cc.Node
        },
        btn_bgm0: {
            default: null,
            type: cc.Node
        },
        btn_bgm1: {
            default: null,
            type: cc.Node
        },
        progress_bgm: {
            default: null,
            type: cc.Node
        },
        slider_bgm: {
            default: null,
            type: cc.Node
        },
        btn_sfx0: {
            default: null,
            type: cc.Node
        },
        btn_sfx1: {
            default: null,
            type: cc.Node
        },
        progress_sfx: {
            default: null,
            type: cc.Node
        },
        slider_sfx: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function () {
        this.btn_close.on(cc.Node.EventType.TOUCH_START, () => { this.node.parent = null })
        this.node.on(cc.Node.EventType.TOUCH_START, () => { })
        if (cc.mjroom_info.raw.type != "PUBLIC") {
            this.btn_try_dismiss.active = true
            this.btn_try_dismiss.on(cc.Node.EventType.TOUCH_START, this.onDismiss.bind(this))
        }
        this.btn_bgm0.on(cc.Node.EventType.TOUCH_START, () => {
            this.btn_bgm0.active = false
            this.btn_bgm1.active = true
            this.slider_bgm.getComponent("Progress").setValue(1.0)
        })
        this.btn_bgm1.on(cc.Node.EventType.TOUCH_START, () => {
            this.btn_bgm0.active = true
            this.btn_bgm1.active = false
            this.slider_bgm.getComponent("Progress").setValue(0.0)
        })

        this.btn_sfx0.on(cc.Node.EventType.TOUCH_START, () => {
            this.btn_sfx0.active = false
            this.btn_sfx1.active = true
            this.slider_sfx.getComponent("Progress").setValue(1.0)
        })
        this.btn_sfx1.on(cc.Node.EventType.TOUCH_START, () => {
            this.btn_sfx0.active = true
            this.btn_sfx1.active = false
            this.slider_sfx.getComponent("Progress").setValue(0.0)
        })
    },
    onDismiss: function () {
        http.sendGame({ method: "dismiss_room" }, (resp) => { })
        this.node.parent = null
    },
    // called every frame
    update: function (dt) {

    },
});
