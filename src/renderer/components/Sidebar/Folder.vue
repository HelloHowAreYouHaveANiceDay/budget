<template>
<div>
        <div class="panel-block"
            @click="toggleShow">
            <span class="panel-icon">
            <font-awesome-icon icon="angle-right" />
            </span>
            <span class="panel-icon">
            <font-awesome-icon icon="folder" />
            </span>
            <p> {{folder.path | pathStub}} </p>
            <div class="button is-small" @click="scanFolder"> scan </div>

        </div>
        <folder-file v-for="file in folder.files" 
        v-if="show"
        :file-path="folder.path + '\\' + file"
        :key="file">
        </folder-file>
</div>
</template>

<script>
import path from 'path';
import R from 'ramda';

import FolderFile from './File';

export default {
  data() {
    return {
      show: false,
    };
  },
  props: [
    'id',
  ],
  components: {
    FolderFile,
  },
  computed: {
    folder() {
      return this.$store.state.Folders.byId[this.id];
    },
  },
  filters: {
    pathRoot(filepath) {
      return path.relative(__dirname, filepath);
    },
    pathStub: R.pipe(R.split('\\'), R.takeLast(2), R.join('\\')),
  },
  methods: {
    scanFolder() {
      this.$store.dispatch('scanFolder', this.id);
    },
    toggleShow() {
      this.show = !this.show;
    },
  },
};
</script>