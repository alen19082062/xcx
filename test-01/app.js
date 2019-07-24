//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [] ;
    logs.unshift(Date.now()) ;
    wx.setStorageSync('logs', logs) ;
    var that = this ;

    // 配置绑定用户号及家庭号，用于设备控制
    var cy_user = new Object(); 
    cy_user.mobile = '13823569515';
    cy_user.home_id = '24000';
    cy_user.SID = '88888888';
    that.globalData.cy_user = cy_user ;

    var env = new Object();  
    env.host = "https://www.a371369.cn/" ;
    that.globalData.env = env ;
    that.globalData.host = "https://www.a371369.cn/" ;

//调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              console.log("App.js success login"); 
              that.globalData.userInfo = res.userInfo
              console.log(that.globalData.userInfo ); 
              typeof cb == "function" && cb(that.globalData.userInfo)
              
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
          })
        }
      });

  },


  
  getUserInfo:function(cb){
    console.log("App.js getUserInfo() "); 
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              console.log("App.js success login"); 
              that.globalData.userInfo = res.userInfo
              console.log(that.globalData.userInfo ); 
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  globalData:{
    userInfo:null,
    cy_user:null,
    env:null
  }
})