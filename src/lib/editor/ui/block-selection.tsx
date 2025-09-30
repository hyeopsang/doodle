import {DndPlugin} from '@platejs/dnd';
import {useBlockSelected} from '@platejs/selection/react';
import {type PlateElementProps, usePluginOption} from 'platejs/react';
import {blockSelectionVariants} from './blockSelectionVariants';

export function BlockSelection(props: PlateElementProps) {
  const isBlockSelected = useBlockSelected();
  const isDragging = usePluginOption(DndPlugin, 'isDragging');

  if (
    !isBlockSelected ||
    props.plugin.key === 'tr' ||
    props.plugin.key === 'table'
  )
    return null;

  return (
    <div
      className={blockSelectionVariants({
        active: isBlockSelected && !isDragging,
      })}
      data-slot="block-selection"
    />
  );
}
