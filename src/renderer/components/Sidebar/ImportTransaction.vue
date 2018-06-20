<template>
   <a class="button is-fullwidth is-info" @click="toggleModal">
     importTransactions
      <div :class="{
        'modal': true,
        'is-active': modal,
        }">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Modal title</p>
            <button class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <!-- Content ... -->
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success">Save changes</button>
            <button class="button">Cancel</button>
          </footer>
        </div>
    </div>
   </a>
</template>

<script>

const { dialog } = require('electron').remote;

export default {
  name: 'import-transaction',
  data() {
    return {
      modal: false,
      temporaryTransactions: [
      ],
    };
  },
  methods: {
    toggleModal() {
      this.modal = !this.modal;
    },
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
