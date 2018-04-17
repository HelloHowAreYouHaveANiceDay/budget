var Accountant = (function (){
  var config = {
    ledgerSheet: 'Transactions',
    accountSheet: 'Accounts',
  }

  return {
    addTransactions: function(transactions){
      var currentLedger = Sheet.getCollection(config.ledgerSheet)
      transactions.forEach(function(t){
        if(Ledger.transactionExists(t, currentLedger)){
          Logger.log('transaction Exists' + t); 
        } else {
          Sheet.addObjectRow(config.ledgerSheet, t);
          Logger.log('transaction added' + t); 
        }
      })
    } 
  }
})();
