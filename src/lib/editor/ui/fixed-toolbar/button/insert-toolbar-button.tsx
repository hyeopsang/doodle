import {useState} from 'react';
import {KEYS} from 'platejs';
import {type PlateEditor, useEditorRef} from 'platejs/react';
import {insertBlock, insertInlineElement} from '../../transforms';
import {ToolbarButton, ToolbarMenuGroup} from '../../toolbar';

type Group = {
  group: string;
  items: Item[];
};

interface Item {
  value: string;
  label: string;
  inline?: boolean;
  onSelect: (editor: PlateEditor, value: string) => void;
}

const groups: Group[] = [
  {
    group: 'Basic blocks',
    items: [
      {label: 'Paragraph', value: KEYS.p},
      {label: 'Heading 1', value: 'h1'},
      {label: 'Heading 2', value: 'h2'},
      {label: 'Heading 3', value: 'h3'},
      {label: 'Table', value: KEYS.table},
      {label: 'Code', value: KEYS.codeBlock},
      {label: 'Quote', value: KEYS.blockquote},
      {label: 'Divider', value: KEYS.hr},
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => insertBlock(editor, value),
    })),
  },
  {
    group: 'Lists',
    items: [
      {label: 'Bulleted list', value: KEYS.ul},
      {label: 'Numbered list', value: KEYS.ol},
      {label: 'To-do list', value: KEYS.listTodo},
      {label: 'Toggle list', value: KEYS.toggle},
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => insertBlock(editor, value),
    })),
  },
  {
    group: 'Media',
    items: [
      {label: 'Image', value: KEYS.img},
      {label: 'Embed', value: KEYS.mediaEmbed},
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => insertBlock(editor, value),
    })),
  },
  {
    group: 'Advanced blocks',
    items: [
      {label: 'Table of contents', value: KEYS.toc},
      {label: '3 columns', value: 'action_three_columns'},
      {label: 'Equation', value: KEYS.equation},
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => insertBlock(editor, value),
    })),
  },
  {
    group: 'Inline',
    items: [
      {label: 'Link', value: KEYS.link, inline: true},
      {label: 'Date', value: KEYS.date, inline: true},
      {label: 'Inline Equation', value: KEYS.inlineEquation, inline: true},
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => insertInlineElement(editor, value),
    })),
  },
];

export function InsertToolbarButton() {
  const editor = useEditorRef();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <ToolbarButton
        onClick={() => setOpen(!open)}
        pressed={open}
        tooltip="Insert"
      >
        Insert
      </ToolbarButton>

      {open && (
        <div className="absolute z-10 mt-1 w-56 max-h-[500px] overflow-y-auto border bg-white shadow-lg">
          {groups.map(({group, items}) => (
            <ToolbarMenuGroup key={group} label={group}>
              {items.map(({label, value, onSelect}) => (
                <button
                  key={value}
                  className="w-full text-left px-3 py-1 hover:bg-gray-100"
                  onClick={() => {
                    onSelect(editor, value);
                    editor.tf.focus();
                    setOpen(false);
                  }}
                >
                  {label}
                </button>
              ))}
            </ToolbarMenuGroup>
          ))}
        </div>
      )}
    </div>
  );
}
