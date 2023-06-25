// pages/message/message.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    getxinxi(){
        let userlist
        let that=this
        wx.cloud.database().collection('chat_users').get({
            success(res){
                console.log(res.data)
                userlist.list=res.data
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
        this.getxinxi()
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