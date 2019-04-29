"use strict";
cc._RF.push(module, '7ffaeEyLkNE/Iy2CaOa09qY', 'OneClubXX');
// Script/OneClubXX.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        icon: {
            default: null,
            type: cc.Node
        },
        created: {
            default: null,
            type: cc.Label
        },
        btn_kick: {
            default: null,
            type: cc.Node
        },
        label_integral: cc.Label,
        node_integral: cc.Node,
        node_xx: cc.Node,
        btn_integral_inc: {
            default: null,
            type: cc.Node
        },
        btn_integral_dec: {
            default: null,
            type: cc.Node
        },
        btn_agree: {
            default: null,
            type: cc.Node
        },
        btn_refuse: {
            default: null,
            type: cc.Node
        },
        role_name: {
            default: null,
            type: cc.Label
        },
        role_id: {
            default: null,
            type: cc.Label
        },
        admin: {
            default: null,
            type: cc.Node
        },
        value1: {
            default: null,
            type: cc.Label
        },
        value2: {
            default: null,
            type: cc.Label
        },
        inc_integral_prefab: {
            default: null,
            type: cc.Prefab
        },
        dec_integral_prefab: {
            default: null,
            type: cc.Prefab
        },
        tips_prefab: cc.Prefab
    },
    onLoad: function onLoad() {},
    init: function init(club_type, club_id, data, type) {
        var _this = this;

        this.data = data;
        this.club_type = club_type;
        if (type == "MGR_MEMBER") {
            this.showMember(data);
        } else if (type == "MGR_TIXIAN") {
            this.showTixian();
        } else {
            this.showReq(data);
        }
        this.club_id = club_id;
        this.role_name.string = data.nickname;
        this.role_id.string = "ID：" + data.uid;
        this.created.string = data.created.slice(0, 10);
        this.admin.active = data.admin;
        Utils.UrlImage(data.icon, function (err, sprite) {
            !err && (_this.icon.getComponent(cc.Sprite).spriteFrame = sprite);
        });
    },
    showMember: function showMember() {
        this.integral = ~~this.data.integral;
        this.label_integral.string = this.data.integral;
        if (this.data.integral < 0) this.label_integral.node.color = new cc.Color(255, 0, 0);
        this.node_integral.active = this.club_type == "INTEGRAL_CLUB";
        this.node_xx.active = this.club_type != "INTEGRAL_CLUB";
        this.btn_integral_inc.on(cc.Node.EventType.TOUCH_START, this.addIntegral.bind(this, 1));
        this.btn_integral_dec.on(cc.Node.EventType.TOUCH_START, this.addIntegral.bind(this, -1));
        this.btn_kick.active = !this.data.admin;
        this.btn_kick.on(cc.Node.EventType.TOUCH_START, this.kick.bind(this));
    },
    addIntegral: function addIntegral(is_inc) {
        var _this2 = this;

        cc.scene.showPrefab("增减积分", true, function (node) {
            node.getComponent("ClubIntegral").init(is_inc, _this2.club_id, _this2.data.uid, _this2.data.nickname, _this2.data.icon, function (val) {
                _this2.integral += val;
                _this2.label_integral.string = _this2.integral;
            });
        });
    },
    showReq: function showReq() {
        this.btn_agree.active = true;
        this.btn_agree.on(cc.Node.EventType.TOUCH_START, this.agree.bind(this));
        this.btn_refuse.active = true;
        this.btn_refuse.on(cc.Node.EventType.TOUCH_START, this.refuse.bind(this));
    },
    showTixian: function showTixian() {
        this.btn_agree.active = true;
        this.btn_agree.on(cc.Node.EventType.TOUCH_START, this.handle_tixian_req.bind(this, "AGREE"));
        this.btn_refuse.active = true;
        this.btn_refuse.on(cc.Node.EventType.TOUCH_START, this.handle_tixian_req.bind(this, "REFUSE"));
        this.value1.node.active = true;
        this.value2.node.active = true;
        this.value1.string = pad(this.data.total_integral, 4);
        this.value2.string = pad(this.data.remainder_integral, 4);
    },
    kick: function kick() {
        var _this3 = this;

        var tips = cc.instantiate(this.tips_prefab);
        tips.parent = this.node.parent.parent.parent.parent;
        var cs = tips.getChildByName("Tips").getComponent("Tips");
        var content = "是否确认踢出该成员";
        cs.init(content, "OK_CANCEL", function () {
            tips.parent = null;
            http.sendHall({ method: "kick_club_member", club_id: _this3.club_id, tarid: _this3.data.uid }, function (resp) {
                _this3.zIndex = 999;_this3.remove_self();
            });
        }, function () {
            tips.parent = null;
        });

        // http.sendHall({ method: "kick_club_member", club_id: this.club_id, tarid: this.data.uid }, (resp) => { this.remove_self() })
    },
    agree: function agree() {
        var _this4 = this;

        http.sendHall({ method: "handle_club_req", club_id: this.club_id, tarid: this.data.uid, status: "AGREE" }, function (resp) {
            _this4.remove_self();
        });
    },
    refuse: function refuse() {
        var _this5 = this;

        http.sendHall({ method: "handle_club_req", club_id: this.club_id, tarid: this.data.uid, status: "REFUSE" }, function (resp) {
            _this5.remove_self();
        });
    },
    handle_tixian_req: function handle_tixian_req(status) {
        var _this6 = this;

        http.sendHall({ method: "handle_tixian_req", club_id: this.club_id, order_id: this.data.order_id, status: status }, function (resp) {
            _this6.remove_self();
        });
    },
    remove_self: function remove_self() {
        this.node.parent = null;
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});

cc._RF.pop();