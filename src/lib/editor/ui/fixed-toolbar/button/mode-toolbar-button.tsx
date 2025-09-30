import { useState } from "react";
import { useEditorRef, usePlateState } from "platejs/react";

export function ModeToolbarButton() {
  const editor = useEditorRef();
  const [readOnly, setReadOnly] = usePlateState("readOnly");
  const [open, setOpen] = useState(false);

  let value = "editing";
  if (readOnly) value = "viewing";

  const item: Record<string, { icon: string; label: string }> = {
    editing: {
      icon: "✏️", // 아이콘 대신 이모지
      label: "Editing",
    },
    viewing: {
      icon: "👁️",
      label: "Viewing",
    },
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* 드롭다운 트리거 버튼 */}
      <button onClick={() => setOpen((prev) => !prev)}>
        {item[value].icon} <span>{item[value].label}</span>
      </button>

      {/* 드롭다운 메뉴 */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            border: "1px solid #ccc",
            background: "white",
            minWidth: "180px",
            marginTop: "4px",
            zIndex: 10,
          }}
        >
          {/* Editing */}
          <div>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px",
              }}
            >
              <input
                type="radio"
                value="editing"
                checked={value === "editing"}
                onChange={() => {
                  setReadOnly(false);
                  editor.tf.focus(); // platejs 기능 유지
                }}
              />
              <Indicator checked={value === "editing"} />
              {item.editing.icon} {item.editing.label}
            </label>
          </div>

          {/* Viewing */}
          <div>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px",
              }}
            >
              <input
                type="radio"
                value="viewing"
                checked={value === "viewing"}
                onChange={() => {
                  setReadOnly(true);
                }}
              />
              <Indicator checked={value === "viewing"} />
              {item.viewing.icon} {item.viewing.label}
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

function Indicator({ checked }: { checked: boolean }) {
  return <span style={{ marginLeft: "auto" }}>{checked ? "✔️" : null}</span>;
}
