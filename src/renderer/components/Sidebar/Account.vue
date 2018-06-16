<template>

  <a class="panel-block">

    <article class="media">
      <figure class="media-left" @click="toggleDetails">
        <font-awesome-icon v-show="!accountDetails" icon="book" />
        <font-awesome-icon v-show="accountDetails" icon="book-open" />
    </figure>
    <div class="media-content">
          <nav class="level" v-show="!editActive">
            <div class="level-left">
              <div class="level-item">
                <div class="content is-small">
                  <div class="tag">{{account.number}}</div>
      {{account.name || 'unnamed account'}}
                </div>
              </div>
            </div>

            <div class="level-right">
              <div>
          <button class="add-folder button is-small" 
              @click="editAccount">edit account</button>
              </div>
            </div>
          </nav>


        <div v-if="editActive" class="field has-addons">
          <p class="control">
            <span class="select is-small">
              <select v-model="tempAccount.number">
                <option v-for="type in accountTypes" :key="type.number">
                  {{type.number}}
                </option>
              </select>
            </span>
          </p>
          <p class="control is-expanded">
            <input class="input is-small" type="text"
             v-model="tempAccount.name"
             placeholder="account name">
          </p>
          <p class="control">
            <a class="button is-small"
                @click="saveAccount">
              save
            </a>
          </p>
        </div>


    <nav class="level" 
          v-show="accountDetails">

        <div class="level-left"
          @click="toggleFolder">
          <span class="level-item">
            <font-awesome-icon v-show="!accountDetails || !folderBrowser" icon="folder" />
            <font-awesome-icon v-show="accountDetails && folderBrowser" icon="folder-open" />
          </span>
          <p class="level-item">
            folders
          </p>
        </div>

        <div class="level-right">
           <p class="leve-item">
            <div class="add-folder button is-small" 
            @click="selectFolder">
            <font-awesome-icon icon="plus" />
            </div>
           </p>
        </div>
    </nav>

    <Folder v-for="folderId in account.folders" 
          v-show="accountDetails && folderBrowser"
          :key="folderId"
          :account-id="id"
          :id="folderId"></Folder> 

    </div>
    </article>
  </a>
     



</template>



<script>
import R from 'ramda';

import Folder from './Folder';
import accountChart from './chartOfAccounts.json';

const sortByNumber = R.sortBy(R.prop('number'));

const { dialog } = require('electron').remote;
export default {
  name: 'account',
  data() {
    return {
      accountDetails: false,
      folderBrowser: false,
      editActive: false,
      tempAccount: {
      },
    };
  },
  props: [
    'id',
  ],
  components: {
    Folder,
  },
  computed: {
    account() {
      return this.$store.state.Accounts.byId[this.id];
    },
    accountTypes() {
      const chart = this.$store.state.Accounts.accountChart;
      if (chart) {
        return sortByNumber(chart);
      }
      return null;
    },
  },
  mounted() {
    if (this.accountTypes === null) {
      console.log(this.accountTypes);
      this.$store.dispatch('setAccountChart', accountChart);
    }
  },
  filters: {
  },
  methods: {
    selectFolder() {
      dialog.showOpenDialog(
        {
          properties: ['openDirectory'],
        },
        R.pipe(R.head, this.addFolder),
      );
    },
    addFolder(path) {
      this.$store.dispatch('addFolder', path)
        .then((folderId) => {
          // console.log(folderId);
          this.$store.dispatch('addFolderToAccount', {
            id: this.id,
            folderId,
          });
        });
    },
    toggleFolder() {
      this.folderBrowser = !this.folderBrowser;
    },
    toggleDetails() {
      this.accountDetails = !this.accountDetails;
    },
    // selectThisAccount() {
    //   this.$store.dispatch('selectAccount', this.id);
    // },
    editAccount() {
      this.tempAccount = R.clone(this.account);
      this.editActive = true;
    },
    saveAccount() {
      this.$store.dispatch('updateAccount', this.tempAccount);
      this.editActive = false;
    },
  },
};
</script>

<style scoped>
.media {
  width: 100%;
}
</style>
