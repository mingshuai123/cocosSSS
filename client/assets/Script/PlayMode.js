
cc.Class({
    extends: cc.Component,

    properties: {
        fzmj: {
            default: null,
            type: cc.Node
        },
        ndmj: {
            default: null,
            type: cc.Node
        },
        sss: {
            default: null,
            type: cc.Node
        }
    },
    showFZMJ: function () {
        this.fzmj.active = true
        this.ndmj.active = false
        this.sss.active = false
    },
    showNDMJ: function () {
        this.fzmj.active = false
        this.ndmj.active = true
        this.sss.active = false
    },
    showSSS: function () {
        this.fzmj.active = false
        this.ndmj.active = false
        this.sss.active = true
    },
});
