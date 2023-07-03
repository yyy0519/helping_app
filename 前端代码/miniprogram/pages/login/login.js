// pages/login/login.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userid:'用户ID',
        password:''
    },
    register(){
        wx.navigateTo({
          url: '../register/register',
        })
    },
    showID:function ( ) {
        var that =this
        wx.cloud.callFunction({
            name: 'cloudbase_auth',
            success: res => {
              // 登录成功后，获取当前登录用户的openid
              const openid = res.result.openid;
              console.log('openid',openid)
              that.setData({
                openid: openid
              })
              console.log('openid',that.data.openid)  
              wx.cloud.database().collection('user_info').where({
                _openid:that.data.openid
            }).get({
                success(res){
                    app.globalData.userInfo=res.data[0]
                  console.log('idid',res.data[0].userid)
                    that.setData({
                        userid:res.data[0].userid,
                        password:res.data[0].password
                    })
                },
                fail: err => {
                    console.error(err);
                  }
            })
            },
            fail:function(err) {
                console.error(err);
                // 查询失败，提示未注册
                wx.showToast({
                  title: '您还未注册，请注册！',
                  icon:'none'
                })
              }
          });
  },


    formSubmit(e){
        if(!e.detail.value.password){
            wx.showToast({
              title: '请输入密码',
              icon:'none'
            })
            return
        }
        if(e.detail.value.password!=app.globalData.password){
            wx.showToast({
              title: '密码错误！',
              icon:'none'
            })
        }
        else{
             wx.showToast({
                title: '登录成功!',
                icon:'none'
            })
            setTimeout(()=>{
                wx.reLaunch({
                    url: '../map/map',
                })},800)
                app.globalData.selected=0
                    }

 },
    onfocus: function() {
        this.setData({isScroll: false})
      },
      onblur: function () {
        this.setData({isScroll: true})
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:function ( ) {
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