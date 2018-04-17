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

function getBuckets(){
  var dataArray = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('Categories')
    .getDataRange()
    .getValues();

  return ArrayToObjects(dataArray);
}

function collectionToTable(collection){
  var table = [];
  table.push(Object.keys(collection[0]));
  collection.forEach(function(o){
    table.push(table[0].map(function(key){return o[key]}));
  })
  return table;
}

function mapBuckets(transactions){
  var buckets = getBuckets();
  transactions.map(function(t){
    t.bucket = _.find(buckets, {'mint': t.Category}).bucket;
  });
  return transactions;
}


function tests(){
  //SETUP
  var transactions = MOCK_TRANSACTIONS;
  var transactionHeaders = Object.keys(transactions[0]);
  var testLedger = SpreadsheetApp.getActiveSpreadsheet().insertSheet('test-ledger');
  //Ledger
  //  addTransaction
  //  updateTransaction
  //  deleteTransaction
  //Account
  //  addAccount
  //  updateAccount
  //  deleteAccount
  //Category
  //  addCategory
  //  updateCategory
  //  deleteCategory
  var testTransaction = {   
    "Type": 1,   
    "TransDate": "11/13/2017",   
    "PostDate": "12/19/2017",   
    "Description": "Pathological fracture in other disease, unspecified humerus",   
    "Amount": "8.42",   
    "Source": "jcb",   
    "Identifier": "f6476045-af8a-4643-b720-56d99a09b6b6" 
  }

  Logger.log(Ledger.transactionExists(testTransaction, MOCK_TRANSACTIONS));
  Logger.log(collectionToTable(MOCK_TRANSACTIONS));

  //CLEANUP
  SpreadsheetApp.getActiveSpreadsheet().deleteSheet(testLedger);
  //debug
  return transactions;
}

