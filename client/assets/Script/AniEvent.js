cc.Class({
    extends: cc.Component,

    properties: {
        event: {
            default: null,
            type: cc.Node
        },
        atlas: {
            default: null,
            type: cc.SpriteAtlas
        }
    },
    onLoad: function () {

    },
    init: function (event, state) {
        let sprite_name = ""
        if (event != 5) {
            sprite_name = "decision_sign_cs_" + (event == 2 ? 5 : (event == 4 ? 2 : event))
        } else {
            let win_type = {
                1: "tianhu", 2: "qingyise", 3: "hunyise", 4: "qiangjin", 5: "jinlong", 6: "jinque", 7: "threejinhu", 8: "fourjin", 9: "jingang",
                10: "pinghu", 11: "pinghu", 12: "qidui", 13: "dandiao", 14: "dihu", 98: "zimohu", 99: "pinghu"
            }
            sprite_name = win_type[state]
        }
        let spriteframe = this.atlas.getSpriteFrame(sprite_name);
        this.event.getComponent(cc.Sprite).spriteFrame = spriteframe;
        this.event.scale = 1.5

        let action = cc.scaleTo(0.2, 1.0);
        this.event.runAction(action);
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
