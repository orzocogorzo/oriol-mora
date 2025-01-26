const { useBlockProps, useInnerBlocksProps } = wp.blockEditor;

export default function save({ attributes }) {
  const {
    adaptiveHeight,
    arrows,
    autoplay,
    autoplaySpeed,
    centerMode,
    customPaging,
    dots,
    fade,
    infinite,
    initialSlide,
    rtl,
    slidesToScroll,
    slidesToShow,
    swipe,
    variableWidth,
  } = attributes;

  const blockProps = useBlockProps.save({
    className: "wpct-block-slider wp-block-group",
  });
  const innerBlocksProps = useInnerBlocksProps.save(blockProps);

  return (
    <div
      {...innerBlocksProps}
      data-adaptiveHeight={String(adaptiveHeight)}
      data-arrows={String(arrows)}
      data-autoplay={String(autoplay)}
      data-autoplaySpeed={autoplaySpeed}
      data-centerMode={String(centerMode)}
      data-customPaging={String(customPaging)}
      data-dots={String(dots)}
      data-fade={String(fade)}
      data-infinite={String(infinite)}
      data-initialSlide={initialSlide}
      data-rtl={String(rtl)}
      data-slidesToScroll={slidesToScroll}
      data-slidesToShow={slidesToShow}
      data-swipe={String(swipe)}
      data-variableWidth={String(variableWidth)}
    />
  );
}
