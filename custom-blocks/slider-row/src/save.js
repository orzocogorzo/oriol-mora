import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const { showDots, showArrows } = attributes;
  const blockProps = useBlockProps.save({
    className: "wpct-block-slider-row wp-block-group",
  });
  const innerBlocksProps = useInnerBlocksProps.save(blockProps);

  return (
    <div
      {...innerBlocksProps}
      showDots={String(showDots)}
      showArrows={String(showArrows)}
    />
  );
}
