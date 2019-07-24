
// 创建控制设备
function ctlDev(dev){  
   // 如果不是控制类设备，返回空串 
   if ( dev.dev_type != 23 && 
			  dev.dev_type != 43 && 
				dev.dev_type != 44 && 
				dev.dev_type != 9 && 
				dev.dev_type != 24 && 
				dev.dev_type != 26 && 
			  dev.dev_type != 38 && 
				dev.dev_type != 39 && 
				dev.dev_type != 21 &&
				dev.dev_type != 10 )   // 智能插座
    {  
			  console.log("skip " + dev.dev_name + " " + dev.dev_type); 
				return null;
		}

 		var ctl_dev = new Object(); 
		ctl_dev.id  = dev.id ;
		ctl_dev.name = dev.dev_name ;
		ctl_dev.addr = dev.dev_addr ;
		ctl_dev.type = dev.dev_type ;
		ctl_dev.locate = dev.dev_locate ;
    ctl_dev.product_code = dev.product_code ;

    // 设备状态均为可用 
    ctl_dev.b_avaible = true ;
    // 目前状态全为开 
    ctl_dev.switch_status = 1 ;

    // 根据设备类型、设备的开关状态配置图标 
    // 插座类
    if ( dev.dev_type == 10 || dev.dev_type == 23 || 
         dev.dev_type == 44  ) 
         if ( ctl_dev.switch_status == 1)
            ctl_dev.img = '../../images/dev/icon_dev_socket_on.png' ;
         else 
            ctl_dev.img = '../../images/dev/icon_dev_socket_off.png' ;

    // 调温灯
    if ( dev.dev_type == 21 || dev.dev_type == 26 || 
         dev.dev_type == 24 || dev.dev_type == 38 ) 
        if ( ctl_dev.switch_status == 1 )
          ctl_dev.img = '../../images/dev/icon_dev_color_led_on.png' ;
        else   
          ctl_dev.img = '../../images/dev/icon_dev_color_led_off.png' ;
    
    // 触摸开关
    if ( dev.dev_type == 39 ) 
        if ( ctl_dev.switch_status == 1 )
          ctl_dev.img = '../../images/dev/icon_dev_temp_led_on.png' ;
        else   
          ctl_dev.img = '../../images/dev/icon_dev_temp_led_off.png' ;
    
    // 电动窗帘
    if ( dev.dev_type == 9 ) 
      if ( ctl_dev.switch_status == 1 )
         ctl_dev.img = '../../images/dev/icon_dev_wise_curtain_on.png' ;     
      else 
         ctl_dev.img = '../../images/dev/icon_dev_wise_curtain_off.png' ;     

    // 触模开关
    if ( dev.dev_type == 43 ) 
      if ( ctl_dev.switch_status == 1 )
         ctl_dev.img = '../../images/dev/icon_dev_touch_switch_on.png' ;     
       else 
         ctl_dev.img = '../../images/dev/icon_dev_touch_switch_off.png' ;     
  return ctl_dev ;
} 

// 设备状态切换
function switchDev(dev){  
 
 		var ctl_dev = new Object(); 
		ctl_dev.id  = dev.id ;
		ctl_dev.name = dev.name ;
		ctl_dev.addr = dev.addr ;
		ctl_dev.locate = dev.locate ;
		ctl_dev.type = dev.type ;
    ctl_dev.product_code = dev.product_code ;
    // 设备状态均为可用 
    ctl_dev.b_avaible = true ;
    ctl_dev.switch_status = dev.switch_status ;

    console.log("clicked, dev_type = " + ctl_dev.type + " , old status = " + ctl_dev.switch_status ); 
    if ( ctl_dev.switch_status == 0){
        ctl_dev.switch_status = 1 ;
		}
		else {
		    ctl_dev.switch_status = 0 ;
    }
    console.log("clicked, dev_type = " + ctl_dev.type + " , new status = " + ctl_dev.switch_status ); 

    // 根据设备类型、设备的开关状态配置图标 
    // 插座类
    if ( dev.type == 10 || dev.type == 23 || 
         dev.type == 44  ) 
         if ( ctl_dev.switch_status == 1)
            ctl_dev.img = '../../images/dev/icon_dev_socket_on.png' ;
         else 
            ctl_dev.img = '../../images/dev/icon_dev_socket_off.png' ;

    // 灯
    if ( dev.type == 21 || dev.type == 26 || 
         dev.type == 24 || dev.type == 38 || 
         dev.type == 39 ) 
        if ( ctl_dev.switch_status == 1 )
          ctl_dev.img = '../../images/dev/icon_dev_color_led_on.png' ;
        else   
          ctl_dev.img = '../../images/dev/icon_dev_color_led_off.png' ;
    
    // 电动窗帘
    if ( dev.type == 9 ) 
      if ( ctl_dev.switch_status == 1 )
         ctl_dev.img = '../../images/dev/icon_dev_wise_curtain_on.png' ;     
      else 
         ctl_dev.img = '../../images/dev/icon_dev_wise_curtain_off.png' ;     

    // 触模开关
    if ( dev.type == 43 ) 
      if ( ctl_dev.switch_status == 1 )
         ctl_dev.img = '../../images/dev/icon_dev_wise_switch_on.png' ;     
       else 
         ctl_dev.img = '../../images/dev/icon_dev_wise_switch_off.png' ;     
  
   console.log("clicked, img = " + ctl_dev.img); 
   return ctl_dev ;
} 

// 设备状态切换
function switchSelf(dev){  
 
    console.log("clicked, dev_type = " + dev.type + " , old status = " + dev.switch_status ); 
    if ( dev.switch_status == 0){
        dev.switch_status = 1 ;
		}
		else {
		    dev.switch_status = 0 ;
    }
    console.log("clicked, dev_type = " + dev.type + " , new status = " + dev.switch_status ); 

    // 根据设备类型、设备的开关状态配置图标 
    // 插座类
    if ( dev.type == 10 || dev.type == 23 || 
         dev.type == 44  ) 
         if ( dev.switch_status == 1)
            dev.img = '../../images/dev/icon_dev_socket_on.png' ;
         else 
            dev.img = '../../images/dev/icon_dev_socket_off.png' ;

    // 灯
    if ( dev.type == 21 || dev.type == 26 || 
         dev.type == 24 || dev.type == 38 || 
         dev.type == 39 ) 
        if ( dev.switch_status == 1 )
          dev.img = '../../images/dev/icon_dev_color_led_on.png' ;
        else   
          dev.img = '../../images/dev/icon_dev_color_led_off.png' ;
    
    // 电动窗帘
    if ( dev.type == 9 ) 
      if ( dev.switch_status == 1 )
         dev.img = '../../images/dev/icon_dev_wise_curtain_on.png' ;     
      else 
         dev.img = '../../images/dev/icon_dev_wise_curtain_off.png' ;     

    // 触模开关
    if ( dev.type == 43 ) 
      if ( dev.switch_status == 1 )
         dev.img = '../../images/dev/icon_dev_wise_switch_on.png' ;     
       else 
         dev.img = '../../images/dev/icon_dev_wise_switch_off.png' ;     
  
   console.log("clicked, img = " + dev.img); 
   return dev ;
} 


module.exports = {
  ctlDev: ctlDev,
  switchDev: switchDev,
  switchSelf:switchSelf
}

