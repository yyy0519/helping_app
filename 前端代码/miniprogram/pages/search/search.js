// pages/search/search.js
var WxSearch = require('../../wxSearch/wxSearch.js')
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        issearch:0,
        searchtxt:'',
        isinput:0,
        helplist:[
            {
                _id:'',
                ID:'',
                Img:'',
                _openid:'',
                date:'',
                details:'',
                loc:'',
                nickname:'',
                tip:'',
                status:''
               
            }
        ],
        histap:0

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log('onLoad')
        var that = this
        //初始化的时候渲染wxSearchdata
        WxSearch.init(that,43,['逸夫图书馆','信息楼','天天餐厅','雨伞','高数书']);
        WxSearch.initMindKeys(['求助','帮忙','sos','恩人']);

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
        var that = this
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {

            this.getTabBar().setData({

                selected: 1

            })

        }
       
    },
    wxSearchFn: function(e){
        var that = this
        WxSearch.wxSearchAddHisKey(that);
        // that.setData({
        //     issearch:1
        // })
        const db = wx.cloud.database();
        const _ = wx.cloud.database().command
        var key=that.data.searchtxt
        console.log("input",key)
        if(key==''&&that.data.histap==0){
            that.setData({
                issearch:0
            })
        }
        
        else if(that.data.history!=''&&that.data.histap==1){
            key=that.data.history
        }
        if(key==''){
            wx.showToast({
                title: '搜索栏为空',
                icon:"error"
              })
        }
        else{
        wx.cloud.database().collection('forhelp_info').where(_.or([
            {
                details: db.RegExp({
                    regexp:  key,
                    options: 'i',
                  })

            },
            {
              tip: db.RegExp({
                    regexp: key,
                    options: 'i',
                  })
            },
            {
                item: db.RegExp({
                      regexp: key,
                      options: 'i',
                    })
              },
              {
               loc : db.RegExp({
                      regexp: key,
                      options: 'i',
                    })
              },
          ])).get({
            success: res => {
              console.log(res)
              if(res.data==''){
                  wx.showToast({
                    title: '未搜到相关求助，换个关键词试试吧！',
                    icon:'none'
                  })
                  that.setData({
                    issearch:0,
                    histap:0
                  })
                 
                  that.onLoad()
              }
              else{
                  that.setData({
                helplist:res.data,
                issearch:1,
                histap:0
            })}
              
            },
            fail: err => {
              console.log(err)
            }
          })
        }
        
      },
      wxSearchInput: function(e){
        var that = this
        const db = wx.cloud.database();
        const _ = wx.cloud.database().command
        const key=that.data.searchtxt
        WxSearch.wxSearchInput(e,that);
        console.log(e.detail.value)
        that.setData({
            searchtxt:e.detail.value
        })
        console.log("input",that.data.searchtxt)
        that.setData({
            isinput:1
        })
       
      },
      wxSerchFocus: function(e){
        var that = this
        WxSearch.wxSearchFocus(e,that);
      },
      wxSearchBlur: function(e){
        var that = this
        WxSearch.wxSearchBlur(e,that);
      },
      wxSearchKeyTap:function(e){
        var that = this
        WxSearch.wxSearchKeyTap(e,that);
      },
      wxSearchDeleteKey: function(e){
        var that = this
        WxSearch.wxSearchDeleteKey(e,that);
      },
      wxSearchDeleteAll: function(e){
        var that = this;
        WxSearch.wxSearchDeleteAll(that);
      },
      wxSearchTap: function(e){
        var that = this
        WxSearch.wxSearchHiddenPancel(that);
        
        
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