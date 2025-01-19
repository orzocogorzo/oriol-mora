(() => {
  "use strict";
  var e,
    t = {
      184: () => {
        const e = window.wp.blocks,
          t = window.React,
          r = window.wp.i18n,
          o = window.wp.blockEditor,
          s = window.wp.data,
          n = window.wp.components;
        function l({ clientId: l, attributes: a, setAttributes: i }) {
          const { steps: p = 4, showDots: w, showArrows: u } = a,
            { getBlocks: d } = (0, s.useSelect)(o.store),
            { replaceInnerBlocks: m } = (0, s.useDispatch)(o.store);
          return (0, t.createElement)(
            o.InspectorControls,
            null,
            (0, t.createElement)(
              n.PanelBody,
              { title: (0, r.__)("Slider-row settings", "wpct") },
              (0, t.createElement)(n.RangeControl, {
                label: (0, r.__)("Steps", "wpct"),
                value: p,
                onChange: (t) =>
                  (function (t, r) {
                    let o = d(l);
                    t > r
                      ? (o = o.concat(
                          Array.from(Array(t - r)).map(() =>
                            (0, e.createBlock)(
                              c[0],
                              c[1],
                              (0, e.createBlocksFromInnerBlocksTemplate)(c[2])
                            )
                          )
                        ))
                      : r > t && (o = o.slice(0, -(r - t))),
                      m(l, o),
                      i({ steps: t });
                  })(t, p),
                min: 2,
                max: 8,
              }),
              (0, t.createElement)(n.CheckboxControl, {
                label: (0, r.__)("Show slider dots on mobile", "wpct"),
                checked: w,
                onChange: (e) => i({ showDots: e }),
              }),
              (0, t.createElement)(n.CheckboxControl, {
                label: (0, r.__)("Show slider arrows on mobile", "wpct"),
                checked: u,
                onChange: (e) => i({ showArrows: e }),
              })
            )
          );
        }
        const c = [
            "core/group",
            {
              className: "wpct-block-slider-row-step wp-block-group",
              layout: "default",
              templateLock: !1,
              metadata: { name: "SM Step" },
            },
            [
              [
                "core/image",
                {
                  aspectRatio: "1",
                  scale: "cover",
                  sizeSlug: "full",
                  lock: { remove: !1 },
                },
              ],
              [
                "core/heading",
                { level: 4, content: "Step title", lock: { remove: !1 } },
              ],
              ["core/paragraph", { content: "Step description" }],
            ],
          ],
          a = JSON.parse('{"UU":"wpct-block/slider-row"}');
        (0, e.registerBlockType)(a.UU, {
          edit: function ({ clientId: e, attributes: r, setAttributes: s }) {
            const n = (0, o.useBlockProps)({
                className: "wpct-block-slider-row",
              }),
              a = (0, o.useInnerBlocksProps)(n, {
                defaultBlock: c,
                directInsert: !0,
                orientation: "horizontal",
                renderAppender: !1,
                templateLock: "insert",
                template: Array.from(Array(4)).map(() => c),
              });
            return (0, t.createElement)(
              t.Fragment,
              null,
              (0, t.createElement)(l, {
                attributes: r,
                setAttributes: s,
                clientId: e,
              }),
              (0, t.createElement)("div", { ...a })
            );
          },
          save: function ({ attributes: e }) {
            const { showDots: r, showArrows: s } = e,
              n = o.useBlockProps.save({
                className: "wpct-block-slider-row wp-block-group",
              }),
              l = o.useInnerBlocksProps.save(n);
            return (0, t.createElement)("div", {
              ...l,
              showDots: String(r),
              showArrows: String(s),
            });
          },
        });
      },
    },
    r = {};
  function o(e) {
    var s = r[e];
    if (void 0 !== s) return s.exports;
    var n = (r[e] = { exports: {} });
    return t[e](n, n.exports, o), n.exports;
  }
  (o.m = t),
    (e = []),
    (o.O = (t, r, s, n) => {
      if (!r) {
        var l = 1 / 0;
        for (p = 0; p < e.length; p++) {
          (r = e[p][0]), (s = e[p][1]), (n = e[p][2]);
          for (var c = !0, a = 0; a < r.length; a++)
            (!1 & n || l >= n) && Object.keys(o.O).every((e) => o.O[e](r[a]))
              ? r.splice(a--, 1)
              : ((c = !1), n < l && (l = n));
          if (c) {
            e.splice(p--, 1);
            var i = s();
            void 0 !== i && (t = i);
          }
        }
        return t;
      }
      n = n || 0;
      for (var p = e.length; p > 0 && e[p - 1][2] > n; p--) e[p] = e[p - 1];
      e[p] = [r, s, n];
    }),
    (o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      var e = { 57: 0, 350: 0 };
      o.O.j = (t) => 0 === e[t];
      var t = (t, r) => {
          var s,
            n,
            l = r[0],
            c = r[1],
            a = r[2],
            i = 0;
          if (l.some((t) => 0 !== e[t])) {
            for (s in c) o.o(c, s) && (o.m[s] = c[s]);
            if (a) var p = a(o);
          }
          for (t && t(r); i < l.length; i++)
            (n = l[i]), o.o(e, n) && e[n] && e[n][0](), (e[n] = 0);
          return o.O(p);
        },
        r = (self.webpackChunkwpct_slider_row_block =
          self.webpackChunkwpct_slider_row_block || []);
      r.forEach(t.bind(null, 0)), (r.push = t.bind(null, r.push.bind(r)));
    })();
  var s = o.O(void 0, [350], () => o(184));
  s = o.O(s);
})();
