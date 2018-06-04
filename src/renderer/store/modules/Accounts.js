import uuid from 'uuid/v4';

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
};

const actions = {
  addAccount(context, folderId, options) {
    const account = {
      name: '',
      version: '0.0.1',
      type: undefined,
      folders: [
        folderId,
      ],
    };
    console.log(options);
    // if (options) {

    // } else {

    // }

    context.commit('addAccount', account);
  },

};

export default {
  state,
  mutations,
  actions,
};
