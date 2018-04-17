var Sheet = (function () {

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
    addRow: function(){

    },
    deleteRow: function(){

    },
    getHeaders: function (sheetName) {
      var sheet = getSheetByName(sheetName);
      var headers = sheet.getRange(1,1, 1, headers.length).getValues()[0];
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
      var dataArray = getSheetByName(sheetName);
      return arrayToObjects(dataArray);
    },
  };
})();
