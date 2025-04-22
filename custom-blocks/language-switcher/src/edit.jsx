import "./editor.css";

const { useBlockProps } = wp.blockEditor;

export default function Edit() {
  const blockProps = useBlockProps();

  return (
    <>
      <div {...blockProps}>
        <ul className="oriol-mora-language-switcher has-small-font-size">
          <li>cat</li>
          <li>cast</li>
          <li>eng</li>
        </ul>
      </div>
    </>
  );
}
