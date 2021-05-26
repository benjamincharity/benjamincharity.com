import { ScullyConfig, setPluginConfig } from '@scullyio/scully';

setPluginConfig('md', { enableSyntaxHighlighting: true });

export const config: ScullyConfig = {
  projectRoot: './apps/web/src',
  projectName: 'web',
  outDir: './dist/static',
  routes: {
    '/blog/:postId': {
      type: 'contentFolder',
      postId: {
        folder: './articles',
      },
    },
  },
};
