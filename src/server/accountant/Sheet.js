var Sheet = (function () {
  var compose = function(f, g) { return function(x){ f(g(x)) }};


  var getSheetByName = function(sheetName){
    var sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(sheetName);
    return sheet;
  };

  var arrayToObjects = function(dataArray) {
    var objects = [];
    for(var i = dataArray.length - 1; i > 0; i--) {
      var object = {};
      for (var j = 0; j < dataArray[0].length; j++){
        object[dataArray[0][j]] = dataArray[i][j]; 
      };
      object.row = i + 1;
      objects.push(object);
    };
    return objects;
  };

  return {
    getActiveSheet: SpreadsheetApp.getActiveSpreadsheet.getSheetByName,
    addObjectRow: function(sheetName, obj){
      var sheet = getSheetByName(sheetName);
      var headers = sheet.getRange(1,1, 1, sheet.getLastColumn()).getValues()[0];
      var values = [];
      headers.forEach(function(key){
        values.push(obj[key])
      })
      sheet.getRange(sheet.getLastRow() + 1, 1, 1, values.length).setValues([values]);
    },
    deleteRow: function(){

    },
    getHeaders: function (sheetName) {
      var sheet = getSheetByName(sheetName);
      var headers = sheet.getRange(1,1, 1, sheet.getLastColumn()).getValues()[0];
      return true;
    },
    setHeaders: function (sheetName, headers) {
      var sheet = getSheetByName(sheetName);
      try {
        sheet.getRange(1,1, 1, headers.length).setValues([headers]);
        return true;
      } catch(error) {
        throw(error);
      }
    },
    getCollection: function (sheetName) {
      var dataArray = getSheetByName(sheetName).getDataRange().getValues();
      return arrayToObjects(dataArray);
    },
  };
})();

var test_sheet = function(){
  Logger.log(
    Sheet.getActiveSheet('Transactions') === SpreadsheetApp.getActiveSpreadsheet.getSheetByName('Transactions')
  )
}
