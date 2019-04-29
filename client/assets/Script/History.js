
cc.Class({
    extends: cc.Component,

    properties: {
        one_game_prefab: {
            default: null,
            type: cc.Prefab
        },
        content: {
            default: null,
            type: cc.Node
        },
    },
    onLoad: function () {
        http.sendTick({ method: "game.record",game:0 }, (resp) => {
            this.idx = 0
            this.items = resp.histories
            Task.runAfter(500, () => { cc.scene.closePopWin(this.waiting) })
        })
        cc.scene.showWaiting("正在获取比赛记录", (node) => {
            this.waiting = node
        })
    },
    onShowOtherReplay: function () {
        cc.scene.showPrefab("他人回放", true)
    },
    update(dt) {
        if (this.items && this.idx < this.items.length) {
            let history = this.items[this.idx]
            let node = cc.instantiate(this.one_game_prefab)
            node.getComponent("OneGame").init(history, this.node)
            node.parent = this.content
            this.idx += 1
        }
    },
});
