import { useState, useCallback } from "react";
import { PlaceholderPlugin } from "@platejs/media/react";
import { isUrl, KEYS } from "platejs";
import { useEditorRef } from "platejs/react";
import { useFilePicker } from "use-file-picker";

// Plate 기능은 그대로, 아이콘 대신 텍스트/이모지 사용
const MEDIA_CONFIG: Record<
  string,
  { accept: string[]; icon: string; title: string; tooltip: string }
> = {
  [KEYS.audio]: {
    accept: ["audio/*"],
    icon: "🎵",
    title: "Insert Audio",
    tooltip: "Audio",
  },
  [KEYS.file]: {
    accept: ["*"],
    icon: "📄",
    title: "Insert File",
    tooltip: "File",
  },
  [KEYS.img]: {
    accept: ["image/*"],
    icon: "🖼️",
    title: "Insert Image",
    tooltip: "Image",
  },
  [KEYS.video]: {
    accept: ["video/*"],
    icon: "🎬",
    title: "Insert Video",
    tooltip: "Video",
  },
};

export function MediaToolbarButton({ nodeType }: { nodeType: string }) {
  const currentConfig = MEDIA_CONFIG[nodeType];
  const editor = useEditorRef();

  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { openFilePicker } = useFilePicker({
    accept: currentConfig.accept,
    multiple: true,
    onFilesSelected: ({ plainFiles }) => {
      editor.getTransforms(PlaceholderPlugin).insert.media(plainFiles);
    },
  });

  return (
    <div className="relative inline-flex">
      {/* 메인 버튼 */}
      <button
        type="button"
        onClick={() => openFilePicker()}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-sm hover:bg-gray-200"
      >
        {currentConfig.icon} {currentConfig.tooltip}
      </button>

      {/* 드롭다운 토글 버튼 */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="ml-1 rounded-md bg-gray-100 px-2 py-1 text-sm hover:bg-gray-200"
      >
        ▼
      </button>

      {/* 드롭다운 메뉴 */}
      {open && (
        <div className="absolute left-0 top-full mt-1 w-48 rounded-md border bg-white shadow">
          <button
            type="button"
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-100"
            onClick={() => {
              openFilePicker();
              setOpen(false);
            }}
          >
            {currentConfig.icon} Upload from computer
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-100"
            onClick={() => {
              setDialogOpen(true);
              setOpen(false);
            }}
          >
            🔗 Insert via URL
          </button>
        </div>
      )}

      {/* URL 입력 다이얼로그 */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-sm rounded-md bg-white p-6 shadow">
            <h2 className="mb-2 text-lg font-semibold">
              {currentConfig.title}
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              Enter a valid URL to embed
            </p>

            <MediaUrlDialogContent
              currentConfig={currentConfig}
              nodeType={nodeType}
              setOpen={setDialogOpen}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function MediaUrlDialogContent({
  currentConfig,
  nodeType,
  setOpen,
}: {
  currentConfig: (typeof MEDIA_CONFIG)[string];
  nodeType: string;
  setOpen: (value: boolean) => void;
}) {
  const editor = useEditorRef();
  const [url, setUrl] = useState("");

  const embedMedia = useCallback(() => {
    if (!isUrl(url)) {
      alert("Invalid URL");
      return;
    }

    setOpen(false);
    editor.tf.insertNodes({
      children: [{ text: "" }],
      name: nodeType === KEYS.file ? url.split("/").pop() : undefined,
      type: nodeType,
      url,
    });
  }, [url, editor, nodeType, setOpen]);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        embedMedia();
      }}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="url" className="text-sm font-medium">
          {currentConfig.title}
        </label>
        <input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/media.mp4"
          autoFocus
          className="w-full rounded-md border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
        >
          Accept
        </button>
      </div>
    </form>
  );
}
