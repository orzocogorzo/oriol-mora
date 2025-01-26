(() => {
  var { __: e } = wp.i18n,
    {
      useBlockProps: F,
      useInnerBlocksProps: H,
      InspectorControls: j,
      store: P,
    } = wp.blockEditor,
    { useSelect: M, useDispatch: R } = wp.data,
    { createBlock: L, createBlocksFromInnerBlocksTemplate: N } = wp.blocks,
    { PanelBody: x, ToggleControl: a, RangeControl: w } = wp.components,
    { useEffect: q } = wp.element;
  function V({ clientId: r, attributes: o, setAttributes: l }) {
    let {
        adaptiveHeight: s = !1,
        arrows: n = !0,
        autoplay: d = !1,
        autoplaySpeed: p = 3,
        centerMode: f = !1,
        customPaging: m = !1,
        dots: c = !1,
        fade: g = !1,
        infinite: y = !0,
        initialSlide: v = 0,
        rtl: b = !1,
        slides: h = 4,
        slidesToScroll: C = 1,
        slidesToShow: i = 1,
        swipe: k = !0,
        variableWidth: B = !1,
      } = o,
      { getBlocks: z } = M(P),
      { replaceInnerBlocks: E } = R(P);
    function D(t, S) {
      let u = z(r);
      t > S
        ? (u = u.concat(
            Array.from(Array(t - S)).map(() =>
              L(
                "core/group",
                {
                  className: "wpct-block-slider-slide wp-block-group",
                  layout: "default",
                  templateLock: !1,
                  metadata: { name: "Wpct Slide" },
                },
                N([["core/heading", { level: 2, content: "Slide title" }]])
              )
            )
          ))
        : S > t && (u = u.slice(0, -(S - t))),
        E(r, u),
        l({ slides: t });
    }
    return (
      q(() => {
        let t = {};
        !o.dots && o.customPaging && (t.customPaging = !1),
          o.slidesToShow > 1 && o.variableWidth && (t.variableWidth = !1),
          o.slidesToShow > 1 && o.fade && (t.fade = !1),
          Object.keys(t).length && l(t);
      }, [o]),
      React.createElement(
        j,
        null,
        React.createElement(
          x,
          { title: e("Slides settings", "wpct-child-theme") },
          React.createElement(w, {
            label: e("Slides", "wpct-child-theme"),
            value: h,
            onChange: (t) => D(t, h),
            min: 2,
          }),
          React.createElement(w, {
            label: e("Slides to show", "wpct-child-theme"),
            value: i,
            onChange: (t) => l({ slidesToShow: t }),
            min: 1,
            max: h,
            required: !0,
          }),
          React.createElement(w, {
            label: e("Slides to scroll", "wpct-child-theme"),
            value: C,
            onChange: (t) => l({ slidesToScroll: t }),
            min: 1,
            max: +i,
            required: !0,
          }),
          React.createElement(w, {
            label: e("Initial slide", "wpct-child-theme"),
            value: v,
            onChange: (t) => l({ initialSlide: t }),
            required: !0,
          }),
          React.createElement(a, {
            label: e("Infinite slide", "wpct-child-theme"),
            checked: y,
            onChange: () => l({ infinite: !y }),
          })
        ),
        React.createElement(
          x,
          { title: e("Animation settings", "wpct-child-theme") },
          React.createElement(a, {
            label: e("Autoplay", "wpct-child-theme"),
            checked: d,
            onChange: () => l({ autoplay: !d }),
          }),
          React.createElement(w, {
            label: e("Autoplay Speed", "wpct-child-theme"),
            value: p,
            onChange: (t) => l({ autoplaySpeed: t }),
            min: 1,
            max: 10,
          }),
          React.createElement(a, {
            disabled: i > 1,
            help:
              i > 1
                ? e(
                    "Fade animations is only available if slides to show is 1",
                    "wpct-child-theme"
                  )
                : "",
            label: e("Fade animations", "wpct-child-theme"),
            checked: g,
            onChange: () => l({ fade: !g }),
          })
        ),
        React.createElement(
          x,
          { title: e("Interaction settings", "wpct-child-theme") },
          React.createElement(a, {
            label: e("Show arrows", "wpct-child-theme"),
            checked: n,
            onChange: () => l({ arrows: !n }),
          }),
          React.createElement(a, {
            label: e("Show dots", "wpct-child-theme"),
            checked: c,
            onChange: () => l({ dots: !c }),
          }),
          React.createElement(a, {
            disabled: !c,
            help: c
              ? ""
              : e(
                  "Custom paging is only available if show dots is true",
                  "wpct-child-theme"
                ),
            label: e("Show paging", "wpct-child-theme"),
            checked: m,
            onChange: () => l({ customPaging: !m }),
          }),
          React.createElement(a, {
            label: e("Enable swipe", "wpct-child-theme"),
            checked: k,
            onChange: () => l({ swipe: !k }),
          })
        ),
        React.createElement(
          x,
          { title: e("Display settings", "wpct-child-theme") },
          React.createElement(a, {
            label: e("Center mode", "wpct-child-theme"),
            checked: f,
            onChange: () => l({ centerMode: !f }),
          }),
          React.createElement(a, {
            disabled: i > 1,
            help:
              i > 1
                ? e(
                    "Variable with is only available if slides to show is 1",
                    "wpct-child-theme"
                  )
                : "",
            label: e("Variable width", "wpct-child-theme"),
            checked: B,
            onChange: () => l({ variableWidth: !B }),
          }),
          React.createElement(a, {
            label: e("Adaptive height", "wpct-child-theme"),
            checked: s,
            onChange: () => l({ adaptiveHeight: !s }),
          }),
          React.createElement(a, {
            label: e("Right to left", "wpct-child-theme"),
            checked: b,
            onChange: () => l({ rtl: !b }),
          })
        )
      )
    );
  }
  function _({ clientId: r, attributes: o, setAttributes: l }) {
    let { slides: s, slidesToShow: n } = o,
      d = F({ className: `wpct-block-slider slides-to-show-${n}` }),
      p = H(d, {
        defaultBlock: I,
        directInsert: !0,
        orientation: "horizontal",
        renderAppender: !1,
        templateLock: "insert",
        template: Array.from(Array(s)).map(() => I),
      });
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(V, { attributes: o, setAttributes: l, clientId: r }),
      React.createElement("div", { ...p })
    );
  }
  var I = [
    "core/group",
    {
      className: "wpct-block-slider-slide wp-block-group",
      templateLock: !1,
      metadata: { name: "Wpct Slide" },
      layout: { type: "constrained" },
    },
    [["core/image", { aspectRatio: "4/3", scale: "cover", sizeSlug: "full" }]],
  ];
  var { useBlockProps: O, useInnerBlocksProps: $ } = wp.blockEditor;
  function T({ attributes: r }) {
    let {
        adaptiveHeight: o,
        arrows: l,
        autoplay: s,
        autoplaySpeed: n,
        centerMode: d,
        customPaging: p,
        dots: f,
        fade: m,
        infinite: c,
        initialSlide: g,
        rtl: y,
        slidesToScroll: v,
        slidesToShow: b,
        swipe: h,
        variableWidth: C,
      } = r,
      i = O.save({ className: "wpct-block-slider wp-block-group" }),
      k = $.save(i);
    return React.createElement("div", {
      ...k,
      "data-adaptiveHeight": String(o),
      "data-arrows": String(l),
      "data-autoplay": String(s),
      "data-autoplaySpeed": n,
      "data-centerMode": String(d),
      "data-customPaging": String(p),
      "data-dots": String(f),
      "data-fade": String(m),
      "data-infinite": String(c),
      "data-initialSlide": g,
      "data-rtl": String(y),
      "data-slidesToScroll": v,
      "data-slidesToShow": b,
      "data-swipe": String(h),
      "data-variableWidth": String(C),
    });
  }
  var W = {
    $schema: "https://schemas.wp.org/trunk/block.json",
    apiVersion: 3,
    name: "wpct-block/slider",
    version: "1.0.0",
    title: "Wpct Slider",
    category: "widgets",
    icon: "slides",
    description: "A slider custom block.",
    attributes: {
      adaptiveHeight: { type: "boolean", default: !1 },
      arrows: { type: "boolean", default: !0 },
      autoplay: { type: "boolean", default: !1 },
      autoplaySpeed: { type: "number", default: 5 },
      centerMode: { type: "boolean", default: !1 },
      customPaging: { type: "boolean", default: !1 },
      dots: { type: "boolean", default: !1 },
      fade: { type: "boolean", default: !1 },
      infinite: { type: "boolean", default: !0 },
      initialSlide: { type: "number", default: 0 },
      rtl: { type: "boolean", default: !1 },
      slides: { type: "number", default: 4 },
      slidesToScroll: { type: "number", default: 1 },
      slidesToShow: { type: "number", default: 1 },
      swipe: { type: "boolean", default: !0 },
      variableWidth: { type: "boolean", default: !1 },
    },
    supports: {
      anchor: !0,
      align: ["none", "wide", "full"],
      html: !1,
      color: {
        gradients: !0,
        link: !0,
        heading: !0,
        button: !0,
        __experimentalDefaultControls: { background: !0, text: !0 },
      },
      spacing: {
        margin: ["top", "bottom"],
        padding: !0,
        __experimentalDefaultControls: { padding: !0 },
      },
      layout: {
        allowSwitching: !1,
        allowInheriting: !0,
        allowEditing: !0,
        allowSizingOnChildren: !1,
        allowJustification: !0,
        allowCustomContentAndWideSize: !0,
        default: { type: "constrained" },
      },
      __experimentalBorder: {
        color: !0,
        radius: !0,
        style: !0,
        width: !0,
        __experimentalDefaultControls: {
          color: !0,
          radius: !0,
          style: !0,
          width: !0,
        },
      },
      typography: {
        fontSize: !0,
        lineHeight: !0,
        __experimentalFontFamily: !0,
        __experimentalFontWeight: !0,
        __experimentalFontStyle: !0,
        __experimentalTextTransform: !0,
        __experimentalTextDecoration: !0,
        __experimentalLetterSpacing: !0,
        __experimentalDefaultControls: { fontSize: !0 },
      },
      shadow: !0,
    },
    textdomain: "wp-coop-theme",
    editorScript: "file:./index.js",
    editorStyle: "file:./index.css",
    style: "file:./view.css",
    viewScript: "file:./view.js",
    keywords: ["wpct", "slider", "carousel"],
  };
  wp.blocks.registerBlockType(W.name, { edit: _, save: T });
})();
