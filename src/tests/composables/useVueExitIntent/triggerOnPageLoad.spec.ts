import { test, expect, describe } from 'vitest';
import { useVueExitIntent } from '@/composables/useVueExitIntent';
import { defaultOptions } from '@/utils';
import { shallowMount } from '@vue/test-utils';

describe('Respects option triggerOnPageLoad', () => {
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
