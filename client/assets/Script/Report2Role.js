cc.Class({
    extends: cc.Component,

    properties: {
        bg_win: {
            default: null,
            type: cc.Node
        },
        bg_loser: {
            default: null,
            type: cc.Node
        },
        icon: {
            default: null,
            type: cc.Node
        },
        owner: {
            default: null,
            type: cc.Node
        },
        rolename: {
            default: null,
            type: cc.Label
        },
        uid: {
            default: null,
            type: cc.Label
        },
        zimo: {
            default: null,
            type: cc.Label
        },
        jiepao: {
            default: null,
            type: cc.Label
        },
        dianpao: {
            default: null,
            type: cc.Label
        },
        angang: {
            default: null,
            type: cc.Label
        },
        minggang: {
            default: null,
            type: cc.Label
        },
        score: {
            default: null,
            type: cc.Label
        },
        paoer: {
            default: null,
            type: cc.Node
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
    init: function (role, owner, winer, paoer) {
        this.bg_win.active = winer
        this.bg_loser.active = !winer
        this.owner.active = owner
        this.rolename.string = role.name
        Utils.UrlImage(role.icon, (err, sprite) => {
            !err && (this.icon.getComponent(cc.Sprite).spriteFrame = sprite)
        })
        this.uid.string = 'ID:' + role.id
        this.zimo.string = role.zimo
        this.jiepao.string = role.jiepao
        this.dianpao.string = role.dianpao
        this.angang.string = role.angang
        this.minggang.string = role.minggang
        this.score.string = role.score
        this.paoer.active = paoer
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
