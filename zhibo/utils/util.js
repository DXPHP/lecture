const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const app = getApp()

function get(url, data = {}) {
  return request(url, data, 'GET')
}

/** 
 * POST请求封装
 */  
function post(url, data = {}) {  
  return request(url, data, 'POST','')
} 
 
function request(url, data = {}, method = "GET",refresh='') {

  var cacheTime = getStore('cacheTime');
  var timestamp = Date.parse(new Date);

  var diff = timestamp - cacheTime;
  if( diff > 3000000 && diff < 3590000){
    
    var contentType = 'application/json'
      wx.request({
        url: app.globalData.api + 'login/refresh',
        data: data,
        method: method,
        header: {
          'Content-Type': contentType,
          'authorization': getStore('token')
        },
        success: function (res) {
          console.log('______________________________');
          console.log(res.data.data.token);
          setStore('token', res.data.data.token);

          console.log(getStore('token'));
          console.log('______________________________');
          setStore('cacheTime', timestamp);
        },
        
      })
    
  }

 
  return new Promise(function (resolve, reject) {
    // data.token = getStore('token') 
    
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': contentType,
        'authorization': getStore('token')
      },
      success: function (res) {
        console.log('===================================================')
        console.log(JSON.stringify(res));
        console.log(res.data);
        console.log('===================================================')
        if (res.data.code == 200) {
          //请求正常200
         
        } else if (res.data.code == 401) {
          //此处验证了token的登录失效，如果不需要，可以去掉。
          //未登录，跳转登录界面
            console.log(111);
            wx.redirectTo({
              url: '/pages/login/login',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
        } else {
          //请求失败
          
        }
      },
      fail: function (err) {
        //服务器连接异常
       
      }
    })
  });
}


// 设置缓存时间，put('key','value',20) 表示设置缓存失效时间为20秒
var dtime = '_deadtime';
function setStore(k, v, t) {
  wx.setStorageSync(k, v)
  var seconds = parseInt(t);
  if (seconds > 0) {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000 + seconds;
    wx.setStorageSync(k + dtime, timestamp + "")
  } else {
    wx.removeStorageSync(k + dtime)
  }
}

// 获取缓存的数据 get('key')
function getStore(k, def) {
  var deadtime = parseInt(wx.getStorageSync(k + dtime))
  if (deadtime) {
    if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
      if (def) { return def; } else { return; }
    }
  }
  var res = wx.getStorageSync(k);
  if (res) {
    return res;
  } else {
    return def;
  }
}

// 移除缓存 remove('key')
function remove(k) {
  wx.removeStorageSync(k);
  wx.removeStorageSync(k + dtime);
}
// 清除全部
function clear() {
  wx.clearStorageSync();
}


module.exports = {
  formatTime: formatTime,
  request,
  get,
  post,
  setStore,
  getStore
}