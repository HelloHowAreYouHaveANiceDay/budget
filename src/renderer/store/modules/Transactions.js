import Vue from 'vue';
// import R from 'ramda';
import uuid from 'uuid/v4';

// import accountChart from '../../chartOfAccounts.json';

// const transactionTemplate = {
//   account: null,
//   amount: null,
//   description: null,
//   postDate: null,
//   debit: null,
//   credit: null,
//   memo: null,
//   match: null,
// };


const state = {
  byId: {},
  allIds: [],
};

const mutations = {
  addTransaction(state, transaction) {
    try {
      if (transaction.id) {
        Vue.set(state.byId, transaction.id, transaction);
        state.allIds.push(transaction.id);
        return transaction.id;
      }
      const newTransaction = {
        id: uuid(),
        ...transaction,
      };
      Vue.set(state.byId, newTransaction.id, newTransaction);
      state.allIds.push(newTransaction.id);
      return newTransaction.id;
    } catch (error) {
      throw error;
    }
  },
  removeTransaction(state, id) {
    Vue.delete(state.byId, id);
    state.allIds = state.allIds.filter(i => i !== id);
  },
};

const actions = {
  // addTransaction(context, transaction) {
  //   return new Promise((resolve, reject) => {
  //   });
  // },
};

export default {
  state,
  mutations,
  actions,
};
