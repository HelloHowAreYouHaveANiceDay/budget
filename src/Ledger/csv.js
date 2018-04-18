const Papa = require('papaparse');

const parseCSV = (filepath) => Papa.parse(filepath, {header:true}); 

module.exports = parseCSV;
