cc.Class({
    extends: cc.Component,

    properties: {
        atlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        card1: {
            default: null,
            type: cc.Node
        },
        card2: {
            default: null,
            type: cc.Node
        },
        card3: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onClick.bind(this))
    },
    init: function (event, event_id, type, value, value1, value2, father) {
        this.father = father
        this.event_type = event;
        this.event_id = event_id
        this.value = value
        this.value1 = value1
        this.value2 = value2

        let card1frame = this.atlas.getSpriteFrame('p4s' + type + '_' + value1 + '_big');
        this.card1.getComponent(cc.Sprite).spriteFrame = card1frame;
        let card2frame = this.atlas.getSpriteFrame('p4s' + type + '_' + value + '_big');
        this.card2.getComponent(cc.Sprite).spriteFrame = card2frame;
        let card3frame = this.atlas.getSpriteFrame('p4s' + type + '_' + value2 + '_big');
        this.card3.getComponent(cc.Sprite).spriteFrame = card3frame;
    },

    onClick: function () {
        let req = { method: "handle_event", event: this.event_type, evt_id: this.event_id }
        http.sendGame(req, (resp) => { })
        this.father.removeAllChildren()
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
