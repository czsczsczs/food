// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        city:'',
        list:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    inputsearch(e){
        wx.request({
          url: 'http://192.168.0.5:3002/api/foods/select',
          data:{
              name:e.detail.value,
              city:this.data.city
          },
          success:(res)=>{
              console.log(res)
              if(res.data.status==200){
                  this.setData({
                      list:res.data.data
                  })
              }else{
                console.log("没有数据",res.data)
              }
          }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    productdetail(e){
        console.log(e.currentTarget.dataset.id)
        wx.navigateTo({
          url: '../../pages/productDetail/productDetail?id='+e.currentTarget.dataset.id,
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        var city=wx.getStorageSync('city') || '北京'
        this.setData({
            city:city
        })
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