// ResetToolbarButton.tsx
import {ToolbarButton} from './toolbar';
import {editor} from '../editor-value';
import type {Value} from 'platejs';

interface ResetToolbarButtonProps {
  value: Value;
}

export function ResetToolbarButton({value}: ResetToolbarButtonProps) {
  return (
    <ToolbarButton
      className="px-2"
      onClick={() => {
        editor.tf.setValue(value);
      }}
    >
      Reset
    </ToolbarButton>
  );
}
