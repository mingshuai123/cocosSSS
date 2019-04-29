"use strict";
cc._RF.push(module, '7d0c1wG24NES7koCqTsPij2', 'Task');
// Script/lib/Task.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},
    onLoad: function onLoad() {
        window.Task = this;
        this.task_dict = {};
        this.task_cache = {};
        this.once_task_dict = {};
        this.tick = 0;
        cc.director.getScheduler().schedule(this._onTick, this, 0.016);
    },
    onDisable: function onDisable() {
        cc.director.getScheduler().unschedule(this._onTick, this, 0.016);
    },
    pause: function pause() {
        cc.director.getScheduler().unschedule(this._onTick, this, 0.016);
    },
    resume: function resume() {
        cc.director.getScheduler().schedule(this._onTick, this, 0.016);
    },
    _onTick: function _onTick() {
        this.tick += 1;

        for (var t in this.task_dict) {
            if (this.tick % t != 0) continue;
            var cb_list = this.task_dict[t];
            for (var i = 0; i < cb_list.length; i++) {
                cb_list[i]();
            }
        }
        for (var _t in this.once_task_dict) {
            if (this.tick < _t) continue;
            var _cb_list = this.once_task_dict[_t];
            for (var _i = 0; _i < _cb_list.length; _i++) {
                _cb_list[_i]();
            }
            this.once_task_dict[_t] = [];
        }
    },
    onTask: function onTask(delay, cb) {
        var t = ~~(delay / 16);
        if (!this.task_dict[t]) {
            this.task_dict[t] = [];
        }
        if (this.task_dict[t].indexOf(cb) >= 0) return;
        this.task_dict[t].push(cb);
        this.task_cache[cb] = t;
    },
    offTask: function offTask(cb) {
        try {
            var t = this.task_cache[cb];
            var idx = this.task_dict[t].indexOf(cb);
            if (t && idx >= 0) {
                this.task_dict[t].splice(idx, 1);
                delete this.task_cache[cb];
            }
        } catch (e) {
            cc.log(e);
        }
    },
    runAfter: function runAfter(delay, cb) {
        var t = ~~(delay / 16) + this.tick;
        if (!this.once_task_dict[t]) {
            this.once_task_dict[t] = [];
        }
        this.once_task_dict[t].push(cb);
    }
});

cc._RF.pop();