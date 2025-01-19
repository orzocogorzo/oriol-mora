import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  useInnerBlocksProps,
  InspectorControls,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import "./editor.scss";
import { useDispatch, useSelect } from "@wordpress/data";
import {
  createBlock,
  createBlocksFromInnerBlocksTemplate,
} from "@wordpress/blocks";
import {
  CheckboxControl,
  PanelBody,
  RangeControl,
} from "@wordpress/components";

function SliderRowInspectorControls({ clientId, attributes, setAttributes }) {
  const { steps = 4, showDots, showArrows } = attributes;
  const { getBlocks } = useSelect(blockEditorStore);
  const { replaceInnerBlocks } = useDispatch(blockEditorStore);

  function updateSteps(to, from) {
    let innerBlocks = getBlocks(clientId);

    if (to > from) {
      innerBlocks = innerBlocks.concat(
        Array.from(Array(to - from)).map(() =>
          createBlock(
            sliderRowBlockTemplate[0],
            sliderRowBlockTemplate[1],
            createBlocksFromInnerBlocksTemplate(sliderRowBlockTemplate[2])
          )
        )
      );
    } else if (from > to) {
      innerBlocks = innerBlocks.slice(0, -(from - to));
    }

    replaceInnerBlocks(clientId, innerBlocks);
    setAttributes({ steps: to });
  }

  return (
    <InspectorControls>
      <PanelBody title={__("Slider-row settings", "wpct")}>
        <RangeControl
          label={__("Steps", "wpct")}
          value={steps}
          onChange={(value) => updateSteps(value, steps)}
          min={2}
          max={8}
        />
        <CheckboxControl
          label={__("Show slider dots on mobile", "wpct")}
          checked={showDots}
          onChange={(value) => setAttributes({ showDots: value })}
        />
        <CheckboxControl
          label={__("Show slider arrows on mobile", "wpct")}
          checked={showArrows}
          onChange={(value) => setAttributes({ showArrows: value })}
        />
      </PanelBody>
    </InspectorControls>
  );
}

export default function Edit({ clientId, attributes, setAttributes }) {
  const blockProps = useBlockProps({
    className: `wpct-block-slider-row`,
  });
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    defaultBlock: sliderRowBlockTemplate,
    directInsert: true,
    orientation: "horizontal",
    renderAppender: false,
    templateLock: "insert",
    template: Array.from(Array(4)).map(() => sliderRowBlockTemplate),
  });

  return (
    <>
      <SliderRowInspectorControls
        attributes={attributes}
        setAttributes={setAttributes}
        clientId={clientId}
      />
      <div {...innerBlocksProps} />
    </>
  );
}

const sliderRowBlockTemplate = [
  "core/group",
  {
    className: "wpct-block-slider-row-step wp-block-group",
    layout: "default",
    templateLock: false,
    metadata: { name: "SM Step" },
  },
  [
    [
      "core/image",
      {
        aspectRatio: "1",
        scale: "cover",
        sizeSlug: "full",
        lock: {
          remove: false,
        },
      },
    ],
    [
      "core/heading",
      {
        level: 4,
        content: "Step title",
        lock: {
          remove: false,
        },
      },
    ],
    [
      "core/paragraph",
      {
        content: "Step description",
      },
    ],
  ],
];
