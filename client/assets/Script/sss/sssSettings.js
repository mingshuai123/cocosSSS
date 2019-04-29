
cc.Class({
    extends: cc.Component,

    properties: {
        btn_close: {
            default: null,
            type: cc.Node
        },
        btn_logout: {
            default: null,
            type: cc.Node
        },
        mask: {
            default: null,
            type: cc.Node
        },
        toggle_style: {
            default: null,
            type: cc.Node
        },
        toggle_func: {
            default: null,
            type: cc.Node
        },
        setting_style: {
            default: null,
            type: cc.Node
        },
        setting_func: {
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
        },
        toggle_mj_big: {
            default: null,
            type: cc.Node
        },
        toggle_mj_small: {
            default: null,
            type: cc.Node
        },
        toggle_bg_blue: {
            default: null,
            type: cc.Node
        },
        toggle_bg_green: {
            default: null,
            type: cc.Node
        },
        // btn_dismiss: {
        //     default: null,
        //     type: cc.Node
        // }
    },
    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, () => { })

        let toggle_mj = cc.mj.user.sssStyleBig() ? this.toggle_mj_big : this.toggle_mj_small
        toggle_mj.getComponent(cc.Toggle).check()
        let toggle_bg = cc.mj.user.getStylesssBg() == "blue" ? this.toggle_bg_blue : this.toggle_bg_green
        toggle_bg.getComponent(cc.Toggle).check()
        this.toggle_style.on('toggle', () => {
            this.setting_style.active = true
            this.setting_func.active = false
        })
        this.toggle_func.on('toggle', () => {
            this.setting_style.active = false
            this.setting_func.active = true
        })
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


        this.toggle_mj_big.on('toggle', () => {
            cc.mj.user.setStylesss("big")
        })
        this.toggle_mj_small.on('toggle', () => {
            cc.mj.user.setStylesss("small")
        })
        this.toggle_bg_blue.on('toggle', () => {
            cc.mj.user.setStylesssBg("blue")
        })
        this.toggle_bg_green.on('toggle', () => {
            cc.mj.user.setStylesssBg("green")
        })
    },
    onBtnClicked:function(event){
        if(event.target.name == "btn_close"){
            this.node.parent.active = false;
        }
    },
    // called every frame
    update: function (dt) {

    },
});
