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
        baiBianPaiAtlas:{
            default:null,
            type:cc.SpriteAtlas,
        },
    },

    // use this for initialization
    onLoad: function () {
    },
    initDt:function(){
        this.arrPai = [];
        for(var i = 1; i <= 13; i++){
            var name = 'pai' + i;
            var paiNode = this.node.getChildByName(name);
            this.arrPai.push(paiNode);
        };
    },
    setInfo:function(){
        // console.log('myPai.setInfo');
        if(!cc.sssNetMgr.seats){
            return;
        }
        var index = cc.sssNetMgr.seatIndex;
        var data = cc.sssNetMgr.seats[index].holds;
        if(data.length < 1){
            return false;
        }
        var len = this.arrPai.length;
        
        // console.log('data.len: '+data.length);
        // cc.log(data)
        this.sortPai(data);
        this.myPaiData = [];
        for(var i = 0; i < len; i++){
            var paiCom = this.arrPai[i].getComponent('pai');
            paiCom.setInfo(data[i]);
            this.myPaiData.push(data[i]);
            this.arrPai[i].active = true;
        }
        console.log('myPai.setInfo over');
        return true;
    },

    getMyPaiData:function(){
        return this.myPaiData;
    },

    setMyPaiData:function(arrPaiData){
        this.myPaiData = [];
        for(var i = 0; i < arrPaiData.length; i++){
            this.myPaiData.push(arrPaiData[i]);
        }
    },

    sortPai2:function(arrPai){
        if(arrPai){
            // arrPai.sort(function(a,b){
            //     return b.value - a.value;
            // });
            this.sortres(arrPai)
        }
    },
    sortPai: function (arrPai) {
        if (arrPai) {
           this.sortres(arrPai)
        }
    },
    sortres: function (arr) {
        arr.sort(function (a, b) { return b.value - a.value; })
        var a1 = [], a2 = [], a3 = [], a4 = [], a5 = [];

        function addNum(value, index) {
            if (index == 0) {
                a1.push(value);
            }
            else if (index == 1) {
                a2.push(value);
            }
            else if (index == 2) {
                a3.push(value);
            }
            else if (index == 3) {
                a4.push(value);
            }
            else if (index == 4) {
                a5.push(value);
            }
            else {
                return;
            }
        }

        var tmp = [];
        var len = arr.length;
        var index = 0;
        for (var i = 0; i < len; i++) {
            addNum(arr[i], i);
            index = 0;
            for (var j = i + 1; j < len; j++) {
                if (arr[i].value == arr[j].value) {
                    addNum(arr[j], i);
                    index++;
                }
            }
            i = i + index;
        }
        var arrs = [a1, a2, a3, a4, a5];
        arrs.sort(function (a, b) { return b.length - a.length })
        for (var x = 0; x < arrs.length; x++) {
            tmp = tmp.concat(arrs[x])
        }
        return tmp;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
