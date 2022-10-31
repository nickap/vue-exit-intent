<template>
  <div id="homepage">
    <exit-intent
      :repeatAfterHours="1"
      :scrollPercentage="0"
      :navigateBeforeShowSeconds="0"
      :mouseOutEnabled="true"
      :showByDefault="false"
    >
    </exit-intent>
  </div>
</template>

<script>
import exitIntent from './components/exitIntent.vue';
export default {
  name: 'app',
  components: { exitIntent }
};
</script>

<style>
#homepage {
  height: 1920px;
}
</style>
