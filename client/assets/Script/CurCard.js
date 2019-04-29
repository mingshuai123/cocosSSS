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
        jin: {
            default: null,
            type: cc.Node
        },
        card_prefab: cc.Prefab,
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
        this.pre_parent = this.node.parent
        this.node.on(cc.Node.EventType.TOUCH_START, this.select.bind(this))
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.move.bind(this))
        this.node.on(cc.Node.EventType.TOUCH_END, this.stop_move.bind(this))
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.stop_move.bind(this))
    },
    init: function (dir, type, value, jin, mjgame) {
        this.dir = dir
        this.type = type
        this.value = value
        this.laizi = jin
        this.jin.active = this.laizi
        this.selected = false
        this.mjgame = mjgame
        let ext = cc.mj.user.mjStyleBig() ? "_big" : ""
        let sprite_name = 'p' + dir + (dir == 4 ? 'b' : 's') + type + '_' + value + ext
        if (type == 4 && value > 7) {
            sprite_name = 'p' + dir + (dir == 4 ? 'b' : 's') + '5_' + (value - 7) + ext
        }
        let atlas = cc.mj.user.mjStyleBig() ? this.atlas_big : this.atlas
        let cardframe = atlas.getSpriteFrame(sprite_name);
        this.card.getComponent(cc.Sprite).spriteFrame = cardframe;
        this.card.active = true
        this.out_card = null
    },
    reset: function (parent) {
        this.node.y = 0
        this.selected = false
        cc.mj.mgr.self_selected_card = null
    },
    select: function (event) {
        if (this.unable_handle()) {
            return
        }
        if (this.selected) {
            cc.mj.game.PreDiscard(this.type, this.value)
            //this.node.parent = null
            cc.mj.mgr.cur_seat = null
            http.sendGame({ method: "discard", type: this.type, value: this.value }, (resp) => { })
            cc.audio.playHandleCard("card_out")
        } else {
            this.selected = true
            if (cc.mj.mgr.self_selected_card) {
                cc.mj.mgr.self_selected_card.reset(cc.mj.mgr.self_selected_card.pre_parent)
            }
            cc.mj.mgr.self_selected_card = this
            this.node.y = 20
            cc.audio.playHandleCard("card_click")
        }
    },
    move: function (event) {
        if (this.unable_handle()) {
            return
        }
        if (event.getLocation().y > cc.mj.game_cfg.dist + 100) {
            cc.mj.mgr.self_selected_card = this
            if (!this.out_card) {
                this.out_card = cc.instantiate(this.card_prefab)
                this.out_card.getComponent("CurCard").init(this.dir, this.type, this.value, this.laizi)
                this.game_node = this.node.parent.parent.parent.parent
                this.out_card.parent = this.game_node
                this.card.active = false
            }
            // if (this.node.parent == this.pre_parent) {
            //     this.node.parent = this.node.parent.parent.parent.parent
            // }
        }
        if (this.out_card) {
            var temp = event.getLocation()
            //获取当前点击的局部坐标
            temp = this.game_node.convertToNodeSpaceAR(temp)
            this.out_card.x = temp.x
            this.out_card.y = temp.y
        } else {
            cc.mj.mgr.self_selected_card = this
            this.node.y = 20
            this.selected = true
        }
    },
    stop_move: function (event) {
        if (this.unable_handle()) {
            return
        }
        if (!this.out_card) {
            return
        }
        var temp = event.getLocation()
        temp = this.node.parent.convertToNodeSpaceAR(temp)
        if (temp.y > 100) {
            this.out_card.parent = null
            cc.mj.game.PreDiscard(this.type, this.value)
            //this.node.parent = null
            cc.mj.mgr.cur_seat = null
            http.sendGame({ method: "discard", type: this.type, value: this.value }, (resp) => { })
            cc.audio.playHandleCard("card_out")
        } else {
            this.card.active = true
            this.out_card.parent = null
            this.out_card = null
            this.node.y = 0
            this.node.x = 0
            this.selected = false
            cc.mj.mgr.self_selected_card = null
        }
    },
    unable_handle: function () {
        return cc.mj.mgr.cur_seat != cc.mj.mgr.self_seat || (this.type == 4 && !this.laizi)
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
