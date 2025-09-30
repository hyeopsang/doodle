import {useState, useEffect} from 'react';
import {Tooltip} from './tooltip';
import {TooltipTrigger} from './tooltip-trigger';
import {TooltipContent} from './tooltip-content';

type TooltipProps<T extends React.ElementType> = {
  tooltip?: React.ReactNode;
  tooltipContentProps?: Omit<
    React.ComponentPropsWithoutRef<typeof TooltipContent>,
    'children'
  >;
  tooltipProps?: Omit<
    React.ComponentPropsWithoutRef<typeof Tooltip>,
    'children'
  >;
  tooltipTriggerProps?: React.ComponentPropsWithoutRef<typeof TooltipTrigger>;
} & React.ComponentProps<T>;

export function withTooltip<T extends React.ElementType>(Component: T) {
  return function ExtendComponent({
    tooltip,
    tooltipContentProps,
    tooltipProps,
    tooltipTriggerProps,
    ...props
  }: TooltipProps<T>) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const component = <Component {...(props as React.ComponentProps<T>)} />;

    if (tooltip && mounted) {
      return (
        <Tooltip {...tooltipProps}>
          <TooltipTrigger asChild {...tooltipTriggerProps}>
            {component}
          </TooltipTrigger>

          <TooltipContent {...tooltipContentProps}>{tooltip}</TooltipContent>
        </Tooltip>
      );
    }

    return component;
  };
}
