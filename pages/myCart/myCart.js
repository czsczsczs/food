// pages/myCart/myCart.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        selected: false,
        // del:false,
        startX: '',
        startY: '',
        list: [],
        selectedAll: false,
        allmoney: '￥0.00',
        num: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {},
    getShop() {
        wx.request({
            url: 'http://192.168.0.5:3004/api/cart/list',
            success: res => {
                if (res.data.status == 200) {
                    var list = res.data.data.result;
                    var selectedAll = this.data.selectedAll;
                    for (var i = 0; i < list.length; i++) {
                        list[i].selected = selectedAll;
                    }
                    this.setData({
                        list: list,
                    });
                }
            },
        });
    },
    // 点击拉开删除
    del(e) {
        const id = e.currentTarget.dataset.id;
        for (var i = 0; i < this.data.list.length; i++) {
            if (i == id) {
                this.setData({
                    [`list[${id}].del`]: !this.data.list[e.currentTarget.dataset.id].del,
                });
            } else {
                this.setData({
                    [`list[${i}].del`]: false,
                });
            }
        }
    },
    touchstart(e) {
        // 触摸开始位置
        this.setData({
            startX: e.changedTouches[0].clientX,
            startY: e.changedTouches[0].clientY,
        });
    },
    // 触摸拉开删除，与点击拉开的方式有点区别
    touchmove(e) {
        var id = e.currentTarget.dataset.id,
            list = this.data.list,
            // 触摸移动后的位置
            clientX = e.changedTouches[0].clientX,
            clientY = e.changedTouches[0].clientY,
            startX = this.data.startX,
            startY = this.data.startY;

        for (var i = 0; i < list.length; i++) {
            list[i].del = false;
        }
        if (startX > clientX) {
            list[id].del = true;
        } else {
            list[id].del = false;
        }
        this.setData({
            list: list,
        });
    },
    remove(e) {
        wx.request({
            url: 'http://192.168.0.5:3004/api/cart/delete',
            data: {
                id: e.currentTarget.dataset.id,
            },
            success: res => {
                if (res.data.status == 200) {
                    wx.showToast({
                        title: '删除成功',
                        icon: 'none',
                    });
                }
                this.getShop();
            },
        });
    },
    selected(e) {
        var id = e.currentTarget.dataset.id,
            list = this.data.list;
        list[id].selected = !list[id].selected;
        var num = this.data.num;
        this.setData({
            list: list,
        });
        if (list[id].selected) {
            num++;
        } else {
            num--;
        }
        this.setData({
            num: num,
        });
        if (this.data.num > 0) {
            this.setData({
                selectButton: true,
            });
        } else {
            this.setData({
                selectButton: false,
            });
        }
        if (this.data.list.length == this.data.num) {
            this.setData({
                selectedAll: true,
            });
        } else {
            this.setData({
                selectedAll: false,
            });
        }
        this.goTotalPrice();
    },
    selectAll() {
        var list = this.data.list;
        for (var i = 0; i < list.length; i++) {
            list[i].selected = false;
        }
        this.setData({
            list: list,
            selectedAll: false,
            selectButton: false,
            allmoney: '￥0.00',
        });
    },
    noselectAll() {
        var list = this.data.list;
        for (var i = 0; i < list.length; i++) {
            list[i].selected = true;
        }
        this.setData({
            list: list,
            selectedAll: true,
            selectButton: true,
        });
        this.goTotalPrice();
    },
    reduce(e) {
        var i = e.currentTarget.dataset.index;
        var list = this.data.list;
        var num = list[i].num;
        num--;
        if (num < 0) {
            wx.showToast({
                title: '数量最少为1',
                icon: 'none',
            });
            return;
        }
        wx.request({
            url: 'http://192.168.0.5:3004/api/cart/update',
            data: {
                id: e.currentTarget.dataset.id,
                num: num,
            },
            success: res => {
                this.setData({
                    list: list,
                });
                this.getShop();
            },
        });
    },
    add(e) {
        var i = e.currentTarget.dataset.index;
        var list = this.data.list;
        var num = list[i].num;
        num++;
        wx.request({
            url: 'http://192.168.0.5:3004/api/cart/update',
            data: {
                id: e.currentTarget.dataset.id,
                num: num,
            },
            success: res => {
                this.setData({
                    list: list,
                });
                this.getShop();
            },
        });
    },
    inputnum(e) {
        var i = e.currentTarget.dataset.id;
        var list = this.data.list;
        list[i].num = e.detail.value;
        this.setData({
            list: list,
        });
    },
    goTotalPrice() {
        var list = this.data.list;
        var total = 0;
        for (var i = 0; i < list.length; i++) {
            if (list[i].selected == true) {
                total += total + list[i].num * list[i].price;
            }
        }
        this.setData({
            allmoney: '￥' + total.toFixed(2),
        });
    },
    buy() {
        var allmoney = this.data.allmoney;
        var money = allmoney.split('');
        money.shift();
        var money = money.join('');
        wx.redirectTo({
            url: '../complete/complete?money=' + money,
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getShop();
    },

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
