<template>
  <div id="app" class="tile is-ancestor">
    <!-- <router-view></router-view> -->
    <div class="tile is-parent is-4">
      <div class="tile is-child">
        <router-view name="sidebar"></router-view>
      </div>
    </div>
    <div class="tile is-parent is-8">
      <div class="tile is-child card">
      <router-view name="center"></router-view>
      </div>
    </div>
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
