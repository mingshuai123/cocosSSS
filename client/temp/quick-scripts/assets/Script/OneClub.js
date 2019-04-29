(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/OneClub.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '23889liMxhPjZBWLQVF7BW3', 'OneClub', __filename);
// Script/OneClub.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        bg_selected: cc.Node,
        club_name: cc.Label,
        label_club_id: cc.Label,
        hongdian: cc.Node
    },
    init: function init(data, cb) {
        this.club_type = data.club_type;
        this.club_id = data.club_id;
        this.label_club_id.string = "ID: " + data.club_id;
        this.club_name.string = data.club_name + "(" + data.cur_num + "人)";
        this.cb = cb;
        this.admin = data.admin;
    },
    selected: function selected() {
        this.club_name.node.color = new cc.color(255, 255, 255, 255);
        this.label_club_id.node.color = new cc.color(255, 255, 255, 255);
        this.bg_selected.active = true;
    },
    unSelected: function unSelected() {
        this.club_name.node.color = new cc.color(255, 40, 0, 255);
        this.label_club_id.node.color = new cc.color(255, 40, 0, 255);
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
        //# sourceMappingURL=OneClub.js.map
        