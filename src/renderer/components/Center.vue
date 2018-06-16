<template>
  <div class="">
    {{message}} hello
  </div>
</template>

<script>
  // import SystemInformation from './LandingPage/SystemInformation';
  export default {
    name: 'center',
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
        if (this.account) {
          return this.account.folders.map(id => this.$store.getters.getFolderById(id));
        }
        return [];
      },
    },
    methods: {
    },
  };
</script>

<style>
</style>
