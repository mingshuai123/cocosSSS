(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/OneShopRecord.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '818605yLK1G5ZCFbK5RDXg6', 'OneShopRecord', __filename);
// Script/OneShopRecord.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        created: {
            default: null,
            type: cc.Label
        },
        value: {
            default: null,
            type: cc.Label
        },
        remainder_value: {
            default: null,
            type: cc.Label
        },
        status: {
            default: null,
            type: cc.Label
        }
    },
    onLoad: function onLoad() {},
    init: function init(data) {
        this.created.string = data.created.slice(5, 16);
        this.value.string = data.total_integral;
        this.value.node.color = new cc.color(0, 255, 0, 255);
        this.remainder_value.string = data.remainder_integral;
        this.status.string = data.status;
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
        //# sourceMappingURL=OneShopRecord.js.map
        