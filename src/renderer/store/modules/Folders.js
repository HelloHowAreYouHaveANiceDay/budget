const state = {
  name: '',
  version: '',
  root: '',
  folders: [],
};

const mutations = {
  addFolder(state, folder) {
    state.folders.push(folder);
  },
};

const actions = {
  addFolder(context, folder) {
    const newFolder = {
      path: folder,
      type: '',
      filetype: '',
      chunksize: '',
      sortBy: '',
      files: [],
    };

    context.commit('addFolder', newFolder);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
