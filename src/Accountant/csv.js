const Papa = require('papaparse');
const R = require('ramda');
const fs = require('fs');

// parceCSV :: String -> Object
const parseCSV = Papa.parse;

const getFile = filepath => new Promise((resolve, reject) => {
  fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) { reject(err); }
    resolve(data);
  });
});

const getCSV = R.composeP(parseCSV, getFile);

module.exports.get = getCSV;
