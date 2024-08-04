import { test, expect, describe, afterEach } from 'vitest';
import { useVueExitIntent } from '@/composables/useVueExitIntent';
import { defaultOptions } from '@/utils';
import { shallowMount } from '@vue/test-utils';

describe('useVueExitIntent composable basic funcionality', () => {
  afterEach(() => {
    localStorage.clear();
  });
  test('Initializes correctly with default options', async () => {
    const userOptions = { ...defaultOptions };

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

    const wrapper = shallowMount(App);
    await wrapper.vm.$nextTick();

    const { isShowing, isAllowedToGetTriggered, isUnsubscribed } = wrapper.vm;

    expect(isShowing).toBe(false);
    expect(isAllowedToGetTriggered).toBe(true);
    expect(isUnsubscribed).toBe(false);
    expect(localStorage.getItem(userOptions.LSItemKey)).toBeFalsy();
  });

  test('Triggers on mount when triggerOnPageLoad is true', async () => {
    const userOptions = { ...defaultOptions, triggerOnPageLoad: true };

    const App = {
      template: `<div></div>`,
      setup() {
        const { isShowing, isAllowedToGetTriggered } =
          useVueExitIntent(userOptions);

        return {
          isShowing,
          isAllowedToGetTriggered
        };
      }
    };

    const wrapper = shallowMount(App);
    await wrapper.vm.$nextTick();

    const { isShowing, isAllowedToGetTriggered } = wrapper.vm;

    expect(isShowing).toBe(true);
    expect(isAllowedToGetTriggered).toBe(false);
  });
});
