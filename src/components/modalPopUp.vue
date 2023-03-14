<template>
  <div class="exit-intent-backdrop">
    <div class="exit-intent-content">
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="$emit('close')"
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
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
}
.exit-intent-content {
  position: relative;
  margin: auto;
  color: #555;
  background-color: #eee;
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
  color: #555;
  background-color: transparent;
  z-index: 999;
}

.fallback-content {
  background-color: #fff;
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
  color: '#fefefe';
}

.fallback-content-body {
  color: '#fefefe';
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
  background: #555;
  border: 1px solid #fefefe;
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
