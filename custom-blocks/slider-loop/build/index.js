(() => {
  "use strict";
  var e,
    t = {
      472: (e, t, o) => {
        const r = window.wp.primitives;
        var l = o(85);
        const n = (0, l.jsx)(r.SVG, {
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, l.jsx)(r.Path, {
              d: "M18.1823 11.6392C18.1823 13.0804 17.0139 14.2487 15.5727 14.2487C14.3579 14.2487 13.335 13.4179 13.0453 12.2922L13.0377 12.2625L13.0278 12.2335L12.3985 10.377L12.3942 10.3785C11.8571 8.64997 10.246 7.39405 8.33961 7.39405C5.99509 7.39405 4.09448 9.29465 4.09448 11.6392C4.09448 13.9837 5.99509 15.8843 8.33961 15.8843C8.88499 15.8843 9.40822 15.781 9.88943 15.5923L9.29212 14.0697C8.99812 14.185 8.67729 14.2487 8.33961 14.2487C6.89838 14.2487 5.73003 13.0804 5.73003 11.6392C5.73003 10.1979 6.89838 9.02959 8.33961 9.02959C9.55444 9.02959 10.5773 9.86046 10.867 10.9862L10.8772 10.9836L11.4695 12.7311C11.9515 14.546 13.6048 15.8843 15.5727 15.8843C17.9172 15.8843 19.8178 13.9837 19.8178 11.6392C19.8178 9.29465 17.9172 7.39404 15.5727 7.39404C15.0287 7.39404 14.5066 7.4968 14.0264 7.6847L14.6223 9.20781C14.9158 9.093 15.2358 9.02959 15.5727 9.02959C17.0139 9.02959 18.1823 10.1979 18.1823 11.6392Z",
            }),
          }),
          i = window.wp.blocks;
        var s = o(609);
        const a = window.wp.i18n,
          c = window.wp.blockEditor,
          p = window.wp.components;
        function d({ attributes: e, setAttributes: t }) {
          const {
            infinite: o = !0,
            slidesToShow: r = 1,
            slidesToScroll: l = 1,
            initialSlide: n = 0,
            centerMode: i = !1,
            showArrows: d = !0,
            showDots: w = !1,
            autoPlay: u = !1,
            autoPlaySpeed: h = 5,
          } = e;
          return (0, s.createElement)(
            c.InspectorControls,
            null,
            (0, s.createElement)(
              p.PanelBody,
              { title: (0, a.__)("Slider settings", "wpct") },
              (0, s.createElement)(p.RangeControl, {
                label: (0, a.__)("Slides to show", "wpct"),
                value: r,
                onChange: (e) => t({ slidesToShow: e }),
                min: 1,
                max: 5,
                required: !0,
              }),
              (0, s.createElement)(p.RangeControl, {
                label: (0, a.__)("Slides to scroll", "wpct"),
                value: l,
                onChange: (e) => t({ slidesToScroll: e }),
                min: 1,
                max: 5,
                required: !0,
              }),
              (0, s.createElement)(p.RangeControl, {
                label: (0, a.__)("Initial slide", "wpct"),
                value: n,
                onChange: (e) => t({ initialSlide: e }),
                required: !0,
              }),
              (0, s.createElement)(p.ToggleControl, {
                label: (0, a.__)("Infinite slide", "wpct"),
                checked: o,
                onChange: () => t({ infinite: !o }),
              }),
              (0, s.createElement)(p.ToggleControl, {
                label: (0, a.__)("Center mode", "wpct"),
                checked: i,
                onChange: () => t({ centerMode: !i }),
              }),
              (0, s.createElement)(p.ToggleControl, {
                label: (0, a.__)("Show arrows", "wpct"),
                checked: d,
                onChange: () => t({ showArrows: !d }),
              }),
              (0, s.createElement)(p.ToggleControl, {
                label: (0, a.__)("Show dots", "wpct"),
                checked: w,
                onChange: () => t({ showDots: !w }),
              }),
              (0, s.createElement)(p.ToggleControl, {
                label: (0, a.__)("Autoplay", "wpct"),
                checked: u,
                onChange: () => t({ autoPlay: !u }),
              }),
              (0, s.createElement)(p.RangeControl, {
                label: (0, a.__)("Autoplay Speed", "wpct"),
                value: h,
                onChange: (e) => t({ autoPlaySpeed: e }),
                min: 1,
                max: 10,
              })
            )
          );
        }
        const w = [
            [
              "core/query",
              {
                query: {
                  postType: "post",
                  order: "desc",
                  orderBy: "date",
                  author: "",
                  perPage: 9,
                  pages: 0,
                  offset: 0,
                  exclude: [],
                  sticky: "",
                  inherit: !1,
                },
              },
              [
                [
                  "core/post-template",
                  {},
                  [
                    [
                      "core/group",
                      {
                        className: "wpct-block-slider-slide wp-block-group",
                        layout: "default",
                        templateLock: !1,
                        metadata: { name: "Wpct Slide" },
                      },
                      [["core/post-title"], ["core/post-excerpt"]],
                    ],
                  ],
                ],
              ],
            ],
          ],
          u = JSON.parse('{"UU":"wpct-block/slider-loop"}');
        (0, i.registerBlockType)(u.UU, {
          icon: n,
          edit: function ({ clientId: e, attributes: t, setAttributes: o }) {
            const { slidesToShow: r } = t,
              l = (0, c.useBlockProps)({
                className: `wpct-block-slider wpct-block-slider-loop slides-to-show-${r}`,
              }),
              n = (0, c.useInnerBlocksProps)(l, {
                defaultBlock: w,
                directInsert: !0,
                orientation: "vertical",
                renderAppender: !1,
                templateLock: "insert",
                template: w,
              });
            return (0, s.createElement)(
              s.Fragment,
              null,
              (0, s.createElement)(d, {
                attributes: t,
                setAttributes: o,
                clientId: e,
              }),
              (0, s.createElement)("div", { ...n })
            );
          },
          save: function ({ attributes: e }) {
            const {
                infinite: t,
                slidesToShow: o,
                slidesToScroll: r,
                initialSlide: l,
                centerMode: n,
                showDots: i,
                showArrows: a,
                autoPlay: p,
                autoPlaySpeed: d,
              } = e,
              w = c.useBlockProps.save({
                className:
                  "wpct-block-slider wpct-block-slider-loop wp-block-group",
              }),
              u = c.useInnerBlocksProps.save(w);
            return (0, s.createElement)("div", {
              ...u,
              infinite: String(t),
              centerMode: String(n),
              slidesToShow: o,
              slidesToScroll: r,
              initialSlide: l,
              showDots: String(i),
              showArrows: String(a),
              animation: String(p),
              animationSpeed: d,
            });
          },
        });
      },
      335: (e, t, o) => {
        var r = o(609),
          l = Symbol.for("react.element"),
          n = (Symbol.for("react.fragment"), Object.prototype.hasOwnProperty),
          i =
            r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
              .ReactCurrentOwner,
          s = { key: !0, ref: !0, __self: !0, __source: !0 };
        t.jsx = function (e, t, o) {
          var r,
            a = {},
            c = null,
            p = null;
          for (r in (void 0 !== o && (c = "" + o),
          void 0 !== t.key && (c = "" + t.key),
          void 0 !== t.ref && (p = t.ref),
          t))
            n.call(t, r) && !s.hasOwnProperty(r) && (a[r] = t[r]);
          if (e && e.defaultProps)
            for (r in (t = e.defaultProps)) void 0 === a[r] && (a[r] = t[r]);
          return {
            $$typeof: l,
            type: e,
            key: c,
            ref: p,
            props: a,
            _owner: i.current,
          };
        };
      },
      85: (e, t, o) => {
        e.exports = o(335);
      },
      609: (e) => {
        e.exports = window.React;
      },
    },
    o = {};
  function r(e) {
    var l = o[e];
    if (void 0 !== l) return l.exports;
    var n = (o[e] = { exports: {} });
    return t[e](n, n.exports, r), n.exports;
  }
  (r.m = t),
    (e = []),
    (r.O = (t, o, l, n) => {
      if (!o) {
        var i = 1 / 0;
        for (p = 0; p < e.length; p++) {
          for (var [o, l, n] = e[p], s = !0, a = 0; a < o.length; a++)
            (!1 & n || i >= n) && Object.keys(r.O).every((e) => r.O[e](o[a]))
              ? o.splice(a--, 1)
              : ((s = !1), n < i && (i = n));
          if (s) {
            e.splice(p--, 1);
            var c = l();
            void 0 !== c && (t = c);
          }
        }
        return t;
      }
      n = n || 0;
      for (var p = e.length; p > 0 && e[p - 1][2] > n; p--) e[p] = e[p - 1];
      e[p] = [o, l, n];
    }),
    (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      var e = { 57: 0, 350: 0 };
      r.O.j = (t) => 0 === e[t];
      var t = (t, o) => {
          var l,
            n,
            [i, s, a] = o,
            c = 0;
          if (i.some((t) => 0 !== e[t])) {
            for (l in s) r.o(s, l) && (r.m[l] = s[l]);
            if (a) var p = a(r);
          }
          for (t && t(o); c < i.length; c++)
            (n = i[c]), r.o(e, n) && e[n] && e[n][0](), (e[n] = 0);
          return r.O(p);
        },
        o = (globalThis.webpackChunkwpct_slider_block =
          globalThis.webpackChunkwpct_slider_block || []);
      o.forEach(t.bind(null, 0)), (o.push = t.bind(null, o.push.bind(o)));
    })();
  var l = r.O(void 0, [350], () => r(472));
  l = r.O(l);
})();
