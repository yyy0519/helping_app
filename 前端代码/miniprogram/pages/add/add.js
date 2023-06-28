// pages/add/add.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tip:'',
        details:'',
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
      getLocation:function () {
          
      },
    submit:function (){
        const tip = this.data.tip.trim();
        const details = this.data.details.trim();
        if (tip == '' || details == '') {
          wx.showToast({
            title: '请输入标题或详情',
            icon: 'none'
          });
        } else {
          // 将输入框的内容存到forhelp数据库中
          wx.cloud.database().collection('forhelp_info').add({
            data: {
              tip: tip,
              details: details,
              time:Date.now(),
            },
            success: function(res) {
              wx.showToast({
                title: '提交成功',
                icon:'success',
                success:function () {
                    setTimeout(function () {                        
                         wx.reLaunch({
                        url: '../map/map',
                 });
                },1000);
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