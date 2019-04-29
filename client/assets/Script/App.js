function initMgr() {
    cc.vv = {};
    var UserMgr = require("UserMgr");
    cc.vv.userMgr = new UserMgr();
    cc.vv.userMgr.gameType="SSS_SERVER_TYPE";

    var ReplayMgr = require("ReplayMgr");
    cc.vv.replayMgr = new ReplayMgr();

    var AnysdkMgr = require("./AnysdkMgr");
    cc.vv.anysdkMgr = new AnysdkMgr();
    cc.vv.anysdkMgr.init();

    var VoiceMgr = require("VoiceMgr");
    cc.vv.voiceMgr = new VoiceMgr();
    cc.vv.voiceMgr.init();

    // var AudioMgr = require("AudioMgr");
    // cc.vv.audioMgr = new AudioMgr();
    // cc.vv.audioMgr.init();

    // var Utils = require("./sssUtils");
    // cc.vv.utils = new Utils();
    // cc.vv.global = require("Global");
}
var Global = cc.Class({
    extends: cc.Component,
    onLoad: function () {
        console.log("app start")
        if (!cc.sys.isNative && cc.sys.isMobile) {
            var cvs = this.node.getComponent(cc.Canvas);
            cvs.fitHeight = true;
            cvs.fitWidth = true;
        }
        // initMgr();
        // 十三水 vv
        cc.vv = {};
        var UserMgr = require("sssUserMgr");
        cc.vv.userMgr = new UserMgr();
        cc.vv.userMgr.gameType="SSS_SERVER_TYPE"

        var AnysdkMgr = require("./AnysdkMgr");
        cc.vv.anysdkMgr = new AnysdkMgr();
        cc.vv.anysdkMgr.init();

        var Utils = require("sssUtils");
        cc.vv.utils = new Utils();

        var ReplayMgr = require("ReplayMgr");
        cc.vv.replayMgr = new ReplayMgr();
    
        var VoiceMgr = require("VoiceMgr");
        cc.vv.voiceMgr = new VoiceMgr();
        cc.vv.voiceMgr.init();
        cc.vv.global = require("Global");


        // 麻将mj
        cc.ver = 2
        cc.gametype = "MJ"

        cc.mj = {}
        cc.invition_delay = {}
        cc.mj.evt = require("./EvtMgr")
        cc.mj.evt.init()

        var AudioMgr = require("AudioMgr");
        cc.audio = new AudioMgr();
        cc.audio.init();

        cc.mj.user = require("./UserMgr")
        cc.mj.user.init()
        
        

        cc.mj.mgr = require('./MJMgr')
        window.http = require("./lib/HTTP")
        http.sendHall({ method: "game.cfg", ver: cc.ver }, (resp) => {
            cc.mj.game_cfg = resp; http.set_tick_host(resp.tick); http.set_hall_host(resp.hall)
            cc.ver_valid = resp.ver_valid != undefined ? resp.ver_valid : true
            cc.director.loadScene("login")
        })

        let sssNetMgr = require("./sss/sssNetMgr")
        cc.sssNetMgr = new sssNetMgr()
        cc.sssHttp = require("./sss/sssgame/sssHttp")
        var Net = require("./sss/Net");
        cc.sssNet = new Net();

        var Emitter = require("./sss/common/emitter")
        cc.emitter = new Emitter();

        var getScreenShotImagePath = function () {
            var fullPath = jsb.fileUtils.getWritablePath() + 'ScreenShotShare.png'; //拿到可写路径，将图片保存在本地，可以在ios端或者java端读取该文件
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                fullPath = '/sdcard/ScreenShotShare.png';
            }
            if (jsb.fileUtils.isFileExist(fullPath)) {
                jsb.fileUtils.removeFile(fullPath);
            }
            return fullPath;
        }

        cc.screenShoot = function (func) {
            var size = cc.director.getWinSize();
            var currentDate = new Date();
            let fileName = 'fnyl-' + (new Date()).valueOf() + '.png';
            var fullPath = '/sdcard/' + fileName;
            if (jsb.fileUtils.isFileExist(fullPath)) {
                jsb.fileUtils.removeFile(fullPath);
            }
            var texture = new cc.RenderTexture(Math.floor(size.width), Math.floor(size.height));
            texture.setPosition(cc.p(size.width / 2, size.height / 2));
            texture.begin();
            cc.director.getRunningScene().visit();
            texture.end();
            var imagePath = getScreenShotImagePath();
            //saveToFile 是放在jsb.fileUtils.getWritablePath()的路径中，只能传入文件名。传不了路径
            texture.saveToFile("ScreenShotShare.png", cc.ImageFormat.PNG, true, function () {
                if (jsb.fileUtils.isFileExist(jsb.fileUtils.getWritablePath() + "ScreenShotShare.png")) {
                    if (cc.sys.os == cc.sys.OS_ANDROID) {//安卓的分享路径比较坑，只能重新写文件
                        var fileData = jsb.fileUtils.getDataFromFile(jsb.fileUtils.getWritablePath() + "ScreenShotShare.png");
                        jsb.fileUtils.writeDataToFile(fileData, imagePath);
                        jsb.fileUtils.removeFile(jsb.fileUtils.getWritablePath() + "ScreenShotShare.png");//写了新文件后删除旧文件
                    }
                    func && func(imagePath)
                    //shareImage(imagePath);//微信分享接口，需要自己实现
                }
                // shareNode.position = position;
            });

            // texture.saveToFile(fileName, cc.IMAGE_FORMAT_JPG);
            // return fullPath
        };
    }
});