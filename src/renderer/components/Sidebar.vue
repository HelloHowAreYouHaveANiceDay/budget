<template>
  <div>
    <aside class="menu">
      <p class="menu-label">
        accounts 
      </p>
      <ul>
        <a class="button" @click="addAccount">add account</a>
      </ul>
    <ul class="menu-list">
      <Account v-for="id in accounts.allIds" 
      :id="id" 
      :key="id">
      </Account>
    </ul>
    </aside>
  </div>
</template>

<script>

import Folder from './Sidebar/Folder';
import Account from './Sidebar/Account';

export default {
  name: 'side-bar',
  components: {
    Folder,
    Account,
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
