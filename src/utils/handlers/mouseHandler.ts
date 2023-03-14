import type { MouseHandler } from '../../types';

/**
 * Creates a mouse listener that triggers a callback when the mouse leaves the document.
 * @param {Function} callback - The callback function to trigger when the mouse leaves the document.
 * @returns {Object} - An object containing functions to add and remove the mouse listener.
 */
export function mouseHandler(callback: () => void): MouseHandler {
  const addMouseListener = () => {
    document.documentElement.addEventListener('mouseleave', callback);
  };

  const removeMouseLeaveListeners = () => {
    document.documentElement.removeEventListener('mouseleave', callback);
  };

  return {
    addMouseListener,
    removeMouseLeaveListeners
  };
}
