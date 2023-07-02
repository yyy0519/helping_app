// pages/message/message.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
       

    },
    register(){
        wx.navigateTo({
          url: '../register/register',
        })
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

        this.setData({
            userInfo : app.globalData.userInfo
        })

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

        this.getxinxi(),
        this.setData({
            userInfo : app.globalData.userInfo,
            my_friends : []
        })
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {

            this.getTabBar().setData({

                selected: 3

            })

        }
        
        this.loadUser()
        this.getMyfriend()
    },
    loadUser() {
        var that = this;
        wx.cloud.database().collection('user_info').where({
            ID : that.data.userInfo.ID,
            password: that.data.userInfo.password
        }).get({
            success(res) {
                console.log(res)
                // 更新数据 拿到 _id
                app.globalData.userInfo = res.data[0]
                that.setData({
                    userInfo: app.globalData.userInfo
                })
            }
        })
    },


    getMyfriend() {
        // 获取所有成功添加好友的朋友
        var that = this;
        const DB = wx.cloud.database().command;
        wx.cloud.database().collection('chat_record').where(
            DB.or([
                {
                    userA_id: app.globalData.userInfo._id,
                    friend_status: true
                },
                {
                    userB_id: app.globalData.userInfo._id,
                    friend_status: true
                }
            ])
        ).watch({
            onChange: function(snapshot){
                that.setData({
                    my_friends : snapshot.docs
                })
            },
            onError : function(err){
                console.log(err)
            }
        })
    },

    startChat(e) {

        var index = e.currentTarget.dataset.index;
        console.log(this.data.my_friends)
        wx.navigateTo({
          url: '/pages/chat/chat?id=' + this.data.my_friends[index]._id
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