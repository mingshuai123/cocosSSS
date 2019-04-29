(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/ReportCard.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '89d84FQZ91LVaG0fFDWms2Q', 'ReportCard', __filename);
// Script/ReportCard.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        atlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        jin: {
            default: null,
            type: cc.Node
        },
        hu: {
            default: null,
            type: cc.Node
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
        } },
    onLoad: function onLoad() {},
    init: function init(type, value, jin, hu) {
        var sprite_name = 'p4s' + type + '_' + value + "_big";
        var cardframe = this.atlas.getSpriteFrame(sprite_name);
        this.getComponent(cc.Sprite).spriteFrame = cardframe;
        this.jin.active = jin;
        this.hu.active = hu;
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
        //# sourceMappingURL=ReportCard.js.map
        