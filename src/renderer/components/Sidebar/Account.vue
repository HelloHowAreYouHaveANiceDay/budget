<template>
<div>
  <a class="panel-block" @click="toggleDetails">
    <span class="panel-icon">
      <font-awesome-icon v-show="!accountDetails" icon="book" />
      <font-awesome-icon v-show="accountDetails" icon="book-open" />
      </span>
      {{account.name || 'unnamed account'}}
  </a>
     
  <div class="panel-block" 
    @click="toggleFolder"
    v-show="accountDetails">
    <span class="panel-icon">
      <font-awesome-icon v-show="!accountDetails || !folderBrowser" icon="angle-right" />
      <font-awesome-icon v-show="accountDetails && folderBrowser" icon="angle-down" />
    </span>
    <p>
      folders
    </p>
    <div class="add-folder button is-small" 
    @click="selectFolder">add folder</div>
  </div>

  <Folder v-for="folderId in account.folders" 
          v-show="accountDetails && folderBrowser"
          :key="folderId"
          :id="folderId"></Folder>

</div>

</template>



<script>
import R from 'ramda';

import Folder from './Folder';

const { dialog } = require('electron').remote;
export default {
  name: 'account',
  data() {
    return {
      accountDetails: false,
      folderBrowser: false,
    };
  },
  props: [
    'id',
  ],
  components: {
    Folder,
  },
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
    toggleFolder() {
      this.folderBrowser = !this.folderBrowser;
    },
    toggleDetails() {
      this.accountDetails = !this.accountDetails;
    },
    selectThisAccount() {
      this.$store.dispatch('selectAccount', this.id);
    },
  },
};
</script>

<style scoped>
.add-folder {
  float: right;
}
</style>
