<template>
  <transition name="exit-intent-fade">
    <div class="exit-intent-backdrop" role="dialog">
      <div class="exit-intent" ref="exit-intent">
        <header class="exit-intent-header">
            <h2>
              Subscribe and get a 10% discount!
            </h2>

            <button type="button" class="btn-close btn-right" @click="close" aria-label="Close exit-intent">
              x
            </button>
        </header>

        <section class="exit-intent-body">
            Gime your mail
        </section>

        <footer class="exit-intent-footer">
            <button type="button" class="btn btn-green" @click="close" aria-label="Close exit-intent">
              Close!
            </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "exit-intent",
  data() {
    return {
      show: false,
      delayms: 2000,
      showAfterDays: 10
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    checkLocalStorage() {
      if (localStorage.getItem("exitintent")) {
        let value = JSON.parse(localStorage.getItem("exitintent"));
        let old = value.timestamp;
        let current = new Date().getTime().toString();
        this.show = current - old > this.showAfterDays * 86400000 ? true : false;
      } else this.show = true;
    }
  },
  mounted: function() {
    this.checkLocalStorage();
    setTimeout(() => {
      document.addEventListener("mouseout", evt => {
        if (evt.toElement === null && evt.relatedTarget === null && this.show) {
          this.$emit("show");
          let value = { value: true, timestamp: new Date().getTime() };
          localStorage.setItem("exitintent", JSON.stringify(value));
          this.show = false;
        }
      });
    }, this.delay);
  }
};
</script>

<style>
.btn {
  padding: 8px 16px;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
}

.exit-intent-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.exit-intent {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.exit-intent-header,
.exit-intent-footer {
  padding: 15px;
  display: flex;
}

.exit-intent-header {
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.exit-intent-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.exit-intent-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

.exit-intent-fade-enter,
.exit-intent-fade-leave-active {
  opacity: 0;
}

.exit-intent-fade-enter-active,
.exit-intent-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
