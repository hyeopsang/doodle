import { useState, useMemo } from "react";
import type { TElement } from "platejs";
import { KEYS } from "platejs";
import { useEditorRef, useSelectionFragmentProp } from "platejs/react";
import { getBlockType, setBlockType } from "../../transforms";
// Plate 기능은 그대로 유지
const turnIntoItems = [
  { icon: "¶", label: "Text", value: KEYS.p },
  { icon: "H1", label: "Heading 1", value: "h1" },
  { icon: "H2", label: "Heading 2", value: "h2" },
  { icon: "H3", label: "Heading 3", value: "h3" },
  { icon: "H4", label: "Heading 4", value: "h4" },
  { icon: "H5", label: "Heading 5", value: "h5" },
  { icon: "H6", label: "Heading 6", value: "h6" },
  { icon: "•", label: "Bulleted list", value: KEYS.ul },
  { icon: "1.", label: "Numbered list", value: KEYS.ol },
  { icon: "☐", label: "To-do list", value: KEYS.listTodo },
  { icon: "</>", label: "Code Block", value: KEYS.codeBlock },
  { icon: "❝", label: "Quote", value: KEYS.blockquote },
];

export function TurnIntoToolbarButton() {
  const editor = useEditorRef();
  const [open, setOpen] = useState(false);

  const value = useSelectionFragmentProp({
    defaultValue: KEYS.p,
    getProp: (node) => getBlockType(node as TElement),
  });

  const selectedItem = useMemo(
    () =>
      turnIntoItems.find((item) => item.value === (value ?? KEYS.p)) ??
      turnIntoItems[0],
    [value]
  );

  return (
    <div className="relative inline-flex">
      {/* 버튼 */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
      >
        {selectedItem.label} ▼
      </button>

      {/* 드롭다운 메뉴 */}
      {open && (
        <div className="absolute left-0 top-full mt-1 w-48 rounded-md border bg-white shadow">
          {turnIntoItems.map(({ icon, label, value: itemValue }) => (
            <button
              key={itemValue}
              type="button"
              onClick={() => {
                setBlockType(editor, itemValue);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-100"
            >
              <span className="flex w-4 justify-center">{icon}</span>
              {label}
              {value === itemValue && <span className="ml-auto">✔</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
