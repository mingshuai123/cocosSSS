var ScenePopWin = require('./lib/ScenePopWin')
cc.Class({
    extends: ScenePopWin,

    properties: {
        club_room_prefab: cc.Prefab,
        club_room_prefab2: cc.Prefab,
        btn_create_room: cc.Node,
        btn_mgr: cc.Node,
        one_club_prefab: cc.Prefab,
        label_title: cc.Label,
        label_join: cc.Label,
        room_layout: cc.Node,
        club_layout: cc.Node,
        btn_club_info: cc.Node,
        node_create_back: cc.Node,
        wanfa_layout: cc.Node,
        one_wanfa_prefab:cc.Prefab
    },
    _onLoad: function () {
        this.club_dict = {}
        let name = cc.club_type == "INTEGRAL_CLUB" ? "积分圈" : "朋友圈"
        this.label_title.string = name
        this.label_join.string = "加入更多" + name
        this.btn_join_club = this.club_layout._children[0]
        http.sendTick({ "method": "club.list", club_type: cc.club_type }, this.showClub.bind(this))
        this.room_dict = {}
        this.initEvt()
        this.node_create_back.getChildByName("create").active = !cc.mjroom
        this.node_create_back.getChildByName("back").active = cc.mjroom != null

        Task.onTask(1000, () => { cc.mjroom && this.mjroomStatus() })
        Task.onTask(2000, () => { this.onRefreshRoom() })
    },
    _onDisable: function () {
        cc.cur_club = null
        cc.cur_wanfa = null
    },
    initEvt: function () {
        cc.mj.evt.regTickEvt("RoomInvite", (data) => {
            cc.scene.showPrefab("牌局邀请", true, (node) => {
                node.getComponent("InviteMsg").init(data)
            })
        })
        cc.mj.evt.regTickEvt("JoinClub", (data) => {
            cc.scene.onShowTips("OK", data.content, () => {
                http.sendTick({ "method": "club.list", club_type: cc.club_type }, this.showClub.bind(this))
            })
        })

        cc.mj.evt.regTickEvt("ExitClub", (data) => {
            cc.scene.onShowTips("OK", data.content, () => {
                http.sendTick({ "method": "club.list", club_type: cc.club_type }, this.showClub.bind(this))
            })
        })
        http.startHallTick()
    },
    onClose: function () {
        cc.director.loadScene("hall")
        cc.cur_club = null
        cc.cur_wanfa = null
    },
    showCreateRoom: function () {
        if (!cc.mjroom) {
            cc.scene.showPrefab("创建房间")
        } else {
            http.sendGame({ method: "recover_game" }, (resp) => {
                if (!resp.errno) {
                    cc.mjroom = resp.detail
                    for (let i = 0; i < resp.msgs.length; i++) {
                        let msg = resp.msgs[i]
                        cc.mj.evt.newEvt(msg)
                    }
                    cc.mj.mgr.recover = true
                    cc.director.loadScene("mjgame");
                } else {
                    http.tryJoinRoom(cc.mjroom_id, (resp) => {
                        if (resp.errno) {
                            let content = resp.errno == 20002 ? "房间满员，无法加入房间" : "积分不足，无法加入积分圈房间"
                            cc.scene.onShowTips("OK", content)
                        } else {
                            cc.scene.gotoGame("正在进入牌局")
                        }
                    })
                }
            })
        }
    },
    mjroomStatus: function () {
        if (cc.mj.mgr.replay) return
        http.sendGame({ method: "mjroom_status" }, (resp) => {
            if (resp.status) {
                http.sendGame({ method: "recover_game" }, (resp) => {
                    if (!resp.errno) {
                        cc.mjroom = resp.detail
                        for (let i = 0; i < resp.msgs.length; i++) {
                            let msg = resp.msgs[i]
                            cc.mj.evt.newEvt(msg)
                        }
                        cc.mj.mgr.recover = true
                        cc.director.loadScene("mjgame");
                    }
                })
            }
        })
    },
    gainHongdian: function () {
        http.sendHall({ method: "unhandled.reqs" }, resp => {

            for (let k in this.club_dict) {
                this.club_dict[k].hongdian.active = false
            }
            for (let i = 0; i < resp.items.length; i++) {
                let item = resp.items[i]
                if (this.club_dict[item.club_id]) this.club_dict[item.club_id].hongdian.active = item.num > 0
            }
        })
    },
    showClub: function (resp) {
        this.club_layout.removeAllChildren()
        if (resp.clubs.length) {
            this.btn_create_room.active = true
            this.btn_club_info.active = true
            let club_id = ~~cc.sys.localStorage.getItem(cc.club_type + "_club_id")
            this.btn_join_club.parent = null

            let clubs = resp.clubs
            for (let i = 0; i < clubs.length; i++) {
                let node = cc.instantiate(this.one_club_prefab)
                let cs = node.getComponent("OneClub")
                cs.init(clubs[i], this.selectClub.bind(this))
                if (club_id == cs.club_id || (i == club_id) || club_id == 0) {
                    this.selectClub(cs)
                }
                node.parent = this.club_layout
                this.club_dict[cs.club_id] = cs
            }
        }
        this.btn_join_club.parent = this.club_layout
    },
    selectClub: function (club) {
        if (cc.cur_club) cc.cur_club.unSelected()
        cc.cur_club = club
        this.admin = cc.cur_club.admin
        this.btn_mgr.active = this.admin
        cc.cur_club.selected()
        // for (let k in this.room_dict) {
        //     this.room_dict[k].parent = null
        // }
        // this.room_dict = {}
        cc.sys.localStorage.setItem(cc.club_type + "_club_id", cc.cur_club.club_id)
        http.sendHall({ "method": "sss.room.get.setting", club_id: cc.cur_club.club_id }, this.showWanfa.bind(this))
    },
    showWanfa:function (res) {
        this.wanfa_layout.removeAllChildren()
        if (res.setting_list){
            let wanfa_type = ~~cc.sys.localStorage.getItem("wanfa")
            let item = res.setting_list
            let mj_wanfa = { type: 0, uid: 0, clubId: cc.cur_club.club_id}
            item.push(mj_wanfa);
            for (let i = 0; i < item.length; i++) {
                let node = cc.instantiate(this.one_wanfa_prefab)
                let cs = node.getComponent("ClubWanfa")
                cs.init(item[i], this.selectWanfa.bind(this))
                if (wanfa_type == cs.type) {
                    this.selectWanfa(cs)
                }
                node.parent = this.wanfa_layout
            }
        }
    },
    selectWanfa:function(wanfa){
        cc.log(wanfa)
        if (cc.cur_wanfa) cc.cur_wanfa.unSelected()
        cc.cur_wanfa = wanfa
        cc.cur_wanfa.selected()
        for (let k in this.room_dict) {
            this.room_dict[k].parent = null
        }
        this.room_dict = {}

        this.onRefreshRoom()
        cc.sys.localStorage.setItem("wanfa", cc.cur_wanfa.type)
    },
    onShowJoinClub: function () {
        cc.scene.showPrefab("加入俱乐部")
    },
    onRefreshRoom: function () {
        if (!cc.cur_club) return
        if (cc.cur_wanfa.type>0){
            http.sendTick({ "method": "club.room", club_id: cc.cur_club.club_id,game:"sss",type:cc.cur_wanfa.type,uid:cc.cur_wanfa.uid }, this.refreshRoom.bind(this))
        }else{
            http.sendTick({ "method": "club.room", club_id: cc.cur_club.club_id }, this.refreshRoom.bind(this))
        }
        this.gainHongdian()
    },
    onShowClubInfo: function () {
        if (!cc.cur_club) return
        http.sendHall({ "method": "club_info", club_id: cc.cur_club.club_id }, (resp) => {
            cc.scene.showPrefab("俱乐部详情", false, (node) => {
                node.getComponent("ClubInfo").init(resp)
            })
        })
    },
    onShowMgr: function () {
        cc.scene.showPrefab("俱乐部管理")
    },
    refreshRoom: function (resp) {
        let create_room = this.room_layout._children[0]
        this.room_layout.removeAllChildren()
        create_room.parent = this.room_layout
        if (!resp.rooms) {
            for (let k in this.room_dict) {
                this.room_dict[k].parent = null
            }
            this.room_dict = {}
            return
        }
        for (let i = 0; i < resp.rooms.length; i++) {
            let room = resp.rooms[i]
            if (cc.cur_wanfa.type>0){
                if (room.roles.length < room.option.siteNum) {
                    room.status = "WAITING"
                    room.index = 1
                } else {
                    room.status = "PLAYING"
                    room.index = 0
                }
            }else{
                if (room.roles.length < room.max_role) {
                    room.status = "WAITING"
                    room.index = 1
                } else {
                    room.status = "PLAYING"
                    room.index = 0
                }
            }
           
        }
        resp.rooms.sort((r1, r2) => { return r1.index < r2.index ? 1 : -1 })
        for (let i = 0; i < resp.rooms.length; i++) {
            resp.rooms[i].index = i
        }
        let room_id_list = []
        for (let i = 0; i < resp.rooms.length; i++) {
            let room = resp.rooms[i]
            if (!room.roles) continue
            let member = null
            let wanfa_type = cc.cur_wanfa.type
            room_id_list.push(room.room_id)
            if (this.room_dict[room.room_id]) {
                member = this.room_dict[room.room_id]
                member.parent = this.room_layout

                let btn_mgr = member.getChildByName("btn_dismiss")
                this.admin && btn_mgr.on(cc.Node.EventType.TOUCH_START, this.forceDismiss.bind(this, room))
                btn_mgr.active = this.admin && (!cc.mjroom || ~~cc.mjroom.id != ~~room.room_id)
                let btn_join = member.getChildByName("btn_join")
                btn_join.on(cc.Node.EventType.TOUCH_START, this.joinClubRoom.bind(this, room))
            } else {
                // 单个房间prefab
                if (wanfa_type > 0){
                    member = cc.instantiate(this.club_room_prefab)
                }else{
                    member = cc.instantiate(this.club_room_prefab2)
                }
                member.parent = this.room_layout
                this.room_dict[room.room_id] = member
                let btn_mgr = member.getChildByName("btn_dismiss")
                this.admin && btn_mgr.on(cc.Node.EventType.TOUCH_START, this.forceDismiss.bind(this, room))
                btn_mgr.active = this.admin && (!cc.mjroom || ~~cc.mjroom.id != ~~room.room_id)
                let btn_join = member.getChildByName("btn_join")
                btn_join.on(cc.Node.EventType.TOUCH_START, this.joinClubRoom.bind(this, room))
            }
            member.zIndex = room.index
            if(wanfa_type>0){
                member.getChildByName("mode").getComponent(cc.Label).string = room.option.siteNum.toString() + "人" +  "十三水"
                member.getChildByName("option_text").getComponent(cc.Label).string = this.option_text(wanfa_type, room.option)
            }else{
                member.getChildByName("mode").getComponent(cc.Label).string = room.max_role.toString() + "人" + (wanfa_type > 0 ? "十三水" : (room.option.mj == "ndmj" ? "宁德" : "福州"))
                member.getChildByName("option_text").getComponent(cc.Label).string = this.option_text(wanfa_type, room.option)
            }
            if (room.status == "WAITING") {
                member.getChildByName("btn_join").active = cc.mjroom == null
            } else {
                member.getChildByName("btn_join").active = false
                !this.admin && (member.getChildByName("PLAYING").active = true)
            }
            let u_icon = member.getChildByName("_icon")
            let forlength = wanfa_type > 0 ? room.option.seatNum:room.roles.length
            cc.log(forlength)
            for (let j = 0; j < room.roles.length; j++) {
                Utils.UrlImage(room.roles[j].icon, (err, sprite) => {
                    !err && (u_icon._children[j].getChildByName("icon").getComponent(cc.Sprite).spriteFrame = sprite)
                    u_icon._children[j].active = true
                })
            }
            for (let i = room.roles.length; i < u_icon._children.length; i++) {
                u_icon._children[i].active = false
            }
        }
        for (let k in this.room_dict) {
            var x=Number(k);
            if (room_id_list.indexOf(x) < 0) {
                this.room_dict[k].parent = null
                delete this.room_dict[k]
            }
        }
    },
    joinClubRoom: function (room) {
        http.tryJoinRoom(room.room_id, (resp) => {
            if (resp.errno) {
                let content = resp.errno == 20002 ? "房间满员，无法加入房间" : "积分不足，无法加入积分圈房间"
                cc.scene.onShowTips("OK", content)
            } else {
                cc.director.loadScene("mjgame")
            }
        })
    },
    forceDismiss: function (room) {
        let content = "确认解散该房间【" + room.room_id + "】"
        cc.scene.onShowTips("OK_CANCEL", content, () => {
            http.sendHall({ method: "admin_dismiss", room_id: room.room_id }, () => { })
        })
    },
    option_text: function (type,option) {
        let text = []
        if(type>0){
            text.push(option.maxGames + "局")
            text.push(option.type == 1 ? "经典场" : (option.type == 2 ? "循环场" : (option.type == 3 ? "全一色" : "王牌场")))
            text.push("俱乐部支付")
        }else{
            text.push(option.round + "局")
            text.push(option.mode == 2 ? "放胡全赔" : (option.mode == 3 ? "放胡双倍单赔" : "放胡单赔"))
            text.push("俱乐部支付")
        }
        
        return text.join(" ")
    },
});
