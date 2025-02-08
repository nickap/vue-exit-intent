import { test, expect, afterEach, describe, vi } from 'vitest';
import { useVueExitIntent } from '@/composables/useVueExitIntent';
import { defaultOptions } from '@/utils';
import { shallowMount } from '@vue/test-utils';

describe('Respects option delaySecondsAndTrigger', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('Triggers after specified seconds', async () => {
    vi.useFakeTimers();

    const userOptions = {
      ...defaultOptions,
      delaySecondsAndTrigger: 5
    };

    const App = {
      template: `<div></div>`,
      setup() {
        const { isShowing } = useVueExitIntent(userOptions);

        return {
          isShowing
        };
      }
    };

    const wrapper = shallowMount(App);
    await wrapper.vm.$nextTick();

    vi.advanceTimersByTime(4990);
    expect(wrapper.vm.isShowing).toBe(false);

    vi.advanceTimersByTime(10);
    expect(wrapper.vm.isShowing).toBe(true);

    vi.useRealTimers();
  });

  test('Should not trigger after specified time if isUnsubscribed', async () => {
    vi.useFakeTimers();

    const userOptions = {
      ...defaultOptions,
      delaySecondsAndTrigger: 5,
      isUnsubscribed: false
    };

    const App = {
      template: `<div></div>`,
      setup() {
        const { isShowing, isUnsubscribed, unsubscribe } =
          useVueExitIntent(userOptions);

        return {
          isShowing,
          isUnsubscribed,
          unsubscribe
        };
      }
    };

    const wrapper = shallowMount(App);
    await wrapper.vm.$nextTick();

    vi.advanceTimersByTime(4500);
    expect(wrapper.vm.isShowing).toBe(false);
    expect(wrapper.vm.isUnsubscribed).toBe(false);

    wrapper.vm.unsubscribe();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isUnsubscribed).toBe(true);

    vi.advanceTimersByTime(1000);
    // Should still be false because we unsubscribed
    expect(wrapper.vm.isShowing).toBe(false);

    vi.useRealTimers();
  });
});
