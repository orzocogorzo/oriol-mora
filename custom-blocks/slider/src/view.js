/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

import "./style.css";

let styles = getComputedStyle(document.documentElement);
const md = +styles.getPropertyValue("--breakpoint-md").replace(/px/, "");

(function () {
  const debounce = function (fn, ms) {
    let last;
    return function () {
      clearTimeout(last);
      last = setTimeout(fn, ms);
    };
  };

  document.addEventListener("DOMContentLoaded", function () {
    const sliders = document.querySelectorAll(".wpct-block-slider");
    window.addEventListener(
      "resize",
      debounce(() => sliders.forEach((el) => updateSlidesToShow(el)), 400)
    );

    sliders.forEach((el) => {
      if (el.classList.contains("wpct-block-slider-loop")) {
        return;
      }

      el.classList.add("ready");
      const {
        adaptiveHeight,
        arrows,
        autoplay,
        autoplaySpeed,
        centerMode,
        customPaging,
        dots,
        fade,
        infinite,
        initialSlide,
        rtl,
        slidesToScroll,
        slidesToShow,
        swipe,
        variableWidth,
      } = getAttributes(el);

      const wrapper = document.createElement("div");
      wrapper.classList.add("wpct-block-slider-wrapper");

      if (el.classList.contains("alignfull")) {
        wrapper.classList.add("alignfull");
      } else if (el.classList.contains("alignwide")) {
        wrapper.classList.add("alignwide");
      }

      if (el.classList.contains("is-content-justification-right")) {
        wrapper.classList.add("is-content-justification-right");
      } else if (el.classList.contains("is-content-justification-left")) {
        wrapper.classList.add("is-content-justification-left");
      }

      if (rtl) {
        wrapper.setAttribute("dir", "rtl");
      }

      const slides = el.querySelectorAll(".wpct-block-slider-slide");
      slides.forEach((slide) => {
        el.removeChild(slide);
        wrapper.appendChild(slide);
      });

      el.appendChild(wrapper);

      const arrowsWrapper = document.createElement("div");
      arrowsWrapper.classList.add("wpct-block-slider-arrows");
      el.appendChild(arrowsWrapper);

      jQuery(wrapper)
        .slick({
          adaptiveHeight,
          arrows,
          appendArrows: jQuery(arrowsWrapper),
          autoplay,
          autoplaySpeed,
          centerMode,
          dots,
          fade,
          infinite,
          initialSlide: Math.max(0, Math.min(slides.length, initialSlide)),
          rtl,
          slidesToScroll,
          slidesToShow,
          swipe,
          variableWidth,
          pauseOnHover: false,
          speed: 500,
          ...(customPaging ? { customPaging } : {}),
        })
        .on("afterChange", () => updatePaging(el));

      updatePaging(el);
    });
  });

  function updateSlidesToShow(el) {
    const { slidesToShow, slidesToScroll } = getAttributes(el);
    jQuery(el)
      .find(".slick-initialized")
      .slick("setOption", "slidesToScroll", slidesToScroll);
    jQuery(el)
      .find(".slick-initialized")
      .slick("setOption", "slidesToShow", slidesToShow, true);

    updatePaging(el);
  }

  function updatePaging(el) {
    const { customPaging } = getAttributes(el);
    if (customPaging) {
      const dots = jQuery(".slick-dots");
      dots.find("li").hide();
      dots.find(".slick-active").show();
    }
  }

  function getAttributes(el) {
    return {
      adaptiveHeight: el.dataset.adaptiveheight === "true",
      arrows: el.dataset.arrows === "true",
      autoplay: el.dataset.autoplay === "true",
      autoplaySpeed: Number(el.dataset.autoplayspeed) * 1000,
      centerMode: el.dataset.centermode === "true",
      customPaging:
        el.dataset.custompaging === "true"
          ? (slick, i) =>
              `<span>${i + 1}</span>/<span>${slick.slideCount}</span>`
          : false,
      dots: el.dataset.dots === "true",
      fade: el.dataset.fade === "true",
      infinite: el.dataset.infinite === "true",
      initialSlide: Number(el.dataset.initialslide),
      rtl: el.dataset.rtl === "true",
      slidesToScroll:
        window.innerWidth > md ? Number(el.dataset.slidestoscroll) : 1,
      slidesToShow:
        window.innerWidth > md ? Number(el.dataset.slidestoshow) : 1,
      swipe: el.dataset.swipe === "true",
      variableWidth: el.dataset.variablewidth === "true",
    };
  }
})();
