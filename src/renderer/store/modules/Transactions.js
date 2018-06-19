import Vue from 'vue';
import R from 'ramda';
import uuid from 'uuid/v4';

import accountChart from '../../chartOfAccounts.json';

const transactionTemplate = {
  account: null,
  amount: null,
  description: null,
  postDate: null,
  debit: null,
  credit: null,
  memo: null,
  match: null,
};

const transforms = {
  chase: {
    dr: {

    },
    cr: {
      toStandard(raw, account) {
        const newTransaction = R.clone(transactionTemplate);
        newTransaction.amount = (raw.Amount);
        newTransaction.account = raw.account;
        newTransaction.folder = raw.folder;
        newTransaction.transDate = raw['Trans Date'];
        newTransaction.postDate = raw['Post Date'];
        newTransaction.description = raw.Description;
        newTransaction.accountObject = account;
        if (raw.Amount > 0) {
          newTransaction.debit = newTransaction.amount;
        } else {
          newTransaction.credit = newTransaction.amount;
        }
        return newTransaction;
      },
    },
  },
  amazon: {

  },
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
      throw error;
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
      try {
        const account = context.rootState.Accounts.byId[transaction.account];
        const normalB = R.find(R.propEq('number', account.number))(accountChart).normalBalance;
        console.log(account);
        const newTransaction = transforms.chase[normalB].toStandard(transaction, account);
        const id = context.commit('addTransaction', newTransaction);
        resolve(id);
      } catch (err) {
        reject(err);
      }
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
