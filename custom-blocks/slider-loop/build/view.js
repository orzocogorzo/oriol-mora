document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".wpct-block-slider-loop").forEach((e) => {
    e.classList.add("ready");
    const {
        infinite: t,
        slidesToShow: i,
        slidesToScroll: o,
        initialSlide: r,
        centerMode: l,
        dots: d,
        arrows: a,
        autoplay: s,
        autoplaySpeed: n,
      } = (function (e) {
        return {
          infinite: "true" === e.getAttribute("infinite"),
          centerMode: "true" === e.getAttribute("centermode"),
          slidesToShow: Number(e.getAttribute("slidestoshow")),
          slidesToScroll: Number(e.getAttribute("slidestoscroll")),
          initialSlide: Number(e.getAttribute("initialslide")),
          dots: "true" === e.getAttribute("showdots"),
          arrows: "true" === e.getAttribute("showarrows"),
          autoplay: "true" === e.getAttribute("animation"),
          autoplaySpeed: 1e3 * Number(e.getAttribute("animationspeed")),
        };
      })(e),
      c = document.createElement("div");
    c.classList.add("wpct-block-slider-wrapper");
    const u = e.querySelectorAll(".wpct-block-slider-slide");
    u.forEach((e) => {
      e.parentElement.removeChild(e), c.appendChild(e);
    }),
      (e.innerHTML = ""),
      e.appendChild(c);
    const p = document.createElement("div");
    p.classList.add("wpct-block-slider-arrows"),
      e.appendChild(p),
      jQuery(c).slick({
        dots: d,
        arrows: a,
        slidesToScroll: o,
        slidesToShow: i,
        infinite: t,
        centerMode: l,
        autoplay: s,
        autoplaySpeed: n,
        initialSlide: Math.max(0, Math.min(u.length, r)),
        appendArrows: jQuery(p),
        variableWidth: !0,
        adaptiveHeight: !0,
      });
  });
});
