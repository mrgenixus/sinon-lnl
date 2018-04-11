module.exports = {
  store: function(key, value) {
    global.localStorage.setItem(key, value);
  },

  retrieve: function(key) {
    return global.localStorage.getItem(key);
  }
}
