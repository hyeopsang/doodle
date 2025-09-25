import {EditorContainer, Editor} from '@/lib/editor/components/ui/editor';
export default function EditorForm() {
  return (
    <>
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
    </>
  );
}
