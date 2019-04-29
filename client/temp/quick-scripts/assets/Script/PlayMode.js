(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/PlayMode.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '771cfvfQEpIdoxpMZoVLp+4', 'PlayMode', __filename);
// Script/PlayMode.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        fzmj: {
            default: null,
            type: cc.Node
        },
        ndmj: {
            default: null,
            type: cc.Node
        },
        sss: {
            default: null,
            type: cc.Node
        }
    },
    showFZMJ: function showFZMJ() {
        this.fzmj.active = true;
        this.ndmj.active = false;
        this.sss.active = false;
    },
    showNDMJ: function showNDMJ() {
        this.fzmj.active = false;
        this.ndmj.active = true;
        this.sss.active = false;
    },
    showSSS: function showSSS() {
        this.fzmj.active = false;
        this.ndmj.active = false;
        this.sss.active = true;
    }
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
        //# sourceMappingURL=PlayMode.js.map
        