//pages/express/express.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    comArray: ['顺丰', '申通', '圆通', '韵达', '天天', 'EMS', '京东'],
    comObjectArray: [{
      id: 0,
      name: '顺丰',
      no: 'sf'
    },
    {
      id: 1,
      name: '申通',
      no: 'sto'
    },
    {
      id: 2,
      name: '圆通',
      no: 'yt'
    },
    {
      id: 3,
      name: '韵达',
      no: 'yd'
    },
    {
      id: 4,
      name: '天天',
      no: 'tt'
    },
    {
      id: 5,
      name: 'EMS',
      no: 'ems'
    },
    {
      id: 6,
      name: '京东',
      no: 'jd'
    },
    ],
    comIndex: 0,
    expressCom: null,
    expressNu: null,
    expressInfo: null
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      comIndex: e.detail.value,
      expressCom: this.data.comObjectArray[e.detail.value].no
    })
    // console.log(this.data.comIndex, this.data.expressCom)
  },
  btnClick: function () {
    var thispage = this;
    app.getExpressInfo(this.data.expressCom, this.data.expressNu, function (data) {
      // console.log(data)
      thispage.setData({
        expressInfo: data
      })
    });
  },
  input: function (e) {
    this.setData({
      expressNu: e.detail.value
    })
  }
})