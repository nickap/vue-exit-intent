import { ref, watch, onBeforeMount, onMounted } from "vue";
const defaultOptions = {
  repeatAfterDays: 0,
  scrollPercentageToTrigger: 0,
  delaySecondsAndTrigger: 0,
  triggerOnExitIntent: true,
  touchDeviceSensitivity: 15,
  scrollDebounceMillis: 300,
  triggerOnPageLoad: false,
  handleScrollBars: false,
  LSItemKey: "vue-exit-intent",
  setupBeforeMount: false,
  inactiveSeconds: 0
};
function mouseHandler(callback) {
  const handleMouseMove = (e) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    if (e.clientX <= 0 || e.clientY <= 0 || e.clientX >= windowWidth || e.clientY >= windowHeight) {
      callback();
    }
  };
  const addMouseListener = () => {
    document.documentElement.addEventListener("mousemove", handleMouseMove);
  };
  const removeMouseLeaveListeners = () => {
    document.documentElement.removeEventListener("mousemove", handleMouseMove);
  };
  return {
    addMouseListener,
    removeMouseLeaveListeners
  };
}
const scrollHandler = (options, callback) => {
  const debouncedScrollHandler = debounce(
    callback,
    options.scrollDebounceMillis
  );
  const addScrollListener = () => {
    window.addEventListener("scroll", debouncedScrollHandler);
  };
  const removeScrollListeners = () => {
    window.removeEventListener("scroll", debouncedScrollHandler);
  };
  return {
    addScrollListener,
    removeScrollListeners
  };
};
function touchDeviceHandler(options, callback) {
  let startY = 0;
  let scrolling = false;
  let lastTimestamp = 0;
  const onTouchStart = (event) => {
    if (window.pageYOffset === 0) {
      return;
    }
    scrolling = true;
    startY = event.touches[0].clientY;
    lastTimestamp = Date.now();
  };
  const onTouchMove = (event) => {
    if (!scrolling) {
      return;
    }
    const distance = event.touches[0].clientY - startY;
    if (distance < 0) {
      return;
    }
    const timeNow = Date.now();
    const elapsed = timeNow - lastTimestamp;
    const velocity = distance / elapsed;
    if (velocity * options.touchDeviceSensitivity > 100) {
      scrolling = false;
      callback();
    }
    lastTimestamp = timeNow;
  };
  const onTouchEnd = () => {
    scrolling = false;
  };
  const addTouchListeners = () => {
    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  };
  const removeTouchDeviceListeners = () => {
    document.removeEventListener("touchstart", onTouchStart);
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  };
  return {
    addTouchListeners,
    removeTouchDeviceListeners
  };
}
function debounce(func, wait = 300) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), wait);
  };
}
function isLocalStorageExpired(options) {
  const oldMillis = localStorage.getItem(options.LSItemKey);
  if (oldMillis) {
    if (options.repeatAfterDays === 0)
      return false;
    const currentMillis = Date.now();
    return currentMillis - parseInt(oldMillis) > options.repeatAfterDays * 864e5 ? true : false;
  } else {
    return true;
  }
}
function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || matchMedia("(pointer:coarse)").matches;
}
function useVueExitIntent(userOptions = {}) {
  const options = { ...defaultOptions, ...userOptions };
  const unsubscribedLSItemKey = options.LSItemKey + "-unsubscribed";
  const isShowing = ref(false);
  const isAllowedToGetTriggered = ref(false);
  const isUnsubscribed = ref(false);
  const { addMouseListener, removeMouseLeaveListeners } = mouseHandler(fire);
  const { addScrollListener, removeScrollListeners } = scrollHandler(
    options,
    fire
  );
  const { addTouchListeners, removeTouchDeviceListeners } = touchDeviceHandler(
    options,
    fire
  );
  function close() {
    isShowing.value = false;
    if (options.handleScrollBars)
      document.body.style.overflowY = "auto";
  }
  function fire() {
    console.log("fireing");
    isShowing.value = true;
    isAllowedToGetTriggered.value = false;
    localStorage.setItem(options.LSItemKey, JSON.stringify(Date.now()));
    if (options.handleScrollBars)
      document.body.style.overflowY = "hidden";
  }
  function resetState() {
    localStorage.removeItem(options.LSItemKey);
    localStorage.removeItem(unsubscribedLSItemKey);
    isShowing.value = false;
    isAllowedToGetTriggered.value = true;
    isUnsubscribed.value = false;
  }
  function unsubscribe() {
    localStorage.setItem(unsubscribedLSItemKey, true.toString());
    isUnsubscribed.value = true;
    isAllowedToGetTriggered.value = false;
  }
  const setup = () => {
    const unsubscribedValue = localStorage.getItem(unsubscribedLSItemKey);
    isUnsubscribed.value = unsubscribedValue ? JSON.parse(unsubscribedValue) : false;
    isAllowedToGetTriggered.value = isLocalStorageExpired(options) && !isUnsubscribed.value;
  };
  const addListeners = () => {
    if (options.triggerOnExitIntent) {
      if (options.touchDeviceSensitivity && isTouchDevice()) {
        addTouchListeners();
      } else {
        addMouseListener();
      }
    }
    if (options.scrollPercentageToTrigger) {
      addScrollListener();
    }
  };
  const initialize = () => {
    if (options.delaySecondsAndTrigger) {
      setTimeout(() => {
        fire();
      }, options.delaySecondsAndTrigger * 1e3);
    }
    if (options.triggerOnPageLoad) {
      fire();
    }
    if (options.inactiveSeconds) {
      setTimeout(() => {
        addListeners();
      }, options.inactiveSeconds * 1e3);
    } else {
      addListeners();
    }
  };
  const disable = () => {
    removeMouseLeaveListeners();
    removeScrollListeners();
    removeTouchDeviceListeners();
  };
  watch(isAllowedToGetTriggered, (newValue) => {
    if (newValue) {
      initialize();
    } else {
      disable();
    }
  });
  if (options.setupBeforeMount) {
    onBeforeMount(() => {
      setup();
    });
  } else {
    onMounted(() => {
      setup();
    });
  }
  return {
    isShowing,
    isAllowedToGetTriggered,
    isUnsubscribed,
    close,
    resetState,
    unsubscribe
  };
}
export {
  useVueExitIntent
};
