(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/EvtMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4ad63nouipIJYkx0/VRgK0G', 'EvtMgr', __filename);
// Script/EvtMgr.js

"use strict";

cc.Class({
    extends: cc.Component,
    pause_evt: false,
    properties: {},
    statics: {
        init: function init() {
            cc.mj.evt_cbs = {};
            cc.mj.evts = [];
            cc.tick = {};
            cc.tick.evts = [];
            cc.tick.evt_cbs = {};
        },
        regEvt: function regEvt(action, cb) {
            cc.mj.evt_cbs[action] = cb;
        },
        regTickEvt: function regTickEvt(action, cb) {
            cc.tick.evt_cbs[action] = cb;
        },
        newEvt: function newEvt(data) {
            cc.mj.evts.push(data);
        },
        newTickEvt: function newTickEvt(data) {
            cc.tick.evts.push(data);
        },
        handleTickEvt: function handleTickEvt() {
            if (cc.tick.evts.length) {
                var evt = cc.tick.evts[0];
                cc.tick.evts.splice(0, 1);
                var cb = cc.tick.evt_cbs[evt.action];
                if (cb) {
                    cb(evt);
                } else {
                    console.error("no cb for", evt.action);
                }
            }
        },
        handleEvt: function handleEvt() {
            if (cc.mj.evts.length) {
                var evt = cc.mj.evts[0];
                cc.mj.evts.splice(0, 1);
                var cb = cc.mj.evt_cbs[evt.action];
                if (cb) {
                    cb(evt);
                } else {
                    console.error("no cb for", evt.action);
                }
            }
        },
        hasEvt: function hasEvt() {
            return cc.mj.evts.length;
        },
        clear_evts: function clear_evts() {
            cc.mj.evts = [];
        },
        clear_tick_evts: function clear_tick_evts() {
            cc.tick.evts = [];
        },
        clear: function clear() {
            cc.mj.evt_cbs = {};
        }
        // LIFE-CYCLE CALLBACKS:

        // onLoad () {},

        // start () {

        // },

        // update (dt) {},
    } });

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
        //# sourceMappingURL=EvtMgr.js.map
        