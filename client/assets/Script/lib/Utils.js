let SEAT_DIR = {
    4: {
        1: { 3: 2, 2: 1, 4: 3, 1: 4 },
        2: { 4: 2, 3: 1, 1: 3, 2: 4 },
        3: { 1: 2, 4: 1, 2: 3, 3: 4 },
        4: { 2: 2, 1: 1, 3: 3, 4: 4 },
    },
    3: {
        1: { 3: 3, 2: 1, 1: 4 },
        2: { 3: 1, 1: 3, 2: 4 },
        3: { 1: 1, 3: 4, 2: 3 },
    },
    2: {
        1: { 2: 2, 1: 4 },
        2: { 1: 2, 2: 4 },
    },
}

window.Utils = {
    formatCoin: function (value) {
        if (value < 10000) {
            return '' + value
        } else {
            let value_ = Math.floor(value / 1000) * 1000
            return '' + (value_ / 10000) + '万'
        }
    },
    dirFromSeat: function (tar_seat) {
        return SEAT_DIR[cc.mjroom.option.max_role][cc.mj.mgr.self_seat][tar_seat]
    },
    isObject: function (obj) {
        return typeof (obj) == "object"
    },
    parseCard: function (d) {
        if (Utils.isObject(d)) {
            d.state = (d.state == undefined || d.state == null) ? 0 : parseInt(d.state)
            return d
        } else {
            return { type: parseInt(d[0]), value: parseInt(d[1]), laizi: parseInt(d[3]) == 0 ? false : true, state: parseInt(d[2]) }
        }
    },
    UrlImage: function (url, callback) {
        if (!url) {
            callback(999, null)
        } else {
            cc.loader.load({ url: url, type: "png" }, function (err, tex) {
                if (tex) {
                    var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(0, 0, tex.width, tex.height));
                    callback(null, spriteFrame);
                } else {
                    callback(err, null)
                }
            })
        }
    },
}