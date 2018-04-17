var Ledger = (function (){
  var transactionTemplate = {
    id: null,
    type: null,
    TransDate: null,
    PostDate: null,
    Description: null,
    Amount: null,
    Identifier: null,
    Account: null,
  }

  return {
    addTransaction: function(transaction, ledger){

    },
    transactionExists: function(transaction, ledger){
      if(transaction.id !== undefined && _.find(ledger, {'id': transaction.id} !== undefined)){
        Logger.log('id found');
        return true;
      } else {
        for(var i=0; i<ledger.length; i++) {
          if(ledger[i].TransDate === transaction.TransDate &&
            ledger[i].PostDate === transaction.PostDate &&
            ledger[i].Source === transaction.Source &&
            ledger[i].Description === transaction.Description &&
            ledger[i].Amount === transaction.Amount
          ){
            return true;
          }
        }
        return false;
      }
    },
    pushTransactions: function (transactions){
      for(var i = 0;i<transactions.length;i++){
        addTransaction(transactions[i]);
      }
    },
    mapAmounts: function (transactions){
      transactions.map(function(t){
        if(t['Transaction Type'] = 'debit'){
          t.Amount = (0 - t.Amount);
        }
      })
      return transactions;
    },
    outputTransactions: function (transactions){
      var newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Transactions');
    },
  }
})();
