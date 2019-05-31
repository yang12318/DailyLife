//index.js
//获取应用实例
var finished, unfinished
const app = getApp()
let ip = 'http://129.28.156.141:8080/dailyLife';
function refreshHabit(that) {
  wx.request({
    url: ip + '/api/habit/gethabit?kind=1&token=user2',
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
  wx.request({
    url: ip + '/api/plan/getplan?kind=1&token=user2',
    success: function (res) {
      console.log(res.data.unfinished)
      console.log(res.data.finished)
      finished = res.data.finished
      unfinished = res.data.unfinished
      that.setData({
        finished: res.data.finished,
        unfinished: res.data.unfinished,
        condition11: (Object.keys(res.data.finished).length != 0),
        condition22: (Object.keys(res.data.unfinished).length != 0)
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

Page({
  data: {
    TabCur: 0,
    scrollLeft: 0,
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
  },  
  tabSelect(e) {
    console.log(e.currentTarget.dataset.id)
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
  onShow: function(options) {
    var that = this
    refreshHabit(that)
    refreshPlan(that)
  },

  click: function(e) {
    var that = this
    console.log(e.currentTarget.dataset.flag)
    if(e.currentTarget.dataset.flag) {
      //今日已经打卡了
      wx.request({
        url: ip +'/api/habit/clockin?kind=0&token=user2&habitId='+e.currentTarget.dataset.id,
        success: function(res) {
          var status = res.data.status
          if(status == 1) {
            wx.showToast({
              title: res.data.desp,
            })
            refreshHabit(that)
          } else {
            wx.showToast({
              title: res.data.desp,
              icon: 'none'
            })
          }
        },
        fail: function(res) {
          wx.showToast({
            title: '网络连接失败',
            icon: 'none'
          })
        }
      })
    } else {
      //今日还没有打卡
      wx.request({
        url: ip+'/api/habit/clockin?kind=1&token=user2&habitId='+e.currentTarget.dataset.id,
        success: function(res) {
          var status = res.data.status
          if(status == 1) {
            wx.showToast({
              title: res.data.desp
            })
            refreshHabit(that)
          } else {
            wx.showToast({
              title: res.data.desp,
              icon: 'none'
            })
          }
        },
        fail: function(res) {
          wx.showToast({
            title: '网络连接失败',
            icon: 'none'
          })
        }
      })

    }
    console.log(e.currentTarget.dataset.id)
  },
  finish: function(e) {
    var that = this
    //现在属于未完成这个列表中，要完成它，并把它加入完成列表中
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    console.log("id="+id)
    wx.request({
      url: ip +'/api/plan/finish?kind=1&token=user2&planId='+id,
      success: function(res) {
        var status = res.data.status
        var desp = res.data.desp
        if(status == 1) {
          wx.showToast({
            title: desp,
          })
          refreshPlan(that)
        } else {
          wx.showToast({
            title: desp,
            icon: 'none'
          })
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '网络连接失败',
          icon: 'none'
        })
      }
    })
  },
  cancelFinish: function(e) {
    var that = this
    //现在属于完成这个列表中，要取消完成它，并把它加入完成列表中
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    wx.request({
      url: ip + '/api/plan/finish?kind=0&token=user2&planId='+id,
      success: function(res) {
        var status = res.data.status
        var desp = res.data.desp
        if(status == 1) {
          wx.showToast({
            title: desp,
          })
          refreshPlan(that)
        } else {
          wx.showToast({
            title: desp,
            icon: 'none'
          })
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '网络连接失败',
          icon: 'none'
        })
      }
    })
  },
  revise: function(e) {
    var that = this
    var id = e.currentTarget.dataset.id
    console.log("index.js"+id)
    wx.navigateTo({
      //kind=2代表是从index页跳转过去的
      url: '../edplan/edplan?kind=2&id='+id,
      complete: function(e) {
        console.log(e)
      }
    })
  },
  onPullDownRefresh: function() {
    var that = this
    refreshHabit(that)
    refreshPlan(that)
  }
})
