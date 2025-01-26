import "./editor.css";

const { __ } = wp.i18n;
const {
  useBlockProps,
  useInnerBlocksProps,
  InspectorControls,
  store: blockEditorStore,
} = wp.blockEditor;
const { PanelBody, ToggleControl, RangeControl } = wp.components;
const { useSelect } = wp.data;
const { useEffect, useRef } = wp.element;

function SliderInspectorControls({ clientId, attributes, setAttributes }) {
  const { getBlocks } = useSelect(blockEditorStore);
  const [query] = getBlocks(clientId);
  const queryPostType = query?.attributes.query.postType;

  const postsCount = useRef(0);
  useEffect(() => {
    if (!queryPostType) return;
    getPostCount(queryPostType).then((count) => (postsCount.current = count));
  }, [queryPostType]);

  const getPostCount = (postType) =>
    wp
      .apiFetch({
        path: `/wp/v2/${postType}`,
        queryParams: {
          _fields: ["id"],
        },
      })
      .catch((err) => {
        return wp.apiFetch({
          path: `/wp/v2/${postType}s`,
          queryParams: {
            _fields: ["id"],
          },
        });
      })
      .then((posts) => {
        return posts.length;
      });

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
    slidesToScroll = 1,
    slidesToShow = 1,
    swipe = true,
    variableWidth = false,
  } = attributes;

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
          label={__("Slides to show", "wpct-child-theme")}
          value={slidesToShow}
          onChange={(value) => setAttributes({ slidesToShow: value })}
          min={1}
          max={postsCount.current || 5}
          required
        />
        <RangeControl
          label={__("Slides to scroll", "wpct-child-theme")}
          value={slidesToScroll}
          onChange={(value) => setAttributes({ slidesToScroll: value })}
          min={1}
          max={postsCount.current || 5}
          required
        />
        <RangeControl
          label={__("Initial slide", "wpct-child-theme")}
          value={initialSlide}
          min={1}
          max={postsCount.current || false}
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
          label={__("Enable swipe", "wpct-child-theme")}
          checked={swipe}
          onChange={() => setAttributes({ swipe: !swipe })}
        />
        <ToggleControl
          disabled={!dots}
          label={__("Show paging", "wpct-child-theme")}
          checked={customPaging}
          onChange={() => setAttributes({ customPaging: !customPaging })}
        />
      </PanelBody>
      <PanelBody title={__("Display settings", "wpct-child-theme")}>
        <ToggleControl
          label={__("Center mode", "wpct-child-theme")}
          checked={centerMode}
          onChange={() => setAttributes({ centerMode: !centerMode })}
        />
        <ToggleControl
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
  const { slidesToShow } = attributes;
  const blockProps = useBlockProps({
    className: `wpct-block-slider wpct-block-slider-loop slides-to-show-${slidesToShow}`,
  });
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    defaultBlock: queryTemplate,
    directInsert: true,
    orientation: "horizontal",
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
        perPage: 100,
        pages: 0,
        offset: 0,
        exclude: [],
        sticky: "",
        inherit: false,
      },
      layout: { type: "constrained" },
    },
    [
      [
        "core/post-template",
        {
          layout: { type: "constrained" },
        },
        [
          [
            "core/group",
            {
              className: "wpct-block-slider-slide wp-block-group",
              templateLock: false,
              metadata: { name: "Wpct Slide" },
              layout: { type: "constrained" },
            },
            [["core/post-title"], ["core/post-excerpt"]],
          ],
        ],
      ],
    ],
  ],
];
