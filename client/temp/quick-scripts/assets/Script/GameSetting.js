(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/GameSetting.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f6722CkD3RCUJSPS+02p6E0', 'GameSetting', __filename);
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
        //# sourceMappingURL=GameSetting.js.map
        