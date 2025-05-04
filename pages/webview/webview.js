// pages/webview/webview.js
Page({
  onLoad(query) {
    this.setData({
      url: decodeURIComponent(query.url)
    });
  }
});
