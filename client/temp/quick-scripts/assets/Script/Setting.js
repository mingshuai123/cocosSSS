(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Setting.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '38384+ifztNuZy2imWGaFGp', 'Setting', __filename);
// Script/Setting.js

'use strict';

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
        btn_dismiss: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function onLoad() {
        var _this = this;

        this.node.on(cc.Node.EventType.TOUCH_START, function () {});

        var toggle_mj = cc.mj.user.mjStyleBig() ? this.toggle_mj_big : this.toggle_mj_small;
        toggle_mj.getComponent(cc.Toggle).check();
        var toggle_bg = cc.mj.user.getStyleBg() == "blue" ? this.toggle_bg_blue : this.toggle_bg_green;
        toggle_bg.getComponent(cc.Toggle).check();
        this.toggle_style.on('toggle', function () {
            _this.setting_style.active = true;
            _this.setting_func.active = false;
        });
        this.toggle_func.on('toggle', function () {
            _this.setting_style.active = false;
            _this.setting_func.active = true;
        });
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
        this.toggle_mj_big.on('toggle', function () {
            cc.mj.user.setStyleMJ("big");
        });
        this.toggle_mj_small.on('toggle', function () {
            cc.mj.user.setStyleMJ("small");
        });

        this.toggle_bg_blue.on('toggle', function () {
            cc.mj.user.setStyleBg("blue");
        });

        this.toggle_bg_green.on('toggle', function () {
            cc.mj.user.setStyleBg("green");
        });
    },
    init: function init(scene) {
        var _this2 = this;

        cc.log(scene);
        if (scene == "HALL") {
            this.btn_logout.active = true;
            this.btn_logout.on(cc.Node.EventType.TOUCH_START, function () {
                cc.mj.user.logout();
            });
        } else if (scene == "GAME") {
            this.btn_dismiss.active = true;
            this.btn_dismiss.on(cc.Node.EventType.TOUCH_START, function () {
                http.sendGame({ method: "dismiss_room" }, function (resp) {});
                _this2.node.parent = null;
            });
        } else if (scene == "SSS") {
            this.btn_dismiss.active = true;
            this.btn_dismiss.on(cc.Node.EventType.TOUCH_START, function () {
                cc.sssNet.send("dissolve_request");
                _this2.node.parent = null;
            });
        }
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
        //# sourceMappingURL=Setting.js.map
        