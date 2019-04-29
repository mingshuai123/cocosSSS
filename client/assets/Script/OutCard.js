cc.Class({
    extends: cc.Component,

    properties: {
        card: {
            default: null,
            type: cc.Node
        },
        atlas_big: {
            default: null,
            type: cc.SpriteAtlas
        },
        atlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        icon: {
            default: null,
            type: cc.Node
        },
        hua: {
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
    onLoad: function () {

    },
    init: function (dir, type, value, num, big) {
        this.value = value
        let ext = cc.mj.user.mjStyleBig() ? "_big" : ""
        let atlas = cc.mj.user.mjStyleBig() ? this.atlas_big : this.atlas
        if (value != null) {
            let sprite_name = 'p' + dir + 's' + type + '_' + value + ext
            if (type == 4 && value > 7) {
                sprite_name = 'p' + dir + 's5_' + (value - 7) + ext
            }
            let cardframe = atlas.getSpriteFrame(sprite_name);
            this.card.getComponent(cc.Sprite).spriteFrame = cardframe;
        } else {
            this.card.getComponent(cc.Sprite).spriteFrame = null;
        }
        if (this.icon) {
            this.icon.active = false
        }
        try {
            if (num > 1) {
                this.hua.node.parent.active = true
                this.hua.string = num
            }
        } catch (e) { }
    },
    start_play: function () {
        if (this.icon) {
            this.icon.active = true
            let action1 = cc.moveBy(0.3, cc.p(0, 15));
            let action2 = cc.moveBy(0.3, cc.p(0, -15));
            let actionsArray = cc.sequence([action1, action2]);
            this.action = this.icon.runAction(cc.repeatForever(actionsArray));
        }
    },
    stop_play: function () {
        if (this.icon) {
            this.icon.stopAction(this.action)
            this.icon.active = false
        }
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
