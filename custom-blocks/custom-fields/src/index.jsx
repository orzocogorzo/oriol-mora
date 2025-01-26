import Edit from "./edit";
import icon from "./icon";
import metadata from "./block.json";

import "./style.css";

const { useBlockProps, InnerBlocks } = wp.blockEditor;

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
wp.blocks.registerBlockType(metadata.name, {
  icon,
  edit: Edit,
  save: () => {
    const blockProps = useBlockProps.save();
    return (
      <div {...blockProps}>
        <InnerBlocks.Content />
      </div>
    );
  },
});
