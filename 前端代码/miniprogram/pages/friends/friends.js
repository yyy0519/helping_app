// pages/friends/friends.js

const app = getApp()

const utils = require("../../utils/util")

Page({

    data: {
        help_id:'',
        helper:{
            _id:'',
            ID:'',
            Img:'',
            avatarUrl:'',
            nickname:'',
            userId:''
        },
        friend_status:false,
        
    },
    onShow() {
        this.setData({
            userInfo : app.globalData.userInfo
        })
        
        
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {

          this.getTabBar().setData({

              selected: 3

          })

      }
      this.getNewFriends()
            this.getMyfriend()
            this.getAllUser()
    },
//获取到求助人信息,从求助详情页点击帮助跳转过来，显示这个求助人的添加好友信息
    onLoad:function(e){
        const _ = wx.cloud.database().command;
        this.setData({
            userInfo : app.globalData.userInfo
        })
        let that=this
        var help
        console.log("help_detail",e.help_detail)
        if(e.help_detail!=undefined){
            help=JSON.parse(e.help_detail)
            console.log("help解析后",help)
            wx.cloud.database().collection('user_info').where({
                userId:help.userId
            }).get({
                success(res) {
                    console.log("help",res.data[0])
                    that.setData({
                        helper : res.data[0]
                    })
                    
                }
            })
            wx.cloud.database().collection('user_info').where({
                _id: _.in(that.data.userInfo.friends).and(_.eq(that.data.helper._id))
            }).get({
                success(res) {
                    console.log("用户",res)
                    if(res!=''){
                        that.setData({
                            friend_status:true
                        })
                    }
                    
                    // if(res.data[0].friends.indexOf(that.data.helper._id)>=0){
                    
                    // }
                    // console.log("friend_status",res.data[0].friends.indexOf(that.data.helper._id))
                }
            })
            
            this.getNewFriends()
            this.getMyfriend()
            this.getAllUser()

        }

        console.log("_id",help)
        this.setData({
            userInfo : app.globalData.userInfo
        })
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {

          this.getTabBar().setData({

              selected: 3

          })
      }
     
    },


    // 获取所有用户信息
    getAllUser() {
        var that = this;
        const _ = wx.cloud.database().command;
        
        wx.cloud.database().collection('user_info').where({
            _id: _.nin(that.data.userInfo.friends).and(_.neq(that.data.userInfo._id)).and(_.neq(that.data.helper._id))//nin表示不在用户的已加好友中，neq表示不是用户本人
        }).get({
            success(res) {
                console.log("user_list",res.data)
                that.setData({
                    user_list : res.data
                })

            }
        })
    },
    
    addFriend(e) {
        // var index = e.currentTarget.dataset.index;
        var that = this;
        console.log("friend",that.data.userInfo._id)
        wx.cloud.database().collection('chat_record').where({
            userA_id : that.data.userInfo._id,
            userA_ID : that.data.userInfo.nickname,
            userB_id : that.data.helper._id,
            userB_ID : that.data.helper.nickname,
        }).get({
            success(res){
                console.log("添加好友",res)
                
                  console.log("data",res.data)
                if(res.data!=''){
                    console.log("data111",res.data[0]._id)
                    wx.showToast({
                        title: '请勿重复添加好友!',
                        icon: 'none',
                        duration: 2000
                      })
                    
                }
                else{
                    wx.cloud.database().collection('chat_record').add({
                        data:{
                            userA_id : that.data.userInfo._id,
                            userA_ID : that.data.userInfo.nickname,
                            userA_avatarUrl : that.data.userInfo.avatarUrl,
            
                            userB_id : that.data.helper._id,
                            userB_ID : that.data.helper.nickname,
                            userB_avatarUrl : that.data.helper.avatarUrl,
            
                            record : [],
                            friend_status : false,
                            time: utils.formatTime(new Date())
                        },
                        success(res) {
                            console.log("发送好友请求",res)
                            wx.showToast({
                              title: '已发送好友申请',
                            })
                        }
                    })
                }
            }

        })
        

    },
    addqiuzhu(e){
        var that = this;
        //var helperuserId = e.currentTarget.dataset.userId;
        console.log("helpuserId",this.data.helper.userId)
        wx.cloud.database().collection('user_info').where({
            userId:that.data.helper.userId
        }).get({
            success(res) {
                console.log("help好友组",res.data[0])
                console.log("help好友",res.data[0].Img)
                    wx.cloud.database().collection('chat_record').add({
                        data:{
                            userA_id : that.data.userInfo._id,
                            userA_ID : that.data.userInfo.nickname,
                            userA_avatarUrl : that.data.userInfo.Img,
            
                            userB_id : res.data[0]._id,
                            userB_ID : res.data[0].nickname,
                            userB_avatarUrl :res.data[0].avatarUrl,
            
                            record : [],
                            friend_status : false,
                            time: utils.formatTime(new Date())
                        },
                        success(res) {
                            console.log("已发送好友申请",res)
                            wx.showToast({
                              title: '已发送好友申请',
                            })
                        }
                    })
            }
        })
   
        
    },
    getNewFriends() {
        this.setData({
            userInfo : app.globalData.userInfo
        })
        var that = this;
        wx.cloud.database().collection('chat_record').where({
            userB_id: that.data.userInfo._id,
            friend_status : false
        }).get({
            success(res) {
                console.log("new_friends",res);
                that.setData({
                    new_friends : res.data
                })
            }
        })
    },
    acceptNewFriend(e) {
        var index = e.currentTarget.dataset.index;
        var that =  this;
        // console.log("好友_id",that.data.new_friends[index]._id)

        wx.cloud.database().collection('chat_record').doc(that.data.new_friends[index]._id).get({
           
            success(res) {
                console.log("更新好友",res.data.friend_status)
                
            }
        })



        wx.cloud.database().collection('chat_record').where({_id:that.data.new_friends[index]._id}).update({
            data:{
                friend_status: true
            },
            success(res) {
                
                wx.showToast({
                  title: '已通过好友',
                })

                that.setData({
                    new_accepted_friend_id : that.data.new_friends[index].userA_id
                })
                console.log("好友id",that.data.new_friends[index].userA_id)
            }
        })

        // AB成为朋友
        wx.cloud.database().collection('user_info').where({
            _id : that.data.userInfo._id
        }).get({
            success(res) {
                console.log('成为朋友',res.data)
                var my_friends = res.data[0].friends;
                my_friends.push(that.data.new_friends[index].userA_id)
                app.globalData.userInfo.friends = my_friends                
                wx.cloud.database().collection('user_info').where({
                    _id : that.data.userInfo._id
                }).update({
                    data : {
                        friends : my_friends
                    }
                    
                })
            }
        })

    

        wx.cloud.database().collection('user_info').where({
            _id : that.data.new_friends[index].userA_id
        }).get({
            success(res) {
             
                var A_friends = res.data[0].friends;
                A_friends.push(that.data.userInfo._id)
                wx.cloud.database().collection('user_info').where({
                    _id : that.data.new_friends[index].userA_id
                }).update({
                    data : {
                        friends : A_friends
                    }
                })
                that.onShow()
            }
        })
    },

    // 对话信息
    getMyfriend() {
        var that = this;
        const DB = wx.cloud.database().command;
        wx.cloud.database().collection('chat_record').where(
            DB.or([
                {
                    userA_id:that.data.userInfo._id,
                    friend_status: true
                },
                {
                    userB_id:that.data.userInfo._id,
                    friend_status: true
                }
            ])
        ).get({
            success:(res)=>{
                console.log("myfriends",res)
                this.setData({
                    my_friends : res.data
                })
            }
        })

        
    },


    startChat(e) {
        var index = e.currentTarget.dataset.index;
        var that=this
        console.log('index',index)
        console.log('朋友_id',that.data.my_friends[index]._id)
        wx.navigateTo({
          url: '/pages/chat/chat?id=' + that.data.my_friends[index]._id
        })
    }
})