import {Link} from 'react-router';
import {FixedToolbar} from '@/lib/editor/ui/fixed-toolbar/fixed-toolbar';
import {FixedToolbarButtons} from '@/lib/editor/ui/fixed-toolbar/fixed-toolbar-buttons';
import DarkModePicker from '@/components/dark-mode-picker';

import Doodle from '@/assets/doodle-a.svg?react';

export default function EditorHeader() {
  return (
    <div className="fixed top-0 z-50 bg-white dark:bg-black w-full flex flex-col items-center justify-between py-2 border-b">
      <div className="w-full responsive-layout flex items-center justify-between">
        <Link to={'/'}>
          <Doodle width={25} height={25} />
        </Link>
        <DarkModePicker />
      </div>
      <FixedToolbar className="responsive-layout h-fit">
        <FixedToolbarButtons />
      </FixedToolbar>
    </div>
  );
}
