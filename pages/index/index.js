var app = getApp();

import bookService from '../../service/book.service';
// import Rx from 'rxjs';

Page({
  data: {
    bookList: [],
    inputShowed: false,
    inputVal: ""
  },
  inputChange: function (e) {
    this.data.inputVal = e.detail.value;
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    var seach = e.detail.value;
    console.log(seach);
    var that = this;
    var bookList = []
    var books = bookService.getAllBookISBN()
    for (var i = 0, len = books.length; i < len; i++) {
      var book = bookService.getBookDataByISBN(books[i])
      if (book['title'].toLowerCase().indexOf(seach.toLowerCase()) != -1){
        bookList.push(book);
        continue;
      }
      for (var x = 0, x_len = book['author'].length; x < x_len; x++){
        if (book['author'][x].toLowerCase().indexOf(seach.toLowerCase()) != -1) {
          bookList.push(book);
          break;
        }
      }
      }
    that.setData({
      bookList: bookList
    });
    
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

  },
  queryBooks: function (e) {
    var that = this;
    var bookList = []
    var books = bookService.getAllBookISBN()
    for (var i = 0, len = books.length; i < len; i++){
      bookList.push(bookService.getBookDataByISBN(books[i]))
    }
    that.setData({
      bookList: bookList
    });

  },
  goToDetailPage: function (e) {

    var isbn13 = e.currentTarget.id;
    var qty = e.currentTarget.dataset.qty;
    wx.navigateTo({
      url: '../detail/detail?id=' + isbn13 + '&qty=' + qty
    });

  },
  onShow: function () {
    // 页面显示
    //console.log('onshow');
    //this.queryAllBooks();
    this.queryBooks();
  },
  queryAllBooks: function () {

    var that = this;
    var options = {
      url: config.clubApi.list,
      data: {
        appkey: config.appKey,
        type: 'bookLibrary'
      }
    };

  }

})