import {KEYS} from 'platejs';
import {BlockPlaceholderPlugin} from 'platejs/react';

export const BlockPlaceholderKit = [
  BlockPlaceholderPlugin.configure({
    options: {
      className:
        'relative before:absolute before:cursor-text before:top-0 before:text-muted-foreground/80 before:content-[attr(placeholder)]',
      placeholders: {
        [KEYS.p]: '텍스트 입력...',
        [KEYS.h1]: '제목1',
        [KEYS.h2]: '제목2',
        [KEYS.h3]: '제목3',
        [KEYS.h4]: '제목4',
        [KEYS.h5]: '제목5',
      },
      query: ({path}) => {
        return path.length === 1;
      },
    },
  }),
];
