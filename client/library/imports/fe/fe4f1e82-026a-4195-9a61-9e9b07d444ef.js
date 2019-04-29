"use strict";
cc._RF.push(module, 'fe4f16CAmpBlZphnpsH1ETv', 'UserInfoShow');
// Script/sss/components/UserInfoShow.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        _userinfo: null
    },

    // use this for initialization
    onLoad: function onLoad() {
        if (cc.vv == null) {
            return;
        }

        this._userinfo = cc.find("Canvas/userinfo");
        this._userinfo.active = false;
        this._money = cc.find("Canvas/userinfo/money");
        this._kickout = cc.find("Canvas/userinfo/kickout");
        this.moneyInfo = this._money.getComponent('cc.Label');
        cc.vv.utils.addClickEvent(this._userinfo, this.node, "UserInfoShow", "onClicked");

        cc.vv.userinfoShow = this;
        this._userId = null;
        // this.initView();
    },

    initView: function initView() {
        var self = this;
        var onGet = function onGet(ret) {
            cc.log(ret);
            if (ret.errcode !== 0) {
                console.log(ret.errmsg);
            } else {
                if (ret.gems != null) {
                    this.moneyInfo.string = ret.gems;
                }
            }
        };

        var data = {
            account: cc.vv.userMgr.account,
            sign: cc.vv.userMgr.sign
        };
        cc.sssHttp.sendRequest("/get_user_status", data, onGet.bind(this));
    },

    show: function show(name, userId, iconSprite, sex, ip) {
        if (userId != null && userId > 0) {
            if (userId != cc.sssNetMgr.seats[0].userid && cc.sssNetMgr.isOwner()) {
                this._kickout.active = true;
            } else {
                this._kickout.active = false;
            }
            // this._kickout.active=false;
            this._userinfo.active = true;
            this._userinfo.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = iconSprite.spriteFrame;

            this._userinfo.getChildByName("name").getComponent(cc.Label).string = name;
            this._userinfo.getChildByName("id").getComponent(cc.Label).string = "ID: " + userId;
            this._userId = userId;
        }
    },

    onClicked: function onClicked() {
        this._userinfo.active = false;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();