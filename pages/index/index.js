// pages/index/index.js
Page({
  data: {
    isMobile: false,
  },

  onLoad() {
    this.checkIfMobile();
  },

  checkIfMobile() {
    // Logic to determine if the device is mobile
    this.setData({
      isMobile: true, // Example: Set to true for mobile devices
    });
  },

  openCalculator() {
    // Navigate to the calculator page
    my.navigateTo({
      url: '/pages/send/send',
    });
  },

  learnMore() {
    // Navigate to the learn more page
    my.navigateTo({
      url: '/pages/learn-more/index',
    });
  },
});
