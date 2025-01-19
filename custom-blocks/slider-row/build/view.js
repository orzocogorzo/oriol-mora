!(function () {
  function e(e) {
    if (window.innerWidth > 720)
      try {
        !(function (e) {
          jQuery(e).find(".slick-slider").slick("unslick");
          e.querySelectorAll(".wpct-block-slider-row-step").forEach((t) => {
            t.parentElement.removeChild(t), e.appendChild(t);
          });
        })(e);
      } catch (e) {}
    else
      !(function (e) {
        e.classList.add("ready");
        const t = document.createElement("div");
        t.classList.add("wpct-block-slider-row-wrapper");
        const o = e.querySelectorAll(".wpct-block-slider-row-step");
        console.log(o),
          o.forEach((o) => {
            e.removeChild(o), t.appendChild(o);
          }),
          e.appendChild(t);
        const r = document.createElement("div");
        r.classList.add("wpct-block-slider-row-arrows"), e.appendChild(r);
        const { dots: i, arrows: n } = (function (e) {
          return {
            dots: "true" === e.getAttribute("showdots"),
            arrows: "true" === e.getAttribute("showarrows"),
          };
        })(e);
        jQuery(t).slick({
          dots: i,
          arrows: n,
          slidesToScroll: 1,
          slidesToShow: 1,
          infinite: !1,
          centerMode: !0,
          autoplay: !1,
          initialSlide: 0,
          appendArrows: jQuery(r),
          adaptiveHeight: !0,
        });
      })(e);
  }
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".wpct-block-slider-row").forEach(function (t) {
      window.addEventListener(
        "resize",
        (function (e) {
          let t;
          return function () {
            clearTimeout(t), (t = setTimeout(e, 400));
          };
        })(() => e(t))
      ),
        e(t);
    });
  });
})();
