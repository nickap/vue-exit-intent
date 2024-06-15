import { test, expect, afterEach, describe, vi } from 'vitest';
import { useVueExitIntent } from '@/composables/useVueExitIntent';
import { defaultOptions } from '@/utils';
import { shallowMount } from '@vue/test-utils';

describe('Respects option repeatAfterDays', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('Does not trigger if repeatAfterDays have not passed', async () => {
    vi.useFakeTimers();

    const userOptions = {
      ...defaultOptions,
      triggerOnPageLoad: true,
      delaySecondsAndTrigger: 10,
      repeatAfterDays: 1
    };

    const App = {
      template: `<div></div>`,
      setup() {
        const { isShowing, close } = useVueExitIntent(userOptions);

        return {
          isShowing,
          close
        };
      }
    };

    const wrapper = shallowMount(App);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isShowing).toBe(true);

    wrapper.vm.close();
    expect(wrapper.vm.isShowing).toBe(false);

    vi.advanceTimersByTime(5 * 1000);
    expect(wrapper.vm.isShowing).toBe(false);

    vi.useRealTimers();
  });
});
