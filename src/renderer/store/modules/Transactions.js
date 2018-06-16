import Vue from 'vue';
import uuid from 'uuid/v4';

const state = {
  byId: {},
  allIds: [],
};

const mutations = {
  addTransaction(state, transaction) {
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
  },
  removeTransaction(state, id) {
    Vue.delete(state.byId, id);
    state.allIds = state.allIds.filter(i => i !== id);
  },
};

const actions = {
  addTransaction(context, transaction) {
    return new Promise((resolve, reject) => {
      const result = context.commit('addTransaction', transaction);
      if (result) {
        resolve(true);
      }
      reject(new Error('transaction could not be added'));
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
