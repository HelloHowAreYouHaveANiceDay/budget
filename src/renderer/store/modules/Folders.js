import fs from 'fs';
import R from 'ramda';
import uuid from 'uuid/v4';

const state = {
  folders: {
    byId: {},
    allIds: [],
  },
};

const mutations = {
  addFolder(state, folder) {
    const newId = uuid();
    state.folders.byId[newId] = folder;
    state.folders.allIds.push(newId);
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
    const isSamePath = p => p === folder;
    const getPaths = R.pipe(R.prop('byId'),
      R.map(R.prop('path')),
      R.values);
    if (R.none(isSamePath, getPaths(context.state.folders))) {
      context.commit('addFolder', newFolder);
    } else {
      console.log('folder exists');
    }
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
  state,
  mutations,
  actions,
};
