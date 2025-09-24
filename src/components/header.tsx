import Doodle from '@/assets/doodle-b.svg?react';
import DarkModePicker from './dark-mode-picker';
import {Link} from 'react-router';
export default function Header() {
  return (
    <header className="w-full fixed h-16 flex justify-center items-center bg-white dark:bg-black z-50">
      <div className="max-w-[960px] w-full 3xl:px-0 2xl:px-[20px] xs:px-[7.5px] flex justify-between items-center">
        <Link to={'/'} className="text-black dark:text-white">
          <Doodle width={124} height={43} />
        </Link>
        <DarkModePicker />
      </div>
    </header>
  );
}
