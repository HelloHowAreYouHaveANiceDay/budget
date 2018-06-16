<template>
  <tr>
    <td>
      {{transaction.id}}
    </td>
    <td>
      <!-- {{account.name}} -->
    </td>
    <td>
      <!-- {{transaction.debit | parseAmount}} -->
    </td>
    <td>
      <!-- {{transaction.credit | parseAmount}} -->
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
      const accountEffected = '';
      // if (this.transaction.credit.length > 1) {
      //   accountEffected = this.transaction.credit;
      // } else {
      //   accountEffected = this.transaction.debit;
      // }
      // console.log(accountEffected);
      // console.log(this.$store.state.Accounts.byId[accountEffected]);
      return this.$store.state.Accounts.byId[accountEffected];
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