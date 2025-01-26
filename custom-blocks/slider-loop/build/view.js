(() => {
  var j = getComputedStyle(document.documentElement),
    p = +j.getPropertyValue("--breakpoint-md").replace(/px/, "");
  (function () {
    let u = function (t, e) {
      let i;
      return function () {
        clearTimeout(i), (i = setTimeout(t, e));
      };
    };
    document.addEventListener("DOMContentLoaded", function () {
      let t = document.querySelectorAll(".wpct-block-slider-loop");
      window.addEventListener(
        "resize",
        u(() => t.forEach((e) => f(e)), 400)
      ),
        t.forEach((e) => {
          e.classList.add("ready");
          let {
              adaptiveHeight: i,
              arrows: h,
              autoplay: w,
              autoplaySpeed: g,
              centerMode: m,
              customPaging: d,
              dots: y,
              fade: b,
              infinite: k,
              initialSlide: v,
              slidesToScroll: x,
              slidesToShow: S,
              swipe: L,
              variableWidth: T,
              rtl: l,
            } = a(e),
            o = document.createElement("div");
          o.classList.add("wpct-block-slider-wrapper"),
            e.classList.contains("alignfull")
              ? o.classList.add("alignfull")
              : e.classList.contains("alignwide") &&
                o.classList.add("alignwide"),
            e.classList.contains("is-content-justification-right")
              ? o.classList.add("is-content-justification-right")
              : e.classList.contains("is-content-justification-left") &&
                o.classList.add("is-content-justification-left"),
            l && o.setAttribute("dir", "rtl");
          let c = e.querySelectorAll(".wpct-block-slider-slide");
          c.forEach((n) => {
            n.parentElement.removeChild(n), o.appendChild(n);
          }),
            (e.innerHTML = ""),
            e.appendChild(o);
          let r = document.createElement("div");
          r.classList.add("wpct-block-slider-arrows"),
            e.appendChild(r),
            jQuery(o)
              .slick({
                adaptiveHeight: i,
                arrows: h,
                appendArrows: jQuery(r),
                autoplay: w,
                autoplaySpeed: g,
                centerMode: m,
                dots: y,
                fade: b,
                infinite: k,
                initialSlide: Math.max(0, Math.min(c.length, v)),
                rtl: l,
                slidesToScroll: x,
                slidesToShow: S,
                swipe: L,
                variableWidth: T,
                ...(d ? { customPaging: d } : {}),
              })
              .on("afterChange", () => s(e)),
            s(e);
        });
    });
    function f(t) {
      let { slidesToShow: e, slidesToScroll: i } = a(t);
      jQuery(t)
        .find(".slick-initialized")
        .slick("setOption", "slidesToScroll", i),
        jQuery(t)
          .find(".slick-initialized")
          .slick("setOption", "slidesToShow", e, !0),
        s(t);
    }
    function s(t) {
      let { customPaging: e } = a(t);
      if (e) {
        let i = jQuery(".slick-dots");
        i.find("li").hide(), i.find(".slick-active").show();
      }
    }
    function a(t) {
      return {
        adaptiveHeight: t.dataset.adaptiveheight === "true",
        arrows: t.dataset.arrows === "true",
        autoplay: t.dataset.autoplay === "true",
        autoplaySpeed: Number(t.dataset.autoplayspeed) * 1e3,
        centerMode: t.dataset.centermode === "true",
        customPaging:
          t.dataset.custompaging === "true"
            ? (e, i) => `<span>${i + 1}</span>/<span>${e.slideCount}</span>`
            : !1,
        dots: t.dataset.dots === "true",
        fade: t.dataset.fade === "true",
        infinite: t.dataset.infinite === "true",
        initialSlide: Number(t.dataset.initialslide),
        rtl: t.dataset.rtl === "true",
        slidesToScroll:
          window.innerWidth > p ? Number(t.dataset.slidestoscroll) : 1,
        slidesToShow:
          window.innerWidth > p ? Number(t.dataset.slidestoshow) : 1,
        swipe: t.dataset.swipe === "true",
        variableWidth: t.dataset.variablewidth === "true",
      };
    }
  })();
})();
