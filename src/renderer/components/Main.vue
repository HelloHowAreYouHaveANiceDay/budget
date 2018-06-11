<template>
  <div class="mai">
    {{message}}
    <div v-for="folder in folders" :key="folder.id" class="section">
      {{folder.path}}
      <div v-for="file in folder.files">
        {{file}}
        <a class="button" @click="readFile(folder.path + '\\' + file)">get files</a>
      </div>
    </div>
  </div>
</template>

<script>
  // import SystemInformation from './LandingPage/SystemInformation';
  import fs from 'fs-extra';

  import Csv from '../../budget/csv.js';

  export default {
    name: 'main',
    components: {
    },
    data() {
      return {
        message: 'hello vue',
      };
    },
    computed: {
      account() {
        return this.$store.state.Accounts.byId[this.$store.state.Accounts.selectedAccount];
      },
      folders() {
        return this.account.folders.map(id => this.$store.state.Folders.byId[id]);
      },
    },
    methods: {
      readFile(filepath) {
        fs.readFile(filepath, 'utf-8', (err, data) => {
          // if (err) { reject(err); }
          console.log(Csv.parse(data));
        });
        console.log(filepath);
      },
    },
  };
</script>

<style>
</style>
