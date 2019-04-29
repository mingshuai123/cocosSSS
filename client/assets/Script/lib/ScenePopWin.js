cc.Class({
    extends: cc.Component,

    properties: {
        node_popwin_bottom: cc.Node,
        popwin_mask_bottom: cc.Node,
        delay_popwin: [],
        node_popwin_up: cc.Node,
        popwin_mask_up: cc.Node,
    },
    onLoad: function () {
        cc.scene = this
        this.popwin_cache = {}
        this._onLoad()
    },
    onDisable: function () {
        this._onDisable && this._onDisable()
    },
    onShowTips: function (type, content, ok_cb, cancel_cb, icon) {
        this.showPrefab("提示框", true, (node) => {
            node.getComponent("Tips").init(content, type, ok_cb, cancel_cb, icon)
        })
    },
    showPrefab: function (name, force, cb) {
        if (this.popwin_cache[name]) {
            if (this.popwin_cache[name] == -1) {
                console.log("waiting", name)
            }
            else {
                console.log("opened", name)
            }
            return
        }
        this.popwin_cache[name] = -1
        cc.loader.loadRes("Prefab/" + name, cc.Prefab, (err, prefab) => {
            if (err) {
                console.log(err.message || err);
                return;
            }
            let node = cc.instantiate(prefab)
            cb && cb(node)
            this.showPopWin(node, force)
            this.popwin_cache[name] = 1
        });
    },
    _showPopWinBottom: function (node) {
        if (this.node_popwin_bottom._children.length > 0) {
            this.delay_popwin.push(node)
            return
        }
        if (!this.popwin_mask_bottom.active) {
            this.popwin_mask_bottom.active = true
            this.popwin_mask_bottom.opacity = 0
            this.popwin_mask_bottom.runAction(cc.fadeTo(0.3, 120))
        }
        node.parent = this.node_popwin_bottom
        node.runAction(cc.sequence([cc.fadeTo(0.2, 255), cc.scaleTo(0.1, 1.0)]))
    },
    _showPopWinUp: function (node) {
        if (!this.popwin_mask_up.active) {
            this.popwin_mask_up.active = true
            this.popwin_mask_up.opacity = 0
            this.popwin_mask_up.runAction(cc.fadeTo(0.3, 120))
        }
        node.parent = this.node_popwin_up
        node.runAction(cc.sequence([cc.fadeTo(0.2, 255), cc.scaleTo(0.1, 1.0)]))
    },
    showPopWin: function (node, force) {
        force ? this._showPopWinUp(node) : this._showPopWinBottom(node)
    },
    _closePopWinBottom: function (node) {
        node.runAction(cc.sequence(cc.fadeTo(0.2, 0.0), cc.callFunc(() => {
            node.parent = null
            this.popwin_cache[node.name] = 0
            if (this.delay_popwin.length) {
                let new_node = this.delay_popwin[0]
                this.delay_popwin.splice(0, 1)
                return this.showPopWin(new_node)
            }
            if (this.node_popwin_bottom._children.length <= 0) {
                this.popwin_mask_bottom.runAction(cc.sequence([
                    cc.fadeTo(0.1, 0),
                    cc.callFunc(() => {
                        this.popwin_mask_bottom.active = false
                    })
                ]))
            }
        })))
    },
    _closePopWinUp: function (node) {
        node.runAction(cc.sequence(cc.fadeTo(0.2, 0.0), cc.callFunc(() => {
            node.parent = null
            this.popwin_cache[node.name] = 0
            if (this.node_popwin_up._children.length <= 0) {
                this.popwin_mask_up.runAction(cc.sequence([
                    cc.fadeTo(0.1, 0),
                    cc.callFunc(() => {
                        this.popwin_mask_up.active = false
                    })
                ]))
            }
        })))
    },
    closePopWin: function (node) {
        if (!node || node.parent == null) return
        if (node.parent != this.node_popwin_bottom && node.parent != this.node_popwin_up) {
            node.parent = null
            return
        }
        node.parent == this.node_popwin_up ? this._closePopWinUp(node) : this._closePopWinBottom(node)
    },
    gotoGame: function (content) {
        this.showPrefab("等待", true, (node) => {
            node.getComponent("Waiting").init(content)
        })
        cc.director.loadScene("mjgame")
    },
    showWaiting: function (content, cb) {
        this.showPrefab("等待", true, (node) => {
            node.getComponent("Waiting").init(content)
            cb && cb(node)
            Task.runAfter(5000, () => { this.closePopWin(node) })
        })
    },
});
