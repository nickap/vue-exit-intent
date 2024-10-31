import { Ref } from 'vue';

declare type Options = {
    repeatAfterDays: number;
    scrollPercentageToTrigger: number;
    delaySecondsAndTrigger: number;
    triggerOnExitIntent: boolean;
    touchDeviceSensitivity: number;
    scrollDebounceMillis: number;
    triggerOnPageLoad: boolean;
    handleScrollBars: boolean;
    LSItemKey: string;
    setupBeforeMount: Boolean;
    inactiveSeconds: number;
};

export declare function useVueExitIntent(userOptions?: Partial<Options>): {
    isShowing: Ref<boolean>;
    isAllowedToGetTriggered: Ref<boolean>;
    isUnsubscribed: Ref<boolean>;
    close: () => void;
    resetState: () => void;
    unsubscribe: () => void;
};

export { }
