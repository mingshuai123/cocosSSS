(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/OneMsg.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ef1a93kBKNE36z2UzVHzIbE', 'OneMsg', __filename);
// Script/OneMsg.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        msg: {
            default: null,
            type: cc.Label
        }
    },
    onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick.bind(this));
    },
    init: function init(msg, cb) {
        this.msg.string = msg;
        this.cb = cb;
        this.node.width = 32 * msg.length + 4;
    },
    onClick: function onClick() {
        this.cb && this.cb();
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
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
        //# sourceMappingURL=OneMsg.js.map
        