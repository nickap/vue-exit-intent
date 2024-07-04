import { test, expect, afterEach, describe } from 'vitest';
import { useVueExitIntent } from '@/composables/useVueExitIntent';
import { defaultOptions } from '@/utils';
import { shallowMount } from '@vue/test-utils';

describe('localStorage dependent functionalities', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('Sets LSItemKey on trigger', async () => {
    const userOptions = {
      ...defaultOptions,
      triggerOnPageLoad: true,
      LSItemKey: 'exit-intent-test-key'
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
    expect(wrapper.vm.isShowing).toBe(true);
    expect(localStorage.getItem(userOptions.LSItemKey)).toBeTruthy();
    localStorage.clear();
  });

  // TODO: Add lskey manually, and test
  test('Does not auto trigger if unsubscribed LSKey has truthy value', async () => {
    const userOptions = {
      ...defaultOptions,
      triggerOnPageLoad: true,
      LSItemKey: 'unsub-test-key'
    };

    const App = {
      template: `<div></div>`,
      setup() {
        const {
          isShowing,
          isUnsubscribed,
          isAllowedToGetTriggered,
          unsubscribe
        } = useVueExitIntent(userOptions);

        unsubscribe();

        return {
          isShowing,
          isUnsubscribed,
          isAllowedToGetTriggered
        };
      }
    };

    const wrapper = shallowMount(App);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isShowing).toBe(false);
    expect(wrapper.vm.isUnsubscribed).toBe(true);
    expect(wrapper.vm.isAllowedToGetTriggered).toBe(false);

    const unsubScribedLSItemKey = userOptions.LSItemKey.concat('-unsubscribed');
    expect(localStorage.getItem(unsubScribedLSItemKey)).toBeTruthy();
    localStorage.clear();
  });

  test('Removes unsubscribe LSKey on reset', async () => {
    const userOptions = {
      ...defaultOptions,
      LSItemKey: 'unsub-test-key'
    };

    const App = {
      template: `<div></div>`,
      setup() {
        const {
          isShowing,
          isUnsubscribed,
          isAllowedToGetTriggered,
          unsubscribe,
          resetState
        } = useVueExitIntent(userOptions);

        return {
          isShowing,
          isUnsubscribed,
          isAllowedToGetTriggered,
          unsubscribe,
          resetState
        };
      }
    };

    const unsubScribedLSItemKey = userOptions.LSItemKey.concat('-unsubscribed');

    const wrapper = shallowMount(App);
    await wrapper.vm.$nextTick();

    wrapper.vm.unsubscribe();
    expect(wrapper.vm.isUnsubscribed).toBe(true);
    expect(wrapper.vm.isAllowedToGetTriggered).toBe(false);
    expect(localStorage.getItem(unsubScribedLSItemKey)).toBeTruthy();

    wrapper.vm.resetState();
    expect(wrapper.vm.isUnsubscribed).toBe(false);
    expect(wrapper.vm.isAllowedToGetTriggered).toBe(true);
    expect(localStorage.getItem(unsubScribedLSItemKey)).toBeFalsy();

    localStorage.clear();
  });
});
