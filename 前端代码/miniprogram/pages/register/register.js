// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Img:"/image/登录.png",
        nickname:"昵称"

    },
    getUserProfile(){
        var that=this
        wx.getUserProfile({
          desc: '展示用户信息',
          success:(res =>{
              console.log(res)
              that.setData({
                  Img:res.userInfo.avatarUrl,
                  nickname:res.userInfo.nickName,
                  userInfo: res.userInfo
              })
              app.globalData.userInfo = res.userInfo
              console.log(app.globalData.userInfo)
          })
          
        })

        //获取用户微信的头像
    },
    formSubmit(e){
        let info
        let that=this
        info=e.detail.value
        if(info.ID!=''&&info.password!=''&&info.confirmpassword!=''&&info.password==info.confirmpassword){
            wx.cloud.database().collection('user_info').add(
                {
                    data:{
                        time:Date.now(),
                        ...info,
                        Img:that.data.Img,
<<<<<<< Updated upstream
                        nickname:that.data.nickname
=======
                        nickname:that.data.nickname,
                        avatarUrl: that.data.userInfo.avatarUrl,
                        friends: [],
                        new_friends: []
        
                    },success(res){
                        wx.cloud.database().collection('user_info').doc(res._id).get({
                            success(res){
                                console.log(res)
                                app.globalData.userInfo=res.data
                            }
                        })
>>>>>>> Stashed changes
                    }
                }
            )
            wx.showToast({
                title: '注册成功！',
                icon: "none"
              })
              
        }
        else{
            wx.showToast({
              title: '账号或密码输入错误，请重新输入',
              icon: "none"
            })
        }
      //console.log(e.detail.value)
      

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(app.globalData.userInfo);
        this.setData({
            userInfo: app.globalData.userInfo
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