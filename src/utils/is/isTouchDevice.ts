/**
 * Checks if the current device is a touch device.
 * @returns {boolean} - Returns a boolean
 */
export function isTouchDevice(): boolean {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    matchMedia('(pointer:coarse)').matches
  );
}
