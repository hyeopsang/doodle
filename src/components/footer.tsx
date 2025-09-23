import Doodle from "@/assets/doodle.svg?react";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center items-center bg-white dark:bg-black ">
      <div className="max-w-[960px] w-full 3xl:px-0 2xl:px-[20px] xs:px-[7.5px] h-full border-t border-[#eee] py-[50px] 2xl:py-25 flex flex-col 2xl:flex-row justify-between gap-10 2xl:gap-0">
        <div className="text-black dark:text-white">
          <Doodle width={71} height={25} />
        </div>
        <div className="flex flex-col 2xl:flex-row gap-10 text-[#999]">
          <div>
            <ul>
              <li className="text-black dark:text-white">App</li>
              <li>Home</li>
              <li>Feature</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="text-black dark:text-white">Support</li>
              <li>FAQ</li>
              <li>Help Center</li>
              <li>Community</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
