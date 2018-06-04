<template>
        <a class="card">
          <div>
            <p> {{folder.name || 'unnamed folder'}} </p>
            <p> {{folder.path | pathRoot}} </p>
            <div class="button is-small" @click="scanFolder"> scan </div>
            <div class="button is-small" @click="convertToAccount"> folder > account</div>
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
      return this.$store.state.Folders.byId[this.id];
    },
  },
  filters: {
    pathRoot(filepath) {
      return path.relative(__dirname, filepath);
    },
  },
  methods: {
    scanFolder() {
      this.$store.dispatch('scanFolder', this.id);
    },
    convertToAccount() {
      this.$store.dispatch('addAccount', this.id);
    },
  },
};
</script>