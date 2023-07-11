// pages/xunzhang/xunzhang.js
const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        achievement1:"../../image/achievement1.png",
        achievement2:"../../image/achievement2.png",
        achievement3:"../../image/achievement3.png",
        achievement4:"../../image/achievement4.png",
        achievement5:"../../image/achievement5.png",
        a1:0,
        a2:0,
        a3:0,
        a4:0,
        a5:0,
        tishi1:"完成一个帮助以解锁",
        tishi2:"完成五个帮助以解锁",
        tishi3:"完成十个帮助以解锁",
        tishi4:"完成二十个帮助以解锁",
        tishi5:"完成五十个帮助以解锁",
    },

    getxunzhang(){
        let that=this
        wx.cloud.database().collection('forhelp_info').where({
            helperid:app.globalData.userInfo.ID,
            // helpernickname:app.globalData.userInfo.nickname,
            status:"已完成"
        }).get({
            success(res){
                if(res.data.length>=50){
                    console.log(res.data.length)
                    that.setData({
                        achievement5:"../../image/achieved5.png",
                        tishi5:"恭喜您已完成五十个帮助",
                        a5:1
                    })
                    app.globalData.numxunzhang=5
                }
                else if(res.data.length>=20){
                    console.log(res.data.length)
                    that.setData({
                        achievement4:"../../image/achieved4.png",
                        tishi4:"恭喜您已完成二十个帮助",
                        a4:1
                    })
                    app.globalData.numxunzhang=4
                }
                else if(res.data.length>=10){
                    console.log(res.data.length)
                    that.setData({
                        achievement3:"../../image/achieved3.png",
                        tishi3:"恭喜您已完成十个帮助",
                        a3:1
                    })
                    app.globalData.numxunzhang=3
                }
                else if(res.data.length>=5){
                    console.log(res.data.length)
                    that.setData({
                        achievement2:"../../image/achieved2.png",
                        tishi2:"恭喜您已完成五个帮助",
                        a2:1
                    })
                    app.globalData.numxunzhang=2
                }
                else if(res.data.length>=1){
                    console.log(res.data.length)
                    that.setData({
                        achievement1:"../../image/achieved1.png",
                        tishi1:"恭喜您已完成一个帮助",
                        a1:1
                    })
                    app.globalData.numxunzhang=1
                }
            }
        })
       
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getxunzhang()
        
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
        this.setData({
            userInfo:app.globalData.userInfo
            
        }),
        this.getxunzhang()
        
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

    },
    click1(){
        wx.showToast({
          title: this.data.tishi1,
          icon: 'none'
        })
    },
    click2(){
        wx.showToast({
          title: this.data.tishi2,
          icon: 'none'
        })
    },
    click3(){
        wx.showToast({
          title: this.data.tishi3,
          icon: 'none'
        })
    },
    click4(){
        wx.showToast({
          title: this.data.tishi4,
          icon: 'none'
        })
    },
    click5(){
        wx.showToast({
          title: this.data.tishi5,
          icon: 'none'
        })
    }
})