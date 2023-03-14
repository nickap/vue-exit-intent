export interface IOptions {
  repeatAfterDays: number;
  scrollPercentageToTrigger: number;
  delaySecondsAndTrigger: number;
  triggerOnExitIntent: boolean;
  touchDeviceSensitivity: number;
  scrollDebounceMillis: number;
  triggerOnPageLoad: boolean;
  handleScrollBars: boolean;
  LSItemKey: string;
}
export interface IUserOptions {
  repeatAfterDays?: number;
  scrollPercentageToTrigger?: number;
  delaySecondsAndTrigger?: number;
  triggerOnExitIntent?: boolean;
  touchDeviceSensitivity?: number;
  scrollDebounceMillis?: number;
  triggerOnPageLoad?: boolean;
  handleScrollBars?: boolean;
  LSItemKey?: string;
}

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
