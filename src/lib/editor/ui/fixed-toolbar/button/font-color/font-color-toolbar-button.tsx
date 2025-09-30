import {useState, useEffect, useCallback} from 'react';
import type {DropdownMenuProps} from '@radix-ui/react-dropdown-menu';
import {ColorPicker} from './color-picker';
import {useEditorRef, useEditorSelector} from 'platejs/react';
import {ToolbarButton} from '../../../toolbar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/lib/ui/dropdown-menu';
import {DEFAULT_COLORS, DEFAULT_CUSTOM_COLORS} from './defaultColor';
export function FontColorToolbarButton({
  children,
  nodeType,
  tooltip,
}: {
  nodeType: string;
  tooltip?: string;
} & DropdownMenuProps) {
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

  const onToggle = useCallback(
    (value = !open) => {
      setOpen(value);
    },
    [open, setOpen]
  );

  const updateColor = useCallback(
    (value: string) => {
      if (editor.selection) {
        setSelectedColor(value);

        editor.tf.select(editor.selection);
        editor.tf.focus();

        editor.tf.addMarks({[nodeType]: value});
      }
    },
    [editor, nodeType]
  );

  const updateColorAndClose = useCallback(
    (value: string) => {
      updateColor(value);
      onToggle();
    },
    [onToggle, updateColor]
  );

  const clearColor = useCallback(() => {
    if (editor.selection) {
      editor.tf.select(editor.selection);
      editor.tf.focus();

      if (selectedColor) {
        editor.tf.removeMarks(nodeType);
      }

      onToggle();
    }
  }, [editor, selectedColor, onToggle, nodeType]);

  useEffect(() => {
    if (selectionDefined) {
      setSelectedColor(color);
    }
  }, [color, selectionDefined]);

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
      }}
      modal={false}
    >
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={open} tooltip={tooltip}>
          {children}
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <ColorPicker
          color={selectedColor || color}
          clearColor={clearColor}
          colors={DEFAULT_COLORS}
          customColors={DEFAULT_CUSTOM_COLORS}
          updateColor={updateColorAndClose}
          updateCustomColor={updateColor}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
