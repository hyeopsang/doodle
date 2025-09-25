import {createPlateEditor} from 'platejs/react';
import {
  BlockquotePlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
} from '@platejs/basic-nodes/react';
import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
  FontFamilyPlugin,
  FontSizePlugin,
} from '@platejs/basic-styles/react';
import {BlockquoteElement} from '@/lib/editor/components/ui/blockquote-node';
import {
  H1Element,
  H2Element,
  H3Element,
} from '@/lib/editor/components/ui/heading-node';
import {AutoformatKit} from '@/lib/editor/components/autoformat-kit';
import {ListKit} from '@/lib/editor/components/list-kit';
import {CodeBlockKit} from './ui/code-block-kit';
import {BasicMarksKit} from './plugins/basic-marks-kit';
import {AlignKit} from './ui/align-kit';
import {TableKit} from './ui/table-kit';
import {MediaKit} from './media-kit';

export const editor = createPlateEditor({
  plugins: [
    FontBackgroundColorPlugin,
    FontColorPlugin,
    ...CodeBlockKit,
    FontFamilyPlugin,
    FontSizePlugin,
    ...AutoformatKit,
    ...ListKit,
    ...BasicMarksKit,
    ...AlignKit,
    ...TableKit,
    ...MediaKit,
    H1Plugin.withComponent(H1Element),
    H2Plugin.withComponent(H2Element),
    H3Plugin.withComponent(H3Element),
    BlockquotePlugin.withComponent(BlockquoteElement),
  ],
});
