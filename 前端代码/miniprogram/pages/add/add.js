// pages/add/add.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address:""
    },
    getloca(){
        wx.navigateTo({
          url: '../map/map',
        })
    },
    getLocation: function() {
        var that = this;
        wx.getLocation({
            type: 'gcj02', // gcj02火星坐标系，用于地图标记点位
      success (res) { // 获取成功
        that.setInfo([parseFloat(res.latitude), parseFloat(res.longitude)]) // 设置经纬度信息
        that.getLocation() // 获取当前位置点
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
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {

            this.getTabBar().setData({

                selected: 2

            })

        }
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