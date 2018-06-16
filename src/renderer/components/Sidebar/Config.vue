<template>
<div class="panel-block">
  <div class="field is-grouped">
    <div class="control">
      <a class="button"
      @click="saveConfig">save config</a>
    </div>
    <div class="control">
      <a class="button"
      @click="loadConfig">load config</a>
    </div>
  </div>
</div>
   
</template>

<script>
export default {
  name: 'config',
  data() {
    return {

    };
  },
  methods: {
    saveConfig() {
      this.$store.dispatch('saveNewConfig');
    },
    loadConfig() {
      this.$store.dispatch('loadConfig');
    },
  },
};
</script>

<style scoped>

</style>
