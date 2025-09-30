import {
  BaselineIcon,
  BoldIcon,
  Code2Icon,
  ItalicIcon,
  PaintBucketIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react';
import {KEYS} from 'platejs';
import {useEditorReadOnly} from 'platejs/react';
import {
  AlignToolbarButton,
  EmojiToolbarButton,
  FontColorToolbarButton,
  FontSizeToolbarButton,
  UndoToolbarButton,
  RedoToolbarButton,
  LinkToolbarButton,
  BulletedListToolbarButton,
  NumberedListToolbarButton,
  TodoListToolbarButton,
  MarkToolbarButton,
  MediaToolbarButton,
  TableToolbarButton,
  ToggleToolbarButton,
  TurnIntoToolbarButton,
} from '@/lib/editor/ui/fixed-toolbar/button';
import ToolBarWrapper from '../toolbar/toolbar-wrapper';

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();
  return (
    <>
      {!readOnly && (
        <ToolBarWrapper>
          <UndoToolbarButton />
          <RedoToolbarButton />
          <LinkToolbarButton />
          <TableToolbarButton />
          <EmojiToolbarButton />
          <MediaToolbarButton nodeType={KEYS.img} />
          <div className="flex justify-center items-center gap-2">
            <TurnIntoToolbarButton />
            <FontSizeToolbarButton />
            <MarkToolbarButton nodeType={KEYS.bold} tooltip="Bold (⌘+B)">
              <BoldIcon />
            </MarkToolbarButton>
            <MarkToolbarButton nodeType={KEYS.italic} tooltip="Italic (⌘+I)">
              <ItalicIcon />
            </MarkToolbarButton>
            <MarkToolbarButton
              nodeType={KEYS.underline}
              tooltip="Underline (⌘+U)"
            >
              <UnderlineIcon />
            </MarkToolbarButton>
            <MarkToolbarButton
              nodeType={KEYS.strikethrough}
              tooltip="Strikethrough (⌘+⇧+M)"
            >
              <StrikethroughIcon />
            </MarkToolbarButton>
            <MarkToolbarButton nodeType={KEYS.code} tooltip="Code (⌘+E)">
              <Code2Icon />
            </MarkToolbarButton>
            <FontColorToolbarButton nodeType={KEYS.color} tooltip="Text color">
              <BaselineIcon />
            </FontColorToolbarButton>
            <FontColorToolbarButton
              nodeType={KEYS.backgroundColor}
              tooltip="Background color"
            >
              <PaintBucketIcon />
            </FontColorToolbarButton>
            <AlignToolbarButton />
            <NumberedListToolbarButton />
            <BulletedListToolbarButton />
            <TodoListToolbarButton />
            <ToggleToolbarButton />
          </div>
        </ToolBarWrapper>
      )}
    </>
  );
}
