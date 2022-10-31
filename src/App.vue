<template>
  <div id="homepage">
    <vue-exit-intent
      :repeatAfterHours="1"
      :scrollPercentage="0"
      :navigateBeforeShowSeconds="0"
      :mouseOutEnabled="true"
      :showByDefault="false"
    >
    </vue-exit-intent>
  </div>
</template>

<script>
import vueExitIntent from './components/vueExitIntent.vue';
export default {
  name: 'app',
  components: { vueExitIntent }
};
</script>

<style>
#homepage {
  height: 1920px;
}
</style>
