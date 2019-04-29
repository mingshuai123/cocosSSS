cc.Class({
    extends: cc.Component,

    properties: {
        node_input: cc.Node,
    },
    onLoad: function () {
        this.input = []
        this.input_num = 0
        for (let i = 0; i < 6; i++) {
            this.input_node = [this.input1, this.input2, this.input3, this.input4, this.input5, this.input6]

        }
    },
    onClickClear: function () {
        this.clear()
    },
    onClickNum: function (e, num) {
        if (this.input.length == 6) {
            return
        }
        this.input.push(num)
        this.node_input._children[this.input.length - 1].getChildByName("value").getComponent(cc.Label).string = num
        if (this.input.length == 6) {
            let room_id = this.input.join("")
            if (this.input[0]== 2 ) {
                this.onJoinSSSRoom(room_id)
            } else {
                http.tryJoinRoom(room_id, (resp) => {
                    if (!resp.errno) {
                        cc.director.loadScene("mjgame");
                    } else {
                        let content = resp.errno == 10080 ? "房卡余额不足, 加入房间失败" : resp.errno == 10088 ? "加入该俱乐部后才能加入该俱乐部房间，" : resp.errno == 10081 ? "积分不足，无法加入积分圈房间" : ("您输入的房间号" + room_id + "不存在, 请重新输入")

                        cc.scene.onShowTips("OK", content)
                        this.clear()
                    }
                })
            }
        }
    },
    onJoinSSSRoom: function (roomId) {
        var self = this;
        var serverType = 'SSS_SERVER_TYPE'
        var onEnter = function (ret) {
            if (ret.errcode !== 0) {
                if(ret.errcode==4){
                    cc.scene.onShowTips("OK", '房间人数已满')
                }
                cc.log(ret)
            }
            else {
                cc.sssNetMgr.connectGameServer(ret);
            }
        };
        var data = {
            uid: cc.mj.user.uid,
            serverType: serverType,
            roomid: roomId,
        };
        cc.sssHttp.sendRequest("/enter_private_room", data, onEnter);
    },
    onClickClose: function () {
        this.father.parent = null
    },
    onClickDel: function () {
        if (this.input.length == 0) {
            return
        }
        this.node_input._children[this.input.length - 1].getChildByName("value").getComponent(cc.Label).string = ''
        this.input.splice(this.input.length - 1, 1)
    },
    clear: function () {
        this.input = []
        for (let i = 0; i < 6; i++) {
            this.node_input._children[i].getChildByName("value").getComponent(cc.Label).string = ''
        }
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
