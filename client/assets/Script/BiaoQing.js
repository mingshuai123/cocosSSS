// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var BiaoQingPos = {
    1: { x: 600, y: 145, r: 170 },
    2: { x: 445, y: 235, r: 140 },
    3: { x: -610, y: 50, r: 30 },
    4: { x: -600, y: -165, r: 0 },
}
cc.Class({
    extends: cc.Component,

    properties: {
        jinbi: {
            default: null,
            type: cc.Node
        },
        yuanbao: {
            default: null,
            type: cc.Node
        }
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
        this.idx = 0
    },
    init: function (type, from_dir, to_dir) {
        let from_pos = cc.mj.game_cfg.bqpos["" + from_dir]
        let to_pos = cc.mj.game_cfg.bqpos["" + to_dir]
        this.node.x = from_pos.x
        this.node.y = from_pos.y
        this.biaoqing = this.node.getChildByName(type)
        let animation_state = this.biaoqing.getComponent(cc.Animation).play(type + "_fly")
        // 设置循环模式为 Loop
        animation_state.wrapMode = cc.WrapMode.Loop;
        // 设置动画循环次数为无限次
        animation_state.repeatCount = Infinity;

        this.biaoqing.rotation = type == "jinbi" ? to_pos.r : 0
        this.biaoqing.active = true

        let action = cc.moveTo(1.0, cc.p(to_pos.x, to_pos.y))
        this.node.runAction(action)
        setTimeout(() => {
            this.biaoqing.getComponent(cc.Animation).play(type + "_zha")
            setTimeout(() => { this.node.parent = null }, 350)
        }, 1000)
    },
    // update (dt) {},
});
