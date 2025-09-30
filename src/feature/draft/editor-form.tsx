import {EditorContainer, Editor} from '@/lib/editor/ui/editor';

export default function EditorForm() {
  return (
    <EditorContainer>
      <input
        placeholder="제목"
        type="text"
        className="outline-none text-4xl font-bold w-full placeholder:text-muted-foreground/80"
        minLength={1}
      />
      <Editor
        className="w-full h-screen  text-[16px] 2xl:text-[20px]"
        variant={'none'}
        placeholder="텍스트 입력..."
      />
    </EditorContainer>
  );
}
