const Papa = require('papaparse');
const parseCsv = require('../src/Ledger/csv');


test('parse csv with header', () =>{
  const parsed = Papa.parse('../mock_data/test_cc.csv', {header:true});
  expect(parseCsv('../mock_data/test_cc.csv')).toEqual(parsed);
})
