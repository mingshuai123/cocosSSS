"use strict";
cc._RF.push(module, '20ec0cyDJJJHIxqo7wLCwpY', 'ScenePopWin');
// Script/lib/ScenePopWin.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        node_popwin_bottom: cc.Node,
        popwin_mask_bottom: cc.Node,
        delay_popwin: [],
        node_popwin_up: cc.Node,
        popwin_mask_up: cc.Node
    },
    onLoad: function onLoad() {
        cc.scene = this;
        this.popwin_cache = {};
        this._onLoad();
    },
    onDisable: function onDisable() {
        this._onDisable && this._onDisable();
    },
    onShowTips: function onShowTips(type, content, ok_cb, cancel_cb, icon) {
        this.showPrefab("提示框", true, function (node) {
            node.getComponent("Tips").init(content, type, ok_cb, cancel_cb, icon);
        });
    },
    showPrefab: function showPrefab(name, force, cb) {
        var _this = this;

        if (this.popwin_cache[name]) {
            if (this.popwin_cache[name] == -1) {
                console.log("waiting", name);
            } else {
                console.log("opened", name);
            }
            return;
        }
        this.popwin_cache[name] = -1;
        cc.loader.loadRes("Prefab/" + name, cc.Prefab, function (err, prefab) {
            if (err) {
                console.log(err.message || err);
                return;
            }
            var node = cc.instantiate(prefab);
            cb && cb(node);
            _this.showPopWin(node, force);
            _this.popwin_cache[name] = 1;
        });
    },
    _showPopWinBottom: function _showPopWinBottom(node) {
        if (this.node_popwin_bottom._children.length > 0) {
            this.delay_popwin.push(node);
            return;
        }
        if (!this.popwin_mask_bottom.active) {
            this.popwin_mask_bottom.active = true;
            this.popwin_mask_bottom.opacity = 0;
            this.popwin_mask_bottom.runAction(cc.fadeTo(0.3, 120));
        }
        node.parent = this.node_popwin_bottom;
        node.runAction(cc.sequence([cc.fadeTo(0.2, 255), cc.scaleTo(0.1, 1.0)]));
    },
    _showPopWinUp: function _showPopWinUp(node) {
        if (!this.popwin_mask_up.active) {
            this.popwin_mask_up.active = true;
            this.popwin_mask_up.opacity = 0;
            this.popwin_mask_up.runAction(cc.fadeTo(0.3, 120));
        }
        node.parent = this.node_popwin_up;
        node.runAction(cc.sequence([cc.fadeTo(0.2, 255), cc.scaleTo(0.1, 1.0)]));
    },
    showPopWin: function showPopWin(node, force) {
        force ? this._showPopWinUp(node) : this._showPopWinBottom(node);
    },
    _closePopWinBottom: function _closePopWinBottom(node) {
        var _this2 = this;

        node.runAction(cc.sequence(cc.fadeTo(0.2, 0.0), cc.callFunc(function () {
            node.parent = null;
            _this2.popwin_cache[node.name] = 0;
            if (_this2.delay_popwin.length) {
                var new_node = _this2.delay_popwin[0];
                _this2.delay_popwin.splice(0, 1);
                return _this2.showPopWin(new_node);
            }
            if (_this2.node_popwin_bottom._children.length <= 0) {
                _this2.popwin_mask_bottom.runAction(cc.sequence([cc.fadeTo(0.1, 0), cc.callFunc(function () {
                    _this2.popwin_mask_bottom.active = false;
                })]));
            }
        })));
    },
    _closePopWinUp: function _closePopWinUp(node) {
        var _this3 = this;

        node.runAction(cc.sequence(cc.fadeTo(0.2, 0.0), cc.callFunc(function () {
            node.parent = null;
            _this3.popwin_cache[node.name] = 0;
            if (_this3.node_popwin_up._children.length <= 0) {
                _this3.popwin_mask_up.runAction(cc.sequence([cc.fadeTo(0.1, 0), cc.callFunc(function () {
                    _this3.popwin_mask_up.active = false;
                })]));
            }
        })));
    },
    closePopWin: function closePopWin(node) {
        if (!node || node.parent == null) return;
        if (node.parent != this.node_popwin_bottom && node.parent != this.node_popwin_up) {
            node.parent = null;
            return;
        }
        node.parent == this.node_popwin_up ? this._closePopWinUp(node) : this._closePopWinBottom(node);
    },
    gotoGame: function gotoGame(content) {
        this.showPrefab("等待", true, function (node) {
            node.getComponent("Waiting").init(content);
        });
        cc.director.loadScene("mjgame");
    },
    showWaiting: function showWaiting(content, cb) {
        var _this4 = this;

        this.showPrefab("等待", true, function (node) {
            node.getComponent("Waiting").init(content);
            cb && cb(node);
            Task.runAfter(5000, function () {
                _this4.closePopWin(node);
            });
        });
    }
});

cc._RF.pop();