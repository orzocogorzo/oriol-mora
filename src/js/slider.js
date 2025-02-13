export function bindMouseWheel() {
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
