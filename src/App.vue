<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld
      msg="Welcome to Your Vue.js App"
      dummyContent="Dummy Content to make the document scrollable"
    />
    <ExitIntent v-show="isVisible" @closePopUp="close" @showPopUp="show" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import ExitIntent from "./components/ExitIntent.vue";

export default {
  name: "app",
  components: {
    HelloWorld,
    ExitIntent
  },
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    show() {
      this.isVisible = true;
    },
    close() {
      this.isVisible = false;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
