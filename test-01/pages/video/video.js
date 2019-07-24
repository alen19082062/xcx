// pages/video/video.js
var notice = require('../../utils/notice.js');
var videoUtil = require('../../utils/videoBiz.js');

var app = getApp();
Page({
	data:{
  	video_groups: [],
		chl_groups: [] ,
 		header: 'init data',
  	maxpage: 0 ,
		currentTab: 0 ,
  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;

		var chl_groups = videoUtil.chlList();
    // 默认显示 精选 频道
		var chl = chl_groups[0]; 
		console.log('频道 1 : ' );
		console.log(chl); 

		console.log('频道 ID : ' + chl.id );
    // 取视频信息 
		var url = app.globalData.host + 'video/qq_110/svc_mobile.php?eventID=vlist';
		wx.request( {
			url:url,
			method: 'POST',
			data: {"tid":chl.id,"privilege":"0","sortby":"2",
             "cate_id":chl.id,"area":"-1","item":"-1","year":"-1",
              "zurpage":20,"page":1,
              "mobile":app.globalData.cy_user.mobile,
							"product_code":app.globalData.cy_user.product_code},
			header:{
				'Content-Type':'application/json'
			},
			success:function(res) {
				console.log(res.data); 
        
				var video_list = res.data.video;
				// 把可控制的设备列出来 
        var video_groups = new Array();

        var len = video_list.length ;
        var group_count = parseInt(len/5)  ;
        console.log("onLoad() 共有视频 : " + len + ", 分为  " + group_count + " 组 " ); 

				for (var i = 0 ; i< group_count ; i++){
          				
          var videos = new Array();
          for (var j=0 ; j<5 ;j++) {
					  var video = video_list[i*5+j] ;
					  // 整理成视频文件
		        var simple_video = videoUtil.newVideo(video);
				    videos.push(simple_video); 
				  }
          video_groups.push(videos);
        }
				console.log(video_groups); 
          
				that.setData({
 					video_groups: video_groups,
					chl_groups: chl_groups,
          maxpage: res.data.maxpage,
					currentTab: 0,
 				})
			  console.log("onLoad() success get data"); 

				// 保存起来，供下次使用
	 	    that.data.chl_groups[0][4] = video_groups;

			    // console.log(count);
			},
			
			fail:function(err) {
			    console.log("onLoad() fail to get videos ! "); 
					console.log(err); 
					notice.modelErrMsg('取频道列表失败，过会再试下吧');
					return ;
			}
		});
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
		console.log( "onPullDownRefresh() 下拉刷新...." );
    this.onLoad()
	},

  // 上拉加载回调接口
  onReachBottom: function () {
		var that = this;
    console.log( "onReachBottom() 到底部，取新数据...." )
    var currentTab = that.data.currentTab ;

		console.log( "currentTab = " + currentTab )

		if ( currentTab == 0 ){
			console.log( "onReachBottom() 精选频道，不必要重取..." );
			return ;
		}

		var chl_groups = that.data.chl_groups ;
		var chl = chl_groups[currentTab] ;
		console.log(  chl )
		var curr_page = chl.curr_page ;
		console.log( "onReachBottom() curr_page = " + curr_page );

		if ( curr_page >= chl.max_page ){
			console.log( "onReachBottom() 已经到最后一页了..." );
			return ;
		}

		curr_page = curr_page + 1 ;
		// 保存起来，供下次使用
		that.data.chl_groups[currentTab].curr_page = curr_page;

		console.log('频道 ID : ' + chl.id );
    // 取视频信息 
		var url = app.globalData.host + 'video/qq_110/svc_mobile.php?eventID=vlist';
		wx.request( {
			url:url,
			method: 'POST',
			data: {"tid":chl.id,"privilege":"0","sortby":"2",
             "cate_id":chl.id,"area":"-1","item":"-1","year":"-1",
              "zurpage":20,"page":curr_page,
              "mobile":app.globalData.cy_user.mobile,
							"product_code":app.globalData.cy_user.product_code},
			header:{
				'Content-Type':'application/json'
			},
			success:function(res) {
				console.log(res.data); 
        
				// 原有的视频信息 
        var video_groups = that.data.video_groups;

				var video_list = res.data.video;

        var len = video_list.length ;
        var group_count = parseInt(len/5)  ;
        console.log("onLoad() 共有视频 : " + len + ", 分为  " + group_count + " 组 " ); 

				for (var i = 0 ; i< group_count ; i++){
          				
          var videos = new Array();
          for (var j=0 ; j<5 ;j++) {
					  var video = video_list[i*5+j] ;
					  // 整理成视频文件
						var simple_video = videoUtil.newVideo(video);
				    videos.push(simple_video); 
				  }
          video_groups.push(videos);
        }
				console.log("video_group length = " +  video_groups.length); 
				console.log(video_groups); 

				// 保存数据
				that.data.video_groups = video_groups;
				
				that.setData({
 					video_groups: video_groups,
					chl_groups: chl_groups,
          maxpage: res.data.maxpage,
					currentTab: currentTab,
 				})
			  console.log("onReachBottom() success get data"); 

				// 保存起来，供下次使用
	 	    // that.data.chl_groups[0][4] = video_groups;

 			},
			
			fail:function(err) {
			    console.log("onReachBottom() fail to get videos ! "); 
					console.log(err); 
					notice.modelErrMsg('取频道列表失败，过会再试下吧');
					return ;
			}
		});

  },

  // 设备点击事件 
	click_video : function(event){
			var that = this;

      console.log(event); 
	    var pos = parseInt(event.currentTarget.id);
        console.log("click_video() pos = " + pos); 
        console.log("click_video() video_groups length = " + that.data.video_groups.length); 

        // 找出哪部视频, 先 group ，再 index
        var group_pos = parseInt(pos/5) ;
        var index = pos % 5 ;
        console.log("click_video() group_pos : " + group_pos + " , index = " + index   ); 

        var videos =  that.data.video_groups[group_pos] ;
        var video = videos[index];
	      console.log("click_video() video : " + video.title + " , " + video.cid ); 
		    var tid = video.tid ;
		    var cid = video.cid ;
		    var title = video.title ;
 
        var cy_user = app.globalData.cy_user;
        var mobile = cy_user.mobile ;   
				var SID =  cy_user.SID ;
				var env =  app.globalData.env ;
				var url = env.host + 'wx_xcx/svc_wx_xcx.php?eventID=video.cmd&SID=' + SID ;

		  wx.request( {
			  url: url,
			  method: 'POST',
			  data: { "mobile": mobile, "cid": cid , "tid":tid ,
                "v_title" : title ,"episode_no": "0" } ,
			  header:{
				  'Content-Type':'application/json'
			  }, 
			  success:function(res) {
			    console.log("click_video() success post cmd !"); 
				  console.log(res.data); 
					var ret = res.data.ret ;
					var msg = res.data.msg ;
					if ( ret != '0'){
						msg = msg + "(" + ret + ")" ;
						notice.toastErrMsg(msg) ;
					}
			},

			fail:function(ret){
	    		console.log("fail to post cmd !  ret = "  + ret ); 
					var msg = "播放视频失败，请稍后再试" ;
					notice.toastErrMsg(msg) ;
			}
		});
	},   

 // 频道点击事件 
	click_cate : function(event){
		    var that = this;

      console.log(event); 
	    var pos = parseInt(event.currentTarget.id);
        console.log("click_cate() pos = " + pos); 
        console.log("click_cate() cate length = " + that.data.chl_groups.length); 

	 var chl = that.data.chl_groups[pos];
	console.log(chl); 

	 var tid = chl.id;
	 // 是否已经取过了 ? 
	 var videos = chl.videos;
	 console.log(videos); 

	 if ( videos != null && videos.length > 3 ){
		   console.log("click_cate() " + chl.name + " 已有视频，不需要重取 " ); 

				that.setData({
 					video_groups: videos,
					currentTab:pos
  			})
				return ;
	 }

		console.log("click_cate() " + chl.name + " 没有视频列表，重新取一次 " ); 

	  // 取视频信息 
		var url = app.globalData.host + 'video/qq_110/svc_mobile.php?eventID=vlist';
		wx.request( {
			url:url,
			method: 'POST',
			data: {"tid":tid,"privilege":"0","sortby":"2",
             "cate_id":tid,"area":"-1","item":"-1","year":"-1",
              "zurpage":20,"page":1,
              "mobile":app.globalData.cy_user.mobile,
							"product_code":app.globalData.cy_user.product_code},
			header:{
				'Content-Type':'application/json'
			},
			success:function(res) {
				console.log(res.data); 
        
				var video_list = res.data.video;
				// 把可控制的设备列出来 
        var video_groups = new Array();

        var len = video_list.length ;
        var group_count = parseInt(len/5)  ;
        console.log("click_cate() 共有视频 : " + len + ", 分为  " + group_count + " 组 " ); 

				for (var i = 0 ; i< group_count ; i++){
          				
          var videos = new Array();
          for (var j=0 ; j<5 ;j++) {
					  var video = video_list[i*5+j] ;
					  // 整理成视频文件
						var simple_video = videoUtil.newVideo(video);
				    videos.push(simple_video); 
				  }
          video_groups.push(videos);
        }
				console.log(video_groups); 

				// 保存起来，供下次使用
	 	    that.data.chl_groups[pos][4] = video_groups;
				that.data.currentTab = pos ;

				that.setData({
 					video_groups: video_groups,
          maxpage: res.data.maxpage,
					currentTab:pos
 				})
  
			  console.log("click_cate() success get data"); 

			    // console.log(count);
			},
			
			fail:function(err) {
			    console.log("video.js fail to get videos ! "); 
					console.log(err); 
					notice.modelErrMsg('取视频失败，过会再试下吧');
					return ;
			}
		});
	}

})