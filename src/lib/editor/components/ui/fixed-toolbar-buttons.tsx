import {
  BaselineIcon,
  BoldIcon,
  Code2Icon,
  ItalicIcon,
  PaintBucketIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react';
import {KEYS, type Value} from 'platejs';
import {useEditorReadOnly} from 'platejs/react';
import {AlignToolbarButton} from './align-toolbar-button';
import {EmojiToolbarButton} from './emoji-toolbar-button';
import {FontColorToolbarButton} from './font-color-toolbar-button';
import {FontSizeToolbarButton} from './font-size-toolbar-button';
import {RedoToolbarButton, UndoToolbarButton} from './history-toolbar-button';
import {LinkToolbarButton} from './link-toolbar-button';
import {
  BulletedListToolbarButton,
  NumberedListToolbarButton,
  TodoListToolbarButton,
} from './list-toolbar-button';
import {MarkToolbarButton} from './mark-toolbar-button';
import {MediaToolbarButton} from './media-toolbar-button';
import {TableToolbarButton} from './table-toolbar-button';
import {ToolbarGroup} from './toolbar';
import {TurnIntoToolbarButton} from './turn-into-toolbar-button';
import {ResetToolbarButton} from './reset-toolbar-button';
export interface FixedToolbarButtonsProps {
  value: Value;
}
export function FixedToolbarButtons({value}: FixedToolbarButtonsProps) {
  const readOnly = useEditorReadOnly();
  return (
    <div className="flex w-full">
      {!readOnly && (
        <>
          <ToolbarGroup>
            <UndoToolbarButton />
            <RedoToolbarButton />
          </ToolbarGroup>
          <ToolbarGroup>
            <TurnIntoToolbarButton />
            <FontSizeToolbarButton />
          </ToolbarGroup>
          <ToolbarGroup>
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
          </ToolbarGroup>
          <ToolbarGroup>
            <AlignToolbarButton />
            <NumberedListToolbarButton />
            <BulletedListToolbarButton />
            <TodoListToolbarButton />
          </ToolbarGroup>
          <ToolbarGroup>
            <LinkToolbarButton />
            <TableToolbarButton />
            <EmojiToolbarButton />
          </ToolbarGroup>
          <ToolbarGroup>
            <MediaToolbarButton nodeType={KEYS.img} />
          </ToolbarGroup>
        </>
      )}
      <div className="grow" />
      <ResetToolbarButton value={value} />
    </div>
  );
}
