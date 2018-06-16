<template>
  <tr>
    <td>
      {{transaction.id}}
    </td>
    <td>
      {{account.name}}
    </td>
    <td>
      {{transaction.transDate}}
    </td>
    <td>
      {{transaction.postDate}}
    </td>
    <td>
      {{transaction.debit}}
    </td>
    <td>
      {{transaction.credit}}
    </td>
    <td>
      {{transaction.amount}}
    </td>
    <td>
      {{transaction.description}}
    </td>
  </tr>
</template>

<script>
export default {
  name: 'transaction',
  props: ['id'],
  computed: {
    transaction() {
      return this.$store.state.Transactions.byId[this.id];
    },
    account() {
      return this.$store.state.Accounts.byId[this.transaction.account];
    },
  },
  filters: {
    parseAmount() {
      const amount = this.transaction.amount;
      // if (id.length > 1) {
      //   return amount;
      // }
      return amount;
    },
  },
};
</script>

<style scoped>
  
</style>