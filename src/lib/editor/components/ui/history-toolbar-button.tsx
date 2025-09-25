import { useEditorRef, useEditorSelector } from "platejs/react";
import { ToolbarButton } from "./toolbar";

export function RedoToolbarButton() {
  const editor = useEditorRef();
  const disabled = useEditorSelector(
    (editor) => editor.history.redos.length === 0,
    []
  );

  return (
    <ToolbarButton
      disabled={disabled}
      onClick={() => editor.redo()}
      onMouseDown={(e) => e.preventDefault()}
      tooltip="Redo"
    >
      Redo
    </ToolbarButton>
  );
}

export function UndoToolbarButton() {
  const editor = useEditorRef();
  const disabled = useEditorSelector(
    (editor) => editor.history.undos.length === 0,
    []
  );

  return (
    <ToolbarButton
      disabled={disabled}
      onClick={() => editor.undo()}
      onMouseDown={(e) => e.preventDefault()}
      tooltip="Undo"
    >
      Undo
    </ToolbarButton>
  );
}
