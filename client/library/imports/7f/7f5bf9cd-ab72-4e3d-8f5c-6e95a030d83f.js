"use strict";
cc._RF.push(module, '7f5bfnNq3JOPY9cbpWgMNg/', 'OneGame');
// Script/OneGame.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        room_id: {
            default: null,
            type: cc.Label
        },
        created: {
            default: null,
            type: cc.Label
        },
        round_prefab: {
            default: null,
            type: cc.Prefab
        }
    },
    onLoad: function onLoad() {},
    init: function init(data, father) {
        cc.log(data);
        this.game_id = data.game_id;
        this.game_type = data.game_type;
        this.father = father;
        this.room_id.string = "房间号：" + data.room_id;
        this.created.string = "对战时间：" + data.created;
        this.names = [];
        if (data.roles) {
            cc.log(data.roles.length);

            for (var i = 0; i < data.roles.length; i++) {
                var role = data.roles[i];
                role.seat = i + 1;
                var role_name = this.node.getChildByName("role" + role.seat);
                var role_score = this.node.getChildByName("score" + role.seat);
                role_name.active = true;
                role_score.active = true;
                role_name.getComponent(cc.Label).string = role.userName;
                role_score.getComponent(cc.Label).string = role.score;
                this.names.push(role.userName);
            }
        }

        this.node.on(cc.Node.EventType.TOUCH_END, this.onCheckDetail.bind(this));
    },
    onCheckDetail: function onCheckDetail() {
        var _this = this;

        if (this.game_type == 2) {
            http.sendHall({ method: "sss_game_rounds", game_id: parseInt(this.game_id) }, function (resp) {
                var node = cc.instantiate(_this.round_prefab);
                node.parent = _this.father;
                node.getComponent("Round").init(resp, _this.names);
            });
        } else {
            http.sendHall({ method: "game_rounds", game_id: parseInt(this.game_id) }, function (resp) {
                var node = cc.instantiate(_this.round_prefab);
                node.parent = _this.father;
                node.getComponent("Round").init(resp, _this.names);
            });
        }
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});

cc._RF.pop();