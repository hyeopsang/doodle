import { createPlateEditor } from "platejs/react";
import {
  BlockquotePlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
} from "@platejs/basic-nodes/react";
import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
  FontFamilyPlugin,
  FontSizePlugin,
} from "@platejs/basic-styles/react";
import { BlockquoteElement } from "../nodes/blockquote-node";
import { H1Element, H2Element, H3Element } from "../nodes/heading-node";
import { AutoformatKit } from "../kits/autoformat-kit";
import { ListKit } from "../kits/list-kit";
import { CodeBlockKit } from "../kits/code-block-kit";
import { BasicMarksKit } from "../kits/basic-marks-kit";
import { AlignKit } from "../kits/align-kit";
import { TableKit } from "../kits/table-kit";
import { MediaKit } from "../kits/media-kit";
import { LinkKit } from "../kits/link-kit";
import { ToggleKit } from "../kits/toggle-kit";

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
    ...LinkKit,
    ...ToggleKit,
    H1Plugin.withComponent(H1Element),
    H2Plugin.withComponent(H2Element),
    H3Plugin.withComponent(H3Element),
    BlockquotePlugin.withComponent(BlockquoteElement),
  ],
});
