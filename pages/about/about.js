// pages/about/about.js
var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        isshow: true,
        avatarUrl: '',
        nickName: '',
    },
    getUserProfile(e) {
        var status = app.globalData.checkSession;

        wx.getUserProfile({
            desc: '获取用户信息',
            success: res => {
                wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl);
                wx.setStorageSync('nickName', res.userInfo.nickName);

                this.setData({
                    isshow: false,
                    avatarUrl: res.userInfo.avatarUrl,
                    nickName: res.userInfo.nickName,
                });
            },
        });
        wx.login({
            success: res => {
                console.log('打印code', res.code);
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                wx.request({
                    url: 'http://192.168.0.5:3004/api/getSession?code=' + res.code,
                    success: data => {
                        console.log('返回', data.data.data.openid);
                        wx.setStorageSync('openid', data.data.data.openid);
                    },
                });
            },
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (wx.getStorageSync('openid')) {
            this.setData({
                isshow: false,
                avatarUrl: app.globalData.avatarUrl,
                nickName: app.globalData.nickName,
            });
        }
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
