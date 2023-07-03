// pages/login/login.js
const app = getApp()
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


    formSubmit(e){
        if(!e.detail.value.ID||!e.detail.value.password){
            wx.showToast({
              title: '请输入账号或密码',
              icon:'none'
            })
            return
        }
        wx.cloud.database().collection('user_info').where({
            ID:e.detail.value.ID,
            //password:e.detail.value.password
        }).get({
            success(res){
                console.log(res)
                if(res.data.length==0){
                    wx.showToast({
                        title: '账号未注册',
                        icon:'none'
                    })
                }
                else{
                    wx.cloud.database().collection('user_info').where({
                        ID:e.detail.value.ID,
                        password:e.detail.value.password
                    }).get({
                        success(res){
                            if(res.data.length==0){
                                wx.showToast({
                                    title: '密码错误',
                                    icon:'none'
                                })
                            }
                            else{
                                wx.showToast({
                                    title: '登录成功!',
                                    icon:'none'
                                })
                                app.globalData.userInfo=res.data[0]
                                setTimeout(()=>{
                                wx.reLaunch({

                                  url: '../map/map',

                                })},800)
                                app.globalData.selected=0
                    }
                }
            })
        }
              
      //console.log(e.detail.value)
      

    }
})
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