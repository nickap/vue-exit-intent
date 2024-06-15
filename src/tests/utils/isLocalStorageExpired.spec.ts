import { describe, expect, test, afterEach } from 'vitest';
import { isLocalStorageExpired } from '@/utils';
import type { IOptions } from '@/types';

const options: IOptions = {
  repeatAfterDays: 7,
  scrollPercentageToTrigger: 80,
  delaySecondsAndTrigger: 5,
  triggerOnExitIntent: true,
  touchDeviceSensitivity: 50,
  scrollDebounceMillis: 300,
  triggerOnPageLoad: true,
  handleScrollBars: true,
  LSItemKey: 'test-exit-intent'
};

describe('isLocalStorageExpired', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('returns false when localStorage item exists and repeatAfterDays is 0 (repeat is disabled)', () => {
    localStorage.setItem('test-exit-intent', '123456789');
    const userOptions = { ...options, repeatAfterDays: 0 };

    expect(isLocalStorageExpired(userOptions)).toBe(false);
  });

  test('returns true when localStorage item exists and repeatAfterDays have passed', () => {
    const currentMillis = Date.now();
    const passedMillis =
      currentMillis - (1 + options.repeatAfterDays) * 86400000;
    localStorage.setItem('test-exit-intent', String(passedMillis));

    expect(isLocalStorageExpired(options)).toBe(true);
  });

  test('returns true when localStorage item does not exist', () => {
    expect(isLocalStorageExpired(options)).toBe(true);
  });
});
