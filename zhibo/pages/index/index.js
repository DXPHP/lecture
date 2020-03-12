//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    //motto: 'Hello World',
    userInfo: {},
    // showMasking2:true,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    coursesData2: {
      courses2ContentList: [
        {
          courses2Title: '2019级第30讲',
          courses2Url: "/pages/monthCourse/monthCourse",
          contentTime: "12月31日(周六) 12:30",
          address:'知行楼',
          status: "0",
          contentImage: "/img/image22.png",
          regTime:'12月30日(周六) 12:30',
          number:'500',
          speaker:'韦福东',
          img:'/img/image22.png',
        },
        {
          courses2Title: '2019级第30讲',
          courses2Url: "/pages/monthCourse/monthCourse",
          contentTime: "12月31日(周六) 12:30",
          address: '知行楼',
          status: "1",
          contentImage: "/img/image22.png",
          regTime: '12月30日(周六) 12:30',
          number: '500',
          speaker: '韦福东',
          img: '/img/image22.png',
        },
        {
          courses2Title: '2019级第30讲',
          courses2Url: "/pages/monthCourse/monthCourse",
          contentTime: "12月31日(周六) 12:30",
          address: '知行楼',
          status: "2",
          contentImage: "/img/image22.png",
          regTime: '12月30日(周六) 12:30',
          number: '500',
          speaker: '韦福东',
          img: '/img/image22.png',
        },
      ]
    },

    newContent:"2016级第16讲推迟到1月30日"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //签到
  scanCode:function(){
    wx.navigateTo({
      url: '/pages/scanCode/scanCode',
    })
  },
  //报名
  apply:function(){
      wx.navigateTo({
        url: '/pages/marketing/marketing'
      })
  },
  clickCase: function () {
    wx.navigateTo({
      url: '/pages/case/case'
    })
  },
  applyCourse: function () {
    wx.navigateTo({
      url: '/pages/applyCourse/applyCourse'
    })
  },
  clickNews: function () {
    wx.navigateTo({
      url: '/pages/news/news'
    })
  },
  clickSmallClass: function () {
    wx.navigateTo({
      url: '/pages/SmallClass/SmallClass'
    })
  },
  clickServe: function () {
    wx.navigateTo({
      url: '/pages/serve/serve'
    })
  },
  clickActivity: function () {
    wx.navigateTo({
      url: '/pages/activity/activity'
    })
  },
  openCoursesD: function () {
    wx.navigateTo({
      url: '/pages/courseDetails/courseDetails',
    })
  },
  submit: function () {//打开蒙版
    this.setData({
      showMasking: true
    })
  },
  close_mask: function () {//取消蒙版
    this.setData({
      showMasking: false,
      showMasking2:false
    })
  },
  clickSign:function(){
    this.setData({
      showMasking: false,
      showMasking2: true 
    })
  },
  onLoad: function () {

    // console.log(util.getStore('token'));
    
      var url = app.globalData.api + 'index/index';
      util.post(url);

    
    
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
