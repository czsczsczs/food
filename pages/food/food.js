// pages/food/food.js
var productType=require("../../utils/productData")
var requset=require("../../utils/request.js")
var app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        location:"北京",
        productType:productType,
        list:[],
        num:1,
        isshow:false,
        bottom:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 方法1：调用封装请求
        var city=wx.getStorageSync('city');
        if(city){
            this.setData({
                location:city
            })
        }
        requset('get','/api/foods/list',{
                  city:this.data.location,
                  page:this.data.num
              },'数据加载中',(res)=>{
                this.setData({
                    list:res.data.result,
                    isshow:true
                })
              },(error)=>{
                  console.log(error)
              })
        // 方法2：没有封装直接调用
        // wx.request({
        //   url: 'http://192.168.0.5:3002/api/foods/list',
        //   data:{
        //       city:this.data.location,
        //       page:this.data.num
        //   },
        //   success:res=>{
        //       if(res.data.status==200){
        //           this.setData({
        //               list:res.data.data.result,
        //               isshow:true
        //           })
        //       }
        //   }
        // })
    },
    producttype(e){
        wx.navigateTo({
          url: '../producttype/producttype?id='+e.currentTarget.dataset.id,
        })
        
    },
    getMore(){
        this.data.num++;
        request('get','/api/foods/list',{
            city:this.data.location,
            page:this.data.num
        },'数据加载中',(res)=>{
            this.setData({
                list:this.data.list.concat(res.data.data.result),
                isshow:true
            })
          },(error)=>{
            this.setData({
               isshow:false,
               bottom:'我是有底线的哦~'
            })
          })
        // this.data.num++;
        // wx.request({
        //     url: 'http://192.168.0.5:3002/api/foods/list',
        //     data:{
        //         city:this.data.location,
        //         page:this.data.num
        //     },
        //     success:res=>{
        //         if(res.data.status==200){ 
        //             this.setData({
        //                 list:this.data.list.concat(res.data.data.result)
        //             })
        //         }else{
        //             this.setData({
        //                 isshow:false,
        //                 bottom:'我是有底线的哦~'
        //             })
        //         }
        //     }
        //   })
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
        
        if(app.globalData.city){
            this.setData({
                location:app.globalData.city,
                num:1
            })
        }
        
        wx.request({
          url: 'http://192.168.0.5:3002/api/foods/list',
          data:{
                    city:this.data.location,
                    page:this.data.num
                },
            success:(res)=>{
                if(res.data.data){
                    this.setData({
                        list:res.data.data.result
                    })
                }else{
                    this.setData({
                        list:[],
                        isshow:true,
                        bottom:'我是有底线的哦~'
                    })

                }
               
            }
        })
    },
    productdetail(e){
        console.log(e.currentTarget.dataset.id)
        wx.navigateTo({
          url: '../../pages/productDetail/productDetail?id='+e.currentTarget.dataset.id,
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
        this.data.num++;
        wx.request({
          url: 'http://192.168.0.5:3002/api/foods/list',
          data:{
            city:this.data.location,
            page:this.data.num
          },
          success:(res)=>{
              if(res.data.status==200){
                  this.setData({
                      list:this.data.list.concat(res.data.data.result)
                  })
                  
              }else{
                  this.setData({
                      bottom:'我是有底线的哦'
                  })
                  setTimeout(()=>{
                      this.setData({
                          isshow:false
                      })
                  },1000)
              }
          }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})