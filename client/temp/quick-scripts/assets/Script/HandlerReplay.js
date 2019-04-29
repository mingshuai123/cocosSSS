(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HandlerReplay.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8e74fLSgcxNH6tMOjrrNmQ3', 'HandlerReplay', __filename);
// Script/HandlerReplay.js

'use strict';

var name_dict = {
    5: 'win', 4: 'gang', 3: 'peng', 2: 'chi', 0: 'guo'
};

cc.Class({
    extends: cc.Component,

    properties: {
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

    onLoad: function onLoad() {},
    able: function able(event) {
        var name = name_dict[event];
        var event_node = this.node.getChildByName(name);
        event_node.getChildByName("icon1").active = true;
    },
    handled: function handled(event) {
        var name = name_dict[event];
        var gesture = this.node.getChildByName(name).getChildByName("replayGesture");
        gesture.active = true;

        var action1 = cc.scaleTo(0.15, 0.9);
        var action2 = cc.moveTo(0.15, cc.p(10, -30));
        var actionsArray = [action1, action2];
        gesture.runAction(cc.spawn(actionsArray));
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
        //# sourceMappingURL=HandlerReplay.js.map
        