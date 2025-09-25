import {Plate} from 'platejs/react';
import {FixedToolbar} from '@/lib/editor/components/ui/fixed-toolbar';
import {FixedToolbarButtons} from '@/lib/editor/components/ui/fixed-toolbar-buttons';
import EditorForm from './editor-form';
import {editor} from '@/lib/editor/components/editor-value';
import type {Value} from 'platejs';

const initialValue: Value = [];

export default function Draft() {
  return (
    <div className="responsive-layout mx-auto border-x border-[#eee] dark:border-black bg-white dark:bg-black h-full px-[20px] flex flex-col gap-5 2xl:gap-10">
      <Plate editor={editor}>
        <FixedToolbar className="h-100">
          <FixedToolbarButtons value={initialValue} />
        </FixedToolbar>
        <EditorForm />
      </Plate>
    </div>
  );
}
