var util = require('../../utils/util.js');
var notice = require('../../utils/notice.js');
var sceneBiz = require('../../utils/sceneBiz.js');

var app = getApp();
Page({
	data:{
    	//  场景列表 
    	normals: [],
		security_scene: {},
		normal_header: '场景',
		security_header: '安防', 
		count : 0 
    },
	onLoad:function(){
		var that = this;
		
		var cy_user = app.globalData.cy_user;
        var mobile = cy_user.mobile ;   
        var home_id = cy_user.home_id ;  
		var SID =  cy_user.SID ;
		var url = app.globalData.host + 'wise/v2/svc_home_scene.php?eventID=qry.svc&MOBILE='+ mobile + '&HOME_ID='+ home_id + '&SID='+ SID;
		console.log(url); 

		wx.request( {
 			url:url,
			method: 'POST',
			data: { "mobile": mobile   } ,
			header:{
				'Content-Type':'application/json'
			},
			success:function(res) {
			    console.log("Scene.js success to get data"); 
			    console.log( res ); 
				//if ( res.statusCode = 404) {
				//	notice.modelErrMsg('没有取到合适的场景，过会再试下吧');
				//	return ;
				//}

				console.log(res.data.count);  
 				var scene_list = res.data.scene_list ;
				// 把可控制的设备列出来 
				var normals = new Array();
				var security_scene = null ;
				for (var i = 0 ; i< scene_list.length; i++){
					var scene = scene_list[i] ;
				    console.log("scene " + scene.scene_name + " , scene_id = " + scene.scene_id );
					if ( scene.scene_type == 1 ) {
                    	var normalScene = sceneBiz.newNormalScene(scene);
						if ( normalScene != null ){
				    		normals.push(normalScene); 
						}
					}
					
					if  ( scene.scene_type == 9 ) {
                    	security_scene = sceneBiz.newSecurityScene(scene);
						if ( security_scene != null ){
							console.log("安全场景 : " + security_scene.scene_name + " , status  = " + security_scene.scene_status );
						}
					}
					
				}
				// console.log(normals); 

				that.setData({
					count : res.data.count,
					normals : normals,
					security_scene : security_scene 
 				})
			    console.log("Scene.js success to get data"); 

			    // console.log(count);
			},
			
			fail:function(err) {
			    console.log("Scene.js fail to get data"); 
				console.log(res);  

			    wx.showModal({
					title: '出错啦',
					content: '没有取到合适的数据，过会再试下吧',
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

    // 设备点击事件 
	click_scene : function(event){
        // console.log(event.currentTarget.id); 
	    var pos = parseInt(event.currentTarget.id);
        console.log("click_scene() pos = " + pos); 
        console.log("click_scene() scene length = " + this.data.normals.length); 

        var scene =  this.data.normals[pos] ;
	    console.log("clicked, " + scene.scene_name + " , " + scene.scene_status ); 
		var scene_id = scene.scene_id ;

		var cy_user = app.globalData.cy_user;
        var mobile = cy_user.mobile ;   
        var home_id = cy_user.home_id ; 
		var SID =  cy_user.SID ;
		var env =  app.globalData.env ;
		var url = env.host + 'wx_xcx/svc_wx_xcx.php?eventID=scene.cmd&SID='+ SID;

		wx.request( {
			url: url ,
			method: 'POST',
			data: { "mobile": mobile, "scene_id":scene_id , "cmd": "execute" , "cmd_content" : "" ,} ,
			header:{
				'Content-Type':'application/json'
			},
			success:function(res) {
				console.log(res.data); 
			    console.log("click_scene() success post cmd !"); 
			},

			fail:function(res){
	    		console.log("click_scene() fail to post cmd ! " ); 
	    		console.log(ret ); 
				
				wx.showModal({
					title: '出错啦',
					content: '没有取到合适的数据，过会再试下吧',
					showCancel:false ,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
						}
					}
				});
			}
		});
       
	   	var new_scene = sceneBiz.switchNormalScene(scene);
		this.data.normals[pos] = new_scene ;
	    console.log("click_scene() " + scene.scene_name + ", new status : " + scene.scene_status ); 

		this.setData({
			normals : this.data.normals,
			header: "clicked " + pos
 		})
		 
    } ,
	

    // 设备点击安保事件 
	click_security : function(event){
        console.log(event); 
	    var pos = parseInt(event.currentTarget.id);
 
        var scene =  this.data.security_scene ;
	    console.log("clicked, " + scene.scene_name + " , " + scene.scene_status ); 
		var cmd = 'open' ;
		if (scene.scene_status == 1 )
			cmd = 'close' ;
		var scene_id = scene.scene_id ;
		
		var cy_user = app.globalData.cy_user;
        var mobile = cy_user.mobile ;   
        var home_id = cy_user.home_id ; 
		var SID =  cy_user.SID ;
		var env =  app.globalData.env ;
		var url = env.host + 'wx_xcx/svc_wx_xcx.php?eventID=security.cmd&SID=' + SID ;

		wx.request( {
			url:url,
			method: 'POST',
			// data: { "cmd_type": "scene_normal", "cmd": "execute" , {"scene_id": scene.scene_id } } ,
			data: { "mobile": mobile, "cmd": cmd , 'scene_id': scene_id , cmd_content:"" } ,
			header:{
				'Content-Type':'application/json'
			},
			
			success:function(res) {
			    console.log("click_security() success post cmd !"); 
				console.log(res.data);  
			},

			fail:function(ret){
	    		console.log("click_security() fail to post cmd !  ret = "  + ret ); 
			}
		});
       
		// 如果成功，变更状态
		scene = sceneBiz.switchSecurity(scene);
		this.data.security_scene = scene ;

		this.setData({
			security_scene : this.data.security_scene,
			header: "clicked " + pos
 		})
		 
    } ,
})