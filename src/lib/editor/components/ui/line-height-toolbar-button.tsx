import { useState } from "react";
import { LineHeightPlugin } from "@platejs/basic-styles/react";
import { useEditorRef, useSelectionFragmentProp } from "platejs/react";
import { ToolbarButton } from "./toolbar";

export function LineHeightToolbarButton() {
  const editor = useEditorRef();
  const { defaultNodeValue, validNodeValues: values = [] } =
    editor.getInjectProps(LineHeightPlugin);

  const value = useSelectionFragmentProp({
    defaultValue: defaultNodeValue,
    getProp: (node) => node.lineHeight,
  });

  const [open, setOpen] = useState(false);

  const handleChange = (v: number) => {
    editor.getTransforms(LineHeightPlugin).lineHeight.setNodes(Number(v));
    editor.tf.focus();
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <ToolbarButton
        pressed={open}
        tooltip="Line height"
        onClick={() => setOpen((prev) => !prev)}
      >
        ↕️ {value}
      </ToolbarButton>

      {open && (
        <div className="absolute z-10 mt-1 w-24 rounded-md border bg-white shadow">
          {values.map((v) => (
            <button
              key={v}
              className={`w-full px-2 py-1 text-left text-sm hover:bg-gray-100 ${
                v === value ? "font-semibold" : ""
              }`}
              onClick={() => handleChange(v)}
            >
              {v}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
