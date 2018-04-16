var _ = load();

function onOpen() {
  SpreadsheetApp.getUi().createMenu('budget')
    .addItem('sidebar', 'showSidebar')
    .addToUi();
}

function showSidebar(){
  var html = HtmlService.createTemplateFromFile('sidebar.html')
    .evaluate()
    .setTitle('budget')
    .setWidth(400)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);

  SpreadsheetApp.getUi()
    .showSidebar(html);
}

function getTransactionsAsObjects() {
  var dataArray = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('mint').getDataRange().getValues();
  return ArrayToObjects(dataArray);
}

function addTransaction(transaction, ledger){

}

function transactionExists(transaction, ledger){
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
}

function pushTransactions(transactions){
  for(var i = 0;i<transactions.length;i++){
    addTransaction(transactions[i]);
  }
}

function getBuckets(){
  var dataArray = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('Categories')
    .getDataRange()
    .getValues();

  return ArrayToObjects(dataArray);
}

function ArrayToObjects(dataArray) {
  var objects = [];
  for(var i = dataArray.length - 1; i > 0; i--) {
    var object = {};
    for (var j = 0; j < dataArray[0].length; j++){
      object[dataArray[0][j]] = dataArray[i][j]; 
    };
    objects.push(object);
  };
  return objects;
}

function mapAmounts(transactions){
  transactions.map(function(t){
    if(t['Transaction Type'] = 'debit'){
      t.Amount = (0 - t.Amount);
    }
  })
  return transactions;
}

function mapBuckets(transactions){
  var buckets = getBuckets();
  transactions.map(function(t){
    t.bucket = _.find(buckets, {'mint': t.Category}).bucket;
  });
  return transactions;
}

function outputTransactions(transactions){
  var newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Transactions');
}

function test(){
  var transactions = getTransactionsAsObjects();
  //   transactions = mapAmounts(transactions);
  //   transactions = mapBuckets(transactions);
  //  var categories = _.uniq(transactions.map(function(t){
  //    return t.Category
  //  }))
  var testTransaction = {   
    "Type": 1,   
    "TransDate": "11/13/2017",   
    "PostDate": "12/19/2017",   
    "Description": "Pathological fracture in other disease, unspecified humerus",   
    "Amount": "8.42",   
    "Source": "jcb",   
    "Identifier": "f6476045-af8a-4643-b720-56d99a09b6b6" 
  }

  Logger.log(transactionExists(testTransaction, MOCK_TRANSACTIONS));
  return transactions;
}

