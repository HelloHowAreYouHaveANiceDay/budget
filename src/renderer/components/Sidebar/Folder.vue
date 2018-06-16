<template>
<article class="media">
        <div class="media-left"
            @click="toggleShow">
            <font-awesome-icon v-show="!show" icon="folder" />
            <font-awesome-icon v-show="show" icon="folder-open" />
        </div>
        <div class="media-content">
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <div class="content is-small">
                  <p> {{folder.path | pathStub}} </p>
                </div>
              </div>
            </div>

            <div class="level-right">
              <div>
                <div class="button 
                  scan-folder
                  is-small" 
                  @click="scanFolder"> scan </div>
              </div>
            </div>
          </nav>

        <folder-file v-for="file in folder.files" 
        v-if="show"
        :file-path="folder.path + '\\' + file"
        :account-id="accountId"
        :key="file">
        </folder-file>
        </div>
</article>
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
    'accountId',
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

<style scoped>
</style>