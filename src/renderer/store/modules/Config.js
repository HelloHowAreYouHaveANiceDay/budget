import fs from 'fs-extra';

const { dialog } = require('electron').remote;

const state = {
  currentConfigPath: false,
};

const mutations = {

};

const actions = {
  loadConfig(context) {
    return new Promise((resolve, reject) => {
      dialog.showOpenDialog(
        {
          filters: [
            {
              name: '.budget',
              extensions: [
                'budget',
              ],
            },
          ],
          properties: [
            'openFile',
          ],
        },
        (filePath) => {
          fs.readFile(filePath[0], 'utf-8', (err, data) => {
            if (err) {
              reject(err);
            }

            const loadedState = JSON.parse(data);
            console.log(loadedState);
            context.dispatch('setAccounts', loadedState.accounts, { root: true });
            context.dispatch('setFolders', loadedState.folders, { root: true });
            resolve();
          });
        },
      );
    });
  },
  saveNewConfig(context) {
    return new Promise((resolve, reject) => {
      const content = JSON.stringify(
        {
          accounts: context.rootState.Accounts,
          folders: context.rootState.Folders,
        },
      );
      dialog.showSaveDialog(
        {
          filters: [
            {
              name: '.budget',
              extensions: [
                'budget',
              ],
            },
          ],
        },
        (fileName) => {
          if (fileName === undefined) {
            reject(new Error('file was not saved'));
          }

          fs.writeFile(fileName, content, (err) => {
            if (err) {
              reject(err);
            }
            resolve(true);
          });
        },
      );
    });
  },
  saveConfig() {

  },
};

export default {
  state,
  mutations,
  actions,
};
