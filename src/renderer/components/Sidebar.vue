<template>
  <div>
    <aside>
      <p class="menu-label">
        folders
      </p>
    <ul class="menu-list">
      <Folder v-for="id in folders.allIds" 
      :id="id" 
      :key="id">
      </Folder>
    </ul>
      <div class="button" @click="selectFolder">select folder</div>
    </aside>
  </div>
</template>

<script>
import R from 'ramda';

import Folder from './Sidebar/Folder';

const { dialog } = require('electron').remote;

export default {
  name: 'side-bar',
  components: {
    Folder,
  },
  data() {
    return {};
  },
  computed: {
    folders() {
      return this.$store.state.Folders.folders;
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
