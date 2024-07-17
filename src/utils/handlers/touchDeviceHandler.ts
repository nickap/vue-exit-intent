import type { Options, TouchDeviceHandler } from '../../types';

/**
 * Adds touch event listeners for touch devices. Only call this function on touch devices.
 * @param {Object} options - Options object (containing touchDeviceSensitivity).
 * @param {Function} callback - Callback function to be executed when touch threshold is reached.
 * @returns {TouchDeviceHandler} - Object of type TouchDeviceHandler, containing addTouchListeners and removeTouchDeviceListeners functions.
 */
export function touchDeviceHandler(
  options: Options,
  callback: () => void
): TouchDeviceHandler {
  let startY: number = 0;
  let scrolling: boolean = false;
  let lastTimestamp: number = 0;

  const onTouchStart = (event: TouchEvent) => {
    if (window.pageYOffset === 0) {
      /* Touch started while user at very top */
      return;
    }
    scrolling = true;
    startY = event.touches[0].clientY;
    lastTimestamp = Date.now();
  };

  const onTouchMove = (event: TouchEvent) => {
    if (!scrolling) {
      return;
    }
    const distance = event.touches[0].clientY - startY;
    if (distance < 0) {
      return;
    }
    const timeNow = Date.now();
    const elapsed = timeNow - lastTimestamp;
    const velocity = distance / elapsed;
    if (velocity * options.touchDeviceSensitivity > 100) {
      scrolling = false;
      callback();
    }
    lastTimestamp = timeNow;
  };

  const onTouchEnd = () => {
    scrolling = false;
  };

  const addTouchListeners = () => {
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  };

  const removeTouchDeviceListeners = () => {
    document.removeEventListener('touchstart', onTouchStart);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
  };

  return {
    addTouchListeners,
    removeTouchDeviceListeners
  };
}
