<template>
  <div>
    <div class="button" @click="selectFolder">select folder</div>
  </div>
</template>

<script>
  const { dialog } = require('electron').remote;

  export default {
    name: 'side-bar',
    components: {

    },
    data() {
      return {

      };
    },
    methods: {
      selectFolder() {
        dialog.showOpenDialog({
          properties: ['openDirectory'],
        }, this.$log);
      },
    },
  };
</script>
