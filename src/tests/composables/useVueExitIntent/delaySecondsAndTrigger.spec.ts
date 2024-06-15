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
});
