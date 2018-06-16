<template>
  <div class="">
    {{message}} hello
  </div>
</template>

<script>
  // import SystemInformation from './LandingPage/SystemInformation';
  import fs from 'fs-extra';

  import Csv from '../../budget/csv.js';

  export default {
    name: 'center',
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
        if (this.account) {
          return this.account.folders.map(id => this.$store.getters.getFolderById(id));
        }
        return [];
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
