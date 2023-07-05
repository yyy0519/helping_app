// pages/my/my.js
const app=getApp()
var count=0
Page({

    /**
     * 页面的初始数据
     */
    data: {
        xinxi:[
            {
              icon: "../../image/class.png",
              title: "反馈",
              /*littleTitle: "访客班级",*/
              click: "go_fankui"
            },{
              icon: "../../image/academy.png",
              title: "退出",
              /*littleTitle: "访客专业",*/
              click: "go_exit"
            }
        ],
        list:[
            {
              icon: "../../image/aboutUs.png",
              title: "已发布求助",
              click: "go_yifabu",
              littleTitle: 0
            }, {
              icon: "../../image/update.png",
              title: "已帮助求助",
              click: "go_yibangzhu",
              littleTitle: 0
            }, {
              icon: "../../image/login.png",
              title: "勋章",
              click: "go_xunzhang",
              littleTitle: 0
            }
        ],
        isedit:0
    },
    editname(){
        var that=this
        that.setData({
            isedit:1
        })
    },
    save(){
        var that=this
        that.setData({
            isedit:0
        })
    },
    starting(){
        console.log("starting")
       // console.log('111',app.globalData.userInfo)
        let that=this
        const numhelped = "list[1].littleTitle";
        const numpublish = "list[0].littleTitle";
        let num1=numhelped
        let num2=numpublish
        wx.cloud.database().collection('forhelp_info').where({
            helperid:app.globalData.userInfo.ID,
            helpernickname:app.globalData.userInfo.nickname,
        }).get({
            success(res){
                num1=0+res.data.length
                that.setData({
                    [numhelped]:num1,
                })
            }
        })
        wx.cloud.database().collection('forhelp_info').where({
            ID:app.globalData.userInfo.ID,
            nickname:app.globalData.userInfo.nickname,
        }).get({
            success(res){
                num2=0+res.data.length
                that.setData({
                    [numpublish]:num2,
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            userInfo:app.globalData.userInfo
            
        })
        this.starting()
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
            
        })
        this.starting()
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {

            this.getTabBar().setData({

                selected: 4

            })

        }

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
    go_yifabu(){
        wx.navigateTo({
          url: '../yifabu/yifabu',
        })
    },
    go_yibangzhu(){
        wx.navigateTo({
          url: '../yibangzhu/yibangzhu',
        })
    },
    go_xunzhang(){
        wx.navigateTo({
          url: '../xunzhang/xunzhang',
        })
    },
    go_exit(){
        wx.exitMiniProgram()
    },
    go_fankui(){
        wx.navigateTo({
            url: '../fankui/fankui',
          })
    },
    changeUserAvatar() {
        let a = this;
        wx.showActionSheet({
            itemList: [ "从相册中选择", "拍照" ],
            itemColor: "#f7982a",
            success: function(e) {
            //album:相册   //camera拍照
                e.cancel || (0 == e.tapIndex ? a.chooseWxImageShop("album") : 1 == e.tapIndex && a.chooseWxImageShop("camera"));
            }
        });
      },
      //a：选择的类型  //album:相册   //camera拍照
      chooseWxImageShop: function(a) {
      var e = this;
      wx.chooseMedia({
          mediaType : ["image"],
          sizeType: [ "original", "compressed" ],
          sourceType: [ a ],//类型
          count:1,
          success: function(a) {
              if(a.tempFiles[0].size> 2097152){
                  wx.showModal({
                      title: "提示",
                      content: "选择的图片过大，请上传不超过2M的图片",
                      showCancel: !1,
                      success: function(a) {
                          a.confirm;
                      }
                  })
              }else{
                  //把图片上传到服务器
                  e.upload_file(a.tempFiles[0].tempFilePath)
              }
          }
      });
      },
        upload_file: function(e) {
          console.log('zaizhe',e);
          var that = this
          console.log('IDIDI',app.globalData.userInfo.userId)
          wx.showLoading({
              title: "上传中"
          });
          console.log('IDIDI',app.globalData.userInfo.userId)
          wx.cloud.uploadFile({
              filePath: e,//图片路径
              cloudPath: app.globalData.userInfo.userId +count+ ".png",
              success(res) {
                console.log('成功')
                  count += 1
                  console.log(res.fileID)
                  that.updateAvatar(res.fileID)
                  wx.hideLoading();
                  wx.showToast({
                      title: "上传成功",
                      icon: "success",
                      duration: 1000
                  });
              },
              fail: function(a) {
                  wx.hideLoading();
                  wx.showToast({
                      title: "上传失败",
                      icon: "none",
                      duration: 3000
                  });
              }
          });
          
        },
        updateAvatar(url) {
          var that = this;
          console.log('url',url)
    
          // 更新聊天记录数据库中头像信息
          wx.cloud.database().collection('chat_record').where({
            userA_id : app.globalData.userInfo._id
          }).update({
            data : {
            userA_avatarUrl : url
            }
          })
    console.log('0000',app.globalData.userInfo._id)
    wx.cloud.database().collection('chat_record').where({
        userB_id : app.globalData.userInfo._id
      }).update({
        data : {
        userB_avatarUrl : url
        }
      })
    
          console.log(app.globalData.userInfo.userId)
        wx.cloud.database().collection('user_info').where({
            userId : app.globalData.userInfo.userId,
          }).update({
            data : {
            Img : url
            }
          })
          wx.cloud.database().collection('forhelp_info').where({
            userId : app.globalData.userInfo.userId,
          }).update({
            data : {
            Img : url
            }
          })
          wx.cloud.database().collection('report_info').where({
            userId : app.globalData.userInfo.userId,
          }).update({
            data : {
            Img : url
            },
            success(res) {
                console.log(res)
                wx.showToast({
                  title: '头像更新成功',
                });
                that.setData({
                    Img: url
                })
                app.globalData.userInfo.Img = url;
              }
          })
          app.globalData.userInfo.Img = url;
    
          this.onShow()
    
        },
    changename:function (){
        wx.showModal({
            title: '提示',
            content: '是否要更改昵称？',
            success: function(res) {
            if (res.confirm) {
                wx.showModal({
                title: '输入新昵称',
                success: function(res) {
                if (res.confirm) {
                    // 获取用户输入的新昵称
                    var newNickname = res.inputValue;
                    // 在这里根据需求进行昵称的更改操作
                    console.log('新昵称：', newNickname);
                    wx.cloud.database().collection('chat_record').where({
                         userA_id : app.globalData.userInfo._id
                          }).update({
                    data : {
                        userA_ID : newNickname
                        }
                    })
                    console.log('0000',app.globalData.userInfo._id)
                    wx.cloud.database().collection('chat_record').where({
                        userB_id : app.globalData.userInfo._id
                      }).update({
                        data : {
                        userB_ID : newNickname
                        }
                      })
                    
                    console.log(app.globalData.userInfo.userId)
                    wx.cloud.database().collection('user_info').where({
                            userId : app.globalData.userInfo.userId,
                          }).update({
                            data : {
                            ID : newNickname
                            }
                          })
                          wx.cloud.database().collection('forhelp_info').where({
                            userId : app.globalData.userInfo.userId,
                          }).update({
                            data : {
                            ID : newNickname
                            }
                          })
                          wx.cloud.database().collection('report_info').where({
                            userId : app.globalData.userInfo.userId,
                          }).update({
                            data : {
                            ID : newNickname
                            },
                            success(res) {
                                console.log(res)
                                wx.showToast({
                                  title: '昵称更新成功',
                                });
                                that.setData({
                                    ID: newNickname
                                })
                                app.globalData.userInfo.ID = newNickname;
                              }
                          })
                          app.globalData.userInfo.ID = newNickname;
                    
                         // this.onShow()
                        }
                      },
                      showCancel: false  // 隐藏取消按钮
                    });
                  }
                }
              });
        }
})