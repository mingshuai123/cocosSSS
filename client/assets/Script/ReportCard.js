cc.Class({
    extends: cc.Component,

    properties: {
        atlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        jin: {
            default: null,
            type: cc.Node
        },
        hu: {
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
    onLoad: function () {

    },
    init: function (type, value, jin, hu) {
        let sprite_name = 'p4s' + type + '_' + value + "_big"
        let cardframe = this.atlas.getSpriteFrame(sprite_name);
        this.getComponent(cc.Sprite).spriteFrame = cardframe
        this.jin.active = jin
        this.hu.active = hu
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
