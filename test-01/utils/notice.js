
function modelErrMsg(msg){
      wx.showModal({
      title: '出错啦',
      content: msg ,
      showCancel:false ,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
}

function toastErrMsg(msg){
      wx.showModal({
      title: '出错啦',
      content: msg ,
      showCancel:false ,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
}

module.exports = {
  modelErrMsg:modelErrMsg,
  toastErrMsg:toastErrMsg,
}

