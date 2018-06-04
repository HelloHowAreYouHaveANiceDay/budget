<template>
<li>
        <p class="">
          <div>
            <p> {{account.name || 'unnamed account'}} </p>
            <p> {{account.version}} </p>
            <li>
              <a class="" @click="toggleFolder">browse folders</a>
            </li>
          </div>
          <ul v-if="folderBrowser">
            <li>
              <a class="button is-small" @click="selectFolder">add folder</a>
            </li>
            <li v-for="folderId in account.folders" :key="folderId">
              <Folder :id="folderId"></Folder>
            </li>
          </ul>
        </p>
</li>
</template>

<script>
import R from 'ramda';

import Folder from './Folder';

const { dialog } = require('electron').remote;
export default {
  name: 'account',
  data() {
    return {
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
  },
};
</script>