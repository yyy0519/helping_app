// pages/helps/helps.js
const app=getApp()
Page({
    
    /**
     * 页面的初始数据
     */
    data: {
            _id:'',
            ID:'',
            tip:'',
            details:'',
            loc:'',
            Img:'',
            nickname:'',
            status:'',
            item:''
    },
    finish:function(data){
        var that=this
        wx.showModal({
            title: '提示',
            content: '确认此求助完成了吗？',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                if(that.data.status=='已完成'){
                    wx.showToast({
                        title: '已经完成，无需重复提交',
                        icon: 'none'
                      });
                }
                else{
                    console.log(1)
                    wx.cloud.database().collection('forhelp_info').where({
                        _id:that.data._id,
                    }).update({
                        data:{
                            status:'已完成'
                        }
                    })
                }
                that.onShow()
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        
    },
    gethelp(){
        let that=this
        wx.cloud.database().collection('forhelp_info').where({
            _id:this.data._id,
        }).get({
            success(res){
                console.log(res.data[0])
                help=res.data[0]
                that.setData({
                    ID:res.data[0].ID,
                    tip:res.data[0].tip,
                    details:res.data[0].details,
                    loc:res.data[0].loc,
                    Img:res.data[0].Img,
                    nickname:res.data[0].nickname,
                    status:res.data[0].status,
                    date:res.data[0].date,
                    item:res.data[0].item
                })
            }
        })
        //console.log(this.data.help.tip)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.data._id=options._id
        this.gethelp()
        console.log(this.data._id)
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
        this.gethelp()
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