import { test, describe, expect, afterAll } from 'vitest';
import { isScrollReached, defaultOptions } from '@/utils';

let mockScrollHeight = 0;
let mockClientHeight = 0;
let mockScrollTop = 0;

const originalDocument = { ...globalThis.document };
globalThis.document = {
  ...originalDocument,
  documentElement: {
    ...originalDocument.documentElement,
    get clientHeight() {
      return mockClientHeight;
    },
    get scrollHeight() {
      return mockScrollHeight;
    },
    get scrollTop() {
      return mockScrollTop;
    }
  },
  body: {
    ...originalDocument.body,
    get scrollHeight() {
      return mockScrollHeight;
    },
    get scrollTop() {
      return mockScrollTop;
    }
  }
};

describe('isScrollReached', () => {
  test('returns true when scrolled to given percentage', () => {
    const userOptions = { ...defaultOptions, scrollPercentageToTrigger: 50 };
    mockScrollHeight = 1000;
    mockClientHeight = 200;

    const scrollHeightToTrigger =
      (mockScrollHeight * userOptions.scrollPercentageToTrigger) / 100;

    const middlePointOfClientHeight = mockClientHeight / 2;
    mockScrollTop = scrollHeightToTrigger - middlePointOfClientHeight;

    const result = isScrollReached(userOptions);
    expect(result).toBe(true);
  });

  test('returns false when need to scroll one more pixel to reach threshold', () => {
    const userOptions = { ...defaultOptions, scrollPercentageToTrigger: 50 };
    mockScrollHeight = 5000;
    mockClientHeight = 1000;

    const scrollHeightToTrigger =
      (mockScrollHeight * userOptions.scrollPercentageToTrigger) / 100;

    const middlePointOfClientHeight = mockClientHeight / 2;
    mockScrollTop = scrollHeightToTrigger - middlePointOfClientHeight - 1;

    const result = isScrollReached(userOptions);
    expect(result).toBe(false);
  });

  test('returns true when scrolled for at least 1 pixel more than threshold', () => {
    const userOptions = { ...defaultOptions, scrollPercentageToTrigger: 50 };
    mockScrollHeight = 500;
    mockClientHeight = 1;

    const scrollHeightToTrigger = 250;

    mockScrollTop = scrollHeightToTrigger - mockClientHeight + 1;

    const result = isScrollReached(userOptions);
    expect(result).toBe(true);
  });
});

afterAll(() => {
  globalThis.document = originalDocument;
});
