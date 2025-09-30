import type {TListElement} from 'platejs';

import {isOrderedList} from '@platejs/list';
import {type PlateElementProps, type RenderNodeWrapper} from 'platejs/react';
import TodoItem from './todo-item';
import TodoMarker from './todo-maker';

const config: Record<
  string,
  {
    Li: React.FC<PlateElementProps>;
    Marker: React.FC<PlateElementProps>;
  }
> = {
  todo: {
    Li: TodoItem,
    Marker: TodoMarker,
  },
};

export const BlockList: RenderNodeWrapper = (props) => {
  if (!props.element.listStyleType) return;

  return (props) => <List {...props} />;
};

export function List(props: PlateElementProps) {
  const {listStart, listStyleType} = props.element as TListElement;
  const {Li, Marker} = config[listStyleType] ?? {};
  const List = isOrderedList(props.element) ? 'ol' : 'ul';

  return (
    <List
      className="relative m-0 p-0"
      style={{listStyleType}}
      start={listStart}
    >
      {Marker && <Marker {...props} />}
      {Li ? <Li {...props} /> : <li>{props.children}</li>}
    </List>
  );
}
