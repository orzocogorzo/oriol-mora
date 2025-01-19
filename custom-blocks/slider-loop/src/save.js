import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const {
    infinite,
    slidesToShow,
    slidesToScroll,
    initialSlide,
    centerMode,
    showDots,
    showArrows,
    autoPlay,
    autoPlaySpeed,
  } = attributes;

  const blockProps = useBlockProps.save({
    className: "wpct-block-slider wpct-block-slider-loop wp-block-group",
  });
  const innerBlocksProps = useInnerBlocksProps.save(blockProps);

  return (
    <div
      {...innerBlocksProps}
      infinite={String(infinite)}
      centerMode={String(centerMode)}
      slidesToShow={slidesToShow}
      slidesToScroll={slidesToScroll}
      initialSlide={initialSlide}
      showDots={String(showDots)}
      showArrows={String(showArrows)}
      animation={String(autoPlay)}
      animationSpeed={autoPlaySpeed}
    />
  );
}
