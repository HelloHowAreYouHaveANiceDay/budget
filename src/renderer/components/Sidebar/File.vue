<template>
<div>
  <div class="panel-block">
      <span class="panel-icon">
      <font-awesome-icon icon="file" />
      </span>
      {{filePath.split('\\').pop()}}
      <button class="button is-small"
      @click="readFile">
        read file
      </button>
  </div>
</div>
</template>

<script>

import fs from 'fs-extra';
import R from 'ramda';

// import Csv from '../../../budget/csv.js';
import * as d3 from 'd3';

const convertTransaction = R.curry((acct, t) => {
  // console.log(t);
  const transaction = {
    debit: '',
    credit: '',
    amount: Math.abs(t.Amount),
  };

  if (t.Amount > 0) {
    transaction.credit = acct;
  } else {
    transaction.debit = acct;
  }

  console.log(transaction);
});

export default {
  name: 'folder-file',
  props: [
    'filePath',
    'accountId',
  ],
  methods: {
    readFile() {
      fs.readFile(this.filePath, 'utf-8', (err, data) => {
        // if (err) { reject(err); }
        const rawTransactions = d3.csvParse(data);
        rawTransactions.map(convertTransaction(this.accountId));
      });
    },
  },
};
</script>

<style>

</style>
