// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    


    formSubmit(e){
        let that=this
        wx.cloud.database().collection('user_info').where({
            zhanghao:that.data.zhanghao,
            mima1:that.data.mima1
            }).get({
                success(res){
                    console.log(res)
                    if(res.data.length>0){
                        wx.showToast({
                          title: '登录成功',
                          icon:'none'
                        })
                        setTimeout(()=>{
                                wx.reLaunch({
                                  url: '../message/message',
                                })
                        },800)
                    }else{
                        wx.showToast({
                          title: '您还未注册,请注册后登录',
                          icon:'none'
                        })
                    }
                }
            })
              
      //console.log(e.detail.value)
      

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