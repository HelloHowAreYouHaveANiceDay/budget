import fs from 'fs';
import Vue from 'vue';
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
    Vue.set(state.byId, folder.id, folder);
    state.allIds.push(folder.id);
  },
  updateScan(state, scanResults) {
    state.byId[scanResults.id].files = scanResults.files;
    state.byId[scanResults.id].fileTypes = scanResults.fileTypes;
    state.byId[scanResults.id].lastScanned = new Date();
  },
  setFolders(state, foldersState) {
    Vue.set(state, 'byId', foldersState.byId);
    Vue.set(state, 'allIds', foldersState.allIds);
  },
};

const getters = {
  getFolderById: state => id => state.byId[id],
};

const actions = {
  addFolder(context, folder) {
    return new Promise((resolve, reject) => {
      const isSamePath = p => p === folder;

      const getPathsFromFolders = R.pipe(
        R.map(R.prop('path')),
        R.values);

      if (R.none(isSamePath, getPathsFromFolders(context.state.byId))) {
        const newFolder = {
          id: uuid(),
          account: undefined,
          type: 'record',
          path: folder,
          lastScanned: null,
          filetypes: [],
          chunksize: undefined,
          sortBy: undefined,
          files: [],
        };
        context.commit('addFolder', newFolder);
        resolve(newFolder.id);
      } else {
        reject(new Error('folder already exists'));
      }
    });
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
  setFolders(context, foldersState) {
    context.commit('setFolders', foldersState);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
