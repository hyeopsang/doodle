import {CaptionPlugin} from '@platejs/caption/react';
import {
  ImagePlugin,
  MediaEmbedPlugin,
  PlaceholderPlugin,
} from '@platejs/media/react';
import {KEYS} from 'platejs';

import {MediaEmbedElement, ImageElement, PlaceholderElement} from '../ui/nodes';
import {MediaPreviewDialog} from '../ui/media-preview-dialog';
import {MediaUploadToast} from '../ui/media-upload-toast';
export const MediaKit = [
  ImagePlugin.configure({
    options: {disableUploadInsert: true},
    render: {afterEditable: MediaPreviewDialog, node: ImageElement},
  }),
  MediaEmbedPlugin.withComponent(MediaEmbedElement),
  PlaceholderPlugin.configure({
    options: {disableEmptyPlaceholder: true},
    render: {afterEditable: MediaUploadToast, node: PlaceholderElement},
  }),
  CaptionPlugin.configure({
    options: {
      query: {
        allow: [KEYS.img, KEYS.video, KEYS.audio, KEYS.file, KEYS.mediaEmbed],
      },
    },
  }),
];
