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
    'id',
  ],
  computed: {
    folder() {
      return this.$store.state.Folders.folders.byId[this.id];
    },
  },
  filters: {
    pathRoot(filepath) {
      return path.relative(__dirname, filepath);
    },
  },
  methods: {
    scanFolder() {
      this.$store.dispatch('scanFolder', this.folder);
    },
  },
};
</script>