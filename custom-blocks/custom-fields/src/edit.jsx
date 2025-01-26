import "./editor.css";

const { __ } = wp.i18n;
const { useBlockProps, InspectorControls, InnerBlocks } = wp.blockEditor;
const { useEntityProp } = wp.coreData;
const { PanelBody } = wp.components;

export default function Edit({ context: { postType, postId } }) {
  const blockProps = useBlockProps();

  const [meta = {}] = useEntityProp("postType", postType, "meta", postId);

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("How does it works?", "wpct")}>
          <p>
            {__(
              "Use Gutenberg blocks to build the content of the block.",
              "wpct"
            )}
          </p>
          <p>
            {__(
              "There where do you want to place some custom field value, use the `{{fieldName}}` marks. It doesn't matter where do you place marks, inside a paragraph, or maybe in a link, feel free to play with it.",
              "wpct"
            )}
          </p>
          <p>
            {__(
              "Then, when the block is rendered, this marks will be replaced with its corresponding value.",
              "wpct"
            )}
          </p>
        </PanelBody>
        <PanelBody
          title={__("Registered custom fields", "wpct")}
          initialOpen={false}
        >
          <ul>
            {Object.keys(meta).map((remote) => (
              <li>{remote}</li>
            ))}
          </ul>
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <InnerBlocks template={TEMPLATE} />
      </div>
    </>
  );
}

const TEMPLATE = [
  [
    "core/paragraph",
    {
      placeholder: __("Setup your custom field template"),
    },
  ],
];
