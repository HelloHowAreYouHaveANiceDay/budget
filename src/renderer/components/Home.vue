<template>
  <div id="wrapper">
  </div>
</template>

<script>

  export default {
    name: 'home',
    components: { },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
    },
  };
</script>

<style>

</style>
