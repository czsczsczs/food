// pages/index/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        currentpage: 0,
        bannerArr: [],
        list: [],
    },
    // 详情页跳转
    indexDetail(e) {
        wx.navigateTo({
            url: '../indexDetail/indexDetai?itemId=' + e.currentTarget.dataset.itemId,
        });
    },
    // 轮播图事件
    bannerChange(e) {
        this.setData({
            currentpage: e.detail.current,
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.showLoading({
            title: '数据拼命加载中',
        }),
            wx.request({
                url: 'http://192.168.0.5:3004/api/banner',
                method: 'get',
                success: res => {
                    if (res.data.status == 200) {
                        this.setData({
                            bannerArr: res.data.data,
                        });
                    }
                },
                complete: () => {
                    wx.hideLoading();
                },
            }),
            wx.request({
                url: 'http://192.168.0.5:3004/api/indexlist',
                success: res => {
                    wx.hideLoading();
                    wx.showToast({
                        title: '数据加载完毕',
                    });
                    if (res.data.status == 200) {
                        this.setData({
                            list: res.data.data,
                        });
                        console.log(res.data.data);
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
