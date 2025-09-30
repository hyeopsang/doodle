import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import {cn} from '@/lib/utils';

export function Toolbar({
  className,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.Root>) {
  return (
    <ToolbarPrimitive.Root
      className={cn('relative flex items-center select-none', className)}
      {...props}
    />
  );
}

export function ToolbarToggleGroup({
  className,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.ToolbarToggleGroup>) {
  return (
    <ToolbarPrimitive.ToolbarToggleGroup
      className={cn('flex items-center', className)}
      {...props}
    />
  );
}

export function ToolbarLink({
  className,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.Link>) {
  return (
    <ToolbarPrimitive.Link
      className={cn('font-medium underline underline-offset-4', className)}
      {...props}
    />
  );
}

export function ToolbarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.Separator>) {
  return (
    <ToolbarPrimitive.Separator
      className={cn('mx-2 my-1 w-px shrink-0 bg-border', className)}
      {...props}
    />
  );
}
