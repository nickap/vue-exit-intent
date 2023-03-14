<script lang="ts" setup>
import modalPopUp from './components/modalPopUp.vue';
import { useVueExitIntent } from './composables/useVueExitIntent.js';

const LSItemKey = 'demo-vue-exit-intent';

const options = {
  LSItemKey,
  handleScrollBars: true
};

const {
  isShowing,
  isAllowedToGetTriggered,
  isUnsubscribed,
  close,
  resetState,
  unsubscribe
} = useVueExitIntent(options);
</script>

<template>
  <div id="homepage">
    <p>
      <b>Desktop</b>: Move your mouse outside the document.<br />
      <b>Touch Device</b>: After you scroll down the document, scroll up fast.
    </p>
    <p>
      Do you want to unsubscribe from this popup, and to not trigger in the
      future?
      <button @click="unsubscribe">Unsubscribe</button>
    </p>
    <p>
      Do you want to trigger the Pop-up again?
      <button @click="resetState">Reset State</button>
    </p>

    <div class="current-state">
      <p><strong>Current State:</strong></p>
      <p>isShowing: {{ isShowing }}</p>
      <p>isAllowedToGetTriggered: {{ isAllowedToGetTriggered }}</p>
      <p>isUnsubscribed: {{ isUnsubscribed }}</p>
    </div>

    <modalPopUp v-if="isShowing" @close="close"></modalPopUp>
  </div>
</template>

<style scoped>
#homepage {
  height: 1920px;
  display: flex;
  flex-direction: column;
}

.current-state {
  font-family: monospace;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 16px 32px;
  max-width: 100%;
  overflow-x: auto;
  font-size: 14px;
}
</style>
