import About from '@/feature/home/about';
import Feature from '@/feature/home/feature';
import TopBanner from '@/feature/home/top-banner';

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-black w-full h-fit text-black dark:text-white flex justify-center ">
      <div className="max-w-[960px] w-full 3xl:px-0 2xl:px-[20px] xs:px-[7.5px]">
        <TopBanner />
        <About />
        <Feature />
      </div>
    </div>
  );
}
