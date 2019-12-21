<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p v-for="n in 50" :key="n">{{ dummyContent }}</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    dummyContent: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
