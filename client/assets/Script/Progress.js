
cc.Class({
    extends: cc.Component,

    properties: {
        bar: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function () {
        this.node.setPositionX((this.bar.name == "bgm" ? cc.mj.user.bgm : cc.mj.user.sfx) * 500)
        let progress = this.node.position.x / 500
        this.bar.getComponent(cc.ProgressBar).progress = progress
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (evt) => {
            let dx = evt.getLocationX() - evt.getPreviousLocation().x
            this.node.setPositionX(Math.min(500, Math.max(0, this.node.position.x + dx)))
            let progress = this.node.position.x / 500
            this.bar.getComponent(cc.ProgressBar).progress = progress
            this.bar.name == "bgm" ? cc.mj.user.setVolumeBGM(progress) : cc.mj.user.setVolumeSFX(progress)
        })
    },
    setValue: function (progress) {
        this.bar.getComponent(cc.ProgressBar).progress = progress
        this.bar.name == "bgm" ? cc.mj.user.setVolumeBGM(progress) : cc.mj.user.setVolumeSFX(progress)
        this.node.setPositionX(progress * 500)
    },
    // called every frame
    update: function (dt) {

    },
});
