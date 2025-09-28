import { useEffect } from "react";
import type { WithRequiredKey } from "platejs";

import {
  FloatingMedia as FloatingMediaPrimitive,
  FloatingMediaStore,
  useFloatingMediaValue,
  useImagePreviewValue,
} from "@platejs/media/react";
import { cva } from "class-variance-authority";
import {
  useEditorRef,
  useEditorSelector,
  useElement,
  useFocusedLast,
  useReadOnly,
  useRemoveNodeButton,
  useSelected,
} from "platejs/react";

import { CaptionButton } from "@/lib/ui/caption";

const inputVariants = cva(
  "flex h-[28px] w-full rounded-md border border-gray-300 bg-transparent px-1.5 py-1 text-base placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:outline-none md:text-sm"
);

export function MediaToolbar({
  children,
  plugin,
}: {
  children: React.ReactNode;
  plugin: WithRequiredKey;
}) {
  const editor = useEditorRef();
  const readOnly = useReadOnly();
  const selected = useSelected();
  const isFocusedLast = useFocusedLast();
  const selectionCollapsed = useEditorSelector(
    (editor) => !editor.api.isExpanded(),
    []
  );
  const isImagePreviewOpen = useImagePreviewValue("isOpen", editor.id);
  const open =
    isFocusedLast &&
    !readOnly &&
    selected &&
    selectionCollapsed &&
    !isImagePreviewOpen;
  const isEditing = useFloatingMediaValue("isEditing");

  useEffect(() => {
    if (!open && isEditing) {
      FloatingMediaStore.set("isEditing", false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const element = useElement();
  const { props: buttonProps } = useRemoveNodeButton({ element });

  if (!open) return <>{children}</>;

  return (
    <div className="absolute z-50 mt-1 rounded-md border bg-white p-1 shadow-md">
      {isEditing ? (
        <div className="flex w-[330px] flex-col">
          <div className="flex items-center gap-2 px-2 py-1 text-gray-500">
            <span className="text-sm">🔗</span>
            <FloatingMediaPrimitive.UrlInput
              className={inputVariants()}
              placeholder="Paste the embed link..."
              options={{ plugin }}
            />
          </div>
        </div>
      ) : (
        <div className="box-content flex items-center gap-2">
          <FloatingMediaPrimitive.EditButton>
            Edit link
          </FloatingMediaPrimitive.EditButton>

          <CaptionButton>Caption</CaptionButton>

          <div className="mx-1 h-6 w-px bg-gray-300" />

          <button {...buttonProps} className="p-1 text-red-600">
            🗑️
          </button>
        </div>
      )}
    </div>
  );
}
