// pages/edit/edit.js
let ip = 'http://129.28.156.141:8080/dailyLife';
var kind, id, icon, constweekday    //这两个变量我放在这里了，该页面任意地方都可以使用
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: -1,
    iconflag_habit: false,
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
    gridCol: 5,
    skin: false,
    flag1: false,
    flag2: false,
    flag3: false,
    flag4: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    id = options.id
    let token = getApp().globalData.token;
    wx.request({
      url: ip + '/api/habit/detail?token=' + token +'&id=' + id,
      success: function (res) {
        var category = res.data.category
        var flag0, flag1, flag2, flag3
        if(category == 0) {
          flag0 = true
          flag1 = flag2 = flag3 = false
        } else if(category == 1) {
          flag1 = true
          flag0 = flag2 = flag3 = false
        } else if(category == 2) {
          flag2 = true
          flag0 = flag1 = flag3 = false
        } else if(category == 3) {
          flag3 = true
          flag0 = flag1 = flag2 = false
        }
        constweekday = res.data.weekday
        that.setData({
          name: res.data.name,
          icon: res.data.icon,
          category: res.data.category,
          icon: res.data.icon,
          flag0: flag0,
          flag1: flag1,
          flag2: flag2,
          flag3: flag3
        })
      }
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

  },
  saveHabit: function (e) {
    var that = this
    // console.log(e.detail.value.weekday)
    if (e.detail.value.name == "") {
      wx.showToast({
        title: '习惯名不能为空',
        icon: 'none'
      })
      return
    }
    if (e.detail.value.name.length < 1 || e.detail.value.name.length > 5) {
      wx.showToast({
        title: '习惯名的长度必须在1-5字之间',
        icon: 'none'
      })
      return
    }
    if (e.detail.value.category == "") {
      wx.showToast({
        title: '时间段不能为空',
        icon: 'none'
      })
      return
    }
    if (e.detail.value.icon == -1) {
      wx.showToast({
        title: '请选择一个图标',
        icon: 'none'
      })
    }
    // if (Object.keys(e.detail.value.weekday).length == 0) {
    //   wx.showToast({
    //     title: '打卡时间不能为空',
    //     icon: 'none'
    //   })
    //   return
    // }
    // var arr = e.detail.value.weekday
    // var sum = 0
    // for (var i = 0; i < arr.length; i++) {
    //   sum = sum + parseInt(arr[i])
    // }
    // console.log(sum)
    console.log("检查参数")
    console.log(id)
    console.log(e.detail.value.name)
    console.log(e.detail.value.icon)
    console.log(e.detail.value.category)
    console.log(constweekday)
    let token = getApp().globalData.token;
    wx.request({
      url: ip + '/api/habit/updatehabit',
      data: {
        id: id,
        name: e.detail.value.name,
        icon: e.detail.value.icon,
        category: e.detail.value.category,
        weekday: constweekday,
        token: token
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var status = res.data.status
        var desp = res.data.desp
        if (status == 1) {
          wx.showToast({
            title: desp,
          })
          that.setData({
            name: "",
            flag: false,
            icon: -1,
            iconflag_habit: true
          })
          wx.switchTab({
            url: '../manage/manage',
            success: function (res) {
            }
          })
        } else {
          wx.showToast({
            title: desp,
            icon: 'none'
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '网络连接错误',
          icon: 'none'
        })
      }
    })
  },
  
  iconclick: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    that.setData({
      icon: index,
      iconflag_habit: false
    })
  },
  tabDelete: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          let token = getApp().globalData.token;
          wx.request({
            url: ip + '/api/habit/deletehabit?token=' + token + '&habitId=' + id,
            success: function (res) {
              console.log('删除成功', res)
              var status = res.data.status
              var desp = res.data.desp
              if (status == 1) {
                wx.showToast({
                  title: desp,
                })
                wx.switchTab({
                  url: '../manage/manage',
                  success: function (res) {
                  }
                })
              } else {
                wx.showToast({
                  title: desp,
                  icon: 'none'
                })
              }
            }
          })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})