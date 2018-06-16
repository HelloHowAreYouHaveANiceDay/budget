<template>
  <div class="table is-fullwidth">
    <table>
      <thead>
        <tr>
          <th>
            id
          </th>
          <th>
            account
          </th>
          <th>
            debit
          </th>
          <th>
            credit
          </th>
        </tr>
      </thead>
        <transaction v-for="transaction in transactions"
        :id="transaction"
        :key="transaction">
        </transaction>
      <tbody>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Transaction from './Center/Transaction';
  // import SystemInformation from './LandingPage/SystemInformation';
  export default {
    name: 'center',
    components: {
      Transaction,
    },
    data() {
      return {
        message: 'hello vue',
      };
    },
    computed: {
      transactions() {
        return this.$store.state.Transactions.allIds;
      },
    },
    methods: {
    },
  };
</script>

<style>
</style>
