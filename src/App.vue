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

<style lang="scss">

  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

  h1,h2,h3,h4,h5,h6,p,span,li,input,select{
    font-family: 'Montserrat';
  }
  .mapboxgl-ctrl-geocoder{
    svg, .mapboxgl-ctrl-geocoder--pin-right{
      display: none;
    }
    input{
      width: 100%;
      height: 30px;
      padding: 0;

    }
    ul,li{
      padding: 0;
      list-style: none;
    }

    li{
      margin-bottom: 5px;
      padding: 0 8px 5px 8px;
      border-bottom: 1px solid #ABABAB;
      &:hover{
        cursor: pointer;
      }
    }
  }

  .marker{
    background-color: white;
    width: 25px;
    height: 25px;
    padding: 5px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    &:before{
      content: '';
      background-image: url("~@/assets/food.svg");
      width: 20px;
      height: 20px;
      display: block;
    }
  }
body{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
}
</style>
