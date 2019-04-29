(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/ClubMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd7e91H0fGhOuaYbURCdIkyc', 'ClubMgr', __filename);
// Script/ClubMgr.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        club_member_prefab: {
            default: null,
            type: cc.Prefab
        },
        club_join_exit_prefab: {
            default: null,
            type: cc.Prefab
        },
        club_tixian_prefab: {
            default: null,
            type: cc.Prefab
        },
        content: {
            default: null,
            type: cc.Node
        },
        waiting_prefab: {
            default: null,
            type: cc.Prefab
        },
        time_title: {
            default: null,
            type: cc.Label
        },
        title_4: {
            default: null,
            type: cc.Node
        },
        title_5: cc.Node,
        title_6: {
            default: null,
            type: cc.Node
        },
        toggle_tixian: {
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
    onLoad: function onLoad() {
        cc.cur_club.club_type == "INTEGRAL_CLUB" && (this.toggle_tixian.active = true);
        this.onMgrMember();
    },
    showXX: function showXX(items, type) {
        this.content.removeAllChildren();
        this.load_idx = 0;
        this.items = items;
        this.type = type;
        for (var i = 0; i < 20 && i < items.length; i++) {
            var node = cc.instantiate(this.club_xx_prefab);
            node.getComponent("OneClubXX").init(cc.cur_club.club_type, cc.cur_club.club_id, items[i], type);
            node.parent = this.content;
            this.load_idx += 1;
        }
    },
    onMgrMember: function onMgrMember() {
        var _this = this;

        this.title_5.active = true;
        this.title_4.active = false;
        this.title_6.active = false;
        this.time_title.string = "加入时间";
        http.sendTick({ method: "club.members", club_id: cc.cur_club.club_id }, function (resp) {
            _this.club_xx_prefab = _this.club_member_prefab;

            var dayu_0_arr = [];
            var xiaoyu_0_arr = [];
            var dengyu_0_arr = [];
            for (var i = 0; i < resp.members.length; i++) {
                var req = resp.members[i];
                req.integral = ~~req.integral;
                if (req.integral > 0) dayu_0_arr.push(req);else if (req.integral == 0) dengyu_0_arr.push(req);else xiaoyu_0_arr.push(req);
            }
            dayu_0_arr.sort(function (m1, m2) {
                return m1.integral < m2.integral ? 1 : m1.integral == m2.integral ? 0 : -1;
            });

            xiaoyu_0_arr.sort(function (m1, m2) {
                return m1.integral < m2.integral ? -1 : m1.integral == m2.integral ? 0 : 1;
            });
            var members = [];
            members = members.concat(xiaoyu_0_arr);
            members = members.concat(dayu_0_arr);
            members = members.concat(dengyu_0_arr);

            _this.showXX(members, "MGR_MEMBER");
        });
    },
    onMgrJoin: function onMgrJoin() {
        var _this2 = this;

        this.title_4.active = true;
        this.title_5.active = false;
        this.title_6.active = false;
        this.time_title.string = "申请时间";
        http.sendHall({ method: "club_reqs", club_id: cc.cur_club.club_id, type: "JOIN" }, function (resp) {
            _this2.club_xx_prefab = _this2.club_join_exit_prefab;
            _this2.showXX(resp.reqs, "JOIN");
        });
    },
    onMgrExit: function onMgrExit() {
        var _this3 = this;

        this.title_4.active = true;
        this.title_5.active = false;
        this.title_6.active = false;
        this.time_title.string = "申请时间";
        http.sendHall({ method: "club_reqs", club_id: cc.cur_club.club_id, type: "EXIT" }, function (resp) {
            _this3.club_xx_prefab = _this3.club_join_exit_prefab;
            _this3.showXX(resp.reqs, "EXIT");
        });
    },
    onMgrTixian: function onMgrTixian() {
        var _this4 = this;

        this.title_4.active = false;
        this.title_5.active = false;
        this.title_6.active = true;
        http.sendHall({ method: "tixian_reqs", club_id: this.club_id }, function (resp) {
            _this4.club_xx_prefab = _this4.club_tixian_prefab;
            _this4.showXX(resp.reqs, "MGR_TIXIAN");
        });
    },
    onBack: function onBack() {
        this.node.parent.parent = null;
    },
    scrollEvent: function scrollEvent(sender, event) {},
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    update: function update(dt) {
        if (this.items && this.load_idx < this.items.length) {
            var node = cc.instantiate(this.club_xx_prefab);
            node.getComponent("OneClubXX").init(this.club_type, this.club_id, this.items[this.load_idx], this.type);
            node.parent = this.content;
            this.load_idx += 1;
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=ClubMgr.js.map
        