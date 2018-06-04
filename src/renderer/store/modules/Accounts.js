import uuid from 'uuid/v4';
import R from 'ramda';

const state = {
  byId: {},
  allIds: [],
};

const mutations = {
  addAccount(state, account) {
    const newId = uuid();
    account.id = newId;
    state.byId[newId] = account;
    state.allIds.push(newId);
  },
  addFolderToAccount(state, payload) {
    const newState = R.clone(state.byId);
    console.log(payload);
    newState[payload.id].folders.push(payload.folderId);
    state.byId = newState;
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
};

export default {
  state,
  mutations,
  actions,
};
