module.exports = {
  urlInArray: function (url, list) {
    for (var i = 0, len = list.length; i < len; i++) {
      if (list[i].url === url) {
        return true
      }
    }
    return false
  }
}
