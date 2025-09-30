import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import {cn} from '@/lib/utils';
import {toolbarButtonVariants} from './variants';
import type {VariantProps} from 'class-variance-authority';

export function ToolbarToggleItem({
  className,
  size = 'sm',
  variant,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.ToggleItem> &
  VariantProps<typeof toolbarButtonVariants>) {
  return (
    <ToolbarPrimitive.ToggleItem
      className={cn(toolbarButtonVariants({size, variant}), className)}
      {...props}
    />
  );
}
