import { useState } from "react";
import type { Alignment } from "@platejs/basic-styles";
import { TextAlignPlugin } from "@platejs/basic-styles/react";
import { useEditorPlugin, useSelectionFragmentProp } from "platejs/react";

// 순수 SVG 아이콘
const icons = {
  left: (
    <svg
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="15" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  center: (
    <svg
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="6" y1="12" x2="18" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  right: (
    <svg
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="9" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  justify: (
    <svg
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
};

const items: { value: Alignment; icon: React.ReactElement }[] = [
  { value: "left", icon: icons.left },
  { value: "center", icon: icons.center },
  { value: "right", icon: icons.right },
  { value: "justify", icon: icons.justify },
];

export function AlignToolbarButton() {
  const { editor, tf } = useEditorPlugin(TextAlignPlugin);
  const value =
    useSelectionFragmentProp({
      defaultValue: "start",
      getProp: (node) => node.align,
    }) ?? "left";

  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Toolbar Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center justify-center p-2 rounded ${
          open ? "bg-gray-200" : ""
        }`}
        title="Align"
      >
        {items.find((item) => item.value === value)?.icon}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-1 right-0 w-24 bg-white border shadow-md rounded">
          {items.map(({ icon, value: itemValue }) => (
            <button
              key={itemValue}
              type="button"
              onClick={() => {
                tf.textAlign.setNodes(itemValue);
                editor.tf.focus();
                setOpen(false);
              }}
              className={`flex w-full items-center justify-center p-2 hover:bg-gray-100 ${
                itemValue === value ? "bg-gray-200" : ""
              }`}
            >
              {icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
