/**
 * Returns a debounced version of the given function.
 * @param func The function to debounce.
 * @param wait The number of milliseconds to wait before invoking the function.
 * @returns A debounced version of the function.
 */
export function debounce(func: Function, wait: number = 300) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), wait);
  };
}
