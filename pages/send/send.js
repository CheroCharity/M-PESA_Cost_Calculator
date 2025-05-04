Page({
  data: {
    amount: '',
    showError: false,
    fees: {
      send_registered: 0,
      send_unregistered: 0,
      withdraw_agent: 0,
      withdraw_atm: 0
    },
    feeTable: []
  },

  onLoad() {
    this.fetchFeeTable();
  },

  fetchFeeTable() {
    my.request({
      url: 'https://run.mocky.io/v3/19861626-0876-4d81-90ca-1e4273fd230d', // Replace with real URL
      method: 'GET',
      dataType: 'json', // Accept real JSON
      success: function (res) {
        const feeData = res.data;
  
        // CASE 1: Direct array
        if (Array.isArray(feeData)) {
          this.setData({ feeTable: feeData });
        }
        // CASE 2: Wrapped inside 'data'
        else if (Array.isArray(feeData.data)) {
          this.setData({ feeTable: feeData.data });
        }
        else {
          my.alert({ title: 'Error', content: 'Invalid fee data format' });
          console.error('Unexpected fee data:', feeData);
        }
      }.bind(this),
      fail: function (err) {
        console.error('Network or API error:', err);
        my.alert({ title: 'Error', content: 'Failed to load fee data' });
      }.bind(this)
    });
  },     

  onAmountInput(e) {
    const amount = parseFloat(e.detail.value) || 0;
    let inputVal = Number(e.detail.value);

    if (amount > 150000) {
      this.setData({
        amount: '150000',
        showError: true,
      });
    } else {
      
    let matchedFees = {
      send_registered: null,
      send_unregistered: null,
      withdraw_agent: null,
      withdraw_atm: null
    };

    for (let range of this.data.feeTable) {
      if (amount >= range.minAmount && amount <= range.maxAmount) {
        matchedFees = {
          send_registered: range.sendToRegistered,
          send_unregistered: range.sendToUnregistered,
          withdraw_agent: range.agentWithdrawal,
          withdraw_atm: range.atmWithdrawal
        };
        break;
      }
    }

    this.setData({
      amount,
      fees: matchedFees,
      showError: false,
    });
  }
}
});
