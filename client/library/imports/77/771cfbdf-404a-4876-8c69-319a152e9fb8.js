"use strict";
cc._RF.push(module, '771cfvfQEpIdoxpMZoVLp+4', 'PlayMode');
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