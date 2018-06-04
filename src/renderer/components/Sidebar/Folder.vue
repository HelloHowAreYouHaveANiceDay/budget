<template>
        <a>
          <div>
            <p> {{folder.name || 'unnamed folder'}} </p>
            <p> {{folder.path | pathRoot}} </p>
            <div class="button is-small" @click="scanFolder"> scan </div>
          </div>
        </a>
</template>

<script>
import path from 'path';

export default {
  props: [
    'folder',
  ],
  filters: {
    pathRoot(filepath) {
      return path.relative(__dirname, filepath);
    },
  },
  methods: {
    scanFolder() {
      this.$store.dispatch('Folders/scanFolder', this.folder);
    },
  },
};
</script>