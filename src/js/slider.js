export function carouselInteractivity() {
  const $ = window.jQuery;
  $(".wpct-block-slider").on("init", function () {
    const slick = $(".wpct-block-slider-wrapper");

    const onWheel = throttle((delta) => {
      if (delta > 0) {
        slick.slick("slickNext");
      } else {
        slick.slick("slickPrev");
      }
    }, 500);

    this.addEventListener("wheel", function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      ev.stopImmediatePropagation();
      const { deltaY, deltaX } = ev;
      const delta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;
      onWheel(delta);
    });

    let initialTouch;
    this.addEventListener("touchstart", function (ev) {
      initialTouch = ev.touches[0];
    });

    this.addEventListener("touchend", function (ev) {
      const deltaY = ev.changedTouches[0].clientY - initialTouch.clientY;

      if (deltaY > 100) {
        slick.slick("slickPrev");
      } else if (deltaY < -100) {
        slick.slick("slickNext");
      }
    });

    slick.on("afterChange", (ev, slick, position) => {
      history.replaceState({}, null, "?slide=" + position);
    });
  });
}

function throttle(fn, delay) {
  let lastTime = 0;
  return function (...args) {
    let now = Date.now();
    if (now - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}
