export type Options = {
  repeatAfterDays: number;
  scrollPercentageToTrigger: number;
  delaySecondsAndTrigger: number;
  triggerOnExitIntent: boolean;
  touchDeviceSensitivity: number;
  scrollDebounceMillis: number;
  triggerOnPageLoad: boolean;
  handleScrollBars: boolean;
  LSItemKey: string;
  setupBeforeMount: Boolean;
  inactiveSeconds: number;
};

export type MouseHandler = {
  addMouseListener: () => void;
  removeMouseLeaveListeners: () => void;
};

export type ScrollHandler = {
  addScrollListener: () => void;
  removeScrollListeners: () => void;
};

export type TouchDeviceHandler = {
  addTouchListeners: () => void;
  removeTouchDeviceListeners: () => void;
};
