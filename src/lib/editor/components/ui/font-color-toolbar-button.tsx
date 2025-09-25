import { useCallback, useEffect, useState } from "react";
import { useEditorRef, useEditorSelector } from "platejs/react";
import { ToolbarButton, ToolbarMenuGroup } from "./toolbar";

type TColor = { value: string; name?: string };

export function FontColorToolbarButton({
  nodeType,
  tooltip,
  colors = DEFAULT_COLORS,
  customColors = DEFAULT_CUSTOM_COLORS,
  children, // <- children 추가
}: {
  nodeType: string;
  tooltip?: string;
  colors?: TColor[];
  customColors?: TColor[];
  children?: React.ReactNode; // <- 타입 추가
}) {
  const editor = useEditorRef();

  const selectionDefined = useEditorSelector(
    (editor) => !!editor.selection,
    []
  );

  const color = useEditorSelector(
    (editor) => editor.api.mark(nodeType) as string,
    [nodeType]
  );

  const [selectedColor, setSelectedColor] = useState<string>();
  const [open, setOpen] = useState(false);

  const updateColor = useCallback(
    (value: string) => {
      if (editor.selection) {
        setSelectedColor(value);
        editor.tf.select(editor.selection);
        editor.tf.focus();
        editor.tf.addMarks({ [nodeType]: value });
      }
    },
    [editor, nodeType]
  );

  const clearColor = useCallback(() => {
    if (editor.selection && selectedColor) {
      editor.tf.select(editor.selection);
      editor.tf.focus();
      editor.tf.removeMarks(nodeType);
      setSelectedColor(undefined);
    }
  }, [editor, nodeType, selectedColor]);

  useEffect(() => {
    if (selectionDefined) {
      setSelectedColor(color);
    }
  }, [color, selectionDefined]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <ToolbarButton onClick={() => setOpen((o) => !o)} tooltip={tooltip}>
        {children ?? selectedColor ?? "Color"} {/* children이 있으면 표시 */}
      </ToolbarButton>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            padding: "8px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            zIndex: 100,
          }}
        >
          <ToolbarMenuGroup label="Custom Colors">
            {customColors.map(({ value, name }) => (
              <button
                key={value}
                style={{
                  backgroundColor: value,
                  border:
                    selectedColor === value
                      ? "2px solid black"
                      : "1px solid #ccc",
                  width: "24px",
                  height: "24px",
                }}
                onClick={() => {
                  updateColor(value);
                  setOpen(false);
                }}
                title={name}
              />
            ))}
          </ToolbarMenuGroup>

          <ToolbarMenuGroup label="Default Colors">
            {colors.map(({ value, name }) => (
              <button
                key={value}
                style={{
                  backgroundColor: value,
                  border:
                    selectedColor === value
                      ? "2px solid black"
                      : "1px solid #ccc",
                  width: "24px",
                  height: "24px",
                }}
                onClick={() => {
                  updateColor(value);
                  setOpen(false);
                }}
                title={name}
              />
            ))}
          </ToolbarMenuGroup>

          {selectedColor && (
            <button onClick={clearColor} style={{ marginTop: "4px" }}>
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
}

const DEFAULT_COLORS: TColor[] = [
  { value: "#000000", name: "black" },
  { value: "#FFFFFF", name: "white" },
  { value: "#FF0000", name: "red" },
  { value: "#00FF00", name: "green" },
  { value: "#0000FF", name: "blue" },
];

const DEFAULT_CUSTOM_COLORS: TColor[] = [
  { value: "#F4CCCC", name: "light red" },
  { value: "#D9EAD3", name: "light green" },
  { value: "#CFE1F3", name: "light blue" },
];
