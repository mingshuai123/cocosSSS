"use strict";
cc._RF.push(module, 'f3622ahGNdGK7ic1pHL6mvb', 'History');
// Script/History.js

"use strict";

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
        }
    },
    onLoad: function onLoad() {
        var _this = this;

        http.sendTick({ method: "game.record", game: 0 }, function (resp) {
            _this.idx = 0;
            _this.items = resp.histories;
            Task.runAfter(500, function () {
                cc.scene.closePopWin(_this.waiting);
            });
        });
        cc.scene.showWaiting("正在获取比赛记录", function (node) {
            _this.waiting = node;
        });
    },
    onShowOtherReplay: function onShowOtherReplay() {
        cc.scene.showPrefab("他人回放", true);
    },
    update: function update(dt) {
        if (this.items && this.idx < this.items.length) {
            var history = this.items[this.idx];
            var node = cc.instantiate(this.one_game_prefab);
            node.getComponent("OneGame").init(history, this.node);
            node.parent = this.content;
            this.idx += 1;
        }
    }
});

cc._RF.pop();