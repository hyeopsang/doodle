import {useEditorPlugin} from 'platejs/react';
import {FindReplacePlugin} from '@platejs/find-replace';
import {usePluginOption} from 'platejs/react';
import {FixedToolbar} from './fixed-toolbar/fixed-toolbar';
import {Input} from '@/lib/ui/input';

export function FindToolbar() {
  const {editor, setOption} = useEditorPlugin(FindReplacePlugin);
  const search = usePluginOption(FindReplacePlugin, 'search');
  return (
    <FixedToolbar className="border-none py-3">
      <Input
        data-testid="ToolbarSearchHighlightInput"
        className="mx-2"
        value={search}
        onChange={(e) => {
          setOption('search', e.target.value);
          editor.api.redecorate();
        }}
        placeholder="Search the text..."
        type="search"
      />
    </FixedToolbar>
  );
}
