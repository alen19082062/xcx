

// 创建普通场景
function newNormalScene(scene){  
   // 如果不是，返回空串 
   if ( scene.scene_type != 1 )    
    {  
			  console.log("skip " + scene.scene_name + " " + scene.scene_type); 
				return null;
		}

 		var normal_scene = new Object(); 
		normal_scene.scene_id  = scene.scene_id ;
		normal_scene.scene_name = scene.scene_name ;
		normal_scene.scene_status = scene.scene_status ;
		normal_scene.scene_logo = scene.scene_logo ;
		normal_scene.reverse = scene.reverse ;

    // 根据场景状态配置图标 
    
    var name = normal_scene.scene_name ; 
    
    var pos = name.indexOf('回家') ;
    
    if (　pos != -1  ) { 
      if ( scene.scene_status == 1)
          normal_scene.img = '../../images/scene/back_home_mode_icon.png' ;
      else 
          normal_scene.img = '../../images/scene/back_home_mode_close_icon.png' ;
          
      return normal_scene ;
     }

     var pos = name.indexOf('离家') ;
     var pos2 = name.indexOf('外出') ;

     if (　pos != -1 ||  pos2 != -1 ) { 
       if ( scene.scene_status == 1)
          normal_scene.img = '../../images/scene/outgo_mode_icon.png' ;
       else 
          normal_scene.img = '../../images/scene/outgo_mode_close_icon.png' ;
       
       return normal_scene ;
     }

     var pos = name.indexOf('影') ;
     if (　pos != -1  ) { 
       if ( scene.scene_status == 1)
          normal_scene.img = '../../images/scene/movie_mode_icon.png' ;
       else 
          normal_scene.img = '../../images/scene/movie_mode_close_icon.png' ;
          
       return normal_scene ;
   
     }  
         
      if ( scene.scene_status == 1)
          normal_scene.img = '../../images/scene/img_scene_normal_on.png' ;
       else 
          normal_scene.img = '../../images/scene/img_scene_normal_off.png' ;
          
       return normal_scene ;
} 

// 操作普通场景
function switchNormalScene(scene){  
 
    console.log("switchNormalScene() old status = " + scene.scene_status ); 
    if ( scene.scene_status == 0){
        scene.scene_status = 1 ;
		}
		else {
		    scene.scene_status = 0 ;
    }
    console.log("switchNormalScene() new status = " + scene.scene_status ); 

    // 根据场景状态配置图标 
    var name = scene.scene_name ; 
    var pos = name.indexOf('回家') ;
    
    if (　pos != -1  ) { 
      if ( scene.scene_status == 1)
          scene.img = '../../images/scene/back_home_mode_icon.png' ;
      else 
          scene.img = '../../images/scene/back_home_mode_close_icon.png' ;
          
      return scene ;
     }

     var pos = name.indexOf('离家') ;
     var pos2 = name.indexOf('外出') ;

     if (　pos != -1 ||  pos2 != -1 ) { 
       if ( scene.scene_status == 1)
          scene.img = '../../images/scene/outgo_mode_icon.png' ;
       else 
          scene.img = '../../images/scene/outgo_mode_close_icon.png' ;
       
       return scene ;
     }

     var pos = name.indexOf('影') ;
     if (　pos != -1  ) { 
       if ( scene.scene_status == 1)
          scene.img = '../../images/scene/movie_mode_icon.png' ;
       else 
          scene.img = '../../images/scene/movie_mode_close_icon.png' ;
          
       return scene ;
   
     }  
         
      if ( scene.scene_status == 1)
          scene.img = '../../images/scene/img_scene_normal_on.png' ;
       else 
          scene.img = '../../images/scene/img_scene_normal_off.png' ;
          
       return scene ;
} 


// 创建普通场景
function newSecurityScene(scene){  
   // 如果不是，返回空串 
   if ( scene.scene_type != 9 )    
    {  
			  console.log("skip " + scene.scene_name + " " + scene.scene_type); 
				return null;
		}

 		var security_scene = new Object(); 
		security_scene.scene_id  = scene.scene_id ;
		security_scene.scene_name = scene.scene_name ;
		security_scene.scene_status = scene.scene_status ;
		security_scene.scene_logo = scene.scene_logo ;
		security_scene.reverse = 1 ;

    // 根据场景状态配置图标          
      if ( scene.scene_status == 1)
          security_scene.img = '../../images/scene/security_list_icon1.png' ;
       else 
          security_scene.img = '../../images/scene/security_list_icon1_close.png' ;
          
       return security_scene ;
} 

// 设备状态切换
function switchSecurity(scene){  
 
    console.log("switchSecurity() old status = " + scene.scene_status ); 
    if ( scene.scene_status == 0){
        scene.scene_status = 1 ;
		}
		else {
		    scene.scene_status = 0 ;
    }
    console.log("switchSecurity() new status = " + scene.scene_status ); 

       if ( scene.scene_status == 1)
          scene.img = '../../images/scene/security_list_icon1.png' ;
       else 
          scene.img = '../../images/scene/security_list_icon1_close.png' ;
  
   console.log("clicked, img = " + scene.img); 
   return scene ;
} 


module.exports = {
   newNormalScene: newNormalScene,
   switchNormalScene: switchNormalScene,
   newSecurityScene:newSecurityScene,
   switchSecurity:switchSecurity, 
}

