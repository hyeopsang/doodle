import {
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
} from '@/lib/ui/dropdown-menu';
import {cn} from '@/lib/utils';

export function ToolbarMenuGroup({
  children,
  className,
  label,
  ...props
}: React.ComponentProps<typeof DropdownMenuRadioGroup> & {label?: string}) {
  return (
    <>
      <DropdownMenuSeparator
        className={cn(
          'hidden',
          'mb-0 shrink-0 peer-has-[[role=menuitem]]/menu-group:block peer-has-[[role=menuitemradio]]/menu-group:block peer-has-[[role=option]]/menu-group:block'
        )}
      />

      <DropdownMenuRadioGroup
        {...props}
        className={cn(
          'hidden',
          'peer/menu-group group/menu-group my-1.5 has-[[role=menuitem]]:block has-[[role=menuitemradio]]:block has-[[role=option]]:block',
          className
        )}
      >
        {label && (
          <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground select-none">
            {label}
          </DropdownMenuLabel>
        )}
        {children}
      </DropdownMenuRadioGroup>
    </>
  );
}
