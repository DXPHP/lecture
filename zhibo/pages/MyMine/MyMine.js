// pages/MyMine/MyMine.js
const app = getApp()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name:"",
    user_post:"201405402107",
    userInfo: {},
    show:false,
    hasUserInfo:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  
    var userInfo = util.getStore('userInfo');
    this.setData({
      user_name:userInfo.username,
      user_post:userInfo.user_number
    });
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     user_name: app.globalData.userInfo.nickName,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       user_name:res.userInfo.nickName,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         user_name: res.userInfo.nickName,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  ClickPersonality: function () {//个人信息
    wx.navigateTo({
      url: '/pages/member/member',
    })
  },
  clickIndent: function () {//资料下载
    wx.navigateTo({
      url: '/pages/indent/indent'
    })
  },
  clickEvaluate: function () {//资料下载
    wx.navigateTo({
      url: '/pages/evaluate/evaluate'
    })
  },
  clickFootprint: function () {//我的足迹
    wx.navigateTo({
      url: '/pages/footprint/footprint'
    })
  },
  clickWaiter: function () {//我的客服
    wx.navigateTo({
      url: '/pages/waiter/waiter'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  takePhoto() {
    this.setData({
     show:true 
    })
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
      
        wx.uploadFile({
          url: 'https://www.w-ls.cn/index.php', //仅为示例，非真实的接口地址
          filePath: res.tempImagePath,
          name: 'file',
          formData: {
            'user': 'test'
          },
          success(res) {
            const data = res.data
            console.log(data);
            //do something
          }
        })

     
        // this.setData({
        //   src: res.tempImagePath
        // })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  }
})