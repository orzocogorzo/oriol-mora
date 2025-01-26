import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";

import "./style.css";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
wp.blocks.registerBlockType(metadata.name, {
  edit: Edit,
  save,
});
