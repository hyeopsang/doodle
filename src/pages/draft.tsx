import type {Value} from 'platejs';
import Doodle from '@/assets/doodle-a.svg?react';

import {
  BlockquotePlugin,
  BoldPlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  ItalicPlugin,
  UnderlinePlugin,
} from '@platejs/basic-nodes/react';
import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
  FontFamilyPlugin,
  FontSizePlugin,
} from '@platejs/basic-styles/react';
import {Plate, usePlateEditor} from 'platejs/react';

import {BlockquoteElement} from '@/lib/editor/components/ui/blockquote-node';
import {Editor, EditorContainer} from '@/lib/editor/components/ui/editor';
import {FixedToolbar} from '@/lib/editor/components/ui/fixed-toolbar';
import {
  H1Element,
  H2Element,
  H3Element,
} from '@/lib/editor/components/ui/heading-node';
import {MarkToolbarButton} from '@/lib/editor/components/ui/mark-toolbar-button';
import {ToolbarButton} from '@/lib/editor/components/ui/toolbar';
import {FontSizeToolbarButton} from '@/lib/editor/components/ui/font-size-toolbar-button';
import DarkModePicker from '@/components/dark-mode-picker';
import {AutoformatKit} from '@/lib/editor/components/autoformat-kit';
import {ListKit} from '@/lib/editor/components/list-kit';
import {Link} from 'react-router';
const initialValue: Value = [];

export default function Draft() {
  const editor = usePlateEditor({
    plugins: [
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      FontBackgroundColorPlugin,
      FontColorPlugin,

      FontFamilyPlugin,
      FontSizePlugin,
      ...AutoformatKit,
      ...ListKit,
      H1Plugin.withComponent(H1Element),
      H2Plugin.withComponent(H2Element),
      H3Plugin.withComponent(H3Element),
      BlockquotePlugin.withComponent(BlockquoteElement),
    ],
  });

  return (
    <div className="bg-[#fcfcfc] dark:bg-black w-full h-dvh text-black flex-col items-center dark:text-white flex justify-center ">
      <div className="max-w-[960px] border-x border-[#eee] dark:border-black bg-white dark:bg-black w-full h-full px-[20px] flex flex-col gap-5 2xl:gap-10">
        <div className="w-full flex items-center justify-between">
          <Link to={'/'}>
            <Doodle width={25} height={25} />
          </Link>
          <DarkModePicker />
        </div>
        <Plate editor={editor}>
          <FixedToolbar className="h-30 2xl:h-15 flex flex-wrap">
            <ToolbarButton onClick={() => editor.tf.h1.toggle()}>
              H1
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.tf.h2.toggle()}>
              H2
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.tf.h3.toggle()}>
              H3
            </ToolbarButton>

            <ToolbarButton onClick={() => editor.tf.blockquote.toggle()}>
              Quote
            </ToolbarButton>

            <MarkToolbarButton nodeType="bold" tooltip="Bold (⌘+B)">
              B
            </MarkToolbarButton>
            <MarkToolbarButton nodeType="italic" tooltip="Italic (⌘+I)">
              I
            </MarkToolbarButton>
            <MarkToolbarButton nodeType="underline" tooltip="Underline (⌘+U)">
              U
            </MarkToolbarButton>

            <FontSizeToolbarButton />
            <div className="flex-1" />
            <ToolbarButton>
              <p>내 스케치</p>
            </ToolbarButton>
            <ToolbarButton
              className="px-2"
              onClick={() => {
                editor.tf.setValue(initialValue);
              }}
            >
              Reset
            </ToolbarButton>
          </FixedToolbar>
          <input
            type="text"
            placeholder="제목"
            className="2xl:text-[36px] text-[32px] font-bold outline-0 pt-5 2xl:pt-10"
          />
          <hr />
          <EditorContainer>
            <Editor
              className="w-full text-[16px] 2xl:text-[20px]"
              variant={'none'}
              placeholder="글을 작성해 볼까요?"
            />
          </EditorContainer>
        </Plate>
      </div>
    </div>
  );
}
