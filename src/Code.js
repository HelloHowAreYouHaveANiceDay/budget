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
 var dataArray = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Categories').getDataRange().getValues();
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
  transactions = mapAmounts(transactions);
  transactions = mapBuckets(transactions);
//  var categories = _.uniq(transactions.map(function(t){
//    return t.Category
//  }))
  
  return transactions;
}

