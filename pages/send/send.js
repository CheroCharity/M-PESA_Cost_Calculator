Page({
  data: {
    amount: '',
    tillNumber: '',
    payBillNumber: '',
    showError: false,
    current: 0,
    selected:'paybill',
    fees: {
      send_registered: 0,
      send_unregistered: 0,
      withdraw_agent: 0,
      withdraw_atm: 0
    },
    tillFees: {
      till_charge: 0,
    },
    paybillFees: {
      paybill_charge: 0,
    },
    feeTable: [],
    tillFeeTable: [],
    paybillFeeTable: [],
  },

  onLoad() {
    this.fetchFeeTable();
    this.fetchTillFeeTable();
    this.fetchPayBillFeeTable();
  },

  fetchFeeTable() {
    my.request({
      url: 'https://run.mocky.io/v3/19861626-0876-4d81-90ca-1e4273fd230d', // Replace with real URL
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        const feeData = res.data;
  
        if (Array.isArray(feeData)) {
          this.setData({ feeTable: feeData });
        }
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
  
  fetchTillFeeTable() {
    my.request({
      url: 'https://run.mocky.io/v3/8adf89e8-3eb3-4c46-8937-2b9bdf54aa23', 
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        const feeData = res.data;
  
        if (Array.isArray(feeData)) {
          this.setData({ tillFeeTable: feeData });
        }
        else if (Array.isArray(feeData.data)) {
          this.setData({ tillFeeTable: feeData.data });
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

  fetchPayBillFeeTable() {
    my.request({
      url: 'https://run.mocky.io/v3/511b1f87-6acb-46f4-a651-6bbac3a8cc61', 
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        const feeData = res.data;
  
        if (Array.isArray(feeData)) {
          this.setData({ paybillFeeTable: feeData });
        }
        else if (Array.isArray(feeData.data)) {
          this.setData({ paybillFeeTable: feeData.data });
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

  onTillInput(e) {
    this.setData({
      tillNumber: e.detail.value,
    })
  }, 

  onPayBillInput(e) {
    this.setData({
      payBillNumber: e.detail.value,
    })
  }, 

  onAmountInput(e) {
    const amount = parseFloat(e.detail.value) || 0;
    let inputVal = Number(e.detail.value);

    this.setData({
      tillFees: {
        till_charge: 0,
      },
      paybillFees: {
        paybill_charge: 0,
      },
    });

    

    if (amount > 150000 && current === 0) {
      this.setData({
        amount: '150000',
        showError: true,
      });
    } else if(amount > 250000 && current === 1){
      this.setData({
        amount: '250000',
        showError: true,
      });
    }else
      {
      
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
},
onTabChange(e) {
  const index = e.currentTarget.dataset.index; 
  this.setData({
    current: Number(index),
    amount: '',
  });
},
onRadioChange(e) {
  console.log(e.detail.value === 'till');
  this.setData({
    selected: e.detail.value,
    amount: '',
    tillFees: {
      till_charge: 0,
    },
    paybillFees: {
      paybill_charge: 0,
    },
    payBillNumber: '',
    tillNumber: ''
  });
},

checkTillCost(){
  console.log(this.data.amount);
  let matchedFees = {
    till_charge: null
  };

  for (let range of this.data.tillFeeTable) {
    if (this.data.amount >= range.min_amount && this.data.amount <= range.max_amount) {
      matchedFees = {
        till_charge: range.charge,
      };
      break;
    }
  }

  this.setData({
    tillFees: matchedFees,
    showError: false,
  });
},
checkPayBillCost(){
  console.log(this.data.amount);
  let matchedFees = {
    paybill_charge: null
  };

  for (let range of this.data.tillFeeTable) {
    if (this.data.amount >= range.min_amount && this.data.amount <= range.max_amount) {
      matchedFees = {
        paybill_charge: range.charge,
      };
      break;
    }
  }

  this.setData({
    paybillFees: matchedFees,
    showError: false,
  });
}
});
