import requset from '../shared/request';
import config from '../config';

Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};

Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

function getAllBookISBN(){
  try {
    var value = wx.getStorageSync('all_book_isbn')
    console.debug('getAllBookISBN %s', JSON.stringify(value));
    if (value) {
      return value
    }else{
      return []
    }
  } catch (e) {
    console.warn('getAllBookISBN');
    console.warn(e);
    wx.showToast({
      title: 'fail get_all_book_isbn',
      icon: 'none',
      duration: 1000,
      mask: true,
    })
    return []
  }
}

function getBookDataByISBN(isbn) {
  try {
    var value = wx.getStorageSync(isbn)
    console.debug('getBookDataByISBN %s', isbn);
    if (value) {
      return value
    } else {
      return {}
    }
  } catch (e) {
    console.warn('getBookDataByISBN %s', isbn);
    console.warn(e);
    wx.showToast({
      title: 'fail get_book_isbn' + isbn,
      icon: 'none',
      duration: 1000
    })
    return {}
  }
}

function addBook(book){
  console.info('addBook %s', JSON.stringify(book));
  var all_books = getAllBookISBN()
  if (all_books.indexOf(book['isbn13']) == -1){
    all_books.push(book['isbn13'])
    wx.setStorage({
      key: 'all_book_isbn',
      data: all_books
    })
    wx.setStorage({
      key: book['isbn13'],
      data: book
    })
  }
}

function deleteBook(isbn) {
  console.info('deleteBook %s', isbn);
  wx.removeStorage({
    'key': isbn
  })
  var all_books = getAllBookISBN()
  all_books.remove(isbn)
  wx.setStorage({
    key: 'all_book_isbn',
    data: all_books
  })
}

module.exports = {
    getAllBookISBN,
    getBookDataByISBN,
    addBook,
    deleteBook
}