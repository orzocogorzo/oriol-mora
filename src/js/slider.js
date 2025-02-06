export function bindMouseWheel() {
  const $ = window.jQuery;
  $(".wpct-block-slider").on("init", function () {
    const slick = $(".wpct-block-slider-wrapper");
    this.addEventListener(
      "wheel",
      throttle(function (ev) {
        if (ev.deltaY > 0) {
          slick.slick("slickNext");
        } else {
          slick.slick("slickPrev");
        }
      }, 500)
    );
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
