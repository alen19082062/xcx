var devBiz = require('../../utils/devBiz.js');

var app = getApp();
Page({
	data:{
    	//  设备列表 
    	ctl_devices: [],
		arr: [],
		header: 'init data',
    },
	onLoad:function(){
		var that = this;
	    var cy_user = app.globalData.cy_user;
        var mobile = cy_user.mobile ;   
        var home_id = cy_user.home_id ;   
		var SID =  cy_user.SID ;
 		var env =  app.globalData.env ;
		var url = env.host + 'wise/v2/svc_dumb_dev.php?eventID=qry.dumb_dev&SID=' + SID + '&HOME_ID' + home_id + "&MOBILE=" + mobile;

		wx.request( {
			url:url,
			method: 'POST',
			data: { "cmd_type": "qry", "cmd": "switch" } ,
			header:{
				'Content-Type':'application/json'
			},
			success:function(res) {
				console.log(res.data); 

				var devices = res.data.devices ;
				// 把可控制的设备列出来 
				var ctl_devices = new Array();
				for (var i = 0 ; i< devices.length; i++){
					var dev = devices[i] ;
					// 是否为控制设备？
					var ctl_dev = devBiz.ctlDev(dev);
					if ( ctl_dev == null ){
						console.log("skip " + dev.dev_name + " " + dev.dev_type); 
						continue;
					}
				    ctl_devices.push(ctl_dev); 
				}
				console.log(ctl_devices); 

				that.setData({
					count : res.data.count,
					// devices: res.data.devices,
					ctl_devices : ctl_devices,
 				})
			    console.log("success get data"); 

			    // console.log(count);
			},
			
			fail:function(err) {
			    console.log("fail to get data"); 

                /*
				wx.showToast({
  					title: '出错啦',
  					icon: 'success',
  					duration: 2000
				});
                 */
				
				wx.showModal({
					title: '出错啦',
					content: '没有取到可控制的设备',
					showCancel:false ,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
						}
					}
				});

				that.setData({
					 
				 
				})
			}
		});
	},

    // 下拉刷新回调接口
    onPullDownRefresh: function () {
		console.log( "下拉刷新...." )
    	this.onLoad()
	},

    // 设备点击事件 
	click_event : function(event){
        // console.log(event.currentTarget.id); 
	    var pos = parseInt(event.currentTarget.id);
        console.log("clicked, pos = " + pos); 
        console.log("clicked, device length = " + this.data.ctl_devices.length); 

        var ctl_dev =  this.data.ctl_devices[pos] ;
	    console.log("clicked, ctl_dev : " + ctl_dev.name + " , " + ctl_dev.switch_status ); 
		var dev_id = ctl_dev.id ;
		var cmd = 'open' ;
		if (　ctl_dev.switch_status == 1 　){
			cmd = 'close' ;
		}

 	    var cy_user = app.globalData.cy_user;
        var mobile = cy_user.mobile ;   
        var home_id = cy_user.home_id ;  
		var SID =  cy_user.SID ;
		var env =  app.globalData.env ;
		var url = env.host + 'wx_xcx/svc_wx_xcx.php?eventID=dev.cmd&SID='+ SID;
		console.log(url); 

		wx.request( {
			url:url,
			method: 'POST',
			data: { "mobile": mobile, "cmd": cmd , "dev_id" : dev_id ,"cmd_content": "" } ,
			header:{
				'Content-Type':'application/json'
			},
			success:function(res) {
				console.log(res.data); 

			    console.log("success post cmd !"); 

				//this.setData({
				//	ctl_devices : this.data.ctl_devices,
				//	header: "clicked " + pos
 				//})
			    // console.log(count);
			},

			fail:function(res){
	    		console.log("fail to post cmd !   "  ); 
	    		console.log( res ); 
			}
		});
       
		var dev = devBiz.switchSelf(ctl_dev);
		this.data.ctl_devices[pos] = dev ;

		this.setData({
			ctl_devices : this.data.ctl_devices,
			header: "clicked " + pos
 		})
		 
    } ,
	

})