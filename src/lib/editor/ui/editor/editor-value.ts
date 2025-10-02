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
import {H1Element, H2Element, H3Element, BlockquoteElement} from '../nodes';
import {
  AutoformatKit,
  ListKit,
  CodeBlockKit,
  BasicMarksKit,
  AlignKit,
  TableKit,
  MediaKit,
  LinkKit,
  ToggleKit,
} from '@/lib/editor/plugins';
import {BlockPlaceholderKit} from '../../plugins/block-placeholder-kit';
import {FindReplacePlugin} from '@platejs/find-replace';
import {SearchHighlightLeaf} from '../nodes/search-highlight-node';
import {TrailingBlockKit} from '../../plugins/trailing-block-kit';

export const editor = createPlateEditor({
  plugins: [
    ...TrailingBlockKit,
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
    ...LinkKit,
    ...ToggleKit,
    ...BlockPlaceholderKit,
    FindReplacePlugin.configure({
      options: {search: 'text'},
      render: {node: SearchHighlightLeaf},
    }),
    H1Plugin.withComponent(H1Element),
    H2Plugin.withComponent(H2Element),
    H3Plugin.withComponent(H3Element),
    BlockquotePlugin.withComponent(BlockquoteElement),
  ],
});
