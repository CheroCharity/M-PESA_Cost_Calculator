// pages/index/index.js
Page({
  data: {
    isMobile: false,
  },

  onLoad() {
    this.checkIfMobile();
  },

  checkIfMobile() {
    this.setData({
      isMobile: true,
    });
  },

  openCalculator() {
    my.navigateTo({
      url: '/pages/send/send',
    });
  },

  learnMore() {
    // Navigate to the learn more page
    const url = encodeURIComponent('https://www.safaricom.co.ke/main-mpesa/m-pesa-for-you/tariffs-limits/consumer-tariffs-limits');
    my.navigateTo({
    url: `/pages/webview/webview?url=${url}`,
    });
  },
});
