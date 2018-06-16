<template>
<div>
  <div class="panel-block">
      <span class="panel-icon">
      <font-awesome-icon icon="angle-right" />
      </span>
      <span class="panel-icon">
      <font-awesome-icon icon="angle-right" />
      </span>
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

// import Csv from '../../../budget/csv.js';
import * as d3 from 'd3';

export default {
  name: 'folder-file',
  props: [
    'filePath',
  ],
  methods: {
    readFile() {
      fs.readFile(this.filePath, 'utf-8', (err, data) => {
        // if (err) { reject(err); }
        console.log(d3.csvParse(data));
      });
    },
  },
};
</script>

<style>

</style>
