import { test, describe, expect, afterEach, vi } from 'vitest';
import { useVueExitIntent } from '@/composables/useVueExitIntent';
import { shallowMount, mount } from '@vue/test-utils';
import * as utils from '@/utils';

const { defaultOptions } = utils;

describe('Respects option inactiveSeconds', () => {
  afterEach(() => {
    localStorage.clear();
    vi.clearAllTimers();
  });

  test('Triggers immediately if triggerOnPageLoad is true', async () => {
    const userOptions = {
      ...defaultOptions,
      triggerOnPageLoad: true,
      inactiveSeconds: 5
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
  });

  test('Triggers on mouseleave after inactiveSeconds', async () => {
    vi.useFakeTimers();
    vi.spyOn(utils, 'isTouchDevice').mockReturnValue(false);

    const userOptions = {
      ...defaultOptions,
      inactiveSeconds: 2
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

    const wrapper = mount(App);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isShowing).toBe(false);

    vi.advanceTimersByTime(1000);
    expect(wrapper.vm.isShowing).toBe(false);

    vi.advanceTimersByTime(1000);
    document.documentElement.dispatchEvent(new MouseEvent('mouseleave'));
    expect(wrapper.vm.isShowing).toBe(true);

    vi.useRealTimers();
  });
});
