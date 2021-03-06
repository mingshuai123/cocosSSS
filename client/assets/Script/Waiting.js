// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        icon: {
            default: null,
            type: cc.Node
        },
        content: {
            default: null,
            type: cc.Label
        },
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, () => { })
        let action = cc.rotateBy(0.1, 30);
        this.icon.runAction(cc.repeatForever(action));
        this.dot = ""
    },
    onDisable: function () {
        this.timer_cb && Task.offTask(this.timer_cb)
    },
    init: function (content) {
        this.content.string = content
        let self = this
        this.timer_cb = function () {
            self.dot += "."
            self.content.string = content + self.dot
            if (self.dot == "...") {
                self.dot = ""
            }
        }
        Task.onTask(300, this.timer_cb)
    },

    start() {

    },

    // update (dt) {},
});
