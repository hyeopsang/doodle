import {PlateContainer} from 'platejs/react';

import {cn} from '@/lib/utils';

export function EditorContainer({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <PlateContainer
      className={cn(
        'ignore-click-outside/toolbar h-full responsive-layout pt-40 flex flex-col justify-center items-center gap-2',
        className
      )}
      {...props}
    />
  );
}
