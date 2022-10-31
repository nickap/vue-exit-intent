<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  repeatAfterHours: { type: Number, required: false, default: 24 * 7 },
  scrollPercentage: { type: Number, required: false, default: 0 },
  navigateBeforeShowSeconds: { type: Number, required: false, default: 0 },
  mouseOutEnabled: { type: Boolean, required: false, default: true },
  showByDefault: { type: Boolean, required: false, default: false },
  showCloseBtn: { type: Boolean, required: false, default: true },
  color: { type: String, required: false, default: '#555' },
  bgroundColor: { type: String, required: false, default: '#fefefe' },
  bdropColor: {
    type: String,
    required: false,
    default: 'rgba(0, 0, 0, 0.7)'
  },
  LSItemKey: { type: String, required: false, default: 'vue-exit-intent' }
});

const show = ref(false);

onMounted(() => {
  if (props.mouseOutEnabled) {
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
  }
  if (props.navigateBeforeShowSeconds) {
    if (isAllowedToShow() && isLocalStorageExpired()) {
      setTimeout(() => {
        showModal();
      }, props.navigateBeforeShowSeconds * 1000);
    }
  }
  if (props.showByDefault) {
    if (isAllowedToShow() && isLocalStorageExpired()) showModal();
  }
  if (props.scrollPercentage) {
    window.addEventListener('scroll', throttledScroll());
  }
});

const handleMouseLeave = () => {
  if (isAllowedToShow() && isLocalStorageExpired()) showModal();
};

const throttledScroll = () => {
  let throttleMillis = 500;
  let time = Date.now();
  return () => {
    if (time + throttleMillis - Date.now() <= 0) {
      if (isScrollReached() && isAllowedToShow() && isLocalStorageExpired()) {
        showModal();
      }
      time = Date.now();
    }
  };
};

const isScrollReached = () => {
  const scrollPercentage = props.scrollPercentage;
  let element = document.documentElement;
  let body = document.body;
  let sTop = 'scrollTop';
  let sHeight = 'scrollHeight';

  let percentage =
    ((element[sTop] || body[sTop]) /
      ((element[sHeight] || body[sHeight]) - element.clientHeight)) *
    100;
  return scrollPercentage <= percentage ? true : false;
};

const isAllowedToShow = () => {
  if (props.repeatAfterHours) {
    return true;
  } else {
    /* props.repeatAfterHours is 0 -> Do not show more than once */
    let alreadyShowed = localStorage.getItem(props.LSItemKey);
    if (alreadyShowed) {
      return false;
    } else return true;
  }
};

const isLocalStorageExpired = () => {
  if (localStorage.getItem(props.LSItemKey)) {
    let oldMillis = parseInt(localStorage.getItem(props.LSItemKey));
    let currentMillis = new Date().getTime();
    return currentMillis - oldMillis > props.repeatAfterHours * 1000 * 60 * 60
      ? true
      : false;
  } else {
    /* Local Storage item doesn't exist. We'll show the Modal for the first time */
    return true;
  }
};

const closeModal = () => {
  show.value = false;
  document.body.style.overflowY = 'auto';
};

const showModal = () => {
  show.value = true;
  document.body.style.overflowY = 'hidden';
  localStorage.setItem(props.LSItemKey, JSON.stringify(new Date().getTime()));
};
</script>

<template>
  <div class="exit-intent-backdrop" v-show="show">
    <div class="exit-intent-content">
      <button
        v-if="showCloseBtn"
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="closeModal()"
      >
        &#x2715;
      </button>
      <slot>
        <div class="fallback-content">
          <h2 class="fallback-content-header">
            Subscribe and get a 10% discount!
          </h2>

          <div class="fallback-content-body">
            <p>
              Get a 10% discount on your next payment.<br />
              <strong>It’s completely free!</strong><br />
              We'll email you a promo code to get a 10% discount.
            </p>
          </div>

          <div class="fallback-content-footer">
            <input
              class="fallback-email"
              type="text"
              placeholder="Email address"
            />
            <button
              type="button"
              class="fallback-btn-subscribe"
              aria-label="Subscribe"
            >
              Subscribe
            </button>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.exit-intent-backdrop {
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: v-bind(bdropColor);
  z-index: 999;
}
.exit-intent-content {
  position: relative;
  margin: auto;
  color: v-bind(color);
  background-color: v-bind(bgroundColor);
}

.btn-close {
  position: absolute;
  right: 0;
  top: 0;
  border: none;
  font-size: 20px;
  padding: 4px;
  cursor: pointer;
  font-weight: bold;
  color: v-bind(color);
  background-color: transparent;
  z-index: 999;
}

.fallback-content {
  background-color: v-bind(bgroundColor);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  margin: 0px;
}

.fallback-content-header {
  margin: 0;
  padding: 25px 10px;
  text-align: center;
  border-bottom: 1px solid #eee;
  color: v-bind(color);
}

.fallback-content-body {
  color: v-bind(color);
  padding: 20px 10px;
  font-size: 16px;
  line-height: 1.5;
}

.fallback-content-footer {
  padding: 30px 20px;
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #eee;
  justify-content: space-between;
}

.fallback-btn-subscribe {
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  color: white;
  background: v-bind(color);
  border: 1px solid v-bind(color);
  border-radius: 2px;
}

.fallback-email {
  flex-grow: 1;
  padding: 8px 16px;
  margin-right: 20px;
  font-size: 14px;
  border: 1px solid #eee;
  border-radius: 2px;
}

@media screen and (max-width: 480px) {
  .fallback-content-footer {
    padding: 10px 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .fallback-email {
    margin: 0 0 10px;
    flex-basis: 100%;
  }
}
</style>
