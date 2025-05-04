Page({
  data: {
    activeTab: 'paybill',
    form: {
      paybill: { merchant: '', amount: '' },
      till: { merchant: '', amount: '' }
    },
    transactions: [] // Mock transaction history
  },

  switchTab(e) {
    this.setData({ activeTab: e.target.dataset.tab });
  },

  onMerchantInput(e) {
    const tab = this.data.activeTab;
    this.setData({
      [`form.${tab}.merchant`]: e.detail.value
    });
  },

  onAmountInput(e) {
    const tab = this.data.activeTab;
    this.setData({
      [`form.${tab}.amount`]: e.detail.value
    });
  },

  onSubmit() {
    const tab = this.data.activeTab;
    const typeLabel = tab === 'paybill' ? 'Paybill' : 'Till';
    const { merchant, amount } = this.data.form[tab];

    if (!merchant || !amount) {
      my.alert({ title: 'Error', content: 'Please enter both merchant and amount.' });
      return;
    }

    // Simulate success and add to mock history
    const newTransaction = {
      type: typeLabel,
      merchant,
      amount,
      time: new Date().toLocaleString()
    };

    this.setData({
      transactions: [newTransaction, ...this.data.transactions]
    });

    my.alert({
      title: 'Payment Successful (Mock)',
      content: `Paid Ksh ${amount} to ${typeLabel} ${merchant}`
    });

    // Clear the input fields
    this.setData({
      [`form.${tab}.merchant`]: '',
      [`form.${tab}.amount`]: ''
    });
  }
});
