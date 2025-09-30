import {type PlateElementProps} from 'platejs/react';
import {cn} from '@/lib/utils';

export default function TodoItem(props: PlateElementProps) {
  return (
    <li
      className={cn(
        'list-none',
        (props.element.checked as boolean) &&
          'text-muted-foreground line-through'
      )}
    >
      {props.children}
    </li>
  );
}
