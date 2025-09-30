import type {VariantProps} from 'class-variance-authority';

import {Resizable as ResizablePrimitive} from '@platejs/resizable';
import {cva} from 'class-variance-authority';

import {cn} from '@/lib/utils';

const resizableVariants = cva('', {
  variants: {
    align: {
      center: 'mx-auto',
      left: 'mr-auto',
      right: 'ml-auto',
    },
  },
});

export function Resizable({
  align,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive> &
  VariantProps<typeof resizableVariants>) {
  return (
    <ResizablePrimitive
      {...props}
      className={cn(resizableVariants({align}), className)}
    />
  );
}
