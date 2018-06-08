<template>
  <div>
    <div v-for="folder in folders" :key="folder.id" class="section">
      {{folder}}
    </div>
  </div>
</template>

<script>
  // import SystemInformation from './LandingPage/SystemInformation';

  export default {
    name: 'main',
    components: {
    },
    data() {
      return {
        message: 'hello vue',
      };
    },
    computed: {
      account() {
        return this.$store.state.Accounts.byId[this.$store.state.Accounts.selectedAccount];
      },
      folders() {
        return this.account.folders.map(id => this.$store.state.Folders.byId[id]);
      },
    },
    methods: {
    },
  };
</script>

<style>
</style>
