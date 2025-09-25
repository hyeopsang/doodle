import type {VariantProps} from 'class-variance-authority';
import {editorVariants} from '../editor-variants';
import {editorContainerVariants} from '../editor-container-variants';
import type {PlateContentProps, PlateViewProps} from 'platejs/react';
import {forwardRef} from 'react';
import {PlateContainer, PlateContent, PlateView} from 'platejs/react';

import {cn} from '@/lib/utils';

export function EditorContainer({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof editorContainerVariants>) {
  return (
    <PlateContainer
      className={cn(
        'ignore-click-outside/toolbar',
        editorContainerVariants({variant}),
        className
      )}
      {...props}
    />
  );
}

export type EditorProps = PlateContentProps &
  VariantProps<typeof editorVariants>;

export const Editor = forwardRef<HTMLDivElement, EditorProps>(
  ({className, disabled, focused, variant, ...props}, ref) => {
    return (
      <PlateContent
        ref={ref}
        className={cn(
          editorVariants({
            disabled,
            focused,
            variant,
          }),
          className
        )}
        disabled={disabled}
        disableDefaultStyles
        {...props}
      />
    );
  }
);

Editor.displayName = 'Editor';

export function EditorView({
  className,
  variant,
  ...props
}: PlateViewProps & VariantProps<typeof editorVariants>) {
  return (
    <PlateView
      {...props}
      className={cn(editorVariants({variant}), className)}
    />
  );
}

EditorView.displayName = 'EditorView';
