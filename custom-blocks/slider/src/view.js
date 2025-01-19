(function () {
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".wpct-block-slider").forEach((el) => {
      if (el.classList.contains("wpct-block-slider-loop")) {
        return;
      }

      el.classList.add("ready");
      const {
        infinite,
        slidesToShow,
        slidesToScroll,
        initialSlide,
        centerMode,
        dots,
        arrows,
        autoplay,
        autoplaySpeed,
      } = getAttributes(el);

      const wrapper = document.createElement("div");
      wrapper.classList.add("wpct-block-slider-wrapper");

      const slides = el.querySelectorAll(".wpct-block-slider-slide");
      slides.forEach((slide) => {
        el.removeChild(slide);
        wrapper.appendChild(slide);
      });

      el.appendChild(wrapper);

      const arrowsWrapper = document.createElement("div");
      arrowsWrapper.classList.add("wpct-block-slider-arrows");
      el.appendChild(arrowsWrapper);

      jQuery(wrapper).slick({
        dots,
        arrows,
        slidesToScroll,
        slidesToShow,
        infinite,
        centerMode,
        autoplay,
        autoplaySpeed,
        initialSlide: Math.max(0, Math.min(slides.length, initialSlide)),
        appendArrows: jQuery(arrowsWrapper),
        // lazyLoad: "ondemand",
        adaptiveHeight: true,
      });
    });
  });

  function getAttributes(el) {
    return {
      infinite: el.getAttribute("infinite") === "true",
      centerMode: el.getAttribute("centermode") === "true",
      slidesToShow: Number(el.getAttribute("slidestoshow")),
      slidesToScroll: Number(el.getAttribute("slidestoscroll")),
      initialSlide: Number(el.getAttribute("initialslide")),
      dots: el.getAttribute("showdots") === "true",
      arrows: el.getAttribute("showarrows") === "true",
      autoplay: el.getAttribute("animation") === "true",
      autoplaySpeed: Number(el.getAttribute("animationspeed")) * 1000,
    };
  }
})();
