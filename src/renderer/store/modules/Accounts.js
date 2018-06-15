import uuid from 'uuid/v4';
import Vue from 'vue';
import R from 'ramda';

// import CSV from '../../../budget/csv';

const state = {
  selectedAccount: null,
  byId: {},
  allIds: [],
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
};

const actions = {
  addAccount(context, options) {
    const account = {
      name: '',
      version: '0.0.1',
      type: undefined,
      folders: [
      ],
    };
    console.log('ignore', options);
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
};

export default {
  state,
  mutations,
  actions,
};
