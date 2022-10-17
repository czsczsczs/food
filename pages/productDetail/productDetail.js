// pages/productDetail/productDetail.js
var request = require('../../utils/request.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        product: {},
        bannerlist: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.request({
            url: 'http://192.168.0.5:3004/api/foods/list/detail',
            data: {
                id: options.id,
            },
            success: res => {
                this.setData({
                    product: res.data.data[0],
                });
                console.log(this.data.product);
            },
        }),
            wx.request({
                url: 'http://192.168.0.5:3004/api/banner',
                success: res => {
                    this.setData({
                        bannerlist: res.data.data,
                    });
                },
            });
    },
    intoshop() {
        wx.switchTab({
            url: '../../pages/myCart/myCart',
        });
    },
    addshop() {
        var product = this.data.product;
        wx.request({
            url: 'http://192.168.0.5:3004/api/cart/add',
            data: {
                name: product.name,
                pic: product.pic,
                num: 1,
                info: product.description,
                price: product.price,
            },
            success: res => {
                if (res.data.status == 200) {
                    wx.showToast({
                        title: '添加成功',
                        icon: 'none',
                    });
                }
            },
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
});
