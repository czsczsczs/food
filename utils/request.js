/*封装请求
参数：
method 请求类型
url 请求地址
params 请求参数
message 弹窗信息
success 成功函数
fail 失败函数
*/
const request = (method, url, params, message, success, fail) => {
    if (message != null) {
        wx.showLoading({
            title: message,
        });
    }
    wx.request({
        url: 'http://192.168.0.5:3004' + url,
        data: params,
        method: method,
        timeout: 0,
        success: res => {
            if (res.data.status == 200) {
                success(res.data);
            } else {
                fail(res.data);
            }
        },
        fail: res => {
            fail(res.data);
        },
        complete: res => {
            if (message != '') {
                wx.hideLoading();
            }
        },
    });
};
module.exports = request;
