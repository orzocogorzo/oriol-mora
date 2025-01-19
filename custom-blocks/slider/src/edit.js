import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  useInnerBlocksProps,
  InspectorControls,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { useSelect, useDispatch } from "@wordpress/data";
import {
  createBlock,
  createBlocksFromInnerBlocksTemplate,
} from "@wordpress/blocks";
import { PanelBody, ToggleControl, RangeControl } from "@wordpress/components";
import "./editor.scss";

function SliderInspectorControls({ clientId, attributes, setAttributes }) {
  const {
    infinite = true,
    slides = 2,
    slidesToShow = 1,
    slidesToScroll = 1,
    initialSlide = 0,
    centerMode = false,
    showArrows = true,
    showDots = false,
    autoPlay = false,
    autoPlaySpeed = 5,
  } = attributes;

  const { getBlocks } = useSelect(blockEditorStore);
  const { replaceInnerBlocks } = useDispatch(blockEditorStore);

  function updateSlides(to, from) {
    let innerBlocks = getBlocks(clientId);

    if (to > from) {
      innerBlocks = innerBlocks.concat(
        Array.from(Array(to - from)).map(() =>
          createBlock(
            "core/group",
            {
              className: "wpct-block-slider-slide wp-block-group",
              layout: "default",
              lock: {
                remove: true,
              },
              metadata: { name: "Wpct Slide" },
            },
            createBlocksFromInnerBlocksTemplate([
              [
                "core/heading",
                { level: 2, content: "Slide title", lock: { remove: false } },
              ],
            ])
          )
        )
      );
    } else if (from > to) {
      innerBlocks = innerBlocks.slice(0, -(from - to));
    }

    replaceInnerBlocks(clientId, innerBlocks);
    setAttributes({ slides: to });
  }

  return (
    <InspectorControls>
      <PanelBody title={__("Slider settings", "wpct")}>
        <RangeControl
          label={__("Slides", "wpct")}
          value={slides}
          onChange={(value) => updateSlides(value, slides)}
          min={2}
          max={50}
        />
        <RangeControl
          label={__("Slides to show", "wpct")}
          value={slidesToShow}
          onChange={(value) => setAttributes({ slidesToShow: value })}
          min={1}
          max={5}
          required
        />
        <RangeControl
          label={__("Slides to scroll", "wpct")}
          value={slidesToScroll}
          onChange={(value) => setAttributes({ slidesToScroll: value })}
          min={1}
          max={5}
          required
        />
        <RangeControl
          label={__("Initial slide", "wpct")}
          value={initialSlide}
          onChange={(value) => setAttributes({ initialSlide: value })}
          required
        />
        <ToggleControl
          label={__("Infinite slide", "wpct")}
          checked={infinite}
          onChange={() => setAttributes({ infinite: !infinite })}
        />
        <ToggleControl
          label={__("Center mode", "wpct")}
          checked={centerMode}
          onChange={() => setAttributes({ centerMode: !centerMode })}
        />
        <ToggleControl
          label={__("Show arrows", "wpct")}
          checked={showArrows}
          onChange={() => setAttributes({ showArrows: !showArrows })}
        />
        <ToggleControl
          label={__("Show dots", "wpct")}
          checked={showDots}
          onChange={() => setAttributes({ showDots: !showDots })}
        />
        <ToggleControl
          label={__("Autoplay", "wpct")}
          checked={autoPlay}
          onChange={() => setAttributes({ autoPlay: !autoPlay })}
        />
        <RangeControl
          label={__("Autoplay Speed", "wpct")}
          value={autoPlaySpeed}
          onChange={(value) => setAttributes({ autoPlaySpeed: value })}
          min={1}
          max={10}
        />
      </PanelBody>
    </InspectorControls>
  );
}

export default function Edit({ clientId, attributes, setAttributes }) {
  const { slidesToShow } = attributes;
  const blockProps = useBlockProps({
    className: `wpct-block-slider slides-to-show-${slidesToShow}`,
  });
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    defaultBlock: slideBlockTemplate,
    directInsert: true,
    orientation: "horizontal",
    renderAppender: false,
    templateLock: "insert",
    template: Array.from(Array(5)).map(() => slideBlockTemplate),
  });

  return (
    <>
      <SliderInspectorControls
        attributes={attributes}
        setAttributes={setAttributes}
        clientId={clientId}
      />
      <div {...innerBlocksProps} />
    </>
  );
}

const slideBlockTemplate = [
  "core/group",
  {
    className: "wpct-block-slider-slide wp-block-group",
    layout: "default",
    templateLock: false,
    metadata: { name: "Wpct Slide" },
  },
  [
    [
      "core/heading",
      {
        level: 2,
        content: "Slide title",
        lock: {
          remove: false,
        },
      },
    ],
  ],
];
