import {Children, useRef, cloneElement} from 'react';
import {useComposedRef} from 'platejs/react';
import {cn} from '@/lib/utils';

export function ColorInput({
  children,
  className,
  value = '#000000',
  ...props
}: React.ComponentProps<'input'>) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex flex-col items-center">
      {Children.map(children, (child) => {
        if (!child) return child;

        return cloneElement(
          child as React.ReactElement<{
            onClick: () => void;
          }>,
          {
            onClick: () => inputRef.current?.click(),
          }
        );
      })}
      <input
        {...props}
        ref={useComposedRef(props.ref, inputRef)}
        className={cn('size-0 overflow-hidden border-0 p-0', className)}
        value={value}
        type="color"
      />
    </div>
  );
}
