import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  useInnerBlocksProps,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, ToggleControl, RangeControl } from "@wordpress/components";
import "./editor.scss";

function SliderInspectorControls({ attributes, setAttributes }) {
  const {
    infinite = true,
    slidesToShow = 1,
    slidesToScroll = 1,
    initialSlide = 0,
    centerMode = false,
    showArrows = true,
    showDots = false,
    autoPlay = false,
    autoPlaySpeed = 5,
  } = attributes;

  return (
    <InspectorControls>
      <PanelBody title={__("Slider settings", "wpct")}>
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
    className: `wpct-block-slider wpct-block-slider-loop slides-to-show-${slidesToShow}`,
  });
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    defaultBlock: queryTemplate,
    directInsert: true,
    orientation: "vertical",
    renderAppender: false,
    templateLock: "insert",
    template: queryTemplate,
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

const queryTemplate = [
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
        inherit: false,
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
              templateLock: false,
              metadata: { name: "Wpct Slide" },
            },
            [["core/post-title"], ["core/post-excerpt"]],
          ],
        ],
      ],
    ],
  ],
];
