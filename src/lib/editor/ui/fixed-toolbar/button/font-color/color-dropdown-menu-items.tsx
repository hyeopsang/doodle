import type {DropdownMenuItemProps} from '@radix-ui/react-dropdown-menu';
import {DropdownMenuItem} from '@/lib/ui/dropdown-menu';
import {cn} from '@/lib/utils';
import type {TColor} from '@/lib/editor/types';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '../../../tooltip';
export function ColorDropdownMenuItem({
  className,
  isBrightColor,
  isSelected,
  name,
  updateColor,
  value,
  ...props
}: {
  isBrightColor: boolean;
  isSelected: boolean;
  value: string;
  updateColor: (color: string) => void;
  name?: string;
} & DropdownMenuItemProps) {
  const content = (
    <DropdownMenuItem
      className={cn(
        'my-1 flex size-6 items-center justify-center rounded-full border border-solid border-muted p-0 transition-all hover:scale-125',
        !isBrightColor && 'border-transparent',
        isSelected && 'border-2 border-primary',
        className
      )}
      style={{backgroundColor: value}}
      onSelect={(e) => {
        e.preventDefault();
        updateColor(value);
      }}
      {...props}
    />
  );

  return name ? (
    <Tooltip>
      <TooltipTrigger>{content}</TooltipTrigger>
      <TooltipContent className="mb-1 capitalize">{name}</TooltipContent>
    </Tooltip>
  ) : (
    content
  );
}

export function ColorDropdownMenuItems({
  className,
  color,
  colors,
  updateColor,
  ...props
}: {
  colors: TColor[];
  updateColor: (color: string) => void;
  color?: string;
} & React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'grid grid-cols-[repeat(10,1fr)] place-items-center gap-x-1',
        className
      )}
      {...props}
    >
      <TooltipProvider>
        {colors.map(({isBrightColor, name, value}) => (
          <ColorDropdownMenuItem
            name={name}
            key={name ?? value}
            value={value}
            isBrightColor={isBrightColor}
            isSelected={color === value}
            updateColor={updateColor}
          />
        ))}
        {props.children}
      </TooltipProvider>
    </div>
  );
}
