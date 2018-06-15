<template>
  <div id="app">
    <router-view></router-view>
    <section>
    <router-view name="sidebar"></router-view>
    <router-view name="center"></router-view>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'budget',
  };
</script>

<style>
  /* CSS */
</style>
