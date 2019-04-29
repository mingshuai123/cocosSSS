(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Replay.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4ad51Sc2ThGuY+Kx+VV1uRT', 'Replay', __filename);
// Script/Replay.js

"use strict";

cc.Class({
    extends: cc.Component,
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
        jin_card: {
            default: null,
            type: cc.Node
        },
        ani_event_prefab: {
            default: null,
            type: cc.Prefab
        },
        hua_show_prefab: {
            default: null,
            type: cc.Prefab
        },
        label_progress: cc.Label
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
                card_script.init(this.dir, parseInt(Math.random() * 3 + 1), parseInt(Math.random() * 9 + 1));
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
        // cc.log(node_out_cards)

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
    },
    clearAllTask: function clearAllTask() {
        for (var k in this.timer_dict) {
            clearTimeout(k);
        }
        this.timer_dict = {};
    },
    runAfter: function runAfter(func, t) {
        if (!t) {
            func();
            return null;
        } else {
            var timer = setTimeout(func, t);
            this.timer_dict[timer] = func;
            return timer;
        }
    },
    initNode: function initNode(dir) {
        this.findNode(dir, "cur.event").removeAllChildren();
        this.findNode(dir, "out").removeAllChildren();
        this.findNode(dir, "cur.normal.old").removeAllChildren();
        this.findNode(dir, "cur.normal.new").removeAllChildren();
        this.findNode(dir, "hua").active = false;
        this.findNode(dir, "cur.event").active = false;
        this.findNode(dir, "out_big").removeAllChildren();
        this.findNode(dir, "event_handler").removeAllChildren();
        this.findNode(dir, "ani_event").removeAllChildren();
    },
    // use this for initialization
    initSelfCards: function initSelfCards(resp) {
        this.initNode(this.dir);

        for (var i = 0; i < resp.roles.length; i++) {
            if (resp.roles[i].seat == cc.mj.mgr.self_seat) {
                cc.mj.mgr.initCards(resp.roles[i].cards);
                break;
            }
        }
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
            if (role.seat == cc.mj.mgr.self_seat) {
                continue;
            }
            var dir = Utils.dirFromSeat(role.seat);
            this.initNode(dir);
            var role_cards = role.cards;
            this.findNode(dir, "cur.event").active = false;
            this._refreshOtherCards(dir, role_cards);
        }
    },
    _refreshOtherCards: function _refreshOtherCards(dir, cards) {
        if (dir != 1) {
            for (var i = 0; i < cards.length; i++) {
                var card = Utils.parseCard(cards[i]);
                var cur_card_prefab = cc.instantiate(this.cur_card_prefab_dict[dir]);
                cur_card_prefab.getComponent("CurCard").init(dir, card.type, card.value, card.laizi);
                cur_card_prefab.parent = this.findNode(dir, "cur.normal.old");
            }
        } else {
            for (var _i10 = cards.length - 1; _i10 >= 0; _i10--) {
                var _card2 = Utils.parseCard(cards[_i10]);
                var _cur_card_prefab = cc.instantiate(this.cur_card_prefab_dict[dir]);
                _cur_card_prefab.getComponent("CurCard").init(dir, _card2.type, _card2.value, _card2.laizi);
                _cur_card_prefab.parent = this.findNode(dir, "cur.normal.old");
            }
        }
    },
    refreshOtherCards: function refreshOtherCards(dir, cards) {
        var node_cards = this.findNode(dir, "cur.normal.old");
        var nodes = node_cards._children;
        if (dir != 1) {
            for (var i = 0; i < nodes.length; i++) {
                if (i < cards.length) {
                    var card = Utils.parseCard(cards[i]);
                    nodes[i].getComponent("CurCard").init(dir, card.type, card.value, card.laizi);
                    nodes[i].active = true;
                } else {
                    nodes[i].active = false;
                }
            }
        } else {
            for (var _i11 = nodes.length - 1; _i11 >= 0; _i11--) {
                var idx = nodes.length - _i11 - 1;
                if (idx < cards.length) {
                    var _card3 = Utils.parseCard(cards[idx]);
                    nodes[_i11].getComponent("CurCard").init(dir, _card3.type, _card3.value, _card3.laizi);
                    nodes[_i11].active = true;
                } else {
                    nodes[_i11].active = false;
                }
            }
        }
        // } else {
        //     for (let i = nodes.length - 1; i >= 0; i--) {
        //         let idx = nodes.length - i
        //         let card = Utils.parseCard(cards[i])
        //         let cur_card_prefab = cc.instantiate(this.cur_card_prefab_dict[dir]);
        //         cur_card_prefab.getComponent("CurCard").init(dir, card.type, card.value, card.laizi)
        //         cur_card_prefab.parent = this.findNode(dir, "cur.normal.old")
        //     }
        // }
        //.removeAllChildren()
        // if (dir != 1) {
        //     for (let i = 0; i < cards.length; i++) {
        //         let card = Utils.parseCard(cards[i])
        //         let cur_card_prefab = cc.instantiate(this.cur_card_prefab_dict[dir]);
        //         cur_card_prefab.getComponent("CurCard").init(dir, card.type, card.value, card.laizi)
        //         cur_card_prefab.parent = this.findNode(dir, "cur.normal.old")
        //     }
        // } else {
        //     for (let i = cards.length - 1; i >= 0; i--) {
        //         let card = Utils.parseCard(cards[i])
        //         let cur_card_prefab = cc.instantiate(this.cur_card_prefab_dict[dir]);
        //         cur_card_prefab.getComponent("CurCard").init(dir, card.type, card.value, card.laizi)
        //         cur_card_prefab.parent = this.findNode(dir, "cur.normal.old")
        //     }
        // }
    },
    find: function find(name) {
        var node_names = name.split("/");
        var node = this.node;
        for (var i = 1; i < node_names.length; i++) {
            node = node.getChildByName(node_names[i]);
        }
        return node;
    },
    onLoad: function onLoad() {
        return;
        this.room = cc.mjroom;
        this.bg = this.find("录像/bg_" + cc.mj.user.getStyleBg());
        this.bg.active = true;
        this.timer_dict = {};
        this.initTitle();
        cc.audio.playBGM("bgm1.mp3");
        this.laizi_show = this.find("Canvas/gaming/laizi");
        this.laizi_show.active = false;
        this.right_out_cards = []; //右侧出牌特殊处理
        this.ignore_animation = false;
        this.dir = 4;
        this.prepared = false;
        this.initComponents();
        this.initEvt();
        this.initControl();
    },
    goto_progress: function goto_progress(progress) {
        var _this = this;

        this.clearAllTask();
        this.right_out_cards = [];
        var step = Math.max(2, progress);
        this.evt_idx = 0;
        this.handleEvt(step);
        this.runAfter(function () {
            _this.play_next();
        }, 1500);
    },
    _init: function _init() {
        this.room = cc.mjroom;
        this.bg = this.find("录像/bg_" + cc.mj.user.getStyleBg());
        this.bg.active = true;
        this.timer_dict = {};
        this.initTitle();
        cc.audio.playBGM("bgm1.mp3");
        this.laizi_show = this.find("Canvas/gaming/laizi");
        this.laizi_show.active = false;
        this.right_out_cards = []; //右侧出牌特殊处理
        this.ignore_animation = false;
        this.dir = 4;
        this.prepared = false;
        this.initComponents();
        this.initEvt();
        this.initControl();
    },
    init: function init(evts) {
        this._init();
        this.evts = evts;
        this.goto_progress(2);
    },
    forward: function forward() {
        var _this2 = this;

        this.find("mjgame/control/forward").getComponent(cc.Button).interactable = false;
        this.clearAllTask();
        for (var dir = 1; dir <= 4; dir++) {
            this.findNode(dir, "out_big").removeAllChildren();
            this.findNode(dir, "event_handler").removeAllChildren();
            this.findNode(dir, "ani_event").removeAllChildren();
        }
        this.handleEvt(~~(this.evts.length * 0.1));
        this.runAfter(function () {
            _this2.play_next();
        }, 1500);
        this.runAfter(function () {
            _this2.find("mjgame/control/forward").getComponent(cc.Button).interactable = true;
        }, 500);
        // this.goto_progress(this.evt_idx + 5)
    },
    back: function back() {
        var _this3 = this;

        this.find("mjgame/control/back").getComponent(cc.Button).interactable = false;
        this.goto_progress(this.evt_idx - 15);
        this.runAfter(function () {
            _this3.find("mjgame/control/back").getComponent(cc.Button).interactable = true;
        }, 500);
    },
    pause: function pause() {
        for (var i = 1; i <= 4; i++) {
            this.findNode(i, "ani_event").removeAllChildren();
        }this.clearAllTask();
        this.btn_pause.active = false;
        this.btn_play.active = true;
    },
    resume: function resume() {
        this.play_next();
        this.btn_play.active = false;
        this.btn_pause.active = true;
    },
    initControl: function initControl() {
        var _this4 = this;

        this.find("mjgame/control/exit").on(cc.Node.EventType.TOUCH_START, function () {
            cc.scene.closePopWin(_this4.node);
            _this4.exit();
        });
        this.btn_pause = this.find("mjgame/control/pause");
        this.btn_play = this.find("mjgame/control/play");
        this.btn_pause.on(cc.Node.EventType.TOUCH_START, this.pause.bind(this));
        this.btn_play.on(cc.Node.EventType.TOUCH_START, this.resume.bind(this));

        // this.find("mjgame/control/forward").on(cc.Node.EventType.TOUCH_START, this.forward.bind(this))
        // this.find("mjgame/control/back").on(cc.Node.EventType.TOUCH_START, this.back.bind(this))
    },
    initTitle: function initTitle() {
        var title = this.bg.getChildByName("title").getComponent(cc.Label);
        title.string = this.room.room_text;
    },
    regHideShowEvent: function regHideShowEvent() {
        cc.game.on(cc.game.EVENT_HIDE, this.onHide, this);
        cc.game.on(cc.game.EVENT_SHOW, this.onShow, this);
    },
    handleEvt: function handleEvt(step) {
        var step_ = 0;
        !step && (step = 1);
        step > 1 && (this.ignore_animation = true);
        while (step_ < step) {
            if (this.evt_idx < this.evts.length) {
                var evt = this.evts[this.evt_idx];
                var cb = cc.mj.evt_cbs[evt.action];
                if (cb) {
                    cb(evt);
                }
                this.evt_idx += 1;
            }
            step_ += 1;
        }
        this.ignore_animation = false;
        this.label_progress.string = "进度：" + this.evt_idx + " / " + this.evts.length;
    },
    play_next: function play_next() {
        this.timer && clearTimeout(this.timer);
        this.timer = this.runAfter(this.handleEvt.bind(this), 1000);
    },
    newTurn: function newTurn() {
        var dir = Utils.dirFromSeat(cc.mj.mgr.cur_seat);
        for (var k in this.turn_dict) {
            this.turn_dict[k].active = k == dir ? true : false;
        }
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
        if (cur_len > card_len) {
            var num = cur_len - card_len;
            while (num) {
                cur_normal_old_node._children[0].parent = null;
                num -= 1;
            }
        }
        if (cur_normal_old_node._children.length != card_len) {
            cur_normal_old_node.removeAllChildren();
        }
        for (var i = 0; i < card_len; i++) {
            var card = null;
            if (i < cur_normal_old_node._children.length) {
                card = cur_normal_old_node._children[i];
            } else {
                card = cc.instantiate(this.self_cur_card_prefab);
                card.parent = cur_normal_old_node;
            }
            var card_script = card.getComponent("CurCard");
            card_script.init(this.dir, cc.mj.mgr.self_cards[i].type, cc.mj.mgr.self_cards[i].value, cc.mj.mgr.self_cards[i].laizi, this);
        }
        if (cc.mj.mgr.new_card) {
            var _card_script3 = this.findNode(dir, "cur.normal.new")._children[0].getComponent("CurCard");
            _card_script3.init(this.dir, cc.mj.mgr.new_card.type, cc.mj.mgr.new_card.value, cc.mj.mgr.new_card.laizi, this);
        }
    },
    checkHua: function checkHua() {
        var _this5 = this;

        http.sendGame({ method: "check_hua" }, function (resp) {
            var hua_show = cc.instantiate(_this5.hua_show_prefab);
            hua_show.parent = _this5.node;
            var cs = hua_show.getComponent("RoleHuaShow");
            cs.init(resp.roles);
        });
    },
    openSetting: function openSetting() {
        var node = cc.instantiate(this.game_setting_prefab);
        node.getComponent("Setting").init("GAME");
        node.parent = this.node;
    },
    initEvt: function initEvt() {
        var _this6 = this;

        cc.mj.evt.clear();
        // 初始化牌局
        cc.mj.evt.regEvt("InitGame", function (data) {
            var btn_check_hua = _this6.find("Canvas/gaming/btn_check_hua");
            if (_this6.room.option.mj != "fzmj") {
                btn_check_hua.active = false;
            } else {
                !btn_check_hua.active && (btn_check_hua.active = true) && btn_check_hua.on(cc.Node.EventType.TOUCH_END, _this6.checkHua.bind(_this6));
            }
            cc.mj.mgr.cur_seat = data.banker.seat;
            _this6.initSelfCards(data);
            _this6.initOtherCards(data);
            // for (let i = 1; i <= 4; i++) {
            //     this.findNode(i, "gaming_header").removeAllChildren()
            //     this.findNode(i, "prepare").active = false
            //     this.findNode(i, "prepare_header").active = false
            //     this.findNode(i, "prepare_header")._children.length && (this.findNode(i, "prepare_header")._children[0].parent = this.findNode(i, "gaming_header"))
            // }
            _this6.find("Canvas/gaming/turn/option").getComponent(cc.Label).string = _this6.room.option_text;
            _this6.find("Canvas/gaming/turn").active = true;
            _this6.newTurn();

            var banker_dir = Utils.dirFromSeat(data.banker.seat);
            _this6.findNode(banker_dir, "gaming_header")._children[0].getComponent("Header").set_banker(data.banker.hu_times);

            !_this6.ignore_animation && _this6.play_next();
        });
        // 玩家出牌
        cc.mj.evt.regEvt("UserDiscard", function (data) {
            cc.mj.mgr.cur_seat = null;
            _this6.last_out_card && _this6.last_out_card.getComponent("OutCard").stop_play();
            _this6.last_out_card = null;

            var dir = Utils.dirFromSeat(data.seat);
            // 移除操作确定
            var event_handler_node = _this6.findNode(_this6.dir, "event_handler");
            event_handler_node.removeAllChildren();

            var self = _this6;
            var _discard = function _discard(dir, data) {
                if (!_this6.last_out_card) return;
                if (dir != 1) {
                    _this6.last_out_card.parent = self.findNode(dir, "out");
                    _this6.last_out_card.getComponent("OutCard").start_play();
                } else {
                    _this6.refreshRightOutCard(data);
                }
                !_this6.ignore_animation && _this6.play_next();
            };
            var card = Utils.parseCard(data.card);
            _this6.last_out_card = cc.instantiate(self.out_card_prefab_dict[dir]);
            _this6.last_out_card.getComponent("OutCard").init(dir, card.type, card.value);

            if (!_this6.ignore_animation) {
                var out_card_big = cc.instantiate(_this6.out_card_big_prefab_dict[4]);
                out_card_big.getComponent("OutCard").init(4, card.type, card.value, null, true);
                _this6.findNode(dir, "out_big").removeAllChildren();
                out_card_big.parent = _this6.findNode(dir, "out_big");
                _this6.runAfter(function () {
                    out_card_big.parent = null;
                    _discard(dir, card);
                }, 1000);
            } else {
                _discard(dir, card);
            }

            !_this6.ignore_animation && cc.audio.playCard(card.type, card.value);
            if (_this6.findNode(dir, "cur.normal.new")._children.length) {
                _this6.findNode(dir, "cur.normal.new").removeAllChildren();
            } else {
                // console.log(this.findNode(dir, "cur.normal.old")._children)
                // this.findNode(dir, "cur.normal.old")._children[0].parent = null
            }

            if (data.seat == cc.mj.mgr.self_seat) {
                if (cc.mj.mgr.self_selected_card) {
                    cc.mj.mgr.self_selected_card.reset(_this6.findNode(dir, "cur.normal.old"));
                }
                cc.mj.mgr.initCards(data.cards);
                // 刷新手牌
                // cc.mj.mgr.discard({ type: data.type, value: data.value })
                _this6.refreshSelfCards();
            } else {
                _this6.refreshOtherCards(dir, data.cards);
            }
        });
        // 抓牌
        cc.mj.evt.regEvt("NewDiscard", function (data) {
            _this6.findNode(_this6.dir, "event_handler").removeAllChildren();
            cc.mj.mgr.cur_seat = data.seat;
            _this6.newTurn();
            !_this6.ignore_animation && _this6.play_next();
        });

        // 抓牌
        cc.mj.evt.regEvt("SupplyCard", function (data) {
            if (_this6.ignore_animation) return;
            _this6.findNode(_this6.dir, "event_handler").removeAllChildren();
            var dir = Utils.dirFromSeat(data.seat);
            var card = Utils.parseCard(data.card);
            _this6.findNode(dir, "cur.normal.new").removeAllChildren();
            var new_card = cc.instantiate(_this6.cur_card_prefab_dict[dir]);
            new_card.parent = _this6.findNode(dir, "cur.normal.new");
            if (data.seat == cc.mj.mgr.self_seat) {
                cc.mj.mgr.getNewCard({ type: card.type, value: card.value, laizi: card.laizi });
                _this6.refreshSelfCards();
            } else {
                new_card.getComponent("CurCard").init(dir, card.type, card.value, card.laizi);
            }

            _this6.newTurn();
            !_this6.ignore_animation && _this6.play_next();
        });
        // 补花
        cc.mj.evt.regEvt("ReplaceHua", function (data) {
            var dir = Utils.dirFromSeat(data.seat);
            _this6.play_animation(data.seat, _this6.ani_hua_prefab, 600, function () {
                _this6.play_next();
            });
            _this6.findNode(dir, "hua").active = true;
            _this6.findNode(dir, "hua.num")._components[0].string = data.cur_hua;
            if (data.seat == cc.mj.mgr.self_seat && data.rpl_cards) {
                if (data.cards) {
                    cc.mj.mgr.initCards(data.cards);
                } else {
                    for (var i = 0; i < data.rpl_cards.length; i++) {
                        var rpl_card = data.rpl_cards[i];
                        cc.mj.mgr.replaceCard({ type: rpl_card.type0, value: rpl_card.value0 }, { type: rpl_card.type1, value: rpl_card.value1, laizi: rpl_card.laizi });
                    }
                }
                _this6.refreshSelfCards();
            } else {
                if (data.cards) {
                    _this6.refreshOtherCards(dir, data.cards);
                } else {
                    for (var _i12 = 0; _i12 < data.rpl_cards.length; _i12++) {
                        var _rpl_card = data.rpl_cards[_i12];
                        console.log(_rpl_card);
                        _this6.findNode(dir, "cur.normal.new")._children[0].getComponent("CurCard").init(dir, _rpl_card.type1, _rpl_card.value1, _rpl_card.laizi);
                    }
                }
            }
        });
        cc.mj.evt.regEvt("MakeSureHandler", function (data) {
            if (_this6.ignore_animation) return;

            var dir = Utils.dirFromSeat(data.seat);
            var event_handler_node = _this6.findNode(dir, "event_handler");
            event_handler_node.removeAllChildren();
            var event_handler = cc.instantiate(_this6.event_handler_prefab);
            var cs = event_handler.getComponent("HandlerReplay");
            for (var i = 0; i < data.evts.length; i++) {
                var event = data.evts[i];
                cs.able(event.event);
            }
            cs.able(0);
            if (dir == 1) event_handler.rotation = 270;else if (dir == 3) event_handler.rotation = 90;
            event_handler.parent = event_handler_node;
            !_this6.ignore_animation && _this6.play_next();
        });

        cc.mj.evt.regEvt("HandleEvent", function (data) {
            !_this6.ignore_animation && _this6.seatHandleEvt(data);
            if (!data.event) return _this6.play_next();
            _this6.runAfter(function () {
                var dir = Utils.dirFromSeat(data.seat);
                var from_dir = Utils.dirFromSeat(data.from_seat);
                var event_cards_node = _this6.findNode(dir, "cur.event");
                event_cards_node.active = true;
                if (dir != from_dir) {
                    _this6.last_out_card && (_this6.last_out_card.parent = null) && (_this6.last_out_card = null);
                    if (from_dir == 1) {
                        for (var i = 0; i < _this6.right_out_cards.length; i++) {
                            if (_this6.right_out_cards[i].last_discard) {
                                _this6.right_out_cards.splice(i, 1);
                            }
                        }
                    }
                }

                if (!_this6.ignore_animation) {
                    cc.audio.playEvent(data.event);
                    var ani_event = cc.instantiate(_this6.ani_event_prefab);
                    ani_event.parent = _this6.findNode(dir, "ani_event");
                    ani_event.getComponent("AniEvent").init(data.event);
                    _this6.runAfter(function () {
                        ani_event.parent = null;
                    }, 500);
                }
                // 杠
                if (data.event == 4) {
                    var state = data.state;
                    var remove_num = state == null ? dir == from_dir ? 1 : 0 : state == 4 ? 4 : 3;
                    if (state == null) {
                        for (var _i13 = 0; _i13 < event_cards_node._children.length; _i13++) {
                            var event_card = event_cards_node._children[_i13];
                            var cs = event_card.getComponent("EventCard");
                            if (cs.type == data.type && cs.value == data.value) {
                                cs.init(dir, from_dir, data.event, data.type, data.value, state);
                                break;
                            }
                        }
                        remove_num = 1;
                    } else {
                        var peng = cc.instantiate(_this6.peng_prefab_dict[dir]);
                        peng.getComponent("EventCard").init(dir, from_dir, data.event, data.type, data.value, state);
                        peng.parent = event_cards_node;
                    }
                    data.seat == cc.mj.mgr.self_seat ? cc.mj.mgr.gang(data.type, data.value, remove_num) : _this6.otherEvent(dir, from_dir, data.event, state);
                } else if (data.event == 3) {
                    // 碰
                    var _peng = cc.instantiate(_this6.peng_prefab_dict[dir]);
                    _peng.getComponent("EventCard").init(dir, from_dir, data.event, data.type, data.value);
                    _peng.parent = event_cards_node;

                    data.seat == cc.mj.mgr.self_seat ? cc.mj.mgr.peng(data.type, data.value) : _this6.otherEvent(dir, from_dir, data.event, null);
                } else if (data.event == 2) {
                    // 吃
                    var _peng2 = cc.instantiate(_this6.peng_prefab_dict[dir]);
                    _peng2.getComponent("EventCard").init(dir, from_dir, data.event, data.type, data.value, null, data.value1, data.value2);
                    _peng2.parent = event_cards_node;

                    data.seat == cc.mj.mgr.self_seat ? cc.mj.mgr.chi(data.type, data.value1, data.value2) : _this6.otherEvent(dir, from_dir, data.event, null);
                }
                // 移除手牌
                if (data.seat == cc.mj.mgr.self_seat) {
                    cc.mj.mgr.initCards(data.cards);
                    _this6.refreshSelfCards();
                } else {
                    _this6.refreshOtherCards(dir, data.cards);
                }
                !_this6.ignore_animation && _this6.play_next();
            }, _this6.ignore_animation ? 0 : 500);
        });
        cc.mj.evt.regEvt("UserWin", function (data) {
            var seat = data.role.seat;
            if (seat != null) {
                cc.audio.playEvent(5);
                var dir = Utils.dirFromSeat(seat);
                _this6.seatHandleEvt({ event: 5, seat: seat });
                _this6.runAfter(function () {
                    var ani_event = cc.instantiate(_this6.ani_event_prefab);
                    ani_event.parent = _this6.findNode(dir, "ani_event");
                    ani_event.getComponent("AniEvent").init(data.event, data.state);
                    _this6.runAfter(function () {
                        ani_event.parent = null;
                    }, 500);
                }, 300);
            }
        });
        cc.mj.evt.regEvt("KaiJin", function (data) {
            _this6.play_animation(data.seat, _this6.ani_kaijin_prefab, 800, function () {
                _this6.play_next();
            });

            var dir = Utils.dirFromSeat(cc.mj.mgr.self_seat);
            cc.mj.mgr.kaijin(data.type, data.value);
            _this6.refreshSelfCards();
            var cs = _this6.laizi_show.getComponent("OutCard");
            cs.init(dir, data.type, data.value);
            _this6.laizi_show.active = true;
        });

        cc.mj.evt.regEvt("Prepare", function (data) {
            if (!_this6.prepared) {
                for (var i = 0; i < data.roles.length; i++) {
                    var role = data.roles[i];
                    var dir = Utils.dirFromSeat(role.seat);
                    // let prepare_header = this.findNode(dir, 'prepare_header')
                    // prepare_header.parent = this.findNode(dir, 'game_header')
                    // prepare_header.active = true
                    // prepare_header.removeAllChildren()
                    if (role.uid) {
                        var header = cc.instantiate(_this6.header_prefab);
                        var cs = header.getComponent("Header");
                        cs.init(_this6, dir, role.uid, role.name, role.icon, role.money);
                        header.parent = _this6.findNode(dir, 'gaming_header');
                        // this.findNode(dir, "prepare").active = role.prepare
                    } else {
                        _this6.findNode(dir, "prepare").active = false;
                    }
                }
                _this6.prepared = true;
            }
            _this6.play_next();
        });

        cc.mj.evt.regEvt("HaiDiLaoYue", function (data) {
            _this6.findNode(_this6.dir, "event_handler").removeAllChildren();
            for (var i = 0; i < data.roles.length; i++) {
                var role = data.roles[i];
                var dir = Utils.dirFromSeat(role.role.seat);
                var card = role.card;
                var card_node = cc.instantiate(_this6.self_cur_card_prefab);
                card_node.getComponent("CurCard").init(_this6.dir, card.type, card.value, card.laizi, _this6);
                card_node.parent = _this6.findNode(dir, "ani_event");

                if (dir == _this6.dir) continue;

                _this6.findNode(dir, "cur.normal.old").removeAllChildren();
                for (var j = 0; j < role.cards.length; j++) {
                    var _card4 = role.cards[j];
                    var out_card = cc.instantiate(_this6.out_card_prefab_dict[dir]);
                    out_card.parent = _this6.findNode(dir, "cur.normal.old");
                    if (dir == 1 || dir == 3) {
                        _this6.findNode(dir, "cur.normal.old").getComponent(cc.Layout).spacingY = -15;
                    }
                    out_card.getComponent("OutCard").init(dir, _card4.type, _card4.value);
                }
            }
            _this6.runAfter(function () {
                _this6.play_next();
            }, 300);
        });
    },
    seatHandleEvt: function seatHandleEvt(data) {
        var dir = Utils.dirFromSeat(data.seat);
        for (var i = 1; i <= 4; i++) {
            if (i == dir) {
                continue;
            }
            this.findNode(i, "event_handler").removeAllChildren();
        }
        var event_node = this.findNode(dir, "event_handler");
        for (var _i14 = 0; _i14 < event_node._children.length; _i14++) {
            event_node._children[_i14].getComponent("HandlerReplay").handled(data.event);
        }
        this.runAfter(function () {
            event_node.removeAllChildren();
        }, 200);
    },
    otherEvent: function otherEvent(dir, from_dir, event, state) {
        // chi or peng
        if (event != 4) {
            var remove_num = 2;
            var cur_cards_node = this.findNode(dir, "cur.normal.old");
            while (remove_num) {
                cur_cards_node._children[0].parent = null;
                remove_num -= 1;
            }
        } else {

            var _remove_num = state == null ? 0 : 3;
            var _cur_cards_node = this.findNode(dir, "cur.normal.old");
            while (_remove_num) {
                _cur_cards_node._children[0].parent = null;
                _remove_num -= 1;
            }
            // 自己抓杠
            if (dir == from_dir) {
                this.findNode(dir, "cur.normal.new").removeAllChildren();
            }
        }
    },
    exit: function exit() {
        this.clearAllTask();
        cc.mjroom = null;
        cc.mj.mgr.replay = false;
    },
    onDestroy: function onDestroy() {},
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
        //# sourceMappingURL=Replay.js.map
        