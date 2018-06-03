<template>
  <div>
    <Nav></Nav>
    <Sidebar></Sidebar>
    {{message}}
  </div>
</template>

<script>
  // import SystemInformation from './LandingPage/SystemInformation';
  import Nav from './Nav';
  import Sidebar from './Sidebar';

  export default {
    name: 'landing-page',
    components: {
      Nav,
      Sidebar,
    },
    data() {
      return {
        message: 'hello vue',
      };
    },
    methods: {
    },
  };
</script>

<style>
</style>
