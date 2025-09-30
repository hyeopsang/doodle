import {useState, useEffect, useMemo} from 'react';
import {debounce} from 'lodash';
import type {TColor} from '@/lib/editor/types';
import {cn} from '@/lib/utils';

import {ColorDropdownMenuItems} from './color-dropdown-menu-items';
import {ColorInput} from './color-input';
import {DropdownMenuItem} from '@/lib/ui/dropdown-menu';
import {PlusIcon} from 'lucide-react';

export function ColorCustom({
  className,
  color,
  colors,
  customColors,
  updateColor,
  updateCustomColor,
  ...props
}: {
  colors: TColor[];
  customColors: TColor[];
  updateColor: (color: string) => void;
  updateCustomColor: (color: string) => void;
  color?: string;
} & React.ComponentPropsWithoutRef<'div'>) {
  const [customColor, setCustomColor] = useState<string>();
  const [value, setValue] = useState<string>(color || '#000000');

  useEffect(() => {
    if (
      !color ||
      customColors.some((c) => c.value === color) ||
      colors.some((c) => c.value === color)
    ) {
      return;
    }

    setCustomColor(color);
  }, [color, colors, customColors]);

  const computedColors = useMemo(
    () =>
      customColor
        ? [
            ...customColors,
            {
              isBrightColor: false,
              name: '',
              value: customColor,
            },
          ]
        : customColors,
    [customColor, customColors]
  );

  const updateCustomColorDebounced = useMemo(
    () => debounce(updateCustomColor, 100),
    [updateCustomColor]
  );

  return (
    <div className={cn('relative flex flex-col gap-4', className)} {...props}>
      <ColorDropdownMenuItems
        color={color}
        colors={computedColors}
        updateColor={updateColor}
      >
        <ColorInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            updateCustomColorDebounced(e.target.value);
          }}
        >
          <DropdownMenuItem
            className="absolute top-1 right-2 bottom-2 flex size-8 items-center justify-center rounded-full"
            onSelect={(e) => {
              e.preventDefault();
            }}
          >
            <span className="sr-only">Custom</span>
            <PlusIcon />
          </DropdownMenuItem>
        </ColorInput>
      </ColorDropdownMenuItems>
    </div>
  );
}
