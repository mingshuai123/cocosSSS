// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var CREATE_ERROR = {
    10079: "已达每日限额，创建房间失败",
    10077: "积分不足， 创建房间失败",
    10080: "您的房卡余额不足，请联系官方客服或代理充值购买，谢谢！",
    10078: "俱乐部房卡余额不足，请联系俱乐部管理",
    10081: "积分余额不足，创建房间失败，请联系俱乐部管理",
}
cc.Class({
    extends: cc.Component,

    properties: {
        option_prefab: {
            default: null,
            type: cc.Prefab
        },
        room_option: {
            default: null,
            type: cc.Node
        },
        btn_fzmj: {
            default: null,
            type: cc.Node
        },
        btn_ndmj: {
            default: null,
            type: cc.Node
        },
        btn_sss: {
            default: null,
            type: cc.Node
        },
        tips_prefab: {
            default: null,
            type: cc.Prefab
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

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.mode = this.defauleMode()
        this.room_option.getComponent("RoomOption").init(this.room_type(), this.mode, this.refresh_fangka.bind(this))
        let toggle = this.mode == "fzmj" ? this.btn_fzmj : this.mode == "ndmj" ? this.btn_ndmj:this.btn_sss
        toggle.getComponent(cc.Toggle).check()  
    },
    onToggle: function (e, mode) {
        this.mode = mode
        this.room_option.getComponent("RoomOption").init(this.room_type(), mode, this.refresh_fangka.bind(this))
        cc.sys.localStorage.setItem("default_mj", this.mode)
    },
    refresh_fangka: function (fangka) {
        this.node.getChildByName("fangka").getComponent(cc.Label).string = fangka
    },
    onCreateRoom: function () {
        let option = this.room_option.getComponent("RoomOption").getOptions()
        cc.log(option);
        // cc.log(this.room_option.getComponent("RoomOption"))
        if (option.mj=="sss"){
            let conf = {}
            if(option.suit.length>0){
                var  color=option.suit.join(",");
            }
            var data = {
                uid: cc.mj.user.uid,
                club_id: cc.cur_club ? cc.cur_club.club_id : 0,
                site_num: option.max_role,
                round_num: option.round,
                koufeixuanze:option.pay,
                wait_sec: option.forcibly_time,
                shoot_multi: option.multiples ? option.multiples:1,
                color: color?color:'',
                wanfa: option.ext.lengthx>0?1:0,
                type: option.mode
            };
            // console.log(data);
            cc.sssHttp.sendRequest("/create_private_room", data, (ret)=>{
                console.log(ret)
                if (ret.errcode !== 0) {
                    if (ret.errcode == 2222) {
                        cc.scene.onShowTips("OK", "钻石不足，创建房间失败!");
                    } 
                    else if (ret.errcode==4){
                        cc.scene.onShowTips("OK", "房卡不足，创建房间失败!");
                    }
                    else {
                        cc.scene.onShowTips("OK", "创建房间失败,错误码:" + ret.errcode);
                    }
                }
                else {
                    cc.sssNetMgr.connectGameServer(ret);
                }
            });
        }else{
            http.sendHall({ method: "create_room", club_id: cc.cur_club ? cc.cur_club.club_id : 0, num: option.max_role, mode: this.mode, option: JSON.stringify(option) }, (resp) => {
                if (!resp.errno) {
                    cc.mj.mgr.self_seat = resp.seat
                    cc.mjroom = resp.detail.detail
                    http.game_url = resp.host
                    http.game_token = resp.token

                    cc.scene.gotoGame("正在进入牌局")
                } else {
                    let content = CREATE_ERROR[resp.errno]
                    if (!content) {
                        content = "发生错误啦，请联系官方客服(错误ID:" + resp.errno + ")"
                    }
                    cc.scene.onShowTips("OK", content)
                }
            })
        }
        
    },
    room_type: function () {
        return cc.cur_club ? cc.cur_club.club_type : "PERSONAL"
    },
    defauleMode: function () {
        let mode = cc.sys.localStorage.getItem("default_mj")
        return mode ? mode : "fzmj"
    },
    start() {

    },

    // update (dt) {},
});
