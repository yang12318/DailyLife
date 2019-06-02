// pages/manage/manage.js
let ip = 'http://129.28.156.141:8080/dailyLife';
var selectedFlag = []
var selectedFlag2 = []
function refreshHabit(that) {
  let token = getApp().globalData.token;
  wx.request({
    url: ip + '/api/habit/gethabit?kind=2&token=' + token,
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
    },
    fail: function (res) {
      wx.showToast({
        title: '网络连接失败',
        icon: 'none'
      })
    }
  })
}
function refreshPlan(that) {
  let token = getApp().globalData.token;
  wx.request({
    url: ip + '/api/plan/getplan?kind=2&token=' + token,
    success: function (res) {
      for(let i = 0, m = res.data.finished.length; i < m; i++) {
        selectedFlag.push(false)
      }
      for (let i = 0, m = res.data.unfinished.length; i < m; i++) {
        selectedFlag2.push(false)
      }
      that.setData({
        finished: res.data.finished,
        unfinished: res.data.unfinished,
        condition11: (Object.keys(res.data.finished).length != 0),
        condition22: (Object.keys(res.data.unfinished).length != 0),
        selectedFlag: selectedFlag,
        selectedFlag2: selectedFlag2
      })
    },
    fail: function(res) {
      wx.showToast({
        title: '网络连接失败',
        icon: 'none'
      })
    }
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    iconList: [{
      icon: '../../images/habit-0.png',
    }, {
      icon: '../../images/habit-1.png',
    }, {
      icon: '../../images/habit-2.png',
    }, {
      icon: '../../images/habit-3.png',
    }, {
      icon: '../../images/habit-4.png',
    }, {
      icon: '../../images/habit-5.png',
    }, {
      icon: '../../images/habit-6.png',
    }, {
      icon: '../../images/habit-7.png',
    }, {
      icon: '../../images/habit-8.png',
    }, {
      icon: '../../images/habit-9.png',
    }, {
      icon: '../../images/habit-10.png',
    }, {
      icon: '../../images/habit-11.png',
    }, {
      icon: '../../images/habit-12.png',
    }, {
      icon: '../../images/habit-13.png',
    }, {
      icon: '../../images/habit-14.png',
    }, {
      icon: '../../images/habit-15.png',
    }, {
      icon: '../../images/habit-16.png',
    }, {
      icon: '../../images/habit-17.png',
    }, {
      icon: '../../images/habit-18.png',
    }, {
      icon: '../../images/habit-19.png',
    }, {
      icon: '../../images/habit-20.png',
    }, {
      icon: '../../images/habit-21.png',
    }, {
      icon: '../../images/habit-22.png',
    }, {
      icon: '../../images/habit-23.png',
    }, {
      icon: '../../images/habit-24.png',
    }, {
      icon: '../../images/habit-25.png',
    }, {
      icon: '../../images/habit-26.png',
    }, {
      icon: '../../images/habit-27.png',
    }, {
      icon: '../../images/habit-28.png',
    }, {
      icon: '../../images/habit-29.png',
    }],
    //iconList用于习惯，iconList2用于计划
    iconList2: [{
      icon: '../../images/habit-0.png',
    }, {
      icon: '../../images/habit-1.png',
    }, {
      icon: '../../images/habit-2.png',
    }, {
      icon: '../../images/habit-3.png',
    }, {
      icon: '../../images/habit-4.png',
    }, {
      icon: '../../images/habit-5.png',
    }, {
      icon: '../../images/habit-6.png',
    }, {
      icon: '../../images/habit-7.png',
    }, {
      icon: '../../images/habit-8.png',
    }, {
      icon: '../../images/habit-9.png',
    }, {
      icon: '../../images/habit-10.png',
    }, {
      icon: '../../images/habit-11.png',
    }, {
      icon: '../../images/habit-12.png',
    }, {
      icon: '../../images/habit-13.png',
    }, {
      icon: '../../images/habit-14.png',
    }, {
      icon: '../../images/habit-15.png',
    }, {
      icon: '../../images/habit-16.png',
    }, {
      icon: '../../images/habit-17.png',
    }, {
      icon: '../../images/habit-18.png',
    }, {
      icon: '../../images/habit-19.png',
    }, {
      icon: '../../images/habit-20.png',
    }, {
      icon: '../../images/habit-21.png',
    }, {
      icon: '../../images/habit-22.png',
    }, {
      icon: '../../images/habit-23.png',
    }, {
      icon: '../../images/habit-24.png',
    }, {
      icon: '../../images/habit-25.png',
    }, {
      icon: '../../images/habit-26.png',
    }, {
      icon: '../../images/habit-27.png',
    }, {
      icon: '../../images/habit-28.png',
    }, {
      icon: '../../images/habit-29.png',
    }],

    // 展开折叠
    selectedFlag: [true, true, true, true],
    selectedFlag2: [true, true, true, true],
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
      refreshHabit(that)
    } else {
      //计划
      var that = this
      refreshPlan(that)
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
  changeToggle2: function (e) {
    var index = e.currentTarget.dataset.index;
    if (this.data.selectedFlag2[index]) {
      this.data.selectedFlag2[index] = false;
    } else {
      this.data.selectedFlag2[index] = true;
    }

    this.setData({
      selectedFlag2: this.data.selectedFlag2
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
    refreshHabit(that)
    refreshPlan(that)
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
    var that = this
    refreshHabit(that)
    refreshPlan(that)
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
    wx.navigateTo({
      url: '../edit/edit?id='+id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  revisePlan: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      //kind=1代表是从manage页跳转过去的
      url: '../edplan/edplan?kind=1&id='+id,
    })
  }
})