// pages/selectCity/selectCity.js
var request=require('../../utils/request.js')
var app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
        longitude:113.324520,//坐标一定要写在外面，直接写在markers里不会出现标记点
        latitude:23.099994,
        markers:[{
            id:1,
            longitude:113.324520,
            latitude:23.099994,
            iconPath:"../../images/location.png",
            width:50,
            height:50,
            callout: { 
                content: '郑州海洋馆', //文本
                color: '#ffffff', //文字颜色
                fontSize: 15, //文本大小
                borderRadius: 15, //边框圆角
                padding: '10',
                bgColor: '#406390', //背景颜色
                display: 'BYCLICK', //常显
            }
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        request('get','/api/hot/city',{},'数据加载中',(res)=>{
            this.setData({
                list:res.data
            })
        },(error)=>{

        })
    },
    Location(){
        wx.getLocation({
            type:'gcj02',//类型必须是这个才能有中心点
            isHighAccuracy: true,
            highAccuracyExpireTime:5000,
            success:(res)=>{
                var log=this.data.markers.longitude
                var lat=this.data.markers.latitude
               this.setData({
                longitude:res.longitude,
                latitude:res.latitude,
                log:res.longitude,
                lat:res.latitude,
               })
            },
            fail:(error)=>{
                console.log(error)
            }
        })
    },
    getLocation(){
        wx.getLocation({
          success:(result)=>{
              var latitude=result.latitude;
              var longitude=result.longitude;
              wx.request({
                url: 'http://192.168.0.5:3002/api/lbs/location',
                data:{
                    latitude:latitude,
                    longitude:longitude
                },
                success:(result)=>{
                    var city=result.data.result.ad_info.city.split("")
                    city.pop()
                    var city=city.join("")
                    app.globalData.city=city
                    wx.setStorageSync('city', city)
                    wx.switchTab({
                      url: '../food/food',
                    })
                }
              })
          }
        })
    },
    choosecity(e){
        var id=e.currentTarget.dataset.id
        app.globalData.city=this.data.list[id]
        var city=app.globalData.city;
        wx.setStorageSync('city', city)
        wx.switchTab({
          url: '../food/food',
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