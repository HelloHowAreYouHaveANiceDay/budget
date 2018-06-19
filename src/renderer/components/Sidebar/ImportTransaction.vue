<template>
   <a class="button is-fullwidth is-info" @click="importTransactions">importTransactions</a>
</template>

<script>

const { dialog } = require('electron').remote;

export default {
  name: 'import-transaction',
  data() {
    return {

    };
  },
  methods: {
    importTransactions() {
      dialog.showOpenDialog({
        filters: [
          {
            name: '.csv',
            extensions: [
              'csv',
            ],
          },
        ],
        properties: [
          'openFile',
        ],
      }, (result) => {
        console.log('hurray', result);
      });
    },
  },
};
</script>

<style scoped>

</style>
