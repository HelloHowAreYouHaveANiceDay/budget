const CSV = require('../src/Accountant/csv');
const ACCOUNTANT = require('../src/Accountant/accountant');


test('parse csv with header', () => {
  const path = '../budget/mock_data/test_cc.csv';
  expect.assertions(1);
  return CSV.get(path).then((data) => {
    expect(typeof data).toBe('object');
  });
});

test('map keys from csv import to schema', () => {
  const testData = {
    Type: 'Sale',
    'Trans Date': '03/29/2018',
    'Post Date': '03/29/2018',
    Description: 'CYCLO',
    Amount: 100.00,
  };

  expect(ACCOUNTANT.transform(testData)).toEqual({
    Type: 'Sale',
    TransDate: '03/29/2018',
    PostDate: '03/29/2018',
    Description: 'CYCLO',
    Amount: 100.00,
  });
});
