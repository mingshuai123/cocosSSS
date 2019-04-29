cc.Class({
    extends: cc.Component,

    properties: {
        role_hua_prefab: {
            default: null,
            type: cc.Prefab
        },
        btn_exit: {
            default: null,
            type: cc.Node
        },
        roles: {
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
    init: function (roles) {
        for (let i = 0; i < roles.length; i++) {
            let role = roles[i]
            let node = cc.instantiate(this.role_hua_prefab)
            let cs = node.getComponent("RoleHuaPrefab")
            cs.init(role.name, role.hua)
            node.parent = this.roles
        }
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
