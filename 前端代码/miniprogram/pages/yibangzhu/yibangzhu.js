const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tishi:'',
        helpedlist:[
            {
                _id:null,
                tip:null,
                details:null,
                loc:null,
                Img:null,
                ID:null
            }
        ]
    },
    
    gethelped(){
        let helpedlist
        let that=this
        wx.cloud.database().collection('forhelp_info').where({
            helperid:app.globalData.userInfo.ID,
            
        }).get({
            success(res){
                if(res.data.length==0){
                    console.log(res.data)
                    helpedlist=res.data
                    that.setData({
                        helpedlist:res.data,
                        tishi:"还没有帮助过别人噢，快去看看有谁需要帮助吧！"
                    })
                }
                else{
                console.log(res.data)
                helpedlist=res.data
                that.setData({
                    helpedlist:res.data,
                    tishi:"没有更多了，快去帮助别人吧！"
                })
            }
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.gethelped()
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
        this.gethelped()
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
    go_help(e){
        wx.navigateTo({
          url: '../helps/helps?_id='+e.currentTarget.dataset.info,
        })
    }
})