<template>
        <a>
            <p> {{folder.path | pathStub}} </p>
            <div class="button is-small" @click="scanFolder"> scan </div>
            <!-- <div class="tags">
              <span v-for="t in folder.fileTypes" 
                  class="tag" 
                  :key="t"> {{t}} </span>
            </div> -->

            <br>

              <div v-for="file in folder.files" :key="file">
                file: {{file}}
                <a class="button" @click="readFile(folder.path + '\\' + file)">get files</a>
              </div>
        </a>
</template>

<script>
import path from 'path';
import R from 'ramda';

export default {
  props: [
    'id',
  ],
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
  },
};
</script>