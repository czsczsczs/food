// pages/indexDetail/indexDetai.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        indexDetail:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.showLoading({
          title: '数据加载',
        }),
        wx.showNavigationBarLoading(),
        wx.request({
          url: 'http://192.168.0.5:3002/api/indexList/detail',
          data:{
              id:options.itemId
          },
          success:(res)=>{
            this.setData({
                indexDetail:res.data[0]
            }),
            wx.setNavigationBarTitle({
              title: res.data[0].title,
            })
          },
          complete:()=>{
            wx.hideLoading(),
            setTimeout(()=>{
                wx.hideNavigationBarLoading()
            },200)
            
          }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})