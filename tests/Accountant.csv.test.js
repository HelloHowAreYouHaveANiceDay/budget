const CSV = require('../src/Accountant/csv');


test('parse csv with header', () => {
  const path = '../budget/mock_data/test_cc.csv';
  expect.assertions(1);
  return CSV.get(path).then((data) => {
    expect(typeof data).toBe('object');
  });
});
