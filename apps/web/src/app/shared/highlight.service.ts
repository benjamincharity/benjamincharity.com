import { isPlatformBrowser } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';

import 'clipboard';
import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-vim';
import 'prismjs/components/prism-yaml';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let Prism: any;

@Injectable({ providedIn: 'root' })
export class HighlightService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Record<string, unknown>,
  ) {}

  highlightAll() {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightAll();
    }
  }
}
