import { ref, onMounted, watch } from 'vue';
import {
  defaultOptions,
  isTouchDevice,
  isLocalStorageExpired,
  mouseHandler,
  scrollHandler,
  touchDeviceHandler
} from '../utils/';
import type { IOptions, IUserOptions } from '../types';

export function useVueExitIntent(userOptions: IUserOptions = {}) {
  const options: IOptions = { ...defaultOptions, ...userOptions };

  const unsubscribedLSItemKey: string = options.LSItemKey + '-unsubscribed';

  const isShowing = ref<boolean>(false);
  const isAllowedToGetTriggered = ref<boolean>(false);
  const isUnsubscribed = ref<boolean>(false);

  const { addMouseListener, removeMouseLeaveListeners } = mouseHandler(fire);
  const { addScrollListener, removeScrollListeners } = scrollHandler(
    options,
    fire
  );
  const { addTouchListeners, removeTouchDeviceListeners } = touchDeviceHandler(
    options,
    fire
  );

  function close() {
    isShowing.value = false;
    if (options.handleScrollBars) document.body.style.overflowY = 'auto';
  }

  function fire() {
    isShowing.value = true;
    isAllowedToGetTriggered.value = false;
    localStorage.setItem(options.LSItemKey, JSON.stringify(Date.now()));
    if (options.handleScrollBars) document.body.style.overflowY = 'hidden';
  }

  function resetState() {
    localStorage.removeItem(options.LSItemKey);
    localStorage.removeItem(unsubscribedLSItemKey);
    isShowing.value = false;
    isAllowedToGetTriggered.value = true;
    isUnsubscribed.value = false;
  }

  function unsubscribe() {
    localStorage.setItem(unsubscribedLSItemKey, true.toString());
    isUnsubscribed.value = true;
    isAllowedToGetTriggered.value = false;
  }

  onMounted(() => {
    const unsubscribedValue = localStorage.getItem(unsubscribedLSItemKey);
    isUnsubscribed.value = unsubscribedValue
      ? JSON.parse(unsubscribedValue)
      : false;

    isAllowedToGetTriggered.value =
      isLocalStorageExpired(options) && !isUnsubscribed.value;
  });

  watch(isAllowedToGetTriggered, (newValue) => {
    if (newValue) {
      if (options.triggerOnExitIntent) {
        if (options.touchDeviceSensitivity && isTouchDevice()) {
          addTouchListeners();
        } else {
          addMouseListener();
        }
      }
      if (options.delaySecondsAndTrigger) {
        setTimeout(() => {
          fire();
        }, options.delaySecondsAndTrigger * 1000);
      }
      if (options.triggerOnPageLoad) {
        fire();
      }
      if (options.scrollPercentageToTrigger) {
        addScrollListener();
      }
    } else {
      removeMouseLeaveListeners();
      removeScrollListeners();
      removeTouchDeviceListeners();
    }
  });

  return {
    isShowing,
    isAllowedToGetTriggered,
    isUnsubscribed,
    close,
    resetState,
    unsubscribe
  };
}
