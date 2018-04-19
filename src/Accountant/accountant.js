import R from 'ramda';

const changeKeyName = (k1, k2) => (o) => {
  const n = R.clone(o);
  delete n[k1];
  n[k2] = o[k1];
  return n;
};

const replaceTransDate = changeKeyName('Trans Date', 'TransDate');
const replacePostDate = changeKeyName('Post Date', 'PostDate');

const transform = R.compose(replaceTransDate, replacePostDate);

module.exports.changeKeyName = changeKeyName;
module.exports.transform = transform;
