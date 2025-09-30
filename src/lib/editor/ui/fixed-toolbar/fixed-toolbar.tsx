import {cn} from '@/lib/utils';

import {Toolbar} from '../toolbar';

export function FixedToolbar(props: React.ComponentProps<typeof Toolbar>) {
  return (
    <Toolbar
      {...props}
      className={cn(
        'responsive-layout z-50 scrollbar-hide w-full justify-between overflow-x-auto bg-background/95 backdrop-blur-sm supports-backdrop-blur:bg-background/60',
        props.className
      )}
    />
  );
}
