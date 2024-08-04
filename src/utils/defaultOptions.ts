import type { Options } from '@/types';

/**
 * Default configuration options for the exit intent composable.
 */
export const defaultOptions: Options = {
  repeatAfterDays: 0,
  scrollPercentageToTrigger: 0,
  delaySecondsAndTrigger: 0,
  triggerOnExitIntent: true,
  touchDeviceSensitivity: 15,
  scrollDebounceMillis: 300,
  triggerOnPageLoad: false,
  handleScrollBars: false,
  LSItemKey: 'vue-exit-intent',
  setupBeforeMount: false
};
