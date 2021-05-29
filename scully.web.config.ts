import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { timeToRead, timeToReadOptions } from 'scully-plugin-time-to-read';

setPluginConfig('md', { enableSyntaxHighlighting: true });

setPluginConfig(timeToRead, {
  path: '/articles',
} as timeToReadOptions);

export const config: ScullyConfig = {
  projectRoot: './apps/web/src',
  projectName: 'web',
  outDir: './dist/static',
  distFolder: './dist/web',
  routes: {
    '/articles/:postId': {
      type: 'contentFolder',
      postId: {
        folder: './articles',
      },
    },
  },
};
