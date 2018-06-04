<template>
  <div>
    <div class="button" @click="selectFolder">select folder</div>
  </div>
</template>

<script>
import fs from 'fs-extra';
import R from 'ramda';

const { dialog } = require('electron').remote;

export default {
  name: 'side-bar',
  components: {},
  data() {
    return {};
  },
  methods: {
    selectFolder() {
      dialog.showOpenDialog(
        {
          properties: ['openDirectory'],
        },
        R.pipe(R.head, this.addFolder),
      );
    },
    scanFolder(filepath) {
      return new Promise((resolve, reject) => {
        fs.readdir(filepath, 'utf-8', (err, data) => {
          if (err) {
            reject(err);
          }
          console.log(data);
          resolve(data);
        });
      });
    },
    addFolder(path) {
      this.$store.dispatch('Folders/addFolder', path);
    },
  },
};
</script>
