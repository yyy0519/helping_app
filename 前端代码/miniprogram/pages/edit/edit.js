// pages/edit/edit.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      help_id:null,
      title:null,
      content:null,
      istitleedit:0,//内容和标题是否被修改了的标识
      iscttedit:0,
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
    },
    status://完成状态
    ["未开始","进行中","已完成"],
    currentChoose: 0,

    },
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          currentChoose: e.detail.value
        })
    },
    edittitle: function (e) {
      this.setData({
        title:e.detail.value.trim(),
        istitleedit:1
      });
      console.log('title:',e.detail.value.trim());
    },
    editcontent: function (e) {
      this.setData({
        content:e.detail.value.trim(),
        iscttedit:1
      });
      console.log('content:',e.detail.value.trim());
    },
    editbtn(e){
      console.log(e.target.dataset.item);
      const item=e.target.dataset.item;
      var titleflag=this.data.istitleedit;
      var cttflag=this.data.iscttedit;
      var title;
      var content;
      if(titleflag!=0){//标题修改了
        title = this.data.title.trim();
      }
      else{//没修改
        title=item.tip;
      }
      if(cttflag!=0){//内容修改了
        content = this.data.content.trim();
      }
      else{//没修改
        content=item.details;
      }
      wx.showModal({
        title: '提示',
        content: '是否保存修改？',
        success: (res)=>  {
          if (res.confirm) {//这里是点击了确定以后
           
            wx.cloud.database().collection('forhelp_info').where({
              ID:app.globalData.userInfo.ID,
              nickname:app.globalData.userInfo.nickname,
              date:item.date,
              _id:item._id
          }).update({
            data:{
              tip: title,
              details: content,
              status:this.data.status[this.data.currentChoose]
            },
            success(res){
              
              wx.showToast({
                title: '修改成功',
                icon:'success',
              });
              setTimeout(()=>{    
               wx.navigateBack({
                  delta: 1
                })
            },800)
            },
          })

          } else {//这里是点击了取消以后
           
          }
        }
      })
      
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:function(options) {
      let that=this
      that.setData({help_id:options._id})
      const nickname=app.globalData.userInfo.nickname
      const ID=app.globalData.userInfo.ID
      const helplist_id=this.data.help_id
      wx.cloud.database().collection('forhelp_info').where({
          _id:helplist_id
          }).get({
            success(res){
              console.log("res",res.data[0])
              if(res.data[0].status=="未开始"){//设置picker初始默认值
                that.setData({
                    currentChoose:0
                })
              }
              else if(res.data[0].status=="进行中"){
                that.setData({
                    currentChoose:1
                })
              }
              else{
                that.setData({
                    currentChoose:2
                })
              }
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
    onShow:function(options){
      
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