import {Link} from 'react-router';

interface ClickableCardProps {
  path: string;
  title: string;
  description: string;
}

export default function ClickableCard({
  path,
  title,
  description,
}: ClickableCardProps) {
  return (
    <Link
      to={path}
      className="w-full 2xl:w-1/2 aspect-square bg-white shadow-xl 
                     flex flex-col justify-center items-center p-4 rounded-[20px] 
                     card-hover"
    >
      <h2 className="text-2xl 2xl:text-[28px] 3xl:text-[32px] font-bold">
        {title}
      </h2>
      <p className="text-center mt-2 text-[18px] 2xl:text-[22px] text-[#999] font-medium">
        {description}
      </p>
    </Link>
  );
}
