import Doodle from "@/assets/doodle.svg?react";
import DarkModePicker from "./dark-mode-picker";
export default function Header() {
  return (
    <header className="w-full fixed h-16 flex justify-center items-center bg-white dark:bg-black">
      <div className="max-w-[960px] w-full 3xl:px-0 2xl:px-[20px] xs:px-[7.5px] flex justify-between items-center">
        <div className="text-black dark:text-white">
          <Doodle width={71} height={25} />
        </div>
        <DarkModePicker />
      </div>
    </header>
  );
}
