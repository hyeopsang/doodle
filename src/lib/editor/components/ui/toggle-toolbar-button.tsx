import {
  useToggleToolbarButton,
  useToggleToolbarButtonState,
} from "@platejs/toggle/react";

export function ToggleToolbarButton() {
  const state = useToggleToolbarButtonState();
  const { props: buttonProps } = useToggleToolbarButton(state);

  return (
    <button
      {...buttonProps}
      type="button"
      title="Toggle"
      className={`flex items-center gap-1 rounded-md px-3 py-1 text-sm border hover:bg-gray-200`}
    >
      🔀 {/* 원래 ListCollapseIcon 대신 이모지 사용 */}
      Toggle
    </button>
  );
}
