// pages/message/message.js
const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
       

    },
    login(){
        wx.navigateTo({
          url: '../login/login',
        })
    },
    getxinxi(){
        let userlist
        var that=this
        wx.cloud.database().collection('user_info').get({
            success(res){
                console.log("获取数据成功",res.data),
                userlist=res.data
               that.setDate({
                   userlist
            })
            }
        })
     
    },
    go_liaotian(){
        wx.navigateTo({
          url: '../liaotian/liaotian',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getxinxi()
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
        this.getxinxi(),
        this.setData({
            userInfo:app.globalData.userInfo
        })
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