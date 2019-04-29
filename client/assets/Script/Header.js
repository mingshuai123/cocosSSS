
cc.Class({
    extends: cc.Component,

    properties: {
        money: {
            default: null,
            type: cc.Label
        },
        nickname: {
            default: null,
            type: cc.Label
        },
        atlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        icon: {
            default: null,
            type: cc.Node
        },
        banker: {
            default: null,
            type: cc.Node
        },
        hu_times: {
            default: null,
            type: cc.Label
        },
        offline: {
            default: null,
            type: cc.Node
        },
        big_header_prefab: {
            default: null,
            type: cc.Prefab
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
    init: function (mjnode, dir, uid, name, icon, value) {
        this.node.active = false
        this.mjnode = mjnode
        this.dir = dir
        this.uid = uid
        this.nickname.string = name
        this.src_icon = icon
        this.money.string = this.value_ab(value)
        Utils.UrlImage(icon, (err, sprite) => {
            !err && (this.icon.getComponent(cc.Sprite).spriteFrame = sprite)
            this.node.active = true
        })
        this.node.on(cc.Node.EventType.TOUCH_START, this.showBigHeader.bind(this))
    },
    value_ab: function (value) {
        if (value < 10000) {
            return '' + value
        } else {
            let value_ = Math.floor(value / 1000) * 1000
            return '' + (value_ / 10000) + '万'
        }
    },
    set_banker: function (hu_times) {
        this.banker.active = true
        if (hu_times > 0) {
            this.hu_times.node.parent.active = true
            this.hu_times.string = 'x ' + hu_times
        }
    },
    set_offline(offline) {
        this.offline.active = offline
    },
    showBigHeader() {
        if (this.dir == 4 || !this.mjnode.no_waiting) return
        let header = cc.instantiate(this.big_header_prefab)
        header.parent = this.mjnode.node
        header.getChildByName("BigHeader").getComponent("BigHeader").init(this.mjnode.node, this.dir, this.uid, this.nickname.string, this.src_icon)
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
