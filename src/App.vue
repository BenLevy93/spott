<template>
  <div id="app">
    <Navbar />
    <ProductList />
  </div>
</template>

<script>
import ProductList from "./components/ProductTabel.vue";
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    ProductList,
    Navbar
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
