
// 数据
let lingyuanData = require('../../utils/data')


Page({
  data: {
    // centerX: 113.3345211,
    // centerY: 23.10229,
    markers: [
        {
            iconPath: "../../asset/location.png",
      id: 0,
      name:null,
      latitude: "32.049534",
      longitude:"118.669223",
      width: 30,
      height: 30
        }
    ],
    showDialog: false,
    mapId: "myMap" //wxml中的map的Id值
  },
  // 点击回到原点
  moveTolocation: function () {
    // console.log(123)
    let Id = this.data.mapId
    var mapCtx = wx.createMapContext(Id);
    mapCtx.moveToLocation();
  },

  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function () {
    // console.log('地图定位！')
    let that = this
  
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        console.log(res)
        let latitude = res.latitude;
        let longitude = res.longitude;
        let marker = this.createMarker(res);
        this.setData({
          centerX: longitude,
          centerY: latitude,
          markers: this.getMarkers(),
        })
      }
    });
  },
  regionchange(e) {
    // console.log(e.type)
  },
  // 点击标点获取数据
  markertap(e) {
    var id = e.markerId
    var name = this.data.markers[id - 1].name
    console.log(name)
    this.setData({
      lingyuanName: name,
      showDialog: true,
    })
  },
  toggleDialog: function () {
    this.setData({
      showDialog: false,
    })
  },
  getMarkers(){
     let that=this
   let premarkers = [];
   let temp=[];
   wx.cloud.database().collection('forhelp_info').get({
    success:(res)=>{
        for(var i=0;i<3;i++){
            let marker = this.createMarker(res.data[i]);
            premarkers.push(marker)
        }
        that.setData({
            markers:premarkers
        })
        console.log("premarker",this.data.markers)
        
}
   })
   return premarkers;
   console.log("premarker",markers)
    
},
   
  getLingyuanMarkers() {
    let markers = [];
    console.log(lingyuanData)
    for (let item of lingyuanData) {
        console.log("item",item)
      let marker = this.createMarker(item);
      console.log("marker",marker)
      markers.push(marker)
      
    }
    console.log("premarker",markers)
    return markers;
  },
  createMarker(point) {
    //let latitude = point.latitude;
    //let longitude = point.longitude;
    let marker = {
      iconPath: "../../asset/location.png",
      id: point.helpno || 0,
      name: point.name || '',
      latitude: "32.049534",
      longitude:"118.669223",
      width: 30,
      height: 30,
      
    };
    return marker;

  }
  //   getMarkers(){
//     let premarkers = [];
//     var i=0;
    
//         // wx.cloud.callFunction({
//         //   name:"collect"
//         // }).then(res=>{
//         //   console.log("地址统计",res)
//         //   // CategoryTarget
//         //   console.log(res.result.list[0].loccategories.length)
//         // })
    

//     wx.cloud.database().collection('forhelp_info').where({
//         status:"未开始"
//     }).get({
//        success:(res)=>{
//            console.log("未开始",res.data)
//     for (let item of res.data) {
//       let marker = this.createMarker(item);
    
//       premarkers.push(marker)
//     }
//     that.setData({
//         markers:premarkers
//     })
   
// }
//     })
//     return premarkers;

//   },
//   createMarker(point) {
//     let latitude = point.latitude;
//     let longitude = point.longitude;
  
//     let marker = {
//       iconPath: "../../asset/location.png",
//       id: point.helpno || 0,
//       name: point.loc || '',
//       latitude: latitude,
//       longitude: longitude,
//       width: 30,
//       height: 30,
//       label: {
//         content: point.loc,
//         color: '#402a58',
//         fontSize: 14,
//         bgColor: "#fff",
//         borderRadius: 30,
//         borderColor: "#402a58",
//         borderWidth: 1,
//         padding: 3
//       },
//       callout: {
        
//       }
      
//     };
//     return marker;

//   },
})