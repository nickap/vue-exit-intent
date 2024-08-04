<script lang="ts" setup>
import { useVueExitIntent } from '@/composables/useVueExitIntent.js';

const options = {
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
  <div id="demo-page">
    <h1>Vue Exit Intent Demo Page</h1>
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
      Do you want to trigger the Pop-up again? <br />This Method will remove the
      localStorage entry and reset the state of the plugin
      <button @click="resetState">Reset State</button>
    </p>

    <div class="current-state">
      <p><strong>Current State:</strong></p>
      <p>isShowing: {{ isShowing }}</p>
      <p>isAllowedToGetTriggered: {{ isAllowedToGetTriggered }}</p>
      <p>isUnsubscribed: {{ isUnsubscribed }}</p>
    </div>

    <dialog :open="isShowing">
      <p>Exit intent detected!</p>
      <form method="dialog">
        <button value="ok" @click="close()">OK</button>
      </form>
    </dialog>
  </div>
</template>

<style scoped>
#demo-page {
  height: 1920px;
  display: flex;
  flex-direction: column;

  background: repeating-linear-gradient(
    45deg,
    rgba(211, 211, 211, 0.1),
    rgba(211, 211, 211, 0.1) 10px,
    white 10px,
    white 20px
  );
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.current-state {
  font-family: monospace;
  background-color: white;
  border-radius: 4px;
  padding: 16px 32px;
  max-width: 100%;
  overflow-x: auto;
  font-size: 14px;
}
</style>
