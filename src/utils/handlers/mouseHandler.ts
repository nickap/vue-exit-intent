export type MouseHandler = {
  addMouseListener: () => void;
  removeMouseLeaveListeners: () => void;
};

/**
 * Creates a mouse listener that triggers a callback when the mouse position indicates it's leaving the document.
 * @param {Function} callback - The callback function to trigger when the mouse leaves the document.
 * @returns {Object} - An object containing functions to add and remove the mouse listener.
 */
export function mouseHandler(callback: () => void): MouseHandler {
  const handleMouseMove = (e: MouseEvent) => {
    // Get window dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Check if mouse is at or beyond the edges
    if (
      e.clientX <= 0 ||
      e.clientY <= 0 ||
      e.clientX >= windowWidth ||
      e.clientY >= windowHeight
    ) {
      callback();
    }
  };

  const addMouseListener = () => {
    document.documentElement.addEventListener('mousemove', handleMouseMove);
  };

  const removeMouseLeaveListeners = () => {
    document.documentElement.removeEventListener('mousemove', handleMouseMove);
  };

  return {
    addMouseListener,
    removeMouseLeaveListeners
  };
}
