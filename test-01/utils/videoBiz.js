

function chlList(){
  	console.log('chlList() ' );

    var chl_list = new Array();
   	var chl = new Object(); 

    var videos = new Array();

		chl.name  = '精选' ;
    chl.id  = 901 ;
    chl.curr_page  = 1 ;
    chl.max_page  = 1 ;
    chl.videos = videos; 
    chl_list.push(chl);

    var chl = new Object(); 
		chl.name  = '电影' ;
    chl.id  = 1 ;
    chl.curr_page  = 1 ;
    chl.max_page  = 4 ;
    chl.videos = videos; 
    chl_list.push(chl);

    var chl = new Object(); 
		chl.name  = '电视剧' ;
    chl.id  = 2 ;
    chl.curr_page  = 1 ;
    chl.max_page  = 4 ;
    chl.videos = new Array(); 
    chl_list.push(chl);

    var chl = new Object(); 
		chl.name  = '动漫' ;
    chl.id  = 3 ;
    chl.curr_page  = 1 ;
    chl.max_page  = 4 ;
    chl.videos = new Array(); 
    chl_list.push(chl);

    var chl = new Object(); 
		chl.name  = '综艺' ;
    chl.id  = 4 ;
    chl.curr_page  = 1 ;
    chl.max_page  = 4 ;
    chl.videos = new Array(); 
    chl_list.push(chl);

    var chl = new Object(); 
		chl.name  = '好莱坞' ;
    chl.id  = 5 ;
    chl.curr_page  = 1 ;
    chl.max_page  = 4 ;
    chl.videos = new Array(); 
    chl_list.push(chl);

    var chl = new Object(); 
		chl.name  = '少儿' ;
    chl.id  = 6 ;
    chl.curr_page  = 1 ;
    chl.max_page  = 4 ;
    chl.videos = new Array(); 
    chl_list.push(chl);

    var chl = new Object(); 
		chl.name  = '音乐' ;
    chl.id  = 8 ;
    chl.curr_page  = 1 ;
    chl.max_page  = 4 ;
    chl.videos = new Array(); 
    chl_list.push(chl);

    var chl = new Object(); 
		chl.name  = '超清专区' ;
    chl.id  = 9 ;
    chl.curr_page  = 1 ;
    chl.max_page  = 4 ;
    chl.videos = new Array(); 
    chl_list.push(chl);

    return chl_list ;
}

// 创建视频对象
function newVideo(video){  
    
  // 整理成视频文件
  var simple_video = new Object(); 
  simple_video.title  = video.title ;
  //simple_video.big_img = video.pic_722x354 ;
  //simple_video.small_img = video.pic_496x722 ;
  simple_video.big_img = video.pic_722x354 ;
  simple_video.small_img = video.small_hori_pic ;
  simple_video.mark = video.mark ;
  simple_video.tid = video.tid ;
  simple_video.cid = video.cid ;
  return simple_video ;    
}


module.exports = {
  chlList:chlList,
  newVideo:newVideo,
}

