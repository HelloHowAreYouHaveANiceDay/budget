<template>
  <article class="media">
      <div class="media-left">
        <span class="panel-icon">
        <font-awesome-icon icon="file" />
        </span>
      </div>
      <div class="media-content">
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <div class="content is-small">
                  {{filePath.split('\\').pop()}}
                </div>
              </div>
            </div>

            <div class="level-right">
              <button class="button is-small"
              @click="readFile">
              <font-awesome-icon icon="x-ray" title="read file"/>
              </button>
            </div>
          </nav>
      </div>
  </article>
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
