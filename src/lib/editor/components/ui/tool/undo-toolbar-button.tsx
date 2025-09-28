import { useEditorRef, useEditorSelector } from "platejs/react";
import { ToolbarButton } from "./toolbar";
import { Undo2Icon } from "lucide-react";

export function UndoToolbarButton(
  props: React.ComponentProps<typeof ToolbarButton>
) {
  const editor = useEditorRef();
  const disabled = useEditorSelector(
    (editor) => editor.history.undos.length === 0,
    []
  );
  return (
    <ToolbarButton
      {...props}
      disabled={disabled}
      onClick={() => editor.undo()}
      onMouseDown={(e) => e.preventDefault()}
      tooltip="Undo"
    >
      <Undo2Icon />
    </ToolbarButton>
  );
}
