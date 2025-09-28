import { useState, useRef, useEffect } from "react";
import type { Alignment } from "@platejs/basic-styles";
import { TextAlignPlugin } from "@platejs/basic-styles/react";
import { useEditorPlugin, useSelectionFragmentProp } from "platejs/react";
import { ToolbarButton } from "./toolbar";

// 아이콘 대신 텍스트 심볼 사용
const ITEMS = [
  { label: "L", value: "left" },
  { label: "C", value: "center" },
  { label: "R", value: "right" },
  { label: "J", value: "justify" },
] as const;

export function AlignToolbarButton() {
  const { editor, tf } = useEditorPlugin(TextAlignPlugin);
  const value =
    useSelectionFragmentProp({
      defaultValue: "start",
      getProp: (node) => node.align,
    }) ?? "left";

  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const IconLabel = ITEMS.find((i) => i.value === value)?.label ?? "L";

  return (
    <div className="relative inline-block">
      <ToolbarButton
        pressed={open}
        tooltip="Align"
        isDropdown
        onClick={() => setOpen((prev) => !prev)}
      >
        {IconLabel}
      </ToolbarButton>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute left-0 mt-1 w-24 rounded-md border bg-white shadow-md z-50"
        >
          {ITEMS.map((item) => (
            <button
              key={item.value}
              className={`flex w-full items-center px-2 py-1 text-sm hover:bg-gray-100 ${
                value === item.value ? "bg-gray-200 font-semibold" : ""
              }`}
              onClick={() => {
                tf.textAlign.setNodes(item.value as Alignment);
                editor.tf.focus();
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
