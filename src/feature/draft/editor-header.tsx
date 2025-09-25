import {Link} from 'react-router';

import DarkModePicker from '@/components/dark-mode-picker';

import Doodle from '@/assets/doodle-a.svg?react';

export default function EditorHeader() {
  return (
    <div className="w-full flex items-center justify-between">
      <Link to={'/'}>
        <Doodle width={25} height={25} />
      </Link>
      <DarkModePicker />
    </div>
  );
}
