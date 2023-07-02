// pages/yifabu/yifabu.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
<<<<<<< Updated upstream

=======
        helpinglist:[
            {
                tip:null,
                details:null,
                loc:null,
                Img:null,
                nickname:null,
                helpernickname:null
            }
        ]
    },
    delete(e){
      console.log(e.target.dataset.item);
      const item=e.target.dataset.item;
      wx.cloud.database().collection('forhelp_info').where({
        ID:app.globalData.userInfo.ID,
        nickname:app.globalData.userInfo.nickname,
        date:item.date,
        _id:item._id
    }).remove({})
    },
    
    getyifabu(){
        let helpinglist
        let that=this
        wx.cloud.database().collection('forhelp_info').where({
            ID:app.globalData.userInfo.ID,
            nickname:app.globalData.userInfo.nickname,
        }).get({
            success(res){
                console.log(res.data)
                helpinglist=res.data
                that.setData({
                    helpinglist
                })
            }
        })
>>>>>>> Stashed changes
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