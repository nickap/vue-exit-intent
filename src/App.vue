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
  <div id="homepage">
    <p>
      <b>Desktop</b>: Move your mouse outside the document.<br />
      <b>Touch Device</b>: After you scroll down the document, scroll up fast.
    </p>
    <div v-if="LSItem">
      The Pop-up has been shown. <br />There is an item with key: '{{
        LSItemKey
      }}' in your localStorage.<br />
      <br />
      Do you want to trigger the Pop-up again?
      <button @click="removeLSKey">Remove LS key</button>
    </div>
    <vue-exit-intent :LSItemKey="LSItemKey"></vue-exit-intent>
  </div>
</template>

<style>
#homepage {
  height: 1920px;
}
</style>
