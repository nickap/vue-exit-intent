<template>
  <transition name="exit-intent-fade">
    <div class="exit-intent-backdrop" role="dialog">
      <div class="exit-intent" ref="exit-intent">

        <button type="button" class="btn-close" @click="closePopUp" aria-label="Close">
          x
        </button>

        <header class="exit-intent-header">
          <h2>
            Subscribe and get a 10% discount!
          </h2>
        </header>

        <section class="exit-intent-body">
          <p>
            Sign in on our newsletter and get a 10% discount on your next
            payment.<br />
            <strong>It’s completely free.</strong><br />
            You’ll receive by email a promo code to get the 10% discount.
          </p>
        </section>

        <footer class="exit-intent-footer">
          <input class="input-field" type="text" placeholder="Email address" name="mail" required />
          <button type="button" class="btn btn-green" @click="closePopUp" aria-label="Subscribe">
            Subscribe
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
        /* Change it to false after debugging/review */
        debugging: true,
        /* Value in days */
        showAfterDays: 10,
        /* Value in minutes */
        minDelayBeforeShow: 0,
        /* 0 - 100 */
        scrollPercentageBeforeShow: 0,
        scrollPercentageFlag: false,
        isMobile: false,
        canBeShown: false
      };
    },
    methods: {
      closePopUp() {
        this.$emit("closePopUp");
      },
      showPopUp() {
        this.$emit("showPopUp");
        let value = {
          value: true,
          timestamp: new Date().getTime()
        };
        localStorage.setItem("exitintent", JSON.stringify(value));
        /* False cause we only want to present the popUp once */
        this.canBeShown = this.debugging == true ? true : false;
      },
      checkLocalStorage() {
        if (localStorage.getItem("exitintent")) {
          let value = JSON.parse(localStorage.getItem("exitintent"));
          let old = value.timestamp;
          let current = new Date().getTime();
          this.canBeShown =
            current - old > this.showAfterDays * 86400000 ? true : false;
          /* Ignore the above calculation if we are in debug mode*/
          if (this.debugging) this.canBeShown = true;
        } else this.canBeShown = true;
      },
      /* Regex source = http://detectmobilebrowsers.com/ */
      checkDevice() {
        let self = this;
        /* eslint-disable */
        (function (a) {
          if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
              a
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
              a.substr(0, 4)
            )
          )
            self.isMobile = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        /* eslint-enable */
      },
      checkScrollPercentage() {
        if (this.scrollPercentageBeforeShow == 0) {
          this.scrollPercentageFlag = true;
          return;
        }

        let h = document.documentElement;
        let b = document.body;
        let st = "scrollTop";
        let sh = "scrollHeight";

        let percentage =
          ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;

        this.scrollPercentageFlag =
          this.scrollPercentageBeforeShow <= percentage ? true : false;
      },
      mouseOutCallback(evt) {
        this.checkLocalStorage();
        if (
          evt.toElement === null &&
          evt.relatedTarget === null &&
          this.canBeShown &&
          this.scrollPercentageFlag
        )
          this.showPopUp();
      },
      scrollCallback(isScrolling, startPos, finalPos, destUpwards, i = 0) {
        i++;
        if (i == 1) startPos = window.scrollY;

        /* Clear our timeout throughout the scroll */
        window.clearTimeout(isScrolling);

        isScrolling = setTimeout(() => {
          finalPos = window.scrollY;
          destUpwards = finalPos - startPos;
          if (destUpwards < -300 && this.canBeShown && this.scrollPercentageFlag)
            this.showPopUp();
        }, 50);
      }
    },
    mounted: function () {
      this.canBeShown = this.debugging == true ? true : false;
      this.checkLocalStorage();
      this.checkDevice();
      this.checkScrollPercentage();

      if (!this.isMobile) {
        setTimeout(() => {
          document.addEventListener("mouseout", evt => {
            this.mouseOutCallback(evt);
          });
        }, this.minDelayBeforeShow * 60000); /* Convert ms to minutes */
      }
      setTimeout(() => {
        let isScrolling, startPos, finalPos, destUpwards, i;
        document.addEventListener("scroll", () => {
          if (!this.scrollPercentageFlag) this.checkScrollPercentage();
          if (this.isMobile) {
            this.scrollCallback(isScrolling, startPos, finalPos, destUpwards, i);
          }
        });
      }, this.minDelayBeforeShow * 60000); /* Convert ms to minutes */
    }
};
</script>

<style>
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
  margin: 20px;
}

.exit-intent-header {
  padding: 10px 20px;
  padding-top: 0;
  display: flex;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
}

.exit-intent-body {
  padding: 20px 10px;
  font-size: 16px;
  line-height: 1.5;
}

.exit-intent-footer {
  padding: 30px 20px;
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #eeeeee;
  justify-content: space-between;
}

.btn-close {
  align-self: flex-end;
  border: none;
  font-size: 20px;
  margin: 5px 5px 0 0;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn {
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

.input-field {
  flex-grow: 1;
  padding: 8px 16px;
  margin-right: 20px;
  font-size: 14px;
  border: 1px solid #eeeeee;
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

@media screen and (max-width: 480px) {
  .exit-intent-header {
    padding: 0 20px;
  }

  .exit-intent-body {
    padding: 0 10px;
  }

  .exit-intent-footer {
    padding: 20px 20px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .input-field {
    margin: 0 0 10px;
    flex-basis: 100%;
  }
}
</style>
