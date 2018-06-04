<template>
        <a class="card">
          <div>
            <p> {{account.name || 'unnamed account'}} </p>
            <p> {{account.version}} </p>
            <!-- <p> {{folder.path | pathRoot}} </p>
            <div class="button is-small" @click="scanFolder"> scan </div>
            <div class="button is-small" @click="convertToAccount"> folder > account</div> -->
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
    account() {
      return this.$store.state.Accounts.byId[this.id];
    },
  },
  filters: {
    pathRoot(filepath) {
      return path.relative(__dirname, filepath);
    },
  },
  methods: {
  },
};
</script>