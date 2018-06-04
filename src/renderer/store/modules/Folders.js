import fs from 'fs';

// const parseFolder = ( ) => {};

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
      name: null,
      path: folder,
      type: '',
      filetype: '',
      chunksize: '',
      sortBy: '',
      files: [],
    };

    context.commit('addFolder', newFolder);
  },
  scanFolder(context, folder) {
    return new Promise((resolve, reject) => {
      fs.readdir(folder.path, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        }
        console.log(data);
        resolve(data);
      });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
