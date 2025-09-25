import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

import {
  Caption as CaptionPrimitive,
  CaptionTextarea as CaptionTextareaPrimitive,
  useCaptionButton,
  useCaptionButtonState,
} from "@platejs/caption/react";
import { createPrimitiveComponent } from "@udecode/cn";

// Caption 컨테이너 스타일
const captionVariants = cva("max-w-full", {
  defaultVariants: {
    align: "center",
  },
  variants: {
    align: {
      center: "mx-auto",
      left: "mr-auto",
      right: "ml-auto",
    },
  },
});

export function Caption({
  align,
  className,
  ...props
}: React.ComponentProps<typeof CaptionPrimitive> &
  VariantProps<typeof captionVariants>) {
  return (
    <CaptionPrimitive
      {...props}
      className={cn(captionVariants({ align }), className)}
    />
  );
}

export function CaptionTextarea(
  props: React.ComponentProps<typeof CaptionTextareaPrimitive>
) {
  return (
    <CaptionTextareaPrimitive
      {...props}
      className={cn(
        "mt-2 w-full resize-none border-none bg-inherit p-0 font-[inherit] text-inherit",
        "focus:outline-none focus:[&::placeholder]:opacity-0",
        "text-center print:placeholder:text-transparent",
        props.className
      )}
    />
  );
}

// Button을 순수 HTML button + Tailwind로 대체
export const CaptionButton = createPrimitiveComponent(
  (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-1.5",
        "text-sm font-medium transition-colors",
        "bg-gray-200 hover:bg-gray-300 active:bg-gray-400",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400",
        props.className
      )}
    />
  )
)({
  propsHook: useCaptionButton,
  stateHook: useCaptionButtonState,
});
