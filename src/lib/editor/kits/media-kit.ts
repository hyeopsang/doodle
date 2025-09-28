import { CaptionPlugin } from "@platejs/caption/react";
import {
  ImagePlugin,
  MediaEmbedPlugin,
  PlaceholderPlugin,
} from "@platejs/media/react";
import { KEYS } from "platejs";

import { MediaEmbedElement } from "../nodes/media-embed-node";
import { ImageElement } from "../nodes/media-image-node";
import { PlaceholderElement } from "../nodes/media-placeholder-node";
import { MediaPreviewDialog } from "../components/ui/media-preview-dialog";
import { MediaUploadToast } from "../components/ui/media-upload-toast";

export const MediaKit = [
  ImagePlugin.configure({
    options: { disableUploadInsert: true },
    render: { afterEditable: MediaPreviewDialog, node: ImageElement },
  }),
  MediaEmbedPlugin.withComponent(MediaEmbedElement),
  PlaceholderPlugin.configure({
    options: { disableEmptyPlaceholder: true },
    render: { afterEditable: MediaUploadToast, node: PlaceholderElement },
  }),
  CaptionPlugin.configure({
    options: {
      query: {
        allow: [KEYS.img, KEYS.video, KEYS.audio, KEYS.file, KEYS.mediaEmbed],
      },
    },
  }),
];
