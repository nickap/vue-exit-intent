<script setup>
import vueExitIntent from './components/vueExitIntent.vue';
import { ref, onMounted } from 'vue';

const LSItem = ref(null);
const LSItemKey = 'demo-vue-exit-intent';

onMounted(() => {
  if (localStorage.getItem(LSItemKey)) {
    LSItem.value = parseInt(localStorage.getItem(LSItemKey));
    console.log(LSItem.value);
  }
  setInterval(() => {
    if (localStorage.getItem(LSItemKey)) {
      LSItem.value = parseInt(localStorage.getItem(LSItemKey));
    }
  }, 1000);
});

const removeLSKey = () => {
  localStorage.removeItem(LSItemKey);
  LSItem.value = null;
};
</script>

<template>
  Move your mouse outside the document
  <div v-if="LSItem">
    The Pop-up has been shown. There is a '{{ LSItemKey }}' in your
    localStorage.<br />The Pop-up can be shown again in
    <strong>{{ LSItem }}</strong> milliseconds
    <br />
    Do you want to trigger the Pop-up again?
    <button @click="removeLSKey">Remove LS key</button>
  </div>
  <div id="homepage">
    <vue-exit-intent :LSItemKey="LSItemKey"></vue-exit-intent>
  </div>
</template>

<style>
#homepage {
  height: 1920px;
}
</style>
