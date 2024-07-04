import { test, expect, describe, afterEach } from 'vitest';
import { useVueExitIntent } from '@/composables/useVueExitIntent';
import { defaultOptions } from '@/utils';
import { shallowMount } from '@vue/test-utils';

describe('Respects option handleScrollbars', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('Handles BODY-scrollbars if handleScrollBars is true', async () => {
    const userOptions = {
      ...defaultOptions,
      triggerOnPageLoad: true,
      handleScrollBars: true
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
    expect(document.body.style.overflowY).toBe('hidden');

    wrapper.vm.close();
    expect(wrapper.vm.isShowing).toBe(false);
    expect(document.body.style.overflowY).toBe('auto');
  });

  test('Does not handle BODY-scrollbars if handleScrollBars is false', async () => {
    const userOptions = {
      ...defaultOptions,
      triggerOnPageLoad: true,
      handleScrollBars: false
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
    expect(document.body.style.overflowY).toBe('auto');

    wrapper.vm.isShowing = false;
    expect(wrapper.vm.isShowing).toBe(false);
    expect(document.body.style.overflowY).toBe('auto');
  });
});
