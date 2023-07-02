// pages/friends/friends.js

const app = getApp()

const utils = require("../../utils/util")

Page({

    data: {
        
    },
    onShow() {

        this.getNewFriends()
        this.getMyfriend()
        this.getAllUser()
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {

          this.getTabBar().setData({

              selected: 3

          })

      }
    },

    onLoad() {
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
            _id: _.nin(that.data.userInfo.friends).and(_.neq(that.data.userInfo._id))
        }).get({
            success(res) {
                console.log("user_list")
                console.log(res.data)
                that.setData({
                    user_list : res.data
                })
            }
        })
    },
    addFriend(e) {
        var index = e.currentTarget.dataset.index;
        var that = this;

        wx.cloud.database().collection('chat_record').add({
            data:{
                userA_id : that.data.userInfo._id,
                userA_ID : that.data.userInfo.ID,
                userA_avatarUrl : that.data.userInfo.avatarUrl,

                userB_id : that.data.user_list[index]._id,
                userB_ID : that.data.user_list[index].ID,
                userB_avatarUrl : that.data.user_list[index].avatarUrl,

                record : [],
                friend_status : false,
                time: utils.formatTime(new Date())
            },
            success(res) {
                console.log(res)
                wx.showToast({
                  title: '已发送好友申请',
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
                console.log(res);
                that.setData({
                    new_friends : res.data
                })
            }
        })
    },
    acceptNewFriend(e) {
        var index = e.currentTarget.dataset.index;
        var that =  this;
        wx.cloud.database().collection('chat_record').doc(that.data.new_friends[index]._id).update({
            data:{
                friend_status: true
            },
            success(res) {
                //console.log(res)
                wx.showToast({
                  title: '已通过好友',
                })

                that.setData({
                    new_accepted_friend_id : that.data.new_friends[index].userA_id
                })
            }
        })

        // AB成为朋友
        wx.cloud.database().collection('user_info').where({
            _id : that.data.userInfo._id
        }).get({
            success(res) {
                console.log(res.data)
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
                //console.log(res)
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
                console.log("获取数据成功",res)
                this.setData({
                    my_friends : res.data
                })
            }
        })

        
    },


    startChat(e) {
        var index = e.currentTarget.dataset.index;

        wx.navigateTo({
          url: '/pages/chat/chat?id=' + this.data.my_friends[index]._id
        })
    }
})