import {Separator} from '@/lib/ui/separator';
import {cn} from '@/lib/utils';

export function ToolbarGroup({
  children,
  className,
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'group/toolbar-group',
        'relative hidden has-[button]:flex',
        className
      )}
    >
      <div className="flex items-center">{children}</div>

      <div className="mx-1.5 py-0.5 group-last/toolbar-group:hidden!">
        <Separator orientation="vertical" />
      </div>
    </div>
  );
}
