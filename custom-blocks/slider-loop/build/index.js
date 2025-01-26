(() => {
  var { __: t } = wp.i18n,
    {
      useBlockProps: z,
      useInnerBlocksProps: D,
      InspectorControls: H,
      store: M,
    } = wp.blockEditor,
    { PanelBody: y, ToggleControl: i, RangeControl: b } = wp.components,
    { useSelect: j } = wp.data,
    { useEffect: I, useRef: R } = wp.element;
  function N({ clientId: n, attributes: l, setAttributes: e }) {
    let { getBlocks: s } = j(M),
      [d] = s(n),
      a = d?.attributes.query.postType,
      r = R(0);
    I(() => {
      a && k(a).then((o) => (r.current = o));
    }, [a]);
    let k = (o) =>
        wp
          .apiFetch({ path: `/wp/v2/${o}`, queryParams: { _fields: ["id"] } })
          .catch((L) =>
            wp.apiFetch({
              path: `/wp/v2/${o}s`,
              queryParams: { _fields: ["id"] },
            })
          )
          .then((L) => L.length),
      {
        adaptiveHeight: p = !1,
        arrows: h = !0,
        autoplay: u = !1,
        autoplaySpeed: S = 3,
        centerMode: w = !1,
        customPaging: f = !1,
        dots: c = !1,
        fade: g = !1,
        infinite: m = !0,
        initialSlide: x = 0,
        rtl: T = !1,
        slidesToScroll: F = 1,
        slidesToShow: v = 1,
        swipe: B = !0,
        variableWidth: q = !1,
      } = l;
    return (
      I(() => {
        let o = {};
        !l.dots && l.customPaging && (o.customPaging = !1),
          l.slidesToShow > 1 && l.variableWidth && (o.variableWidth = !1),
          l.slidesToShow > 1 && l.fade && (o.fade = !1),
          Object.keys(o).length && e(o);
      }, [l]),
      React.createElement(
        H,
        null,
        React.createElement(
          y,
          { title: t("Slides settings", "wpct-child-theme") },
          React.createElement(b, {
            label: t("Slides to show", "wpct-child-theme"),
            value: v,
            onChange: (o) => e({ slidesToShow: o }),
            min: 1,
            max: r.current || 5,
            required: !0,
          }),
          React.createElement(b, {
            label: t("Slides to scroll", "wpct-child-theme"),
            value: F,
            onChange: (o) => e({ slidesToScroll: o }),
            min: 1,
            max: r.current || 5,
            required: !0,
          }),
          React.createElement(b, {
            label: t("Initial slide", "wpct-child-theme"),
            value: x,
            min: 1,
            max: r.current || !1,
            onChange: (o) => e({ initialSlide: o }),
            required: !0,
          }),
          React.createElement(i, {
            label: t("Infinite slide", "wpct-child-theme"),
            checked: m,
            onChange: () => e({ infinite: !m }),
          })
        ),
        React.createElement(
          y,
          { title: t("Animation settings", "wpct-child-theme") },
          React.createElement(i, {
            label: t("Autoplay", "wpct-child-theme"),
            checked: u,
            onChange: () => e({ autoplay: !u }),
          }),
          React.createElement(b, {
            label: t("Autoplay Speed", "wpct-child-theme"),
            value: S,
            onChange: (o) => e({ autoplaySpeed: o }),
            min: 1,
            max: 10,
          }),
          React.createElement(i, {
            disabled: v > 1,
            help:
              v > 1
                ? t(
                    "Fade animations is only available if slides to show is 1",
                    "wpct-child-theme"
                  )
                : "",
            label: t("Fade animations", "wpct-child-theme"),
            checked: g,
            onChange: () => e({ fade: !g }),
          })
        ),
        React.createElement(
          y,
          { title: t("Interaction settings", "wpct-child-theme") },
          React.createElement(i, {
            label: t("Show arrows", "wpct-child-theme"),
            checked: h,
            onChange: () => e({ arrows: !h }),
          }),
          React.createElement(i, {
            label: t("Show dots", "wpct-child-theme"),
            checked: c,
            onChange: () => e({ dots: !c }),
          }),
          React.createElement(i, {
            label: t("Enable swipe", "wpct-child-theme"),
            checked: B,
            onChange: () => e({ swipe: !B }),
          }),
          React.createElement(i, {
            disabled: !c,
            label: t("Show paging", "wpct-child-theme"),
            checked: f,
            onChange: () => e({ customPaging: !f }),
          })
        ),
        React.createElement(
          y,
          { title: t("Display settings", "wpct-child-theme") },
          React.createElement(i, {
            label: t("Center mode", "wpct-child-theme"),
            checked: w,
            onChange: () => e({ centerMode: !w }),
          }),
          React.createElement(i, {
            label: t("Variable width", "wpct-child-theme"),
            checked: q,
            onChange: () => e({ variableWidth: !q }),
          }),
          React.createElement(i, {
            label: t("Adaptive height", "wpct-child-theme"),
            checked: p,
            onChange: () => e({ adaptiveHeight: !p }),
          }),
          React.createElement(i, {
            label: t("Right to left", "wpct-child-theme"),
            checked: T,
            onChange: () => e({ rtl: !T }),
          })
        )
      )
    );
  }
  function C({ clientId: n, attributes: l, setAttributes: e }) {
    let { slidesToShow: s } = l,
      d = z({
        className: `wpct-block-slider wpct-block-slider-loop slides-to-show-${s}`,
      }),
      a = D(d, {
        defaultBlock: W,
        directInsert: !0,
        orientation: "horizontal",
        renderAppender: !1,
        templateLock: "insert",
        template: W,
      });
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(N, { attributes: l, setAttributes: e, clientId: n }),
      React.createElement("div", { ...a })
    );
  }
  var W = [
    [
      "core/query",
      {
        query: {
          postType: "post",
          order: "desc",
          orderBy: "date",
          author: "",
          perPage: 100,
          pages: 0,
          offset: 0,
          exclude: [],
          sticky: "",
          inherit: !1,
        },
        layout: { type: "constrained" },
      },
      [
        [
          "core/post-template",
          { layout: { type: "constrained" } },
          [
            [
              "core/group",
              {
                className: "wpct-block-slider-slide wp-block-group",
                templateLock: !1,
                metadata: { name: "Wpct Slide" },
                layout: { type: "constrained" },
              },
              [["core/post-title"], ["core/post-excerpt"]],
            ],
          ],
        ],
      ],
    ],
  ];
  var { useBlockProps: $, useInnerBlocksProps: O } = wp.blockEditor;
  function _({ attributes: n }) {
    let {
        adaptiveHeight: l,
        arrows: e,
        autoplay: s,
        autoplaySpeed: d,
        centerMode: a,
        customPaging: r,
        dots: k,
        fade: p,
        infinite: h,
        initialSlide: u,
        rtl: S,
        slidesToScroll: w,
        slidesToShow: f,
        swipe: c,
        variableWidth: g,
      } = n,
      m = $.save({
        className: "wpct-block-slider wpct-block-slider-loop wp-block-group",
      }),
      x = O.save(m);
    return React.createElement("div", {
      ...x,
      "data-adaptiveHeight": String(l),
      "data-arrows": String(e),
      "data-autoplay": String(s),
      "data-autoplaySpeed": d,
      "data-centerMode": String(a),
      "data-customPaging": String(r),
      "data-dots": String(k),
      "data-fade": String(p),
      "data-infinite": String(h),
      "data-initialSlide": u,
      "data-rtl": String(S),
      "data-slidesToScroll": w,
      "data-slidesToShow": f,
      "data-swipe": String(c),
      "data-variableWidth": String(g),
    });
  }
  function P() {
    return React.createElement(
      "svg",
      {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 24 24",
        "width": "24",
        "height": "24",
        "aria-hidden": "true",
        "focusable": "false",
      },
      React.createElement("path", {
        d: "M18.1823 11.6392C18.1823 13.0804 17.0139 14.2487 15.5727 14.2487C14.3579 14.2487 13.335 13.4179 13.0453 12.2922L13.0377 12.2625L13.0278 12.2335L12.3985 10.377L12.3942 10.3785C11.8571 8.64997 10.246 7.39405 8.33961 7.39405C5.99509 7.39405 4.09448 9.29465 4.09448 11.6392C4.09448 13.9837 5.99509 15.8843 8.33961 15.8843C8.88499 15.8843 9.40822 15.781 9.88943 15.5923L9.29212 14.0697C8.99812 14.185 8.67729 14.2487 8.33961 14.2487C6.89838 14.2487 5.73003 13.0804 5.73003 11.6392C5.73003 10.1979 6.89838 9.02959 8.33961 9.02959C9.55444 9.02959 10.5773 9.86046 10.867 10.9862L10.8772 10.9836L11.4695 12.7311C11.9515 14.546 13.6048 15.8843 15.5727 15.8843C17.9172 15.8843 19.8178 13.9837 19.8178 11.6392C19.8178 9.29465 17.9172 7.39404 15.5727 7.39404C15.0287 7.39404 14.5066 7.4968 14.0264 7.6847L14.6223 9.20781C14.9158 9.093 15.2358 9.02959 15.5727 9.02959C17.0139 9.02959 18.1823 10.1979 18.1823 11.6392Z",
      })
    );
  }
  var E = {
    $schema: "https://schemas.wp.org/trunk/block.json",
    apiVersion: 3,
    name: "wpct-block/slider-loop",
    version: "1.0.0",
    title: "Wpct Slider Loop",
    category: "widgets",
    description: "A slider query loop custom block.",
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
      slides: { type: "number", default: 5 },
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
        allowSizingOnChildren: !0,
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
      interactivity: { clientNavigation: !0 },
      shadow: !0,
    },
    textdomain: "wp-coop-theme",
    editorScript: "file:./index.js",
    editorStyle: "file:./index.css",
    style: "file:./view.css",
    viewScript: "file:./view.js",
    keywords: ["wpct", "slider", "carousel", "query", "loop"],
  };
  wp.blocks.registerBlockType(E.name, { icon: P, edit: C, save: _ });
})();
