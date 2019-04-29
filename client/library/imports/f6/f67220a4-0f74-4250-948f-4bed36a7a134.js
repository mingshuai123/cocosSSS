"use strict";
cc._RF.push(module, 'f6722CkD3RCUJSPS+02p6E0', 'GameSetting');
// Script/GameSetting.js

"use strict";

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
    onLoad: function onLoad() {
        var _this = this;

        this.btn_close.on(cc.Node.EventType.TOUCH_START, function () {
            _this.node.parent = null;
        });
        this.node.on(cc.Node.EventType.TOUCH_START, function () {});
        if (cc.mjroom_info.raw.type != "PUBLIC") {
            this.btn_try_dismiss.active = true;
            this.btn_try_dismiss.on(cc.Node.EventType.TOUCH_START, this.onDismiss.bind(this));
        }
        this.btn_bgm0.on(cc.Node.EventType.TOUCH_START, function () {
            _this.btn_bgm0.active = false;
            _this.btn_bgm1.active = true;
            _this.slider_bgm.getComponent("Progress").setValue(1.0);
        });
        this.btn_bgm1.on(cc.Node.EventType.TOUCH_START, function () {
            _this.btn_bgm0.active = true;
            _this.btn_bgm1.active = false;
            _this.slider_bgm.getComponent("Progress").setValue(0.0);
        });

        this.btn_sfx0.on(cc.Node.EventType.TOUCH_START, function () {
            _this.btn_sfx0.active = false;
            _this.btn_sfx1.active = true;
            _this.slider_sfx.getComponent("Progress").setValue(1.0);
        });
        this.btn_sfx1.on(cc.Node.EventType.TOUCH_START, function () {
            _this.btn_sfx0.active = true;
            _this.btn_sfx1.active = false;
            _this.slider_sfx.getComponent("Progress").setValue(0.0);
        });
    },
    onDismiss: function onDismiss() {
        http.sendGame({ method: "dismiss_room" }, function (resp) {});
        this.node.parent = null;
    },
    // called every frame
    update: function update(dt) {}
});

cc._RF.pop();