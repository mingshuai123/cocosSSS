"use strict";
cc._RF.push(module, 'b64a2Ux11BKhYmllzc/ilR0', 'RoomOption');
// Script/RoomOption.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html


cc.Class({
    extends: cc.Component,

    properties: {
        option_round: {
            default: null,
            type: cc.Node
        },
        option_pay: {
            default: null,
            type: cc.Node
        },
        option_max_role: {
            default: null,
            type: cc.Node
        },
        option_mode: {
            default: null,
            type: cc.Node
        },
        option_forcibly_time: {
            default: null,
            type: cc.Node
        },
        option_ext: {
            default: null,
            type: cc.Node
        },
        option_suit: {
            default: null,
            type: cc.Node
        },
        option_multiples: {
            default: null,
            type: cc.Node
        },
        toggle_prefab: {
            default: null,
            type: cc.Prefab
        },
        unique_bg_sprite: {
            default: null,
            type: cc.SpriteFrame
        },
        unique_checkmark_sprite: {
            default: null,
            type: cc.SpriteFrame
        },
        multi_bg_sprite: {
            default: null,
            type: cc.SpriteFrame
        },
        multi_checkmark_sprite: {
            default: null,
            type: cc.SpriteFrame
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
        } },
    init: function init(type, mode, refresh_fangka_cb) {
        this.refresh_fangka_cb = refresh_fangka_cb;
        this.type = type;
        this.mode = mode;
        this.key = type + ":" + mode;
        this.option_dict = this.default_option(type, mode);
        this.refresh();
    },
    refresh: function refresh() {
        this.option = this.option_conf(this.type, this.mode);
        for (var k in this.option) {
            var toggle_container = this.option[k];
            toggle_container.layout.removeAllChildren();
            toggle_container.node = [];
            var type = toggle_container.type;
            this.node.getChildByName("option_" + k).active = false;
            if (toggle_container.options.length) {
                this.node.getChildByName("option_" + k).active = true;
                var option_num = toggle_container.options.length;
                var ischose = false;
                for (var i = 0; i < option_num; i++) {
                    var toggle = cc.instantiate(this.toggle_prefab);
                    var bg_sprite = type == "unique" ? this.unique_bg_sprite : this.multi_bg_sprite;
                    var checkmark_sprite = type == "unique" ? this.unique_checkmark_sprite : this.multi_checkmark_sprite;
                    var click_cb = type == "unique" ? this.unique_toggle_click : this.multi_toggle_click;
                    toggle.getComponent("Toggle").init(bg_sprite, checkmark_sprite, toggle_container.options[i], click_cb.bind(this, toggle_container));
                    toggle.parent = toggle_container.layout;
                    toggle_container.node.push(toggle);

                    if (type == "unique" && option_num > 1) {
                        if (toggle_container.options[i].value == this.option_dict[k]) {
                            ischose = true;
                            toggle.getComponent("Toggle").checked();
                        }
                    } else if (type == "multi") {
                        this.option_dict[k].indexOf(toggle_container.options[i].value) >= 0 && toggle.getComponent("Toggle").checked();
                    }
                }
                if (type == "unique" && option_num == 1 || type == "unique" && !ischose) toggle_container.node[0].getComponent("Toggle").checked();
            } else {
                this.node.getChildByName("option_" + k).active = false;
            }
        }

        this.refresh_fangka_cb(this.get_fangka_pay_num());
    },
    get_fangka_pay_num: function get_fangka_pay_num() {
        if (this.mode == "sss") {
            if (this.option_dict.pay == 4) return 0;else if (this.option_dict.pay == 1 || this.option_dict.pay == 3) {
                var num = this.option_dict.round == 3 ? 1 : this.option_dict.round == 10 ? this.option_dict.max_role * 2 : this.option_dict.round == 20 ? this.option_dict.max_role * 3 : this.option_dict.max_role * 4;
                return num;
            } else if (this.option_dict.pay == 2) {
                return this.option_dict.round == 3 ? 1 : this.option_dict.round == 10 ? 2 : this.option_dict.round == 20 ? 3 : 4;
            }
        } else {
            if (this.option_dict.pay == 1) return 0;else if (this.option_dict.pay == 2) {
                return this.option_dict.round == 8 ? 4 : 8;
            } else {
                if (this.option_dict.max_role == 4) {
                    return this.option_dict.round == 8 ? 1 : 2;
                } else if (this.option_dict.max_role == 3) {
                    return this.option_dict.round == 8 ? 2 : 4;
                } else {
                    return this.option_dict.round == 8 ? 2 : 4;
                }
            }
        }
    },
    unique_toggle_click: function unique_toggle_click(container, event_node) {
        for (var i = 0; i < container.node.length; i++) {
            if (container.node[i] == event_node.node) {
                event_node.getComponent("Toggle").checked();
                continue;
            }
            container.node[i].getComponent("Toggle").uncheck();
        }
        this.getOptions();
        this.refresh();
    },
    multi_toggle_click: function multi_toggle_click(container, event_node) {
        var cs = event_node.getComponent("Toggle");
        if (this.option_dict.mj == "sss" && this.option_dict.mode == 1 && this.option_dict.max_role == 6 && container.layout._name == "suit" && !cs.isChecked()) {
            var num = 0;
            var nodes = container.node;
            for (var x = 0; x < nodes.length; x++) {
                nodes[x].getComponent("Toggle").isChecked() && num++;
            }
            if (num >= 2) {
                cc.scene.onShowTips("OK", "经典场六人局花色最多选两项");
            } else {
                cs.checked();
                this.getOptions();
                this.refresh();
            }
        } else {
            cs.isChecked() ? cs.uncheck() : cs.checked();
            this.getOptions();
            this.refresh();
        }
    },

    getOptions: function getOptions() {
        this.option_dict = { mj: this.mode, type: this.type };
        for (var k in this.option) {
            var toggle_container = this.option[k];
            this.option_dict[k] = toggle_container.type == 'multi' ? [] : null;
            // if (this.option_dict.mj == "sss" && this.option_dict.mode == 1 && this.option_dict.max_role == 6 && k == "suit" && toggle_container.type == 'multi'){
            //     for (let i = 0; i < toggle_container.node.length; i++) {
            //         if (toggle_container.node[i].getComponent("Toggle").isChecked()) {
            //             if (this.option_dict[k].length >= 2){
            //                 cc.scene.onShowTips("OK", "六人局花色选两项");
            //                 // toggle_container.node[i].getComponent("Toggle").uncheck();
            //                 // cc.log(this.option_dict[k][0])
            //                 // if (this.option_dict[k][0]>2){
            //                 //     this.option_dict[k].pop()
            //                 // }else{
            //                 //     this.option_dict[k].shift()
            //                 // }
            //                 // this.option_dict[k].push(toggle_container.options[i].value)

            //                 cc.log(this.option_dict[k]);
            //             }else{
            //                 this.option_dict[k].push(toggle_container.options[i].value)
            //             }
            //         }
            //     }
            // }else{
            for (var i = 0; i < toggle_container.node.length; i++) {
                if (toggle_container.node[i].getComponent("Toggle").isChecked()) {
                    if (toggle_container.type == 'multi') {
                        this.option_dict[k].push(toggle_container.options[i].value);
                    } else {
                        this.option_dict[k] = toggle_container.options[i].value;
                        break;
                    }
                }
            }
        }
        // }
        cc.sys.localStorage.setItem(this.key, JSON.stringify(this.option_dict));
        // cc.log(this.option_dict)
        return this.option_dict;
    },
    default_option: function default_option(type, mode) {
        this.key = type + ":" + mode;
        var option_dict = cc.sys.localStorage.getItem(this.key);
        if (!option_dict) {
            if (mode == "ndmj") {
                option_dict = {
                    round: 8,
                    pay: 2,
                    max_role: 2,
                    mode: 2,
                    ext: []
                };
            } else if (mode == "fzmj") {
                option_dict = {
                    round: 8,
                    pay: 2,
                    max_role: 2,
                    mode: 1,
                    ext: []
                };
            } else if (mode == "sss") option_dict = {
                round: 10,
                pay: 1,
                max_role: 4,
                mode: 1,
                forcibly_time: 80,
                ext: [],
                suit: [],
                multiples: 2
            };
        } else {
            option_dict = JSON.parse(option_dict);
        }
        return option_dict;
    },
    option_conf: function option_conf(type, mode) {
        var OPTION = {
            fzmj: {
                INTEGRAL_CLUB: {
                    round: { type: "unique", layout: this.option_round, node: [], options: [{ value: 8, content: "8局" }, { value: 16, content: "16局" }] },
                    pay: { type: "unique", layout: this.option_pay, node: [], options: [{ value: 1, content: "俱乐部支付" }] },
                    max_role: { type: "unique", layout: this.option_max_role, node: [], options: [{ value: 4, content: "4人" }, { value: 3, content: "3人" }, { value: 2, content: "2人" }] },
                    mode: { type: "unique", layout: this.option_mode, node: [], options: [{ value: 1, content: "放胡单赔" }, { value: 3, content: "放胡双倍单赔" }] },
                    ext: { type: "multi", layout: this.option_ext, node: [], options: [{ value: 1, content: "带花牌" }, { value: 2, content: "金龙" }, { value: 3, content: "清混一色" }] },
                    forcibly_time: { type: "unique", layout: this.option_forcibly_time, node: [], options: [] },
                    multiples: { type: "unique", layout: this.option_multiples, node: [], options: [] },
                    suit: { type: "multi", layout: this.option_suit, node: [], options: [] }
                },
                NORMAL_CLUB: {
                    round: { type: "unique", layout: this.option_round, node: [], options: [{ value: 8, content: "8局" }, { value: 16, content: "16局" }] },
                    pay: { type: "unique", layout: this.option_pay, node: [], options: [{ value: 1, content: "俱乐部支付" }] },
                    max_role: { type: "unique", layout: this.option_max_role, node: [], options: [{ value: 4, content: "4人" }, { value: 3, content: "3人" }, { value: 2, content: "2人" }] },
                    mode: { type: "unique", layout: this.option_mode, node: [], options: [{ value: 1, content: "放胡单赔" }, { value: 3, content: "放胡双倍单赔" }] },
                    ext: { type: "multi", layout: this.option_ext, node: [], options: [{ value: 1, content: "带花牌" }, { value: 2, content: "金龙" }, { value: 3, content: "清混一色" }] },
                    forcibly_time: { type: "unique", layout: this.option_forcibly_time, node: [], options: [] },
                    multiples: { type: "unique", layout: this.option_multiples, node: [], options: [] },
                    suit: { type: "multi", layout: this.option_suit, node: [], options: [] }
                },
                PERSONAL: {
                    round: { type: "unique", layout: this.option_round, node: [], options: [{ value: 8, content: "8局" }, { value: 16, content: "16局" }] },
                    pay: { type: "unique", layout: this.option_pay, node: [], options: [{ value: 2, content: "房主支付" }, { value: 3, content: "AA支付" }] },
                    max_role: { type: "unique", layout: this.option_max_role, node: [], options: [{ value: 4, content: "4人" }, { value: 3, content: "3人" }, { value: 2, content: "2人" }] },
                    mode: { type: "unique", layout: this.option_mode, node: [], options: [{ value: 1, content: "放胡单赔" }, { value: 3, content: "放胡双倍单赔" }] },
                    ext: { type: "multi", layout: this.option_ext, node: [], options: [{ value: 1, content: "带花牌" }, { value: 2, content: "金龙" }, { value: 3, content: "清混一色" }] },
                    forcibly_time: { type: "unique", layout: this.option_forcibly_time, node: [], options: [] },
                    multiples: { type: "unique", layout: this.option_multiples, node: [], options: [] },
                    suit: { type: "multi", layout: this.option_suit, node: [], options: [] }
                }
            },
            ndmj: {
                INTEGRAL_CLUB: {
                    round: { type: "unique", layout: this.option_round, node: [], options: [{ value: 8, content: "8局" }, { value: 16, content: "16局" }] },
                    pay: { type: "unique", layout: this.option_pay, node: [], options: [{ value: 1, content: "俱乐部支付" }] },
                    max_role: { type: "unique", layout: this.option_max_role, node: [], options: [{ value: 4, content: "4人" }, { value: 3, content: "3人" }, { value: 2, content: "2人" }] },
                    mode: { type: "unique", layout: this.option_mode, node: [], options: [{ value: 1, content: "放胡单赔" }, { value: 2, content: "放胡全赔" }] },
                    ext: { type: "multi", layout: this.option_ext, node: [], options: [] },
                    forcibly_time: { type: "unique", layout: this.option_forcibly_time, node: [], options: [] },
                    multiples: { type: "unique", layout: this.option_multiples, node: [], options: [] },
                    suit: { type: "multi", layout: this.option_suit, node: [], options: [] }
                },
                NORMAL_CLUB: {
                    round: { type: "unique", layout: this.option_round, node: [], options: [{ value: 8, content: "8局" }, { value: 16, content: "16局" }] },
                    pay: { type: "unique", layout: this.option_pay, node: [], options: [{ value: 1, content: "俱乐部支付" }] },
                    max_role: { type: "unique", layout: this.option_max_role, node: [], options: [{ value: 4, content: "4人" }, { value: 3, content: "3人" }, { value: 2, content: "2人" }] },
                    mode: { type: "unique", layout: this.option_mode, node: [], options: [{ value: 1, content: "放胡单赔" }, { value: 2, content: "放胡全赔" }] },
                    ext: { type: "multi", layout: this.option_ext, node: [], options: [] },
                    forcibly_time: { type: "unique", layout: this.option_forcibly_time, node: [], options: [] },
                    multiples: { type: "unique", layout: this.option_multiples, node: [], options: [] },
                    suit: { type: "multi", layout: this.option_suit, node: [], options: [] }
                },
                PERSONAL: {
                    round: { type: "unique", layout: this.option_round, node: [], options: [{ value: 8, content: "8局" }, { value: 16, content: "16局" }] },
                    pay: { type: "unique", layout: this.option_pay, node: [], options: [{ value: 2, content: "房主支付" }, { value: 3, content: "AA支付" }] },
                    max_role: { type: "unique", layout: this.option_max_role, node: [], options: [{ value: 4, content: "4人" }, { value: 3, content: "3人" }, { value: 2, content: "2人" }] },
                    mode: { type: "unique", layout: this.option_mode, node: [], options: [{ value: 2, content: "放胡全赔" }] },
                    ext: { type: "multi", layout: this.option_ext, node: [], options: [] },
                    forcibly_time: { type: "unique", layout: this.option_forcibly_time, node: [], options: [] },
                    multiples: { type: "unique", layout: this.option_multiples, node: [], options: [] },
                    suit: { type: "multi", layout: this.option_suit, node: [], options: [] }
                }
            },
            sss: {
                INTEGRAL_CLUB: {
                    round: { type: "unique", layout: this.option_round, node: [], options: [{ value: 10, content: "10局" }, { value: 20, content: "20局" }, { value: 30, content: "30局" }, { value: 3, content: "3局" }] },
                    pay: { type: "unique", layout: this.option_pay, node: [], options: [{ value: 1, content: "俱乐部支付" }] },
                    max_role: { type: "unique", layout: this.option_max_role, node: [], options: [{ value: 4, content: "4人" }, { value: 6, content: "6人" }, { value: 8, content: "8人" }] },
                    mode: { type: "unique", layout: this.option_mode, node: [], options: [{ value: 1, content: "经典场" }, { value: 2, content: "循环场" }, { value: 3, content: "全一色" }] },
                    forcibly_time: { type: "unique", layout: this.option_forcibly_time, node: [], options: [{ value: 80, content: "80秒" }, { value: 120, content: "120秒" }, { value: 160, content: "160秒" }] },
                    ext: { type: "multi", layout: this.option_ext, node: [], options: [{ value: 4, content: "马牌" }] },
                    multiples: { type: "unique", layout: this.option_ext, node: [], options: [{ value: 2, content: "2倍" }, { value: 3, content: "3倍" }, { value: 4, content: "4倍" }, { value: 5, content: "5倍" }] },
                    suit: { type: "multi", layout: this.option_ext, node: [], options: [{ value: 0, content: "黑桃" }, { value: 1, content: "红桃" }, { value: 2, content: "梅花" }, { value: 3, content: "方块" }] }
                },
                NORMAL_CLUB: {
                    round: { type: "unique", layout: this.option_round, node: [], options: [{ value: 10, content: "10局" }, { value: 20, content: "20局" }, { value: 30, content: "30局" }, { value: 3, content: "3局" }] },
                    pay: { type: "unique", layout: this.option_pay, node: [], options: [{ value: 1, content: "俱乐部支付" }] },
                    max_role: { type: "unique", layout: this.option_max_role, node: [], options: [{ value: 4, content: "4人" }, { value: 6, content: "6人" }, { value: 8, content: "8人" }] },
                    mode: { type: "unique", layout: this.option_mode, node: [], options: [{ value: 1, content: "经典场" }, { value: 2, content: "循环场" }, { value: 3, content: "全一色" }] },
                    forcibly_time: { type: "unique", layout: this.option_forcibly_time, node: [], options: [{ value: 80, content: "80秒" }, { value: 120, content: "120秒" }, { value: 160, content: "160秒" }] },
                    ext: { type: "multi", layout: this.option_ext, node: [], options: [{ value: 4, content: "马牌" }] },
                    multiples: { type: "unique", layout: this.option_multiples, node: [], options: [{ value: 2, content: "2倍" }, { value: 3, content: "3倍" }, { value: 4, content: "4倍" }, { value: 5, content: "5倍" }] },
                    suit: { type: "multi", layout: this.option_suit, node: [], options: [{ value: 0, content: "黑桃" }, { value: 1, content: "红桃" }, { value: 2, content: "梅花" }, { value: 3, content: "方块" }] }
                },
                PERSONAL: {
                    round: { type: "unique", layout: this.option_round, node: [], options: [{ value: 10, content: "10局" }, { value: 20, content: "20局" }, { value: 30, content: "30局" }, { value: 3, content: "3局" }] },
                    pay: { type: "unique", layout: this.option_pay, node: [], options: [{ value: 1, content: "房主支付" }, { value: 2, content: "AA支付" }, { value: 3, content: "赢家支付" }] },
                    max_role: { type: "unique", layout: this.option_max_role, node: [], options: [{ value: 4, content: "4人" }, { value: 6, content: "6人" }, { value: 8, content: "8人" }] },
                    mode: { type: "unique", layout: this.option_mode, node: [], options: [{ value: 1, content: "经典场" }, { value: 2, content: "循环场" }, { value: 3, content: "全一色" }] },
                    ext: { type: "multi", layout: this.option_ext, node: [], options: [{ value: 4, content: "马牌" }] },
                    forcibly_time: { type: "unique", layout: this.option_forcibly_time, node: [], options: [{ value: 80, content: "80秒" }, { value: 120, content: "120秒" }, { value: 160, content: "160秒" }] },
                    multiples: { type: "unique", layout: this.option_multiples, node: [], options: [{ value: 2, content: "2倍" }, { value: 3, content: "3倍" }, { value: 4, content: "4倍" }, { value: 5, content: "5倍" }] },
                    suit: { type: "multi", layout: this.option_suit, node: [], options: [{ value: 0, content: "黑桃" }, { value: 1, content: "红桃" }, { value: 2, content: "梅花" }, { value: 3, content: "方块" }] }
                }
            }
        };
        var option = OPTION[mode][type];
        if (mode == "ndmj") {
            if (this.option_dict.max_role > 2 && option.mode.options.length == 1) {
                option.mode.options.push({ value: 1, content: "放胡单赔" });
            } else if (this.option_dict.max_role == 2 && option.mode.options.length == 2) {
                option.mode.options.splice(0, 1);
            }
        } else if (mode == "fzmj") {
            if (this.option_dict.max_role > 2 && option.mode.options.length == 2) {
                option.mode.options.splice(1, 0, { value: 2, content: "放胡全赔" });
            } else if (this.option_dict.max_role == 2) {
                this.option_dict.mode == 2 && (this.option_dict.mode = 1);
            }
        } else if (mode == "sss") {
            if (this.option_dict.mode == 1) {
                if (this.option_dict.max_role > 4) {
                    option.suit.options = [{ value: 0, content: "黑桃" }, { value: 1, content: "红桃" }, { value: 2, content: "梅花" }, { value: 3, content: "方块" }];
                } else {
                    option.suit.options = [];
                }
            } else if (this.option_dict.mode == 2) {
                option.suit.options = [];
                option.multiples.options = [];
            } else {
                option.suit.options = [];
                option.ext.options = [];
            }
        }
        return option;
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();