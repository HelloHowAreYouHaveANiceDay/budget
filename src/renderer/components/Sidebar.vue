<template>
  <div>
    <nav class="panel">
      <p class="panel-heading">
        <span>
          accounts 
        </span>
      </p>
      <config/>
      <div class="panel-block">
        <a class="button is-fullwidth" @click="addAccount">add account</a>
      </div>
      <Account v-for="id in accounts.allIds" 
      :id="id" 
      :key="id">
      </Account>
    </nav>
  </div>
</template>

<script>

import Folder from './Sidebar/Folder';
import Config from './Sidebar/Config';
import Account from './Sidebar/Account';

export default {
  name: 'side-bar',
  components: {
    Folder,
    Account,
    Config,
  },
  data() {
    return {};
  },
  computed: {
    folders() {
      return this.$store.state.Folders;
    },
    accounts() {
      return this.$store.state.Accounts;
    },
  },
  filters: {
  },
  methods: {
    addAccount() {
      this.$store.dispatch('addAccount');
    },
  },
};
</script>
