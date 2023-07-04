// pages/helpdetail/helpdetail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        help_id:null,
        help:{
            _id:null,
            ID:null,
            Img:null,
            _openid:null,
            date:null,
            details:null,
            loc:null,
            nickname:null,
            tip:null
        }


    },
    help(){
        let that=this
        const nickname=app.globalData.userInfo.nickname
        const ID=app.globalData.userInfo.ID
        const userId=app.globalData.userInfo.userId
        const helplist_id=this.data.help_id
        var help_detail=JSON.stringify(this.data.help)
        if(userId!=that.data.help.userId){
            wx.cloud.database().collection('forhelp_info').where({
                _id:helplist_id
                }).update({
                    data:{
                    status:"进行中",
                    helpernickname:nickname,
                    helperid:ID
                    },
                    success: (res) =>{
    
                        wx.showToast({
                          title: '快去和求助人聊聊天吧',
                          icon:'none',
                          success:function () {
                              setTimeout(function () {                        
                                wx.reLaunch({
                                    url: '../friends/friends?help_detail='+ help_detail,
                                });
                          },1000);
                          app.globalData.selected=3
                      }
                    })
                }
            })
        }
        else{
            wx.showToast({
                title: '不能帮助自己的求助哦！',
                icon:'none',
                
          })
        }
        
            
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:function(options){
        var that=this
       console.log(options)
       that.setData({help_id:options._id})
       wx.cloud.database().collection('forhelp_info').where({
        _id:options._id
        }).get({
        success(res){
            console.log("res",res.data[0])
        that.setData({
            help:res.data[0]
        })
        }
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