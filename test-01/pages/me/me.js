// pages/more/more.js

var app = getApp();

Page({
  data:{
    cy_user:null,
    userInfo:null
  },
  onLoad:function(options){
    var that = this;

    var cy_user = app.globalData.cy_user;
    var  userInfo= app.globalData.userInfo;
    console.log(cy_user ); 
    console.log(userInfo ); 

   /*
    //调用应用实例的方法获取全局数据
    var userInfo = null ;
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
        cy_user : cy_user,
      })
    })
  */
    
    that.setData({
        userInfo:userInfo,
        cy_user : cy_user,
      })

    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
 
  // 下拉刷新回调接口
  onPullDownRefresh: function () {
		console.log( "下拉刷新...." )
    	this.onLoad()
	},
  
 formBindsubmit:function(e){
       var that = this;

    console.log(e);   
    var mobile =  e.detail.value.mobile ;
    var home_id =  e.detail.value.home_id ;
    console.log('mobile = ' + mobile + " , home_id = " + home_id );   

    if(mobile.length==0){
       console.log('手机号不能为空！');  
       return ; 
    }
    if(home_id.length==0){
       console.log('HOME_ID不能为空！');   
       return ; 
    }

    var cy_user = new Object() ;
    cy_user.mobile = mobile ;
    cy_user.home_id = home_id ;

    app.globalData.cy_user.mobile = cy_user.mobile;
    app.globalData.cy_user.home_id = cy_user.home_id;
    
    var userInfo= app.globalData.userInfo;

    that.setData({
        cy_user:cy_user    
    });
    
  },

  
  formReset:function(){
    console.log('formReset');  

    var that = this;
    var userInfo= app.globalData.userInfo;
    var cy_user = app.globalData.cy_user;
    console.log(cy_user);   

    that.setData({
        userInfo:userInfo,
        cy_user:cy_user,
    });
   
  } 
   
    
})