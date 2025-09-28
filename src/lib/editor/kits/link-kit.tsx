import { LinkPlugin } from "@platejs/link/react";

import { LinkElement } from "../nodes/link-node";
import { LinkFloatingToolbar } from "../components/ui/tool/link-toolbar";

export const LinkKit = [
  LinkPlugin.configure({
    render: {
      node: LinkElement,
      afterEditable: () => <LinkFloatingToolbar />,
    },
  }),
];
