import { debounce } from '../index';
import type { IOptions, ScrollHandler } from '../../types';

/**
 * Creates a new Object of type ScrollHandler that provides methods
 * to add and remove a debounced scroll event listener to the window object.
 * @param {Object} options - An object containing our options.
 * @param {Function} callback - The function to be executed when the debounced scroll event occurs.
 * @returns An Object of type ScrollHandler with methods to add and remove the debounced scroll event listener.
 */
export const scrollHandler = (
  options: IOptions,
  callback: () => void
): ScrollHandler => {
  const debouncedScrollHandler = debounce(
    callback,
    options.scrollDebounceMillis
  );

  const addScrollListener = () => {
    window.addEventListener('scroll', debouncedScrollHandler);
  };

  const removeScrollListeners = () => {
    window.removeEventListener('scroll', debouncedScrollHandler);
  };

  return {
    addScrollListener,
    removeScrollListeners
  };
};
