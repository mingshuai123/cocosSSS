let name_dict = {
    5: 'win', 4: 'gang', 3: 'peng', 2: 'chi', 0: 'guo'
}

cc.Class({
    extends: cc.Component,

    properties: {
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
    able: function (event) {
        let name = name_dict[event]
        let event_node = this.node.getChildByName(name)
        event_node.getChildByName("icon1").active = true
    },
    handled: function (event) {
        let name = name_dict[event]
        let gesture = this.node.getChildByName(name).getChildByName("replayGesture")
        gesture.active = true

        let action1 = cc.scaleTo(0.15, 0.9);
        let action2 = cc.moveTo(0.15, cc.p(10, -30));
        let actionsArray = [action1, action2];
        gesture.runAction(cc.spawn(actionsArray));
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
