var app = getApp();
var url = app.url;

import bookService from '../../service/book.service';

var isbn13;
var isaddBook;
var isbatchInput;
var qty;

Page({
  data: {
    bookMsg: {},
    isLoading: false, //是否正在读取数据
    windowWidth: '',
    windowHeight: '',
    showDeleteBook: false, //是否显示 删除 按钮
    showRedone: false, //是否显示 重录 按钮
    showAddBook: false, //是否显示 录入 按钮
  },
  inputChange: function (e) {
    this.data.addBookQty = e.detail.value;
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    isbn13 = that.options.id;
    isaddBook = that.options.addBook;
    isbatchInput = that.options.isbatchInput;

    //1.动态获取设备屏幕的高度，然后计算scroll view的高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
        });
      }
    });

    if (isaddBook === 'Y'){
      //2.从豆瓣查询某本书的相关信息
      wx.request({
        url: 'https://douban.uieee.com/v2/book/isbn/' + isbn13,
        data: {
        },
        header: {
          "Content-Type": "application/text"
        },
        success: function (res) {
          if (res.data['isbn13'] === isbn13){
            that.setData({
              bookMsg: res.data,
              isLoading: true,
              showAddBook: true,
              showDeleteBook: false,
              showRedone: false,
            });
          }else{
            that.setData({
              bookMsg: {},
              isLoading: true,
              showAddBook: false,
              showDeleteBook: false,
              showRedone: true,
            });
          }
        }
      })
    }else{
      var book = bookService.getBookDataByISBN(isbn13)
      that.setData({
        bookMsg: book,
        isLoading: true,
        showAddBook: false,
        showDeleteBook: true,
        showRedone: false,
      });
    }
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

  },
  addBook: function (e) {
    var that = this;
    var bookMsg = this.data.bookMsg;
    console.debug('addBook %s', JSON.stringify(bookMsg));
    bookService.addBook(bookMsg);
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true,
      duration: 550
    })
    setTimeout(function () {
      if (isbatchInput === 'false') {
        wx.switchTab({
          url: '../../pages/index/index'
        });
      } else {
        wx.switchTab({
          url: '../../pages/addBook/addBook',
        });
      }
    }, 500)
  },
  deleteBook: function (e) {
    var that = this;
    var bookMsg = this.data.bookMsg;
    
    console.debug('deleteBook %s', bookMsg['isbn13']);
    bookService.deleteBook(bookMsg['isbn13']);
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      mask: true,
      duration: 550
    })
    setTimeout(function () {
      wx.switchTab({
        url: '../../pages/index/index'
      });
    }, 500)

  },
  reDone: function (e) {
    console.log('reDone');
    wx.switchTab({
      url: '../../pages/addBook/addBook',
    });
  },
})