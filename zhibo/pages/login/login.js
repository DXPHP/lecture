const app = getApp()

var util = require('../../utils/util.js');
Page({
  data: {
    user_number: '',
    password: '',
    success: false,
    text: '',
    user_type:'',

  },

  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      user_number: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  radiochange: function (e) {
    this.setData({
      user_type: e.detail.value
    })
  },
  // 登录 
  login: function () {
    var that = this;
  
    var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空
    if (that.data.user_number.length == 0) {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (that.data.password.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (that.data.user_type.length ==0){
      wx.showToast({
        title: '用户类型不能为空',
        icon: 'none',
        duration: 1000
      })
    } else  {

      wx.request({
        url: app.globalData.api+'login/login',
        method: "POST",
        data: {
          user_number: that.data.user_number,
          password: that.data.password,
          user_type: that.data.user_type,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
            var ret = res.data;
            console.log(ret);
            if(ret.code==200){

              wx.showToast({
                title: ret.msg,
                icon: 'none',
                duration: 1000
              })
             
              console.log(ret.data.token);
              util.setStore('token', ret.data.token);
              util.setStore('userInfo', ret.data.userInfo);
              var cacheTime = Date.parse(new Date);
              util.setStore('cacheTime', cacheTime);
             wx.switchTab({
               url: '/pages/index/index',
               success: function(res) {},
               fail: function(res) {},
               complete: function(res) {},
             })
            } else {
              wx.showToast({
                title: ret.msg,
                icon: 'none',
                duration: 1000
              })
            }
        }

      })



    }
  },


})
