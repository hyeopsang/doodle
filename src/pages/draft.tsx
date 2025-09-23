import type {Value} from 'platejs';

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

import {BlockquoteElement} from '@/components/ui/blockquote-node';
import {Editor, EditorContainer} from '@/components/ui/editor';
import {FixedToolbar} from '@/components/ui/fixed-toolbar';
import {H1Element, H2Element, H3Element} from '@/components/ui/heading-node';
import {MarkToolbarButton} from '@/components/ui/mark-toolbar-button';
import {ToolbarButton} from '@/components/ui/toolbar';
import {FontSizeToolbarButton} from '@/components/ui/font-size-toolbar-button';
import DarkModePicker from '@/components/dark-mode-picker';

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
      H1Plugin.withComponent(H1Element),
      H2Plugin.withComponent(H2Element),
      H3Plugin.withComponent(H3Element),
      BlockquotePlugin.withComponent(BlockquoteElement),
    ],
  });

  return (
    <div className="bg-[#fcfcfc] w-full h-dvh text-black flex-col items-center dark:text-white flex justify-center ">
      <div className="max-w-[960px] border-x border-[#eee] bg-white w-full h-full px-[20px] flex flex-col gap-10">
        <div className="w-full flex items-center justify-end">
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
            className="text-[36px] font-bold outline-0 pt-10"
          />
          <hr />
          <EditorContainer>
            <Editor
              className="w-full text-[20px]"
              variant={'none'}
              placeholder="글을 작성해 볼까요?"
            />
          </EditorContainer>
        </Plate>
      </div>
    </div>
  );
}
