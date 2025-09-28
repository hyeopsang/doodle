import { useMemo } from "react";
import type { TLinkElement } from "platejs";

import {
  type UseVirtualFloatingOptions,
  flip,
  offset,
} from "@platejs/floating";
import { getLinkAttributes } from "@platejs/link";
import {
  type LinkFloatingToolbarState,
  FloatingLinkUrlInput,
  useFloatingLinkEdit,
  useFloatingLinkEditState,
  useFloatingLinkInsert,
  useFloatingLinkInsertState,
} from "@platejs/link/react";
import { cva } from "class-variance-authority";
import { KEYS } from "platejs";
import {
  useEditorRef,
  useEditorSelection,
  useFormInputProps,
  usePluginOption,
} from "platejs/react";

const popoverVariants = cva(
  "z-50 w-auto rounded-md border bg-white p-1 text-gray-900 shadow-md outline-hidden"
);

const inputVariants = cva(
  "flex h-[28px] w-full rounded-md border border-gray-300 bg-transparent px-1.5 py-1 text-base placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 md:text-sm"
);

export function LinkFloatingToolbar({
  state,
}: {
  state?: LinkFloatingToolbarState;
}) {
  const activeCommentId = usePluginOption({ key: KEYS.comment }, "activeId");
  const activeSuggestionId = usePluginOption(
    { key: KEYS.suggestion },
    "activeId"
  );

  const floatingOptions: UseVirtualFloatingOptions = useMemo(() => {
    return {
      middleware: [
        offset(8),
        flip({
          fallbackPlacements: ["bottom-end", "top-start", "top-end"],
          padding: 12,
        }),
      ],
      placement:
        activeSuggestionId || activeCommentId ? "top-start" : "bottom-start",
    };
  }, [activeCommentId, activeSuggestionId]);

  const insertState = useFloatingLinkInsertState({
    ...state,
    floatingOptions: {
      ...floatingOptions,
      ...state?.floatingOptions,
    },
  });
  const {
    hidden,
    props: insertProps,
    ref: insertRef,
    textInputProps,
  } = useFloatingLinkInsert(insertState);

  const editState = useFloatingLinkEditState({
    ...state,
    floatingOptions: {
      ...floatingOptions,
      ...state?.floatingOptions,
    },
  });
  const {
    editButtonProps,
    props: editProps,
    ref: editRef,
    unlinkButtonProps,
  } = useFloatingLinkEdit(editState);
  const inputProps = useFormInputProps({
    preventDefaultOnEnterKeydown: true,
  });

  if (hidden) return null;

  const input = (
    <div className="flex w-[330px] flex-col" {...inputProps}>
      <div className="flex items-center">
        <div className="flex items-center pr-1 pl-2 text-gray-500">🔗</div>

        <FloatingLinkUrlInput
          className={inputVariants()}
          placeholder="Paste link"
          data-plate-focus
        />
      </div>

      <div className="my-1 h-px bg-gray-200" />

      <div className="flex items-center">
        <div className="flex items-center pr-1 pl-2 text-gray-500">🔤</div>
        <input
          className={inputVariants()}
          placeholder="Text to display"
          data-plate-focus
          {...textInputProps}
        />
      </div>
    </div>
  );

  const editContent = editState.isEditing ? (
    input
  ) : (
    <div className="box-content flex items-center gap-2">
      <button type="button" {...editButtonProps} className="px-2 text-sm">
        Edit link
      </button>

      <div className="h-4 w-px bg-gray-300" />

      <LinkOpenButton />

      <div className="h-4 w-px bg-gray-300" />

      <button type="button" {...unlinkButtonProps} className="px-2 text-sm">
        ✖
      </button>
    </div>
  );

  return (
    <>
      <div ref={insertRef} className={popoverVariants()} {...insertProps}>
        {input}
      </div>

      <div ref={editRef} className={popoverVariants()} {...editProps}>
        {editContent}
      </div>
    </>
  );
}

function LinkOpenButton() {
  const editor = useEditorRef();
  const selection = useEditorSelection();

  const attributes = useMemo(() => {
    const entry = editor.api.node<TLinkElement>({
      match: { type: editor.getType(KEYS.link) },
    });
    if (!entry) {
      return {};
    }
    const [element] = entry;
    return getLinkAttributes(editor, element);
  }, [editor, selection]);

  return (
    <a
      {...attributes}
      onMouseOver={(e) => {
        e.stopPropagation();
      }}
      aria-label="Open link in a new tab"
      target="_blank"
      className="px-2 text-sm"
    >
      ↗
    </a>
  );
}
