(function () {
  const debounce = function (fn, ms) {
    let last;
    return function () {
      clearTimeout(last);
      last = setTimeout(fn, ms);
    };
  };

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".wpct-block-slider-row").forEach(function (el) {
      window.addEventListener(
        "resize",
        debounce(() => responsiveBootstrap(el), 400)
      );

      responsiveBootstrap(el);
    });
  });

  function responsiveBootstrap(el) {
    if (window.innerWidth > 720) {
      try {
        unmountSlick(el);
      } catch (err) {
        // do nothin
      }
    } else {
      mountSlick(el);
    }
  }

  function unmountSlick(el) {
    jQuery(el).find(".slick-slider").slick("unslick");
    const steps = el.querySelectorAll(".wpct-block-slider-row-step");
    steps.forEach((step) => {
      step.parentElement.removeChild(step);
      el.appendChild(step);
    });
  }

  function mountSlick(el) {
    el.classList.add("ready");

    const wrapper = document.createElement("div");
    wrapper.classList.add("wpct-block-slider-row-wrapper");

    const slides = el.querySelectorAll(".wpct-block-slider-row-step");
    console.log(slides);
    slides.forEach((slide) => {
      el.removeChild(slide);
      wrapper.appendChild(slide);
    });

    el.appendChild(wrapper);

    const arrowsWrapper = document.createElement("div");
    arrowsWrapper.classList.add("wpct-block-slider-row-arrows");
    el.appendChild(arrowsWrapper);

    const { dots, arrows } = getAttributes(el);

    jQuery(wrapper).slick({
      dots,
      arrows,
      slidesToScroll: 1,
      slidesToShow: 1,
      infinite: false,
      centerMode: true,
      autoplay: false,
      initialSlide: 0,
      appendArrows: jQuery(arrowsWrapper),
      adaptiveHeight: true,
    });
  }
  function getAttributes(el) {
    return {
      dots: el.getAttribute("showdots") === "true",
      arrows: el.getAttribute("showarrows") === "true",
    };
  }
})();
