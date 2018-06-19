import uuid from 'uuid/v4';
import Vue from 'vue';
import R from 'ramda';

// import CSV from '../../../budget/csv';

const state = {
  byId: {},
  allIds: [],
  accountChart: null,
};

const mutations = {
  addAccount(state, account) {
    const newId = uuid();
    account.id = newId;
    Vue.set(state.byId, newId, account);
    // state.byId[newId] = account;
    state.allIds.push(newId);
  },
  addFolderToAccount(state, payload) {
    const newState = R.clone(state.byId);
    newState[payload.id].folders.push(payload.folderId);
    state.byId = newState;
  },
  pushTransactions(state, id, transactions) {
    state.byId[id].transactions.push(transactions);
  },
  selectAccount(state, id) {
    state.selectedAccount = id;
  },
  setAccounts(state, accountsState) {
    Vue.set(state, 'byId', accountsState.byId);
    Vue.set(state, 'allIds', accountsState.allIds);
  },
  setAccountChart(state, accountChart) {
    Vue.set(state, 'accountChart', accountChart);
  },
  updateAccount(state, newAccount) {
    state.byId[newAccount.id] = {
      ...newAccount,
    };
  },
};

const actions = {
  addAccount(context) {
    const account = {
      name: '',
      version: '0.0.1',
      type: undefined,
      folders: [
      ],
    };
    context.commit('addAccount', account);
  },
  addFolderToAccount(context, payload) {
    return new Promise((resolve) => {
      context.commit('addFolderToAccount', payload);
      resolve();
    });
  },
  selectAccount(context, id) {
    context.commit('selectAccount', id);
  },
  setAccounts(context, accountsState) {
    context.commit('setAccounts', accountsState);
  },
  setAccountChart(context, accountChart) {
    context.commit('setAccountChart', accountChart);
  },
  updateAccount(context, newAccount) {
    context.commit('updateAccount', newAccount);
  },
};

export default {
  state,
  mutations,
  actions,
};
