import {useTodoListElement, useTodoListElementState} from '@platejs/list/react';
import {type PlateElementProps, useReadOnly} from 'platejs/react';

import {Checkbox} from '@/lib/ui/checkbox';
import {cn} from '@/lib/utils';

export default function TodoMarker(props: PlateElementProps) {
  const state = useTodoListElementState({element: props.element});
  const {checkboxProps} = useTodoListElement(state);
  const readOnly = useReadOnly();

  return (
    <div contentEditable={false}>
      <Checkbox
        className={cn(
          'absolute top-1 -left-6',
          readOnly && 'pointer-events-none'
        )}
        {...checkboxProps}
      />
    </div>
  );
}
