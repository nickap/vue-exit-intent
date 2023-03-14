import type { IOptions } from '../../types';

/**
 * Checks whether the localStorage item has expired or not.
 * @param {Object} options - Options object containing LSItemKey and repeatAfterDays.
 * @returns {boolean} - Returns a boolean indicating whether the localStorage item has expired or not.
 */
export function isLocalStorageExpired(options: IOptions): boolean {
  const oldMillis = localStorage.getItem(options.LSItemKey);
  if (oldMillis) {
    /* LSItem exist and repeatAfterDays is 0. Should not trigger again. */
    if (options.repeatAfterDays === 0) return false;

    const currentMillis: number = Date.now();
    return currentMillis - parseInt(oldMillis) >
      options.repeatAfterDays * 86400000
      ? true
      : false;
  } else {
    /* LSItem doesn't exist. We'll show the Modal for the first time. */
    return true;
  }
}
