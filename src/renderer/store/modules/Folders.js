import fs from 'fs';
import R from 'ramda';
import uuid from 'uuid/v4';
import path from 'path';

// takes list of filenames with extensions and returns unique extensions
const getUniqueFileTypes = R.pipe(R.map(path.parse), R.map(R.prop('ext')), R.uniq);

const state = {
  byId: {},
  allIds: [],
};

const mutations = {
  addFolder(state, folder) {
    const newId = uuid();
    folder.id = newId;
    state.byId[newId] = folder;
    state.allIds.push(newId);
  },
  updateScan(state, scanResults) {
    state.byId[scanResults.id].files = scanResults.files;
    state.byId[scanResults.id].fileTypes = scanResults.fileTypes;
    state.byId[scanResults.id].lastScanned = new Date();
  },
};

const actions = {
  addFolder(context, folder) {
    const newFolder = {
      account: undefined,
      type: 'record',
      path: folder,
      lastScanned: null,
      filetypes: [],
      chunksize: undefined,
      sortBy: undefined,
      files: [],
    };
    const isSamePath = p => p === folder;

    const getPathsFromFolders = R.pipe(
      R.map(R.prop('path')),
      R.values);

    if (R.none(isSamePath, getPathsFromFolders(context.state.byId))) {
      context.commit('addFolder', newFolder);
    } else {
      console.log('folder exists');
    }
  },
  scanFolder(context, id) {
    return new Promise((resolve, reject) => {
      const folder = context.state.byId[id];
      fs.readdir(folder.path, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        }
        const scanResults = {
          id,
          files: data,
          fileTypes: getUniqueFileTypes(data),
        };
        resolve(context.commit('updateScan', scanResults));
      });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
