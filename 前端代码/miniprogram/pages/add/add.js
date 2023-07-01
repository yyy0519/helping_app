// pages/add/add.js
const app = getApp()
let that = null // 页面this指针变量
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loc:'',
        tip:'',
        details:'',
        latitude: 39.9086, // 地图中心纬度
        longitude: 116.3974, // 地图中心经度
        output: 0,
       
        info: { // 地图点位信息
            address: '-', // 常规地址
            adinfo: '-', // 行政区
            formatted: '-', // 推荐地址
            location: '-' // 经纬度
          }
    },
    
    inputBind1: function (e) {
        this.setData({
          tip:e.detail.value.trim(),
        });
        console.log('tip:',e.detail.value.trim());
      },
      inputBind2: function (e) {
        this.setData({
          details:e.detail.value.trim(),
        });
        console.log('details:',e.detail.value.trim());
      },
      inputBind3: function (e) {
        this.setData({
          loc:e.detail.value.trim(),
        });
        console.log('loc:',e.detail.value.trim());
      },
      huoqulocation:function (e) {  
          that=this  
          this.setData({output:5}) 
          wx.getLocation({
            type: 'gcj02', // 比较精确
            success: (res) => {
             
             that.setInfo([parseFloat(res.latitude), parseFloat(res.longitude)]) // 设置经纬度信息
             that.setData({
               latitude:res.latitude,
               longitude:res.longitude
             })
             that.getLocation() // 获取当前位置点
             console.log(res)
            },
            fail (e) { // 获取失败
                if (e.errMsg.indexOf('auth deny') !== -1) { // 如果是权限拒绝
                  wx.showModal({ // 显示提示
                    content: '你已经拒绝了定位权限，将无法获取到你的位置信息，可以选择前往开启',
                    success (res) {
                      if (res.confirm) { // 确认后
                        wx.openSetting() // 打开设置页，方便用户开启定位
                      }
                    }
                  })
                }
              }
          })
      },
      setInfo (pot = [39.9086, 116.3974], type = 0, ext = {}) {
        let data = { ...ext }
        if (type !== 1) { // 如果类型不为1
          data = Object.assign(data, { // 传入标记点
            'marker.latitude': pot[0],
            'marker.longitude': pot[1]
          })
        }
        if (type !== 2) { // 如果类型不为2
          data = Object.assign(data, { // 传入中心点
            latitude: pot[0],
            longitude: pot[1]
          })
        }
        that.setData(data)
      },
    submit:function (data){
        const tip = this.data.tip.trim();
        const details = this.data.details.trim();
        const loc=this.data.loc.trim();
        const loction=null;
        const userInfo=app.globalData.userInfo;
        const latitude=this.data.latitude;
        const longitude=this.data.longitude;
            if(loc!=''){
                location=loc;
            }
            else{
                location=this.data.info.formatted;
                console.log(this.data.info.formatted)
            }
        if (tip == '' || details == '') {
          wx.showToast({
            title: '请输入标题或详情',
            icon: 'none'
          });
          
        } 
        else if(location=='-'||location==''){
            wx.showToast({
                title: '未获取到定位，请点击获取位置或手动输入',
                icon: 'none'
              });
        }
        else {
            
          // 将输入框的内容存到forhelp数据库中
          wx.cloud.database().collection('forhelp_info').add({
            data: {
              tip: tip,
              date:new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0,8),
              details: details,
              loc:location,
              nickname:userInfo.nickname,
              Img:userInfo.Img,
              ID:userInfo.ID,
              time:Date.now(),
              latitude:latitude,
              longitude:longitude,
              helpno:app.globalData.helpnum+1
            },
            
             
          
            
            success: function(res) {

              wx.showToast({
                title: '发布成功',
                icon:'success',
                success:function () {
                    setTimeout(function () {                        
                         wx.reLaunch({
                        url: '../map/map',
                 });
                },1000);
                app.globalData.selected=0
                app.globalData.helpnum=app.globalData.helpnum+1
        
            }
              });
              // 跳转到其他页面
            },    
            fail: function(res) {
              wx.showToast({
                icon: 'none',
                title: '提交失败',
              });
            }
          });
        }
    },
    async getLocation (data = null) {
        const {
          latitude,
          longitude
        } = data || that.data // 如果传入为空，则使用data内数据
        await app.call({ // 发起云函数请求
          name: 'location', // 业务为location，获取经纬度信息
          data: { // 传入经纬度信息
            location: `${latitude},${longitude}`
          },
          load: false // 不显示加载loading，静默执行
        }).then((res) => { // 请求成功后
          that.setData({ // 将信息存储data数据
            info: res
          })
        })
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})