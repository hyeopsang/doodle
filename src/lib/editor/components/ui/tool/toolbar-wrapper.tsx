export default function ToolBarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full flex flex-wrap gap-2">{children}</div>;
}
