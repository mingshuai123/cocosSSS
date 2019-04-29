(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/MJGame.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'MJGame', __filename);
// Script/MJGame.js

"use strict";

var ScenePopWin = require('./lib/ScenePopWin');

cc.Class({
    extends: ScenePopWin,
    seat: null,
    properties: {
        right: {
            default: null,
            type: cc.Node
        },
        up: {
            default: null,
            type: cc.Node
        },
        left: {
            default: null,
            type: cc.Node
        },
        bottom: {
            default: null,
            type: cc.Node
        },
        self_cur_card_prefab: {
            default: null,
            type: cc.Prefab
        },
        self_out_card_prefab: {
            default: null,
            type: cc.Prefab
        },
        self_peng_prefab: {
            default: null,
            type: cc.Prefab
        },
        self_out_card_big_prefab: {
            default: null,
            type: cc.Prefab
        },
        left_cur_card_prefab: {
            default: null,
            type: cc.Prefab
        },
        left_peng_prefab: {
            default: null,
            type: cc.Prefab
        },
        left_out_card_prefab: {
            default: null,
            type: cc.Prefab
        },
        left_out_card_big_prefab: {
            default: null,
            type: cc.Prefab
        },
        up_peng_gang_prefab: {
            default: null,
            type: cc.Prefab
        },
        up_cur_card_prefab: {
            default: null,
            type: cc.Prefab
        },
        up_out_card_prefab: {
            default: null,
            type: cc.Prefab
        },
        up_out_card_big_prefab: {
            default: null,
            type: cc.Prefab
        },
        right_peng_gang_prefab: {
            default: null,
            type: cc.Prefab
        },
        right_cur_card_prefab: {
            default: null,
            type: cc.Prefab
        },
        right_out_card_prefab: {
            default: null,
            type: cc.Prefab
        },
        right_out_card_big_prefab: {
            default: null,
            type: cc.Prefab
        },
        self_turn: {
            default: null,
            type: cc.Node
        },
        left_turn: {
            default: null,
            type: cc.Node
        },
        up_turn: {
            default: null,
            type: cc.Node
        },
        right_turn: {
            default: null,
            type: cc.Node
        },
        deadline: {
            default: null,
            type: cc.Label
        },
        ani_hua_prefab: {
            default: null,
            type: cc.Prefab
        },
        ani_kaijin_prefab: {
            default: null,
            type: cc.Prefab
        },
        header_prefab: {
            default: null,
            type: cc.Prefab
        },
        event_handler_prefab: {
            default: null,
            type: cc.Prefab
        },
        remainder_cards: {
            default: null,
            type: cc.Label
        },
        total_round: {
            default: null,
            type: cc.Label
        },
        cur_round: {
            default: null,
            type: cc.Label
        },
        jin_card: {
            default: null,
            type: cc.Node
        },
        ani_event_prefab: {
            default: null,
            type: cc.Prefab
        },
        tips_prefab: {
            default: null,
            type: cc.Prefab
        },
        hua_show_prefab: {
            default: null,
            type: cc.Prefab
        },
        invite_prefab: {
            default: null,
            type: cc.Prefab
        },
        dismiss_msg_prefab: {
            default: null,
            type: cc.Prefab
        },
        game_setting_prefab: {
            default: null,
            type: cc.Prefab
        },
        chat_prefab: {
            default: null,
            type: cc.Prefab
        },
        right_chat_prefab: {
            default: null,
            type: cc.Prefab
        },
        up_chat_prefab: {
            default: null,
            type: cc.Prefab
        },
        left_chat_prefab: {
            default: null,
            type: cc.Prefab
        },
        bottom_chat_prefab: {
            default: null,
            type: cc.Prefab
        },
        biaoqing_prefab: {
            default: null,
            type: cc.Prefab
        },
        btn_back: cc.Node,
        btn_dismiss: cc.Node,
        btn_invite_club: cc.Node,
        btn_invite_wx: cc.Node
    },
    findNode: function findNode(dir, name) {
        var node_names = name.split(".");
        var node = this.dir_dict[dir];
        for (var i = 0; i < node_names.length; i++) {
            node = node.getChildByName(node_names[i]);
        }
        return node;
    },
    randomInit: function randomInit(dir) {
        var peng_pang_num = parseInt(Math.random() * 5);
        if (!peng_pang_num) {
            this.findNode(dir, "cur.event").active = false;
        }
        for (var i = 0; i < peng_pang_num; i++) {
            var peng = cc.instantiate(this.peng_prefab_dict[dir]);
            peng.getComponent("EventCard").init(dir, parseInt(Math.random() * 3 + 1), parseInt(Math.random() * 9 + 1));
            peng.parent = this.findNode(dir, "cur.event");
        }
        for (var _i = 0; _i < 17 - peng_pang_num * 3 - 1; _i++) {
            var self_cur_card_prefab = cc.instantiate(this.cur_card_prefab_dict[dir]);
            var card_script = self_cur_card_prefab.getComponent("CurCard");
            if (card_script) {
                card_script.init(dir, parseInt(Math.random() * 3 + 1), parseInt(Math.random() * 9 + 1));
            }
            self_cur_card_prefab.parent = this.findNode(dir, "cur.normal.old");
        }

        var self_new_card = cc.instantiate(this.cur_card_prefab_dict[dir]);
        self_new_card.parent = this.findNode(dir, "cur.normal.new");

        var out_cards_num = parseInt(Math.random() * 12 + 2);
        if (dir != 1) {
            for (var _i2 = 0; _i2 < out_cards_num; _i2++) {
                var _self_cur_card_prefab = cc.instantiate(this.out_card_prefab_dict[dir]);
                var _card_script = _self_cur_card_prefab.getComponent("OutCard");
                if (_card_script) {
                    _card_script.init(dir, parseInt(Math.random() * 3 + 1), parseInt(Math.random() * 9 + 1));
                }
                _self_cur_card_prefab.parent = this.findNode(dir, "out");
            }
        } else {
            var cards_arr = [];
            for (var _i3 = 0; _i3 < out_cards_num; _i3++) {
                cards_arr.push({ type: parseInt(Math.random() * 3 + 1), value: parseInt(Math.random() * 9 + 1) });
            }
            out_cards_num = parseInt(out_cards_num / 10 + 1) * 10;
            for (var _i4 = cards_arr.length; _i4 < out_cards_num; _i4++) {
                cards_arr.push({ type: null, value: null });
            }
            for (var _i5 = 0; _i5 < parseInt(out_cards_num / 10); _i5++) {
                for (var j = 9; j >= 0; j--) {
                    var _self_cur_card_prefab2 = cc.instantiate(this.out_card_prefab_dict[dir]);
                    var _card_script2 = _self_cur_card_prefab2.getComponent("OutCard");
                    var idx = _i5 * 10 + j;
                    if (_card_script2) {
                        _card_script2.init(dir, cards_arr[idx].type, cards_arr[idx].value);
                    }
                    _self_cur_card_prefab2.parent = this.out_cards_pathis.findNode(dir, "out");
                }
            }
        }
    },
    refreshRightOutCard: function refreshRightOutCard(data) {
        for (var i = 0; i < this.right_out_cards.length; i++) {
            this.right_out_cards[i].last_discard = false;
        }
        data.last_discard = true;
        this.right_out_cards.push(data);
        var dir = 1;
        var cards_arr = JSON.parse(JSON.stringify(this.right_out_cards));
        var out_cards_num = cards_arr.length;
        out_cards_num = parseInt(out_cards_num / 10 + 1) * 10;
        for (var _i6 = cards_arr.length; _i6 < out_cards_num; _i6++) {
            cards_arr.push({ type: null, value: null });
        }
        var out_panel = this.findNode(dir, "out");
        var node_out_cards = [];
        for (var _i7 = 0; _i7 < out_panel._children.length; _i7++) {
            node_out_cards.push(out_panel._children[_i7]);
        }
        out_panel.removeAllChildren();

        var num = 0;
        for (var _i8 = 0; _i8 < parseInt(out_cards_num / 10); _i8++) {
            for (var j = 9; j >= 0; j--) {
                num += 1;
                var idx = _i8 * 10 + j;
                var card = cards_arr[idx];
                var out_card = null;
                if (card.last_discard) {
                    out_card = this.last_out_card;
                    out_card.getComponent("OutCard").start_play();
                } else {
                    if (num <= node_out_cards.length) {
                        out_card = node_out_cards[num - 1];
                    } else {
                        out_card = cc.instantiate(this.out_card_prefab_dict[dir]);
                    }
                    var cs = out_card.getComponent("OutCard");
                    cs.init(dir, card.type, card.value);
                }
                out_card.parent = out_panel;
            }
        }

        // for (let i = 0; i < parseInt(out_cards_num / 10); i++) {
        //     for (let j = 9; j >= 0; j--) {
        //         let idx = i * 10 + j
        //         let card = cards_arr[idx]
        //         let out_card = null
        //         if (card.last_discard) {
        //             out_card = this.last_out_card
        //             out_card.getComponent("OutCard").start_play()
        //         } else {
        //             out_card = cc.instantiate(this.out_card_prefab_dict[dir]);
        //             let cs = out_card.getComponent("OutCard")
        //             cs.init(dir, card.type, card.value)
        //         }
        //         out_card.parent = out_panel
        //     }
        // }
    },
    initComponents: function initComponents() {
        this.dir_dict = {
            1: this.right,
            2: this.up,
            3: this.left,
            4: this.bottom
        };
        this.peng_prefab_dict = {
            1: this.right_peng_gang_prefab,
            2: this.up_peng_gang_prefab,
            3: this.left_peng_prefab,
            4: this.self_peng_prefab
        };
        this.cur_card_prefab_dict = {
            1: this.right_cur_card_prefab,
            2: this.up_cur_card_prefab,
            3: this.left_cur_card_prefab,
            4: this.self_cur_card_prefab
        };
        this.out_card_prefab_dict = {
            1: this.right_out_card_prefab,
            2: this.up_out_card_prefab,
            3: this.left_out_card_prefab,
            4: this.self_out_card_prefab
        };
        this.out_card_big_prefab_dict = {
            1: this.right_out_card_big_prefab,
            2: this.up_out_card_big_prefab,
            3: this.left_out_card_big_prefab,
            4: this.self_out_card_big_prefab
        };
        this.turn_dict = {
            1: this.right_turn,
            2: this.up_turn,
            3: this.left_turn,
            4: this.self_turn
        };
        this.chat_dict = {
            1: this.right_chat_prefab,
            2: this.up_chat_prefab,
            3: this.left_chat_prefab,
            4: this.bottom_chat_prefab
        };
    },
    // use this for initialization
    initSelfCards: function initSelfCards(resp) {
        this.findNode(this.dir, "cur.event").removeAllChildren();
        this.findNode(this.dir, "cur.normal.old").removeAllChildren();
        this.findNode(this.dir, "cur.normal.new").removeAllChildren();
        this.findNode(this.dir, "out").removeAllChildren();

        for (var i = 0; i < resp.roles.length; i++) {
            if (resp.roles[i].uid == cc.mj.mgr.uid) {
                cc.mj.mgr.initCards(resp.roles[i].cards);
                break;
            }
        }
        this.findNode(this.dir, "cur.event").active = false;
        var card_len = cc.mj.mgr.self_cards.length;
        for (var _i9 = 0; _i9 < card_len; _i9++) {
            var card = cc.mj.mgr.self_cards[_i9];
            var cur_card_prefab = cc.instantiate(this.cur_card_prefab_dict[this.dir]);
            cur_card_prefab.getComponent("CurCard").init(this.dir, card.type, card.value, card.laizi, this);
            cur_card_prefab.parent = this.findNode(this.dir, "cur.normal.old");
        }
        if (cc.mj.mgr.new_card) {
            var _card = cc.mj.mgr.new_card;
            var new_card = cc.instantiate(this.cur_card_prefab_dict[this.dir]);
            new_card.getComponent("CurCard").init(this.dir, _card.type, _card.value, _card.laizi, this);
            new_card.parent = this.findNode(this.dir, "cur.normal.new");
        }
    },
    initOtherCards: function initOtherCards(resp) {
        for (var i = 0; i < resp.roles.length; i++) {
            var role = resp.roles[i];
            if (role.uid == cc.mj.mgr.uid) {
                continue;
            }
            var dir = Utils.dirFromSeat(role.seat);
            this.findNode(dir, "cur.event").removeAllChildren();
            this.findNode(dir, "cur.normal.old").removeAllChildren();
            this.findNode(dir, "out").removeAllChildren();
            this.findNode(dir, "cur.normal.new").removeAllChildren();
            this.findNode(dir, "hua").active = false;

            var role_cards = role.cards;
            this.findNode(dir, "cur.event").active = false;
            for (var _i10 = 0; _i10 < role_cards.length; _i10++) {
                var card = role_cards[_i10];
                var cur_card_prefab = cc.instantiate(this.cur_card_prefab_dict[dir]);
                cur_card_prefab.parent = this.findNode(dir, "cur.normal.old");
            }
        }
    },
    _onLoad: function _onLoad() {
        cc.mj.game = this;
        this.room = cc.mjroom;
        this.bg = cc.find("Canvas/bg_" + cc.mj.user.getStyleBg());
        this.bg.active = true;
        this.initTitle();
        cc.audio.playBGM("bgm2.mp3");
        cc.mj.mgr.uid = cc.mj.user.uid;
        this.laizi_show = cc.find("Canvas/gaming/laizi");
        this.laizi_show.active = false;
        this.right_out_cards = []; //右侧出牌特殊处理
        this.ignore_animation = false;
        this.timer_dict = {};
        this.chat_msgs = [];

        this.dir = 4;
        this.initComponents();
        this.initEvt();
        // this.recoverGame()
        cc.find("Canvas/prepare/option").getComponent(cc.Label).string = this.room.option_text;
        this.initBtn();
        this.initInvitionBtn();
        this.regHideShowEvent();

        this.start();
    },
    initBtn: function initBtn() {
        this.btn_dismiss.active = this.room.cur_round == 0;
        this.btn_invite_club.active = this.room.cur_round == 0 && this.room.club_id != '0';
        this.btn_invite_wx.active = this.room.cur_round == 0;
        this.btn_back.active = this.room.owner_uid == cc.mj.user.uid;
    },
    onShowChat: function onShowChat() {
        var _this = this;

        cc.scene.showPrefab("聊天框", false, function (node) {
            node.getComponent("Chat").init(_this.chat_msgs);
        });
    },
    onDismiss: function onDismiss() {
        var type = this.room.option.type;
        if (type == "PERSONAL") {
            if (this.room.owner_uid == cc.mj.user.uid) {
                cc.scene.onShowTips("OK_CANCEL", "解散房间不扣房卡，是否确定解散？", function () {
                    http.sendGame({ method: "exit_game" }, function () {
                        cc.mjroom = null;cc.director.loadScene("hall");
                    });
                });
            } else {
                http.sendGame({ method: "exit_game" }, function () {
                    cc.mjroom = null;cc.director.loadScene("hall");
                });
            }
        } else {
            cc.club_type = this.room.option.type;
            http.sendGame({ method: "exit_game" }, function () {
                cc.mjroom = null;cc.director.loadScene("club");
            });
        }
    },
    onShowClubMembers: function onShowClubMembers() {
        cc.mj.user.club_id = this.room.club_id;
        cc.scene.showPrefab("邀请俱乐部成员");
    },
    initInvitionBtn: function initInvitionBtn() {
        if (this.room.cur_round == 0) {
            var btn_wx = cc.find("Canvas/prepare/invite/btn_invite_wx");
            btn_wx.active = true;
            btn_wx.on(cc.Node.EventType.TOUCH_END, this.onShare.bind(this));
        }
    },
    makeShareText: function makeShareText() {
        var text = "福宁娱乐：";
        text += this.room.option.mj == "fzmj" ? "福州" : "宁德";
        text += (this.room.option.max_role == 2 ? "二" : this.room.option.max_role == 3 ? "三" : "四") + "人, ";
        text += "房号：" + this.room.id + "(" + this.room.option.round + "局), ";
        text += this.room.option_text + "\n";
        text += "安卓手机点击：" + cc.mj.game_cfg.url_android + "，";
        text += "苹果手机点击：" + cc.mj.game_cfg.url_ios;
        return text;
    },

    onShare: function onShare() {
        var text = this.makeShareText();
        cc.log(text);

        var share_plugin = anysdk.agentManager.getSharePlugin();
        share_plugin.setListener(this.onShareResult, this);

        var info = {
            shareTo: "0",
            mediaType: "0",
            title: "福宁娱乐", // title 标题，印象笔记、邮箱、信息、微信、人人网和 QQ 空间使用
            text: text // text 是分享文本，所有平台都需要这个字段
        };
        share_plugin.share(info);
    },
    onShareResult: function onShareResult() {
        switch (code) {
            case anysdk.ShareResultCode.kShareSuccess:
                //do something
                break;
            case anysdk.ShareResultCode.kShareFail:
                //do something
                break;
            case anysdk.ShareResultCode.kShareCancel:
                //do something
                break;
            case anysdk.ShareResultCode.kShareNetworkError:
                //do something
                break;
        }
    },

    init: function init(evts) {
        this.evts = evts;
    },
    recover: function recover() {
        if (cc.mj.mgr.recover) {
            cc.log("恢复游戏");
            this.ignore_animation = true;
            while (cc.mj.evt.hasEvt()) {
                cc.mj.evt.handleEvt();
            }
            this.ignore_animation = false;
            cc.mj.mgr.recover = false;
        }
    },
    start: function start() {
        this.recover();
        if (!this.finished) {
            Task.resume();
            http.startHeartbeat();
            this.handle_next();
        }
    },
    initTitle: function initTitle() {
        var _this2 = this;

        var title = this.bg.getChildByName("title").getComponent(cc.Label);
        var _0 = function _0(v) {
            return v > 9 ? v : "0" + v;
        };
        var cur_time_string = function cur_time_string() {
            var date = new Date();
            var month = _0(date.getMonth() + 1);
            var day = _0(date.getDate());
            var hour = _0(date.getHours());
            var min = _0(date.getMinutes());
            var t = "" + month + "-" + day + " " + hour + ":" + min;
            return t;
        };
        this.room.room_text ? this.room.room_text : '';
        title.string = this.room.room_text + "   " + cur_time_string();
        Task.onTask(60 * 1000, function () {
            title.string = _this2.room.room_text + "   " + cur_time_string();
        });
    },
    regHideShowEvent: function regHideShowEvent() {
        cc.game.on(cc.game.EVENT_HIDE, this.onHide, this);
        cc.game.on(cc.game.EVENT_SHOW, this.onShow, this);
    },
    onHide: function onHide() {
        Task.pause();
    },
    onShow: function onShow() {
        var _this3 = this;

        http.heartbeat(function () {
            cc.mj.mgr.recover = true;
            _this3.start();
        });
    },
    onRecover: function onRecover() {
        cc.recoverChecked = false;
        cc.director.loadScene("hall");
    },
    onClickBack: function onClickBack() {
        var _this4 = this;

        cc.scene.onShowTips("OK_CANCEL", "返回大厅您的房间仍会保留哦！", function () {
            var type = _this4.room.option.type;
            if (type == "PERSONAL") {
                cc.director.loadScene("hall");
            } else {
                cc.club_type = _this4.room.option.type;
                cc.director.loadScene("club");
            }
        });
    },
    runAfter: function runAfter(func, t) {
        if (!t) {
            func();
            return null;
        } else {
            Task.runAfter(t, func);
        }
    },
    handle_event: function handle_event() {
        if (cc.mj.evt.hasEvt()) cc.mj.evt.handleEvt();else this.handle_next();
    },
    handle_next: function handle_next() {
        var self = this;
        this.handle_next_cb = function () {
            self.handle_event();
        };
        Task.runAfter(16, this.handle_next_cb);
    },
    newTurn: function newTurn() {
        var dir = Utils.dirFromSeat(cc.mj.mgr.cur_seat);
        for (var k in this.turn_dict) {
            this.turn_dict[k].active = k == dir ? true : false;
        }
        this.newDeadline();
    },
    newDeadline: function newDeadline(cb) {
        this.deadline.string = 10;
        if (this.deadline_cb) return;
        var self = this;
        this.deadline_cb = function () {
            var deadline_sec = parseInt(self.deadline.string) - 1;
            if (deadline_sec == 3) {
                cc.audio.playSFX("common/timeup_alarm.mp3");
            }
            self.deadline.string = '' + Math.max(0, deadline_sec);
        };
        Task.onTask(1000, this.deadline_cb);
    },
    play_animation: function play_animation(seat, animation_prefab, timeout, cb) {
        if (!this.ignore_animation) {
            var dir = Utils.dirFromSeat(seat);
            var animation = cc.instantiate(animation_prefab);
            var animation_node = this.findNode(dir, "ani_event");
            animation_node.removeAllChildren();
            animation.parent = animation_node;
            this.runAfter(function () {
                animation.parent = null;
                cb && cb();
            }, timeout);
        } else {
            cb && cb();
        }
    },
    refreshSelfCards: function refreshSelfCards() {
        var dir = Utils.dirFromSeat(cc.mj.mgr.self_seat);
        var cur_normal_old_node = this.findNode(dir, "cur.normal.old");
        var cur_len = cur_normal_old_node._children.length;
        var card_len = cc.mj.mgr.self_cards.length;
        var len = cur_len >= card_len ? cur_len : card_len;

        for (var i = 0; i < len; i++) {
            var card = null;
            if (i >= cur_len) {
                card = cc.instantiate(this.cur_card_prefab_dict[dir]);
                card.parent = this.findNode(dir, "cur.normal.old");
            } else {
                card = cur_normal_old_node._children[i];
            }
            if (i >= card_len) {
                card.active = false;
            } else {
                card.active = true;
                var card_script = card.getComponent("CurCard");
                card_script.init(this.dir, cc.mj.mgr.self_cards[i].type, cc.mj.mgr.self_cards[i].value, cc.mj.mgr.self_cards[i].laizi, this);
            }
        }
        if (cc.mj.mgr.new_card) {
            var _card_script3 = this.findNode(dir, "cur.normal.new")._children[0].getComponent("CurCard");
            _card_script3.init(this.dir, cc.mj.mgr.new_card.type, cc.mj.mgr.new_card.value, cc.mj.mgr.new_card.laizi, this);
        }
    },
    onPrepare: function onPrepare() {
        http.sendGame({ method: "prepare" }, function (resp) {});
    },
    checkHua: function checkHua() {
        http.sendGame({ method: "check_hua" }, function (resp) {
            cc.scene.showPrefab("查看花牌", false, function (node) {
                node.getComponent("RoleHuaShow").init(resp.roles);
            });
        });
    },
    PreDiscard: function PreDiscard(type, value) {
        return;
        var out_card_big = cc.instantiate(this.out_card_big_prefab_dict[4]);
        out_card_big.getComponent("OutCard").init(4, type, value, null, true);
        out_card_big.parent = this.findNode(4, "out_big");
    },
    onShowSetting: function onShowSetting() {
        cc.scene.showPrefab("设置", false, function (node) {
            node.getComponent("Setting").init("GAME");
        });
    },
    initEvt: function initEvt() {
        var _this5 = this;

        // 初始化牌局
        cc.mj.evt.regEvt("InitGame", function (data) {
            cc.log(data);
            _this5.no_waiting = true;
            _this5.right_out_cards = []; //右侧出牌特殊处理
            var invite_node = _this5.node.getChildByName("invite_cluber");
            invite_node && (invite_node.parent = null);
            cc.find("Canvas/prepare").active = false;
            var btn_check_hua = cc.find("Canvas/gaming/btn_check_hua");
            if (_this5.room.option.mj != "fzmj") {
                btn_check_hua.active = false;
            } else {
                !btn_check_hua.active && (btn_check_hua.active = true) && btn_check_hua.on(cc.Node.EventType.TOUCH_END, _this5.checkHua.bind(_this5));
            }
            cc.mj.mgr.cur_seat = data.banker.seat;
            _this5.remainder_cards.string = data.card_num;
            _this5.initSelfCards(data);
            _this5.initOtherCards(data);
            for (var i = 1; i <= 4; i++) {
                _this5.findNode(i, "prepare").active = false;
            }
            for (var _i11 = 0; _i11 < data.roles.length; _i11++) {
                var role = data.roles[_i11];
                var dir = Utils.dirFromSeat(role.seat);
                var prepare_header = _this5.findNode(dir, 'prepare_header');
                if (!_this5.findNode(dir, 'gaming_header')._children.length) {
                    if (!prepare_header._children.length) {
                        prepare_header.active = true;
                        var header = cc.instantiate(_this5.header_prefab);
                        var cs = header.getComponent("Header");
                        cs.init(_this5, dir, role.uid, role.name, role.icon, role.money);
                        header.parent = _this5.findNode(dir, 'gaming_header');
                    } else {
                        prepare_header._children[0].parent = _this5.findNode(dir, 'gaming_header');
                    }
                }
                prepare_header.active = false;
            }
            _this5.cur_round.string = data.cur_round;
            _this5.total_round.string = _this5.room.option.round;
            cc.find("Canvas/gaming/turn/option").getComponent(cc.Label).string = _this5.room.option_text;
            cc.find("Canvas/gaming/turn").active = true;
            _this5.newTurn();

            try {
                var banker_dir = Utils.dirFromSeat(data.banker.seat);
                if (banker_dir != _this5.dir) {
                    _this5.findNode(banker_dir, "cur.normal.old")._children[0].parent = null;
                    var new_card = cc.instantiate(_this5.cur_card_prefab_dict[banker_dir]);
                    new_card.parent = _this5.findNode(banker_dir, "cur.normal.new");
                }
                _this5.findNode(banker_dir, "gaming_header")._children[0].getComponent("Header").set_banker(data.banker.hu_times);
            } catch (e) {
                console.log(e);
            }

            !_this5.ignore_animation && _this5.handle_next();
        });
        // 玩家出牌
        cc.mj.evt.regEvt("UserDiscard", function (data) {
            cc.mj.mgr.cur_seat = null;
            _this5.last_out_card && _this5.last_out_card.getComponent("OutCard").stop_play();
            _this5.last_out_card = null;
            _this5.out_card_big && (_this5.out_card_big.parent = null);

            var dir = Utils.dirFromSeat(data.seat);
            _this5.findNode(dir, "out_big").removeAllChildren();
            // 移除操作确定
            var event_handler_node = _this5.findNode(_this5.dir, "event_handler");
            event_handler_node.removeAllChildren();

            var self = _this5;
            var _discard = function _discard(dir, data) {
                if (dir != 1) {
                    _this5.last_out_card.parent = self.findNode(dir, "out");
                    _this5.last_out_card.getComponent("OutCard").start_play();
                } else {
                    _this5.refreshRightOutCard(data);
                }
                !_this5.ignore_animation && _this5.handle_next();
            };
            var card = Utils.parseCard(data.card);
            _this5.last_out_card = cc.instantiate(self.out_card_prefab_dict[dir]);
            _this5.last_out_card.getComponent("OutCard").init(dir, card.type, card.value);
            if (!_this5.ignore_animation && dir != _this5.dir) {
                _this5.out_card_big = cc.instantiate(_this5.out_card_big_prefab_dict[4]);
                _this5.out_card_big.getComponent("OutCard").init(4, card.type, card.value, null, true);
                _this5.out_card_big.parent = _this5.findNode(dir, "out_big");
                _this5.runAfter(function () {
                    _discard(dir, card);
                });
                _this5.runAfter(function () {
                    _this5.out_card_big.parent = null;
                }, 800);
            } else {
                _discard(dir, card);
            }
            !_this5.ignore_animation && cc.audio.playCard(card.type, card.value);
            if (_this5.findNode(dir, "cur.normal.new")._children.length && _this5.findNode(dir, "cur.normal.new")._children[0].active) {
                _this5.findNode(dir, "cur.normal.new")._children[0].active = false;
            } else if (dir != 4) {
                _this5.findNode(dir, "cur.normal.old")._children[_this5.findNode(dir, "cur.normal.old")._children.length - 1].parent = null;
            }

            if (data.uid == cc.mj.mgr.uid) {
                if (cc.mj.mgr.self_selected_card) {
                    cc.mj.mgr.self_selected_card.reset(_this5.findNode(dir, "cur.normal.old"));
                }
                cc.mj.mgr.initCards(data.cards);
                // 刷新手牌
                // cc.mj.mgr.discard({ type: data.type, value: data.value })
                _this5.refreshSelfCards();
            }
        });
        // 抓牌
        cc.mj.evt.regEvt("NewDiscard", function (data) {
            _this5.findNode(_this5.dir, "event_handler").removeAllChildren();
            var dir = Utils.dirFromSeat(data.seat);
            cc.mj.mgr.cur_seat = data.seat;
            var node_new = _this5.findNode(dir, "cur.normal.new");

            if (dir == _this5.dir && node_new._children.length && !node_new._children[0].active) {
                var node = _this5.findNode(_this5.dir, "cur.normal.old");
                var node_card = node._children[cc.mj.mgr.self_cards.length - 1];
                node_card.active = false;
                var card_cs = node_card.getComponent("CurCard");
                var new_card = node_new._children[0];
                new_card.getComponent("CurCard").init(_this5.dir, card_cs.type, card_cs.value, card_cs.laizi, _this5);
                new_card.active = true;
            } else if (dir != _this5.dir && node_new._children.length && !node_new._children[0].active) {

                // this.findNode(dir, "cur.normal.old")._children[this.findNode(dir, "cur.normal.old")._children.length - 1].parent = null
                // node_new._children[0].active = true

                // console.log(node_new)
            }
            _this5.newTurn();
            _this5.handle_next();
        });

        // 抓牌
        cc.mj.evt.regEvt("SupplyCard", function (data) {
            _this5.findNode(_this5.dir, "event_handler").removeAllChildren();

            _this5.remainder_cards.string = data.card_num;
            var dir = Utils.dirFromSeat(data.seat);
            if (data.card) {
                var card = Utils.parseCard(data.card);
                var node_new = _this5.findNode(dir, "cur.normal.new");
                var new_card = null;
                if (node_new._children.length) {
                    node_new._children[0].active = true;
                    new_card = node_new._children[0];
                } else {
                    new_card = cc.instantiate(_this5.cur_card_prefab_dict[dir]);
                    new_card.parent = node_new;
                }
                if (data.uid == cc.mj.mgr.uid) {
                    new_card.getComponent("CurCard").init(_this5.dir, card.type, card.value, card.laizi, _this5);
                    !_this5.ignore_animation && cc.audio.playHandleCard("deal_card");
                    //cc.mj.mgr.getNewCard({ type: card.type, value: card.value, laizi: card.laizi })
                    //this.refreshSelfCards()
                }
            }
            _this5.newTurn();
            _this5.handle_next();
        });
        // 补花
        cc.mj.evt.regEvt("ReplaceHua", function (data) {
            _this5.remainder_cards.string = data.card_num;
            var dir = Utils.dirFromSeat(data.seat);
            _this5.play_animation(data.seat, _this5.ani_hua_prefab, 600, function () {
                _this5.handle_next();
            });
            _this5.findNode(dir, "hua").active = true;
            _this5.findNode(dir, "hua.num")._components[0].string = data.cur_hua;
            if (data.uid == cc.mj.mgr.uid && data.rpl_cards) {
                if (data.cards) {
                    cc.mj.mgr.initCards(data.cards);
                } else {
                    for (var i = 0; i < data.rpl_cards.length; i++) {
                        var rpl_card = data.rpl_cards[i];
                        cc.mj.mgr.replaceCard({ type: rpl_card.type0, value: rpl_card.value0 }, { type: rpl_card.type1, value: rpl_card.value1, laizi: rpl_card.laizi });
                    }
                }
                _this5.refreshSelfCards();
            }
        });
        cc.mj.evt.regEvt("MakeSureHandler", function (data) {
            if (data.uid != cc.mj.mgr.uid) return _this5.handle_next();

            var event_handler_node = _this5.findNode(_this5.dir, "event_handler");
            for (var i = 0; i < data.evts.length; i++) {
                var event = data.evts[i];
                var event_btn = cc.instantiate(_this5.event_handler_prefab);
                var cs = event_btn.getComponent('Handler');
                cs.init(event.event, event.type, event.selects, event.state, event_handler_node);
                event_btn.parent = event_handler_node;
            }
            var guo_btn = cc.instantiate(_this5.event_handler_prefab);
            var cs_guo = guo_btn.getComponent('Handler');
            cs_guo.init(0, null, null, null, event_handler_node);
            guo_btn.parent = event_handler_node;
            _this5.newDeadline();
            _this5.handle_next();
        });

        cc.mj.evt.regEvt("HandleEvent", function (data) {
            if (!data.event) return !_this5.ignore_animation && _this5.handle_next();

            var dir = Utils.dirFromSeat(data.seat);
            var from_dir = Utils.dirFromSeat(data.from_seat);
            var event_cards_node = _this5.findNode(dir, "cur.event");
            event_cards_node.active = true;
            if (dir != from_dir) {
                _this5.last_out_card && (_this5.last_out_card.parent = null) && (_this5.last_out_card = null);
                if (from_dir == 1) {
                    for (var i = 0; i < _this5.right_out_cards.length; i++) {
                        if (_this5.right_out_cards[i].last_discard) {
                            _this5.right_out_cards.splice(i, 1);
                        }
                    }
                }
            }
            if (!_this5.ignore_animation) {
                cc.audio.playEvent(data.event);
                var ani_event = cc.instantiate(_this5.ani_event_prefab);
                ani_event.parent = _this5.findNode(dir, "ani_event");
                ani_event.getComponent("AniEvent").init(data.event);
                _this5.runAfter(function () {
                    ani_event.parent = null;_this5.handle_next();
                }, 500);
            }
            // 杠
            if (data.event == 4) {
                var state = data.state;
                var remove_num = state == null ? dir == from_dir ? 1 : 0 : state == 4 ? 4 : 3;
                if (state == null) {
                    for (var _i12 = 0; _i12 < event_cards_node._children.length; _i12++) {
                        var event_card = event_cards_node._children[_i12];
                        var cs = event_card.getComponent("EventCard");
                        if (cs.type == data.type && cs.value == data.value) {
                            cs.init(dir, from_dir, data.event, data.type, data.value, state);
                            break;
                        }
                    }
                    remove_num = 1;
                } else {
                    var peng = cc.instantiate(_this5.peng_prefab_dict[dir]);
                    peng.getComponent("EventCard").init(dir, from_dir, data.event, data.type, data.value, state);
                    peng.parent = event_cards_node;
                }
                if (dir == from_dir) _this5.findNode(dir, "cur.normal.new")._children[0].active = false;
                data.uid == cc.mj.mgr.uid ? cc.mj.mgr.gang(data.type, data.value, remove_num) : _this5.otherEvent(dir, from_dir, data.event, state);
            } else if (data.event == 3) {
                // 碰
                var _peng = cc.instantiate(_this5.peng_prefab_dict[dir]);
                _peng.getComponent("EventCard").init(dir, from_dir, data.event, data.type, data.value);
                _peng.parent = event_cards_node;

                data.uid == cc.mj.mgr.uid ? cc.mj.mgr.peng(data.type, data.value) : _this5.otherEvent(dir, from_dir, data.event, null);
            } else if (data.event == 2) {
                // 吃
                var _peng2 = cc.instantiate(_this5.peng_prefab_dict[dir]);
                _peng2.getComponent("EventCard").init(dir, from_dir, data.event, data.type, data.value, null, data.value1, data.value2);
                _peng2.parent = event_cards_node;

                data.uid == cc.mj.mgr.uid ? cc.mj.mgr.chi(data.type, data.value1, data.value2) : _this5.otherEvent(dir, from_dir, data.event, null);
            }
            // 移除手牌
            if (data.uid == cc.mj.mgr.uid) {
                cc.mj.mgr.initCards(data.cards);
                _this5.refreshSelfCards();
            }
            !_this5.ignore_animation && _this5.handle_next();
        });
        cc.mj.evt.regEvt("UserWin", function (data) {
            var seat = data.role.seat;
            var ani_event = null;
            if (seat != null) {
                cc.audio.playEvent(5);
                var dir = Utils.dirFromSeat(seat);
                ani_event = cc.instantiate(_this5.ani_event_prefab);
                ani_event.parent = _this5.findNode(dir, "ani_event");
                ani_event.getComponent("AniEvent").init(data.event, data.state);
            }
            _this5.exit();
            _this5.runAfter(function () {
                ani_event && (ani_event.parent = null);
                cc.game.off(cc.game.EVENT_SHOW, _this5.onShow, _this5);
                cc.mj.result = data;
                cc.director.loadScene("report1");
            }, seat && !_this5.ignore_animation ? 1000 : 0);
        });
        cc.mj.evt.regEvt("KaiJin", function (data) {
            _this5.play_animation(data.seat, _this5.ani_kaijin_prefab, 800, function () {
                _this5.handle_next();
            });

            var dir = Utils.dirFromSeat(cc.mj.mgr.self_seat);
            cc.mj.mgr.kaijin(data.type, data.value);
            _this5.refreshSelfCards();
            var cs = _this5.laizi_show.getComponent("OutCard");
            cs.init(dir, data.type, data.value);
            _this5.laizi_show.active = true;
        });

        cc.mj.evt.regEvt("Prepare", function (data) {
            cc.log(data);
            for (var i = 0; i < data.roles.length; i++) {
                var role = data.roles[i];
                var dir = Utils.dirFromSeat(role.seat);
                var prepare_header = _this5.findNode(dir, 'prepare_header');
                prepare_header.active = true;
                prepare_header.removeAllChildren();
                if (role.uid) {
                    var header = cc.instantiate(_this5.header_prefab);
                    var cs = header.getComponent("Header");
                    cs.init(_this5, dir, role.uid, role.name, role.icon, role.money);
                    header.parent = prepare_header;
                    _this5.findNode(dir, "prepare").active = role.prepare;
                } else {
                    _this5.findNode(dir, "prepare").active = false;
                }
            }
            _this5.handle_event();
        });

        cc.mj.evt.regEvt("HaiDiLaoYue", function (data) {
            _this5.findNode(_this5.dir, "event_handler").removeAllChildren();
            _this5.remainder_cards.string = 0;
            for (var i = 0; i < data.roles.length; i++) {
                var role = data.roles[i];
                var dir = Utils.dirFromSeat(role.role.seat);
                var card = role.card;
                var card_node = cc.instantiate(_this5.self_cur_card_prefab);
                card_node.getComponent("CurCard").init(_this5.dir, card.type, card.value, card.laizi, _this5);
                card_node.parent = _this5.findNode(dir, "ani_event");

                if (dir == _this5.dir) continue;

                _this5.findNode(dir, "cur.normal.old").removeAllChildren();
                for (var j = 0; j < role.cards.length; j++) {
                    var _card2 = role.cards[j];
                    var out_card = cc.instantiate(_this5.out_card_prefab_dict[dir]);
                    out_card.parent = _this5.findNode(dir, "cur.normal.old");
                    if (dir == 1 || dir == 3) {
                        _this5.findNode(dir, "cur.normal.old").getComponent(cc.Layout).spacingY = -15;
                    }
                    out_card.getComponent("OutCard").init(dir, _card2.type, _card2.value);
                }
            }
            _this5.runAfter(function () {
                _this5.handle_next();
            }, 2500);
        });
        // 解散房间
        cc.mj.evt.regEvt("MakeSureDismiss", function (data) {
            cc.scene.showPrefab("解散房间", false, function (node) {
                node.getComponent("DismissMsg").init(data);
            });
            _this5.handle_next();
        });

        cc.mj.evt.regEvt("ExitGame", function (data) {
            console.log("ExitGame");
            if (data.uid != cc.mj.user.uid) return;
            _this5.exit();
            var room_type = _this5.room.option.type;
            cc.mjroom = null;
            if (room_type == "PERSONAL") {
                cc.director.loadScene("hall");
            } else {
                cc.club_type = room_type;
                cc.director.loadScene("club");
            }
        });

        cc.mj.evt.regEvt("DismissResult", function (data) {
            var content = "";
            if (data.dismissed) {
                content = "经玩家";
                var names = [];
                for (var i = 0; i < data.roles.length; i++) {
                    names.push("【" + data.roles[i].name + "】");
                }
                content += names.join(",");
                content += "同意，房间解散成功";
            } else {
                content = "由于玩家【" + data.refused.name + "】拒绝，解散房间失败，游戏继续";
            }
            Task.pause();
            cc.scene.onShowTips("OK", content, function () {
                _this5.handle_next();
                Task.resume();
            });
        });

        cc.mj.evt.regEvt("SendMsg", function (data) {
            if (!_this5.ignore_animation) {
                _this5.chat_msgs.push(data);
                if (_this5.ignore_animation) return _this5.handle_next();
                var dir = Utils.dirFromSeat(data.seat);
                var chat_node = cc.instantiate(_this5.chat_dict[dir]);
                chat_node.parent = _this5.findNode(dir, "gaming_chat");
                chat_node.getComponent("GameChat").init(dir, data.msg);
                cc.audio.playSFX(_this5.msgSFX(data.msg));

                _this5.handle_next();
            }
        });

        cc.mj.evt.regEvt("Offline", function (data) {
            if (!_this5.ignore_animation) {
                var dir = Utils.dirFromSeat(data.seat);
                try {
                    _this5.findNode(dir, "gaming_header")._children[0].getComponent("Header").set_offline(data.offline);
                } catch (e) {}

                _this5.handle_event();
            }
        });

        cc.mj.evt.regEvt("SendBiaoQing", function (data) {
            if (!_this5.ignore_animation) {
                (function () {
                    var from_dir = Utils.dirFromSeat(data.from_seat);
                    var to_dir = Utils.dirFromSeat(data.to_seat);
                    for (var i = 0; i < data.times; i++) {
                        _this5.runAfter(function () {
                            var biaoqing = cc.instantiate(_this5.biaoqing_prefab);
                            biaoqing.getComponent("BiaoQing").init(data.biaoqing, from_dir, to_dir);
                            biaoqing.parent = _this5.node;
                        }, i * 180);
                    }

                    _this5.handle_next();
                })();
            }
        });
    },
    otherEvent: function otherEvent(dir, from_dir, event, state) {
        // chi or peng
        if (event != 4) {
            var remove_num = 2;
            var cur_cards_node = this.findNode(dir, "cur.normal.old");
            while (remove_num) {
                if (dir != 4) {
                    cur_cards_node._children[cur_cards_node._children.length - 1].parent = null;
                } else {
                    cur_cards_node._children[0].active = false;
                }
                remove_num -= 1;
            }
        } else {
            var _remove_num = state == null ? 0 : 3;
            var _cur_cards_node = this.findNode(dir, "cur.normal.old");
            if (dir != 4) {
                while (_remove_num) {
                    _cur_cards_node._children[_cur_cards_node._children.length - 1].parent = null;
                    _remove_num -= 1;
                }
            } else {
                for (var i = 0; i < _remove_num; i++) {
                    _cur_cards_node._children[i].active = false;
                }
            }
            // 自己抓杠
            if (dir == from_dir) {
                this.findNode(dir, "cur.normal.new")._children[0].active = false;
            }
        }
    },
    exit: function exit() {
        cc.log("exit");
        http.stopHeartbeat();
        this.finished = true;
    },
    msgSFX: function msgSFX(msg) {
        var COMMON_MSG = ["你太牛了", "哈哈，手气真好", "快点出牌噢", "今天真高兴", "这个吃的好", "你放炮我不胡", "你家里是开银行的吧", "不好意思，我有事要先走一步", "你的牌打的太好啦", "大家好，很高兴见到各位", "怎么又断线了啊，网络怎么这么差啊"];
        for (var i = 0; i < COMMON_MSG.length; i++) {
            if (msg == COMMON_MSG[i]) return "common_woman/fix_msg_" + (i + 1) + ".mp3";
        }
        return null;
    },
    _onDisable: function _onDisable() {
        this.exit();
    },
    // called every frame
    update: function update(dt) {}
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
        //# sourceMappingURL=MJGame.js.map
        