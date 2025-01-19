(() => {
  "use strict";
  var e,
    t = {
      184: () => {
        const e = window.wp.blocks,
          t = window.React,
          o = window.wp.i18n,
          l = window.wp.blockEditor,
          r = window.wp.data,
          n = window.wp.components;
        function a({ clientId: a, attributes: i, setAttributes: s }) {
          const {
              infinite: c = !0,
              slides: d = 2,
              slidesToShow: p = 1,
              slidesToScroll: w = 1,
              initialSlide: u = 0,
              centerMode: m = !1,
              showArrows: h = !0,
              showDots: g = !1,
              autoPlay: k = !1,
              autoPlaySpeed: b = 5,
            } = i,
            { getBlocks: S } = (0, r.useSelect)(l.store),
            { replaceInnerBlocks: v } = (0, r.useDispatch)(l.store);
          return (0, t.createElement)(
            l.InspectorControls,
            null,
            (0, t.createElement)(
              n.PanelBody,
              { title: (0, o.__)("Slider settings", "wpct") },
              (0, t.createElement)(n.RangeControl, {
                label: (0, o.__)("Slides", "wpct"),
                value: d,
                onChange: (t) =>
                  (function (t, o) {
                    let l = S(a);
                    t > o
                      ? (l = l.concat(
                          Array.from(Array(t - o)).map(() =>
                            (0, e.createBlock)(
                              "core/group",
                              {
                                className:
                                  "wpct-block-slider-slide wp-block-group",
                                layout: "default",
                                lock: { remove: !0 },
                                metadata: { name: "Wpct Slide" },
                              },
                              (0, e.createBlocksFromInnerBlocksTemplate)([
                                [
                                  "core/heading",
                                  {
                                    level: 2,
                                    content: "Slide title",
                                    lock: { remove: !1 },
                                  },
                                ],
                              ])
                            )
                          )
                        ))
                      : o > t && (l = l.slice(0, -(o - t))),
                      v(a, l),
                      s({ slides: t });
                  })(t, d),
                min: 2,
                max: 50,
              }),
              (0, t.createElement)(n.RangeControl, {
                label: (0, o.__)("Slides to show", "wpct"),
                value: p,
                onChange: (e) => s({ slidesToShow: e }),
                min: 1,
                max: 5,
                required: !0,
              }),
              (0, t.createElement)(n.RangeControl, {
                label: (0, o.__)("Slides to scroll", "wpct"),
                value: w,
                onChange: (e) => s({ slidesToScroll: e }),
                min: 1,
                max: 5,
                required: !0,
              }),
              (0, t.createElement)(n.RangeControl, {
                label: (0, o.__)("Initial slide", "wpct"),
                value: u,
                onChange: (e) => s({ initialSlide: e }),
                required: !0,
              }),
              (0, t.createElement)(n.ToggleControl, {
                label: (0, o.__)("Infinite slide", "wpct"),
                checked: c,
                onChange: () => s({ infinite: !c }),
              }),
              (0, t.createElement)(n.ToggleControl, {
                label: (0, o.__)("Center mode", "wpct"),
                checked: m,
                onChange: () => s({ centerMode: !m }),
              }),
              (0, t.createElement)(n.ToggleControl, {
                label: (0, o.__)("Show arrows", "wpct"),
                checked: h,
                onChange: () => s({ showArrows: !h }),
              }),
              (0, t.createElement)(n.ToggleControl, {
                label: (0, o.__)("Show dots", "wpct"),
                checked: g,
                onChange: () => s({ showDots: !g }),
              }),
              (0, t.createElement)(n.ToggleControl, {
                label: (0, o.__)("Autoplay", "wpct"),
                checked: k,
                onChange: () => s({ autoPlay: !k }),
              }),
              (0, t.createElement)(n.RangeControl, {
                label: (0, o.__)("Autoplay Speed", "wpct"),
                value: b,
                onChange: (e) => s({ autoPlaySpeed: e }),
                min: 1,
                max: 10,
              })
            )
          );
        }
        const i = [
            "core/group",
            {
              className: "wpct-block-slider-slide wp-block-group",
              layout: "default",
              templateLock: !1,
              metadata: { name: "Wpct Slide" },
            },
            [
              [
                "core/heading",
                { level: 2, content: "Slide title", lock: { remove: !1 } },
              ],
            ],
          ],
          s = JSON.parse('{"UU":"wpct-block/slider"}');
        (0, e.registerBlockType)(s.UU, {
          edit: function ({ clientId: e, attributes: o, setAttributes: r }) {
            const { slidesToShow: n } = o,
              s = (0, l.useBlockProps)({
                className: `wpct-block-slider slides-to-show-${n}`,
              }),
              c = (0, l.useInnerBlocksProps)(s, {
                defaultBlock: i,
                directInsert: !0,
                orientation: "horizontal",
                renderAppender: !1,
                templateLock: "insert",
                template: Array.from(Array(5)).map(() => i),
              });
            return (0, t.createElement)(
              t.Fragment,
              null,
              (0, t.createElement)(a, {
                attributes: o,
                setAttributes: r,
                clientId: e,
              }),
              (0, t.createElement)("div", { ...c })
            );
          },
          save: function ({ attributes: e }) {
            const {
                infinite: o,
                slidesToShow: r,
                slidesToScroll: n,
                initialSlide: a,
                centerMode: i,
                showDots: s,
                showArrows: c,
                autoPlay: d,
                autoPlaySpeed: p,
              } = e,
              w = l.useBlockProps.save({
                className: "wpct-block-slider wp-block-group",
              }),
              u = l.useInnerBlocksProps.save(w);
            return (0, t.createElement)("div", {
              ...u,
              infinite: String(o),
              centerMode: String(i),
              slidesToShow: r,
              slidesToScroll: n,
              initialSlide: a,
              showDots: String(s),
              showArrows: String(c),
              animation: String(d),
              animationSpeed: p,
            });
          },
        });
      },
    },
    o = {};
  function l(e) {
    var r = o[e];
    if (void 0 !== r) return r.exports;
    var n = (o[e] = { exports: {} });
    return t[e](n, n.exports, l), n.exports;
  }
  (l.m = t),
    (e = []),
    (l.O = (t, o, r, n) => {
      if (!o) {
        var a = 1 / 0;
        for (d = 0; d < e.length; d++) {
          (o = e[d][0]), (r = e[d][1]), (n = e[d][2]);
          for (var i = !0, s = 0; s < o.length; s++)
            (!1 & n || a >= n) && Object.keys(l.O).every((e) => l.O[e](o[s]))
              ? o.splice(s--, 1)
              : ((i = !1), n < a && (a = n));
          if (i) {
            e.splice(d--, 1);
            var c = r();
            void 0 !== c && (t = c);
          }
        }
        return t;
      }
      n = n || 0;
      for (var d = e.length; d > 0 && e[d - 1][2] > n; d--) e[d] = e[d - 1];
      e[d] = [o, r, n];
    }),
    (l.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      var e = { 57: 0, 350: 0 };
      l.O.j = (t) => 0 === e[t];
      var t = (t, o) => {
          var r,
            n,
            a = o[0],
            i = o[1],
            s = o[2],
            c = 0;
          if (a.some((t) => 0 !== e[t])) {
            for (r in i) l.o(i, r) && (l.m[r] = i[r]);
            if (s) var d = s(l);
          }
          for (t && t(o); c < a.length; c++)
            (n = a[c]), l.o(e, n) && e[n] && e[n][0](), (e[n] = 0);
          return l.O(d);
        },
        o = (self.webpackChunkwpct_slider_block =
          self.webpackChunkwpct_slider_block || []);
      o.forEach(t.bind(null, 0)), (o.push = t.bind(null, o.push.bind(o)));
    })();
  var r = l.O(void 0, [350], () => l(184));
  r = l.O(r);
})();
