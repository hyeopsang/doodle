import clsx from "clsx";

interface AboutCardProps {
  reverse?: boolean;
}

export default function AboutCard({ reverse = false }: AboutCardProps) {
  return (
    <div
      className={clsx(
        "flex 2xl:flex-row flex-col items-center w-full",
        reverse && "2xl:flex-row-reverse 3xl:flex-row-reverse"
      )}
    >
      <div className="rounded-[20px] bg-gray-100 w-full 2xl:w-1/2 aspect-square"></div>
      <div className="w-full 2xl:w-1/2 aspect-square"></div>
    </div>
  );
}
