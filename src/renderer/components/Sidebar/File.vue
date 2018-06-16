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

// import Csv from '../../../budget/csv.js';
import * as d3 from 'd3';

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
        Promise.all(rawTransactions.map(tran => this.$store.dispatch('addTransaction', tran)))
          .then((result) => {
            console.log(result);
          });
      });
    },
  },
};
</script>

<style>

</style>
