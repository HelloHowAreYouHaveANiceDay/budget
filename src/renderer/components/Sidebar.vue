<template>
  <div>
    <aside>
      <p class="menu-label">
        folders
      </p>
    <ul class="card">
      <li> 
    <a class="button" @click="selectFolder">select folder</a>
    </li>
      </ul>
    <ul class="menu-list">
      <Folder v-for="id in folders.allIds" 
      :id="id" 
      :key="id">
      </Folder>
    </ul>
      <p class="menu-label">
        accounts 
      </p>
    <ul class="menu-list">
      <Account v-for="id in accounts.allIds" 
      :id="id" 
      :key="id">
      </Account>
    </ul>
    </aside>
  </div>
</template>

<script>
import R from 'ramda';

import Folder from './Sidebar/Folder';
import Account from './Sidebar/Account';

const { dialog } = require('electron').remote;

export default {
  name: 'side-bar',
  components: {
    Folder,
    Account,
  },
  data() {
    return {};
  },
  computed: {
    folders() {
      return this.$store.state.Folders;
    },
    accounts() {
      return this.$store.state.Accounts;
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
      this.$store.dispatch('addFolder', path);
    },
  },
};
</script>
