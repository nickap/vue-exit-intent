import type { Options } from '@/types';

/**
 * Checks if the user has scrolled to a certain percentage of the page height.
 * @param {Object} options - Options object containing the scrollPercentageToTrigger value.
 * @returns {boolean} - Returns true if the user has scrolled to the given percentage or more, false otherwise.
 */
export function isScrollReached(options: Options): boolean {
  const element = document.documentElement;
  const body = document.body;
  const sTop = 'scrollTop';
  const sHeight = 'scrollHeight';

  const percentage =
    ((element[sTop] || body[sTop]) /
      ((element[sHeight] || body[sHeight]) - element.clientHeight)) *
    100;

  return options.scrollPercentageToTrigger <= percentage ? true : false;
}
