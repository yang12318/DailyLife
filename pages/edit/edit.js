// pages/edit/edit.js
var kind, id    //这两个变量我放在这里了，该页面任意地方都可以使用
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    id = options.id
    kind = options.kind
    //到这里这两个参数就拿到了，kind=1代表的是修改习惯，kind=2代表的是修改计划
    //id代表的是要修改的内容的id（习惯的id或者是计划的id）
    //以下内容仅为测试内容
    that.setData({
      id: id,
      kind: kind
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})