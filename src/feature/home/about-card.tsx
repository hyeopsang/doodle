import clsx from 'clsx';

interface AboutCardProps {
  title: string;
  description: string;
  reverse?: boolean;
}

export default function AboutCard({
  title,
  description,
  reverse = false,
}: AboutCardProps) {
  return (
    <div
      className={clsx(
        'flex 2xl:flex-row flex-col items-center w-full gap-5 2xl:gap-0',
        reverse && '2xl:flex-row-reverse 3xl:flex-row-reverse'
      )}
    >
      {/* 이미지나 타이틀 영역 */}
      <div className="rounded-[20px] bg-gray-100 w-full 2xl:w-1/2 aspect-square flex justify-center items-center text-xl font-semibold"></div>

      {/* 설명 영역 */}
      <div className="w-full h-fit 2xl:w-1/2 gap-[15px] 2xl:aspect-square flex flex-col justify-center items-center text-left p-4">
        <h3 className="3xl:w-80 w-full text-left text-2xl 2xl:text-[28px] 3xl:text-[32px] text-black dark:text-white font-bold">
          {title}
        </h3>

        <p className="3xl:w-80 w-full text-wrap text-[18px] 2xl:text-[22px] text-[#999] font-medium">
          {description}
        </p>
      </div>
    </div>
  );
}
