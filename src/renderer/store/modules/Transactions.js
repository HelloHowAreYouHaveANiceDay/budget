import Vue from 'vue';
import R from 'ramda';
import uuid from 'uuid/v4';

// const convertTransaction = R.curry((acct, t) => {
//   // console.log(t);
//   const transaction = {
//     debit: '',
//     credit: '',
//     amount: Math.abs(t.Amount),
//   };

//   if (t.Amount > 0) {
//     transaction.credit = acct;
//   } else {
//     transaction.debit = acct;
//   }

//   // console.log(transaction);
//   return transaction;
// });

const transactionTemplate = {
  amount: '',
  description: '',
  postingDate: '',
  referenceNumber: '',
  transactionDate: '',
};

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
      console.log(error);
    }
  },
  removeTransaction(state, id) {
    Vue.delete(state.byId, id);
    state.allIds = state.allIds.filter(i => i !== id);
  },
};

const actions = {
  addTransaction(context, transaction) {
    return new Promise((resolve, reject) => {
      const newTransaction = R.clone(transactionTemplate);
      newTransaction.amount = transaction.Amount;
      context.commit('addTransaction', newTransaction)
        .then((result) => {
          if (result) {
            resolve(true);
          } else {
            reject(new Error('transaction could not be added'));
          }
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
