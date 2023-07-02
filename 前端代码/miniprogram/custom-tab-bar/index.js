const app = getApp()
Component({
    data: {
     
      color: "#afafaf",
      selectedColor: "#49315c",
      list: [
          {
                "pagePath": "/pages/map/map",
                "text": "首页",
                "iconPath": "../image/首页(1).png",
                "selectedIconPath": "../image/首页.png"
            },
            {
              "pagePath": "/pages/search/search",
              "iconPath": "../image/搜索1.png",
              "selectedIconPath": "../image/搜索.png",
              "text": "搜索"
            },
            {
              "pagePath": "/pages/add/add",
              "iconPath": "../image/增加1.png",
              "selectedIconPath": "../image/增加.png",
              bulge:true,
              "text": ""
            },
            {
              "pagePath": "/pages/message/message",
              "iconPath": "../image/_消息 (1).png",
              "selectedIconPath": "../image/_消息.png",
              "text": "消息"
            },
            {
                "pagePath": "/pages/my/my",
                "text": "我的",
                "iconPath": "../image/_我的 (1).png",
                "selectedIconPath": "../image/_我的.png"
            }
      ]
    },
    ready: function() {
        this.setData({
          selected: app.globalData.selected
          
        })
      },
    attached() {
    },
    methods: {
        switchTab(e) {
            // console.log(e);
            const data = e.currentTarget.dataset;
            const url = data.path;
            app.globalData.selected = data.index;
            console.log(data.index);
            wx.switchTab({url})
          }
          
        }
  })