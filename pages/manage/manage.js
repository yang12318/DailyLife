// pages/manage/manage.js
let ip = 'http://129.28.156.141:8080/dailyLife';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    list01: [
      { item_id: 1 }, { item_id: 11 }, { item_id: 11 },
    ],
    list02: [
      { item_id: 1 }
    ],
    list03: [
      { item_id: 11 }, { item_id: 11 }
    ],
    list04: [
      { item_id: 11 }, { item_id: 11 }, { item_id: 11 }
    ],

    // 展开折叠
    selectedFlag: [false, false, false, false],
    scrollLeft: 0
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    if(e.currentTarget.dataset.id == 0) {
      //习惯
      var that = this
      wx.request({
        url: ip + '/api/habit/gethabit?kind=2&token=user2',
        success: function (res) {
          that.setData({
            allTime: res.data.allTime,
            morning: res.data.morning,
            noon: res.data.noon,
            evening: res.data.evening,
            condition0: (Object.keys(res.data.allTime).length != 0),
            condition1: (Object.keys(res.data.morning).length != 0),
            condition2: (Object.keys(res.data.noon).length != 0),
            condition3: (Object.keys(res.data.evening).length != 0)
          })
        }
      })
    } else {
      //计划
      var that = this
      wx.request({
        url: ip + '/api/plan/getplan?kind=2&token=user2',
        success: function (res) {
          that.setData({
            finished: res.data.finished,
            unfinished: res.data.unfinished,
            condition11: (Object.keys(res.data.finished).length != 0),
            condition22: (Object.keys(res.data.unfinished).length != 0)
          })
        }
      })
    }
    
  },
  // 展开折叠选择  
  changeToggle: function (e) {
    var index = e.currentTarget.dataset.index;
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }

    this.setData({
      selectedFlag: this.data.selectedFlag
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this
    wx.request({
      url: ip + '/api/habit/gethabit?kind=2&token=user2',
      success: function (res) {
        that.setData({
          allTime: res.data.allTime,
          morning: res.data.morning,
          noon: res.data.noon,
          evening: res.data.evening,
          condition0: (Object.keys(res.data.allTime).length != 0),
          condition1: (Object.keys(res.data.morning).length != 0),
          condition2: (Object.keys(res.data.noon).length != 0),
          condition3: (Object.keys(res.data.evening).length != 0)
        })
      }
    })
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

  },
  reviseHabit: function(e) {
    var id = e.currentTarget.dataset.id
    wx:wx.navigateTo({
      //kind=1代表修改的是习惯，kind=2代表修改的是计划
      url: '../edit/edit?kind=1&id='+id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  revisePlan: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../edit/edit?kind=2&id='+id,
    })
  }
})