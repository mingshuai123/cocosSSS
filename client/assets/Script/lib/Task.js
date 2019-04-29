cc.Class({
    extends: cc.Component,

    properties: {
    },
    onLoad: function () {
        window.Task = this
        this.task_dict = {}
        this.task_cache = {}
        this.once_task_dict = {}
        this.tick = 0
        cc.director.getScheduler().schedule(this._onTick, this, 0.016)
    },
    onDisable: function () {
        cc.director.getScheduler().unschedule(this._onTick, this, 0.016)
    },
    pause: function () {
        cc.director.getScheduler().unschedule(this._onTick, this, 0.016)
    },
    resume: function () {
        cc.director.getScheduler().schedule(this._onTick, this, 0.016)
    },
    _onTick: function () {
        this.tick += 1

        for (let t in this.task_dict) {
            if (this.tick % t != 0) continue
            let cb_list = this.task_dict[t]
            for (let i = 0; i < cb_list.length; i++) {
                cb_list[i]()
            }
        }
        for (let t in this.once_task_dict) {
            if (this.tick < t) continue
            let cb_list = this.once_task_dict[t]
            for (let i = 0; i < cb_list.length; i++) {
                cb_list[i]()
            }
            this.once_task_dict[t] = []
        }
    },
    onTask: function (delay, cb) {
        let t = ~~(delay / 16)
        if (!this.task_dict[t]) {
            this.task_dict[t] = []
        }
        if (this.task_dict[t].indexOf(cb) >= 0) return
        this.task_dict[t].push(cb)
        this.task_cache[cb] = t
    },
    offTask: function (cb) {
        try {
            let t = this.task_cache[cb]
            let idx = this.task_dict[t].indexOf(cb)
            if (t && idx >= 0) {
                this.task_dict[t].splice(idx, 1)
                delete this.task_cache[cb]
            }
        } catch (e) { cc.log(e) }
    },
    runAfter: function (delay, cb) {
        let t = ~~(delay / 16) + this.tick
        if (!this.once_task_dict[t]) {
            this.once_task_dict[t] = []
        }
        this.once_task_dict[t].push(cb)
    }
});