// app.js
App({
  onLaunch() {
     
    // 展示本地存储能力
    const openid=wx.getStorageSync('openid')
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    if(openid){
        var avatarUrl=wx.getStorageSync('avatarUrl')
        console.log("这里",avatarUrl)
        this.globalData.avatarUrl=wx.getStorageSync('avatarUrl')
        this.globalData.nickName=wx.getStorageSync('nickName')
    }else{
        wx.login({
          success:res=>{
              console.log("略略略"+res)
          }
        })
    }
    // 登录
    wx.login({
      success: res => {
          console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 检查登录态
    wx.checkSession({
      success: (res) => {
          if(res.errMsg!="checkSession:ok"){
             wx.clearStorageSync()
          }
      },
    })
    wx.getSetting({
        success:res=>{
            if(res.authSetting['scope.userInfo']){
                wx.getUserInfo({
                    success:data=>{
                        console.log(data)
                        this.globalData.user=data.userInfo
                    }
                })
            }
        }
    })
  },
  onShow:()=>{
    // wx.setEnableDebug({
    //   enableDebug: true,
    // })
  },
  globalData: {
    userInfo: null,
    city:'',
    user:'',
    avatarUrl:'',
    nickName:'',
    checkSession:''
  }
})
