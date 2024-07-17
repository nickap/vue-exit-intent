import { test, expect, describe, afterEach } from 'vitest';
import { useVueExitIntent } from '@/composables/useVueExitIntent';
import { defaultOptions } from '@/utils';
import { shallowMount } from '@vue/test-utils';

describe('Respects option onBeforeMount', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('Initializes with default options when onBeforeMount is true', async () => {
    const App = {
      template: `<div></div>`,
      setup() {
        const { isShowing, isAllowedToGetTriggered, isUnsubscribed } =
          useVueExitIntent(defaultOptions);
        return {
          isShowing,
          isAllowedToGetTriggered,
          isUnsubscribed
        };
      }
    };

    const wrapper = await shallowMount(App);

    const { isShowing, isAllowedToGetTriggered, isUnsubscribed } = wrapper.vm;

    expect(isShowing).toBe(false);
    expect(isAllowedToGetTriggered).toBe(true);
    expect(isUnsubscribed).toBe(false);
    expect(localStorage.getItem(defaultOptions.LSItemKey)).toBeFalsy();
  });

  test('Initializes correctly when onBeforeMount is true', async () => {
    const userOptions = {
      ...defaultOptions,
      onBeforeMount: true,
      triggerOnPageLoad: true
    };

    const App = {
      template: `<div></div>`,
      setup() {
        const { isShowing, isAllowedToGetTriggered, isUnsubscribed } =
          useVueExitIntent(userOptions);
        return {
          isShowing,
          isAllowedToGetTriggered,
          isUnsubscribed
        };
      }
    };

    const wrapper = await shallowMount(App);

    const { isShowing, isAllowedToGetTriggered, isUnsubscribed } = wrapper.vm;

    expect(isShowing).toBe(true);
    expect(isAllowedToGetTriggered).toBe(false);
    expect(isUnsubscribed).toBe(false);
    expect(localStorage.getItem(userOptions.LSItemKey)).toBeTruthy();
  });
});
