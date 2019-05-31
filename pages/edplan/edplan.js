// pages/edplan/edplan.js
let ip = 'http://129.28.156.141:8080/dailyLife';
var id, icon, kind
Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: -1,
    iconflag_plan: true,
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
    gridCol: 5,
    date: new Date().Format('yyyy-MM-dd'),
    skin: false,
    startdate: new Date().Format('yyyy-MM-dd')
  },

  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    id = options.id
    kind = options.kind
    wx.request({
      url: ip+'/api/plan/detail?token=user2&id='+id,
      success: function(res) {
        var deadline = res.data.deadline
        console.log(deadline)
        deadline = deadline.substr(0,4)+"-"+deadline.substr(4,2)+"-"+deadline.substr(6,2)
        console.log(deadline)
        that.setData({
          title: res.data.title,
          desp: res.data.desp,
          date: deadline,
          icon: res.data.icon,
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
  savePlan: function (e) {
    var that = this
    if (e.detail.value.title == "") {
      wx.showToast({
        title: '计划名不能为空',
        icon: 'none'
      })
      return
    }
    if (e.detail.value.desp == "") {
      wx.showToast({
        title: '具体内容不能为空',
        icon: 'none'
      })
      return
    }
    if (e.detail.value.icon == -1) {
      wx.showToast({
        title: '请选择一个图标',
        icon: 'none'
      })
      return
    }
    if (e.detail.value.title.length < 1 || e.detail.value.title.length > 5) {
      wx.showToast({
        title: '计划名的长度必须在1-5字之间',
        icon: 'none'
      })
      return
    }
    if (e.detail.value.desp.length < 1 || e.detail.value.desp.length > 17) {
      wx.showToast({
        title: '计划具体内容的长度必须在1-17字之间',
        icon: 'none'
      })
      return
    }
    console.log(e.detail.value.date)
    if (e.detail.value.date < (new Date().Format('yyyy-MM-dd'))) {
      wx.showToast({
        title: '日期选择错误',
        icon: 'none'
      })
      return
    }
    var temp = e.detail.value.date
    console.log("temp=" + temp)
    temp = temp.substr(0, 4) + temp.substr(5, 2) + temp.substr(8, 2)
    console.log(temp)
    console.log(id)
    console.log(e.detail.value.title)
    console.log(e.detail.value.icon)
    console.log(e.detail.value.desp)
    wx.request({
      url: ip + '/api/plan/updateplan',
      data: {
        id: id,
        title: e.detail.value.title,
        icon: e.detail.value.icon,
        desp: e.detail.value.desp,
        deadline: temp,
        token: "user2"
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
            title: "",
            desp: "",
            icon: -1,
            date: new Date().Format('yyyy-MM-dd')
          })
          if(kind == 1) {
            //kind=1代表是从manage页跳转过来的
            wx.switchTab({
              url: '../manage/manage',
              success: function (res) {
              }
            })
          } else {
            //kind=2代表是从index页跳转过来的
            wx.switchTab({
              url: '../index/index',
              success: function (res) {
              }
            })
          }
        } else {
          wx.showToast({
            title: desp,
            icon: 'none',
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
  iconclick2: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    that.setData({
      icon: index,
      iconflag_plan: false
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
          wx.request({
            url: ip + '/api/plan/deleteplan?token=user2&planId=' + id,
            success: function (res) {
              console.log('删除成功',res)
              var status = res.data.status
              var desp = res.data.desp
              if (status == 1) {
                wx.showToast({
                  title: desp,
                })
                //在这里应该跳转回去，并执行刷新
                if (kind == 1) {
                  //kind=1代表是从manage页跳转过来的
                  wx.switchTab({
                    url: '../manage/manage',
                    success: function (res) {
                    }
                  })
                } else {
                  //kind=2代表是从index页跳转过来的
                  wx.switchTab({
                    url: '../index/index',
                    success: function (res) {
                    }
                  })
                }
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