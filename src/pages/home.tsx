import About from '@/feature/home/about';
import Feature from '@/feature/home/feature';
import {Link} from 'react-router';

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-black w-full h-fit text-black dark:text-white flex justify-center ">
      <div className="max-w-[960px] w-full 3xl:px-0 2xl:px-[20px] xs:px-[7.5px]">
        <section className="h-60 2xl:h-125 w-full flex justify-center items-center text-center flex-col">
          <div className="w-full h-fit flex flex-col justify-center items-center gap-5 2xl:gap-10 text-center">
            <div className="text-[32px] 2xl:text-[40px] font-bold leading-12">
              <p>모든 기록을 한 곳에.</p>
              <p className="text-[#999]">그리기. 쓰기. 정리하기. 어디서든.</p>
            </div>

            <Link
              to={'/create'}
              className="px-3.5 py-2 rounded-full font-semibold bg-black text-center items-center dark:bg-white text-white dark:text-black text-sm cursor-pointer"
            >
              지금 시작하기
            </Link>
          </div>
        </section>
        <About />
        <Feature />
      </div>
    </div>
  );
}
