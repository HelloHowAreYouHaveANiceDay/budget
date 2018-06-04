<template>
<li>
        <a class="">
          <div>
            <p> {{account.name || 'unnamed account'}} </p>
            <p> {{account.version}} </p>
          </div>
          <ul>
            <li>
              <a class="button is-small" @click="selectFolder">select folder</a>
            </li>
            <li v-for="folderId in account.folders" :key="folderId">
              {{folderId}}
            </li>
          </ul>
        </a>
</li>
</template>

<script>
import R from 'ramda';

const { dialog } = require('electron').remote;
export default {
  props: [
    'id',
  ],
  computed: {
    account() {
      return this.$store.state.Accounts.byId[this.id];
    },
  },
  filters: {
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
    addFolder(path) {
      this.$store.dispatch('addFolder', path)
        .then((folderId) => {
          // console.log(folderId);
          this.$store.dispatch('addFolderToAccount', {
            id: this.id,
            folderId,
          });
        });
    },
  },
};
</script>