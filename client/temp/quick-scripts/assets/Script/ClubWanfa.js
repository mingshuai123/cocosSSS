(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/ClubWanfa.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '546455WAutMGKyelbaHzA8i', 'ClubWanfa', __filename);
// Script/ClubWanfa.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        bg_selected: cc.Node,
        club_name: cc.Label
    },
    init: function init(data, cb) {
        this.type = data.type;
        this.club_name.string = data.type == 0 ? '麻将' : data.type == 1 ? '经典场' : data.type == 2 ? '循环场' : data.type == 3 ? '全一色' : '王牌场';
        this.cb = cb;
    },
    selected: function selected() {
        this.bg_selected.active = true;
    },
    unSelected: function unSelected() {
        this.bg_selected.active = false;
    },
    onClick: function onClick() {
        this.cb && this.cb(this);
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
        //# sourceMappingURL=ClubWanfa.js.map
        