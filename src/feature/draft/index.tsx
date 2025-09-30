import {Plate} from 'platejs/react';

import EditorForm from './editor-form';
import {editor} from '@/lib/editor/ui/editor/editor-value';
import EditorHeader from './editor-header';
// import {FindToolbar} from '@/lib/editor/ui/find-toolbar';
//           <FindToolbar />

export default function Draft() {
  return (
    <div className="bg-white dark:bg-black h-full px-[20px] flex justify-center items-center flex-col gap-2 2xl:gap-3">
      <Plate editor={editor}>
        <EditorHeader />
        <EditorForm />
      </Plate>
    </div>
  );
}
