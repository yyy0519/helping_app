// pages/fankui/fankui.js
const app = getApp()
let that = null 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tip:'',
        details:''
    },
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          currentChoose: e.detail.value
        })
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
    submit:function (data){
        const tip = this.data.tip.trim();
        const details = this.data.details.trim();
        const userInfo=app.globalData.userInfo;
    
        if (tip == '' || details == '') {
          wx.showToast({
            title: '请输入反馈标题或内容',
            icon: 'none'
          });
          
        } 
        else {
            
          // 将输入框的内容存到forhelp数据库中
          wx.cloud.database().collection('report_info').add({
            data: {
              tip: tip,
              date:new Date().toJSON().substring(5, 10) + ' ' + new Date().toTimeString().substring(0,5),
              details: details,
              nickname:userInfo.nickname,
              userId:userInfo.userId,
              Img:userInfo.Img,
              ID:userInfo.ID,
              time:Date.now(),
            },
            
             
          
            
            success: function(res) {

              wx.showToast({
                title: '反馈成功',
                icon:'success',
                success:function () {
                    setTimeout(function () {                        
                         wx.reLaunch({
                        url: '../my/my',
                 });
                },1000);
                //app.globalData.selected=0
                //app.globalData.helpnum=app.globalData.helpnum+1
        
            }
              });
              // 跳转到其他页面
            },    
            fail: function(res) {
              wx.showToast({
                icon: 'none',
                title: '反馈失败',
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