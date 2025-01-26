(() => {
  var { __: e } = wp.i18n,
    { useBlockProps: a, InspectorControls: d, InnerBlocks: h } = wp.blockEditor,
    { useEntityProp: m } = wp.coreData,
    { PanelBody: i } = wp.components;
  function o({ context: { postType: t, postId: r } }) {
    let n = a(),
      [c = {}] = m("postType", t, "meta", r);
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        d,
        null,
        React.createElement(
          i,
          { title: e("How does it works?", "wpct") },
          React.createElement(
            "p",
            null,
            e("Use Gutenberg blocks to build the content of the block.", "wpct")
          ),
          React.createElement(
            "p",
            null,
            e(
              "There where do you want to place some custom field value, use the `{{fieldName}}` marks. It doesn't matter where do you place marks, inside a paragraph, or maybe in a link, feel free to play with it.",
              "wpct"
            )
          ),
          React.createElement(
            "p",
            null,
            e(
              "Then, when the block is rendered, this marks will be replaced with its corresponding value.",
              "wpct"
            )
          )
        ),
        React.createElement(
          i,
          { title: e("Registered custom fields", "wpct"), initialOpen: !1 },
          React.createElement(
            "ul",
            null,
            Object.keys(c).map((p) => React.createElement("li", null, p))
          )
        )
      ),
      React.createElement(
        "div",
        { ...n },
        React.createElement(h, { template: w })
      )
    );
  }
  var w = [
    ["core/paragraph", { placeholder: e("Setup your custom field template") }],
  ];
  function s() {
    return React.createElement(
      "svg",
      {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 24 24",
        "width": "24",
        "height": "24",
        "aria-hidden": "false",
        "focusable": "false",
      },
      React.createElement("path", {
        d: "M6.9 7L3 17.8h1.7l1-2.8h4.1l1 2.8h1.7L8.6 7H6.9zm-.7 6.6l1.5-4.3 1.5 4.3h-3zM21.6 17c-.1.1-.2.2-.3.2-.1.1-.2.1-.4.1s-.3-.1-.4-.2c-.1-.1-.1-.3-.1-.6V12c0-.5 0-1-.1-1.4-.1-.4-.3-.7-.5-1-.2-.2-.5-.4-.9-.5-.4 0-.8-.1-1.3-.1s-1 .1-1.4.2c-.4.1-.7.3-1 .4-.2.2-.4.3-.6.5-.1.2-.2.4-.2.7 0 .3.1.5.2.8.2.2.4.3.8.3.3 0 .6-.1.8-.3.2-.2.3-.4.3-.7 0-.3-.1-.5-.2-.7-.2-.2-.4-.3-.6-.4.2-.2.4-.3.7-.4.3-.1.6-.1.8-.1.3 0 .6 0 .8.1.2.1.4.3.5.5.1.2.2.5.2.9v1.1c0 .3-.1.5-.3.6-.2.2-.5.3-.9.4-.3.1-.7.3-1.1.4-.4.1-.8.3-1.1.5-.3.2-.6.4-.8.7-.2.3-.3.7-.3 1.2 0 .6.2 1.1.5 1.4.3.4.9.5 1.6.5.5 0 1-.1 1.4-.3.4-.2.8-.6 1.1-1.1 0 .4.1.7.3 1 .2.3.6.4 1.2.4.4 0 .7-.1.9-.2.2-.1.5-.3.7-.4h-.3zm-3-.9c-.2.4-.5.7-.8.8-.3.2-.6.2-.8.2-.4 0-.6-.1-.9-.3-.2-.2-.3-.6-.3-1.1 0-.5.1-.9.3-1.2s.5-.5.8-.7c.3-.2.7-.3 1-.5.3-.1.6-.3.7-.6v3.4z",
      })
    );
  }
  var l = {
    $schema: "https://schemas.wp.org/trunk/block.json",
    apiVersion: 3,
    name: "wpct-block/custom-fields",
    version: "0.1.0",
    title: "Custom Fields",
    category: "",
    description: "Custom fields custom block.",
    icon: "",
    supports: { anchor: !0, html: !1 },
    usesContext: ["postId", "postType"],
    textdomain: "wp-coop-theme",
    editorScript: "file:./index.js",
    editorStyle: "file:./index.css",
    style: "file:./view.css",
    viewScript: "file:./view.js",
    render: "file:./render.php",
  };
  var { useBlockProps: f, InnerBlocks: y } = wp.blockEditor;
  wp.blocks.registerBlockType(l.name, {
    icon: s,
    edit: o,
    save: () => {
      let t = f.save();
      return React.createElement(
        "div",
        { ...t },
        React.createElement(y.Content, null)
      );
    },
  });
})();
