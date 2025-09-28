import { PlaceholderPlugin } from "@platejs/media/react";
import { KEYS } from "platejs";
import { useEditorRef } from "platejs/react";
import { useFilePicker } from "use-file-picker";

// Plate 기능은 그대로, 아이콘 대신 텍스트/이모지 사용
const MEDIA_CONFIG: Record<
  string,
  { accept: string[]; icon: string; title: string; tooltip: string }
> = {
  [KEYS.img]: {
    accept: ["image/*"],
    icon: "🖼️",
    title: "사진 삽입",
    tooltip: "사진",
  },
};

export function MediaToolbarButton({ nodeType }: { nodeType: string }) {
  const currentConfig = MEDIA_CONFIG[nodeType];
  const editor = useEditorRef();

  // const [open, setOpen] = useState(false);
  // const [dialogOpen, setDialogOpen] = useState(false);

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
        // onKeyDown={(e) => {
        //   if (e.key === "ArrowDown") {
        //     e.preventDefault();
        //     setOpen(true);
        //   }
        // }}
        className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-sm hover:bg-gray-200"
      >
        {currentConfig.icon} {currentConfig.tooltip}
      </button>
    </div>
  );
}

// function MediaUrlDialogContent({
//   currentConfig,
//   nodeType,
//   setOpen,
// }: {
//   currentConfig: (typeof MEDIA_CONFIG)[string];
//   nodeType: string;
//   setOpen: (value: boolean) => void;
// }) {
//   const editor = useEditorRef();
//   const [url, setUrl] = useState("");

//   const embedMedia = useCallback(() => {
//     if (!isUrl(url)) {
//       alert("Invalid URL");
//       return;
//     }

//     setOpen(false);
//     editor.tf.insertNodes({
//       children: [{ text: "" }],
//       name: nodeType === KEYS.file ? url.split("/").pop() : undefined,
//       type: nodeType,
//       url,
//     });
//   }, [url, editor, nodeType, setOpen]);

//   return (
//     <form
//       className="flex flex-col gap-4"
//       onSubmit={(e) => {
//         e.preventDefault();
//         embedMedia();
//       }}
//     >
//       <div className="flex flex-col gap-1">
//         <label htmlFor="url" className="text-sm font-medium">
//           {currentConfig.title}
//         </label>
//         <input
//           id="url"
//           type="url"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           placeholder="https://example.com/media.mp4"
//           autoFocus
//           className="w-full rounded-md border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="flex justify-end gap-2">
//         <button
//           type="button"
//           onClick={() => setOpen(false)}
//           className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
//         >
//           Accept
//         </button>
//       </div>
//     </form>
//   );
// }
