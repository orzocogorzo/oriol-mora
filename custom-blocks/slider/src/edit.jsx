import "./editor.css";

const { __ } = wp.i18n;
const {
  useBlockProps,
  useInnerBlocksProps,
  InspectorControls,
  store: blockEditorStore,
} = wp.blockEditor;
const { useSelect, useDispatch } = wp.data;
const { createBlock, createBlocksFromInnerBlocksTemplate } = wp.blocks;
const { PanelBody, ToggleControl, RangeControl } = wp.components;
const { useEffect } = wp.element;

function SliderInspectorControls({ clientId, attributes, setAttributes }) {
  const {
    adaptiveHeight = false,
    arrows = true,
    autoplay = false,
    autoplaySpeed = 3,
    centerMode = false,
    customPaging = false,
    dots = false,
    fade = false,
    infinite = true,
    initialSlide = 0,
    rtl = false,
    slides = 4,
    slidesToScroll = 1,
    slidesToShow = 1,
    swipe = true,
    variableWidth = false,
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
              templateLock: false,
              metadata: { name: "Wpct Slide" },
            },
            createBlocksFromInnerBlocksTemplate([
              ["core/heading", { level: 2, content: "Slide title" }],
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

  useEffect(() => {
    const updates = {};
    if (!attributes.dots && attributes.customPaging) {
      updates.customPaging = false;
    }

    if (attributes.slidesToShow > 1 && attributes.variableWidth) {
      updates.variableWidth = false;
    }

    if (attributes.slidesToShow > 1 && attributes.fade) {
      updates.fade = false;
    }

    if (Object.keys(updates).length) {
      setAttributes(updates);
    }
  }, [attributes]);

  return (
    <InspectorControls>
      <PanelBody title={__("Slides settings", "wpct-child-theme")}>
        <RangeControl
          label={__("Slides", "wpct-child-theme")}
          value={slides}
          onChange={(value) => updateSlides(value, slides)}
          min={2}
        />
        <RangeControl
          label={__("Slides to show", "wpct-child-theme")}
          value={slidesToShow}
          onChange={(value) => setAttributes({ slidesToShow: value })}
          min={1}
          max={slides}
          required
        />
        <RangeControl
          label={__("Slides to scroll", "wpct-child-theme")}
          value={slidesToScroll}
          onChange={(value) => setAttributes({ slidesToScroll: value })}
          min={1}
          max={+slidesToShow}
          required
        />
        <RangeControl
          label={__("Initial slide", "wpct-child-theme")}
          value={initialSlide}
          onChange={(value) => setAttributes({ initialSlide: value })}
          required
        />
        <ToggleControl
          label={__("Infinite slide", "wpct-child-theme")}
          checked={infinite}
          onChange={() => setAttributes({ infinite: !infinite })}
        />
      </PanelBody>
      <PanelBody title={__("Animation settings", "wpct-child-theme")}>
        <ToggleControl
          label={__("Autoplay", "wpct-child-theme")}
          checked={autoplay}
          onChange={() => setAttributes({ autoplay: !autoplay })}
        />
        <RangeControl
          label={__("Autoplay Speed", "wpct-child-theme")}
          value={autoplaySpeed}
          onChange={(value) => setAttributes({ autoplaySpeed: value })}
          min={1}
          max={10}
        />
        <ToggleControl
          disabled={slidesToShow > 1}
          help={
            slidesToShow > 1
              ? __(
                  "Fade animations is only available if slides to show is 1",
                  "wpct-child-theme"
                )
              : ""
          }
          label={__("Fade animations", "wpct-child-theme")}
          checked={fade}
          onChange={() => setAttributes({ fade: !fade })}
        />
      </PanelBody>
      <PanelBody title={__("Interaction settings", "wpct-child-theme")}>
        <ToggleControl
          label={__("Show arrows", "wpct-child-theme")}
          checked={arrows}
          onChange={() => setAttributes({ arrows: !arrows })}
        />
        <ToggleControl
          label={__("Show dots", "wpct-child-theme")}
          checked={dots}
          onChange={() => setAttributes({ dots: !dots })}
        />
        <ToggleControl
          disabled={!dots}
          help={
            !dots
              ? __(
                  "Custom paging is only available if show dots is true",
                  "wpct-child-theme"
                )
              : ""
          }
          label={__("Show paging", "wpct-child-theme")}
          checked={customPaging}
          onChange={() => setAttributes({ customPaging: !customPaging })}
        />
        <ToggleControl
          label={__("Enable swipe", "wpct-child-theme")}
          checked={swipe}
          onChange={() => setAttributes({ swipe: !swipe })}
        />
      </PanelBody>
      <PanelBody title={__("Display settings", "wpct-child-theme")}>
        <ToggleControl
          label={__("Center mode", "wpct-child-theme")}
          checked={centerMode}
          onChange={() => setAttributes({ centerMode: !centerMode })}
        />
        <ToggleControl
          disabled={slidesToShow > 1}
          help={
            slidesToShow > 1
              ? __(
                  "Variable with is only available if slides to show is 1",
                  "wpct-child-theme"
                )
              : ""
          }
          label={__("Variable width", "wpct-child-theme")}
          checked={variableWidth}
          onChange={() => setAttributes({ variableWidth: !variableWidth })}
        />
        <ToggleControl
          label={__("Adaptive height", "wpct-child-theme")}
          checked={adaptiveHeight}
          onChange={() => setAttributes({ adaptiveHeight: !adaptiveHeight })}
        />
        <ToggleControl
          label={__("Right to left", "wpct-child-theme")}
          checked={rtl}
          onChange={() => setAttributes({ rtl: !rtl })}
        />
      </PanelBody>
    </InspectorControls>
  );
}

export default function Edit({ clientId, attributes, setAttributes }) {
  const { slides, slidesToShow } = attributes;
  const blockProps = useBlockProps({
    className: `wpct-block-slider slides-to-show-${slidesToShow}`,
  });
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    defaultBlock: slideBlockTemplate,
    directInsert: true,
    orientation: "horizontal",
    renderAppender: false,
    templateLock: "insert",
    template: Array.from(Array(slides)).map(() => slideBlockTemplate),
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
    templateLock: false,
    metadata: { name: "Wpct Slide" },
    layout: { type: "constrained" },
  },
  [
    [
      "core/image",
      {
        aspectRatio: "4/3",
        scale: "cover",
        sizeSlug: "full",
      },
    ],
  ],
];
