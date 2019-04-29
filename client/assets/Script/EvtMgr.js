cc.Class({
    extends: cc.Component,
    pause_evt: false,
    properties: {

    },
    statics: {
        init: function () {
            cc.mj.evt_cbs = {}
            cc.mj.evts = []
            cc.tick = {}
            cc.tick.evts = []
            cc.tick.evt_cbs = {}
        },
        regEvt: function (action, cb) {
            cc.mj.evt_cbs[action] = cb
        },
        regTickEvt: function (action, cb) {
            cc.tick.evt_cbs[action] = cb
        },
        newEvt: function (data) {
            cc.mj.evts.push(data)
        },
        newTickEvt: function (data) {
            cc.tick.evts.push(data)
        },
        handleTickEvt: function () {
            if (cc.tick.evts.length) {
                let evt = cc.tick.evts[0]
                cc.tick.evts.splice(0, 1)
                let cb = cc.tick.evt_cbs[evt.action]
                if (cb) {
                    cb(evt)
                } else {
                    console.error("no cb for", evt.action)
                }
            }
        },
        handleEvt: function () {
            if (cc.mj.evts.length) {
                let evt = cc.mj.evts[0]
                cc.mj.evts.splice(0, 1)
                let cb = cc.mj.evt_cbs[evt.action]
                if (cb) {
                    cb(evt)
                } else {
                    console.error("no cb for", evt.action)
                }
            }
        },
        hasEvt: function () {
            return cc.mj.evts.length
        },
        clear_evts: function () {
            cc.mj.evts = []
        },
        clear_tick_evts: function () {
            cc.tick.evts = []
        },
        clear: function () {
            cc.mj.evt_cbs = {}
        },
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
