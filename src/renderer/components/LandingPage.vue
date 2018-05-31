<template>
  <div>
    <Nav></Nav>
    {{message}}
  </div>
</template>

<script>
  // import SystemInformation from './LandingPage/SystemInformation';
  import Nav from './Nav';

  export default {
    name: 'landing-page',
    components: {
      Nav,
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
