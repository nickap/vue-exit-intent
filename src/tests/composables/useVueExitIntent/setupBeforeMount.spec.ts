import { test, expect, describe, afterEach } from 'vitest';
import { useVueExitIntent } from '@/composables/useVueExitIntent';
import { defaultOptions } from '@/utils';
import { shallowMount } from '@vue/test-utils';

describe('Respects option setupBeforeMount', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('Initializes correctly when setupBeforeMount is true', async () => {
    const userOptions = {
      ...defaultOptions,
      setupBeforeMount: true,
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
