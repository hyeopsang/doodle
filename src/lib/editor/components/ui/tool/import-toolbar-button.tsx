import { useState } from "react";
import { MarkdownPlugin } from "@platejs/markdown";
import { getEditorDOMFromHtmlString } from "platejs";
import { useEditorRef } from "platejs/react";
import { useFilePicker } from "use-file-picker";
import { ToolbarButton } from "./toolbar";

type ImportType = "html" | "markdown";

export function ImportToolbarButton() {
  const editor = useEditorRef();
  const [open, setOpen] = useState(false);

  const getFileNodes = (text: string, type: ImportType) => {
    if (type === "html") {
      const editorNode = getEditorDOMFromHtmlString(text);
      const nodes = editor.api.html.deserialize({ element: editorNode });
      return nodes;
    }
    if (type === "markdown") {
      return editor.getApi(MarkdownPlugin).markdown.deserialize(text);
    }
    return [];
  };

  const { openFilePicker: openMdFilePicker } = useFilePicker({
    accept: [".md", ".mdx"],
    multiple: false,
    onFilesSelected: async ({ plainFiles }) => {
      const text = await plainFiles[0].text();
      const nodes = getFileNodes(text, "markdown");
      editor.tf.insertNodes(nodes);
    },
  });

  const { openFilePicker: openHtmlFilePicker } = useFilePicker({
    accept: ["text/html"],
    multiple: false,
    onFilesSelected: async ({ plainFiles }) => {
      const text = await plainFiles[0].text();
      const nodes = getFileNodes(text, "html");
      editor.tf.insertNodes(nodes);
    },
  });

  return (
    <div className="relative inline-block">
      <ToolbarButton
        onClick={() => setOpen(!open)}
        pressed={open}
        tooltip="Import"
      >
        Import
      </ToolbarButton>

      {open && (
        <div className="absolute z-10 mt-1 w-44 border bg-white shadow-lg">
          <button
            className="w-full text-left px-3 py-1 hover:bg-gray-100"
            onClick={() => {
              openHtmlFilePicker();
              setOpen(false);
            }}
          >
            Import from HTML
          </button>
          <button
            className="w-full text-left px-3 py-1 hover:bg-gray-100"
            onClick={() => {
              openMdFilePicker();
              setOpen(false);
            }}
          >
            Import from Markdown
          </button>
        </div>
      )}
    </div>
  );
}
