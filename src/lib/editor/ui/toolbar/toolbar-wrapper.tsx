export default function ToolBarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full justify-start items-center flex flex-wrap gap-2">
      {children}
    </div>
  );
}
