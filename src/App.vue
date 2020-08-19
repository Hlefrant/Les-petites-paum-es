<template>
  <div id="app">
    <Header/>

    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>

  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
