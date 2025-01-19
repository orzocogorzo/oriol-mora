import { loop as icon } from "@wordpress/icons";
import { registerBlockType } from "@wordpress/blocks";

import "./style.scss";
import "./editor.scss";

import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";

registerBlockType(metadata.name, {
  icon,
  edit: Edit,
  save,
});
