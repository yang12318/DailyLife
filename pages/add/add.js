// pages/add/add.js
let ip = 'http://129.28.156.141:8080/dailyLife';

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
    TabCur: 0,
    scrollLeft: 0,
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
    }, {
      icon: 'recordfill',
      color: 'orange',
    }, {
      icon: 'picfill',
      color: 'yellow',
    }, {
      icon: 'noticefill',
      color: 'olive',
    }, {
      icon: 'upstagefill',
      color: 'cyan',
    }, {
      icon: 'clothesfill',
      color: 'blue',
    }, {
      icon: 'discoverfill',
      color: 'purple',
    }, {
      icon: 'questionfill',
      color: 'mauve',
    }, {
      icon: 'commandfill',
      color: 'purple',
    }, {
      icon: 'brandfill',
      color: 'mauve',
    }],
    gridCol: 5,
    date: new Date().Format('yyyy-MM-dd'),
    skin: false,
    startdate: new Date().Format('yyyy-MM-dd')
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
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
  saveHabit: function(e) {
    var that = this
    console.log(e.detail.value.weekday)
    if(e.detail.value.name == "") {
      wx.showToast({
        title: '习惯名不能为空',
        icon: 'none'
      })
      return
    }
    if(e.detail.value.name.length < 1 || e.detail.value.name.length > 5) {
      wx.showToast({
        title: '习惯名的长度必须在1-5字之间',
        icon: 'none'
      })
      return
    }
    if(e.detail.value.category == "") {
      wx.showToast({
        title: '时间段不能为空',
        icon: 'none'
      })
      return
    }
    if (Object.keys(e.detail.value.weekday).length == 0) {
      wx.showToast({
        title: '打卡时间不能为空',
        icon: 'none'
      })
      return
    }
    var arr = e.detail.value.weekday
    var sum = 0
    for(var i = 0; i < arr.length; i++) {
      sum = sum + parseInt(arr[i])
    }
    console.log(sum)
    wx.request({
      url: ip + '/api/habit/updatehabit',
      data: {
        id: 0,
        name: e.detail.value.name,
        icon: 1,
        category: e.detail.value.category,
        weekday: sum,
        token: "user2"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        var status = res.data.status
        var desp = res.data.desp
        if(status == 1) {
          wx.showToast({
            title: desp,
          })
          that.setData({
            name: "",
            flag: false
          })
        } else {
          wx.showToast({
            title: desp,
            icon: 'none'
          })
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '网络连接错误',
          icon: 'none'
        })
      }
    })
  },
  savePlan: function(e) {
    var that = this
    if(e.detail.value.title == "") {
      wx.showToast({
        title: '计划名不能为空',
        icon: 'none'
      })
      return
    }
    if(e.detail.value.desp == "") {
      wx.showToast({
        title: '具体内容不能为空',
        icon: 'none'
      })
      return
    }
    if(e.detail.value.title.length < 1 || e.detail.value.title.length > 5) {
      wx.showToast({
        title: '计划名的长度必须在1-5字之间',
        icon: 'none'
      })
      return
    }
    if(e.detail.value.desp.length < 1 || e.detail.value.desp.length > 17) {
      wx.showToast({
        title: '计划具体内容的长度必须在1-17字之间',
        icon: 'none'
      })
      return
    }
    console.log(e.detail.value.date)
    if(e.detail.value.date < (new Date().Format('yyyy-MM-dd'))) {
      wx.showToast({
        title: '日期选择错误',
        icon: 'none'
      })
      return
    }
    var temp = e.detail.value.date
    console.log("temp="+temp)
    temp = temp.substr(0, 4) + temp.substr(5, 2) + temp.substr(8,2)
    console.log(temp)
    wx.request({
      url: ip +'/api/plan/updateplan',
      data: {
        id: 0,
        title: e.detail.value.title,
        icon: 1,
        desp: e.detail.value.desp,
        deadline: temp,
        token: "user2"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        var status = res.data.status
        var desp = res.data.desp
        if(status == 1) {
          wx.showToast({
            title: desp,
          })
          that.setData({
            title: "",
            desp: "",
            date: new Date().Format('yyyy-MM-dd')
          })
        } else {
          wx.showToast({
            title: desp,
            icon: 'none'
          })
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '网络连接错误',
          icon: 'none'
        })
      }
    })
  }
})