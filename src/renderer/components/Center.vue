<template>
<div class="card-content">
  <div class="table is-fullwidth is-bordered is-hoverable">
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
            trans date
          </th>
          <th>
            post date
          </th>
          <th>
            debit
          </th>
          <th>
            credit
          </th>
          <th>
            amount
          </th>
          <th>
            description
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
