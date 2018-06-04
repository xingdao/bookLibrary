// var util = require('../../utils/util');

import bookService from '../../service/book.service';

Page({
  data: {
    title: '',
    author: '',
    price: '',
    publisher: '',
    isbn13: '',
    isShowInputForm: false,
    isbatchInput: true
  },
  onLoad: function (options) {
  },
  addBook: function () {
    var that = this;

    wx.scanCode({
      scanType: 'barCode',
      success: (res) => {
        that.data.isbn13 = res.result;
        wx.navigateTo({
          url: "../detail/detail?id=" + that.data.isbn13 + "&addBook=Y&isbatchInput=" + that.data.isbatchInput
        });
      }
    })
  },
  //根据扫码录入控制手动输入的form是否显示
  screenInput: function (e) {
    this.setData({
      isShowInputForm: !e.detail.value
    })
  }, 
  // 是否连续输入
  batchInput: function (e) {
    this.setData({
      isbatchInput: e.detail.value
    })
  },
  saveBook: function (e) {
    var isbatchInput = this.data['isbatchInput'];
    var bookMsg = {
      title: this.data['title'],
      author: this.data['author'],
      price: this.data['price'],
      publisher: this.data['publisher'],
      isbn13: this.data['isbn13'],
    }
    wx.request({
      url: 'https://douban.uieee.com/v2/book/isbn/' + this.data['isbn13'],
      data: {
      },
      header: {
        "Content-Type": "application/text"
      },
      success: function (res) {
        console.debug('get data by douban %s', JSON.stringify(res.data));
        if ('isbn13' in res.data && res.data['isbn13'] === isbn13) {
          bookMsg = res.data
        }
      },
      complete: function (res) {
        bookService.addBook(bookMsg);
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 550,
          mask: true,
        })
        setTimeout(function () {
          if (!isbatchInput) {
            wx.switchTab({
              url: '../../pages/index/index'
            });
          }
        }, 500)
      }
    })
  },
  titleInput: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  authorInput: function (e) {
    this.setData({
      author: [e.detail.value]
    })
  },
  priceInput: function (e) {
    this.setData({
      price: e.detail.value
    })
  },
  publisherInput: function (e) {
    this.setData({
      publisher: e.detail.value
    })
  },
  isbnInput: function (e) {
    this.setData({
      isbn13: e.detail.value
    })
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  }
})