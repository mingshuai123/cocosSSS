cc.Class({
    extends: cc.Component,

    properties: {
        father: {
            default: null,
            type: cc.Node
        },
        icon: {
            default: null,
            type: cc.Node
        },
        nickname: {
            default: null,
            type: cc.Label
        },
        label_uid: {
            default: null,
            type: cc.Label
        },
        toggle_ten: {
            default: null,
            type: cc.Toggle
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
        this.father.on(cc.Node.EventType.TOUCH_START, () => { this.father.parent = null })
    },
    init: function (mjnode, dir, uid, name, icon) {
        this.mjnode = mjnode
        this.dir = dir
        this.nickname.string = name
        this.uid = uid
        this.label_uid.string = "ID：" + uid
        Utils.UrlImage(icon, (err, sprite) => {
            !err && (this.icon.getComponent(cc.Sprite).spriteFrame = sprite)
        })
    },
    onSendBiaoQing: function (e, biaoqing) {
        http.sendGame({ method: "send_biaoqing", tarid: this.uid, biaoqing: biaoqing, times: this.toggle_ten.isChecked ? 10 : 1 }, (resp) => {
            this.father.parent = null
        })
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
