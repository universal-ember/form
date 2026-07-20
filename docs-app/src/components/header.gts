import { ExternalLink } from 'ember-primitives';

import { GitHub } from '@universal-ember/docs-support/icons';

import type { TOC } from '@ember/component/template-only';

export const GitHubLink = <template>
  <ExternalLink
    class="github-link"
    href="https://github.com/universal-ember/form"
    aria-label="GitHub"
    ...attributes
  >
    <GitHub class="github-icon" />
  </ExternalLink>

  <style>
    .github-link {
      color: #94a3b8;
    }
    .github-link:hover {
      color: #64748b;
    }
    .github-icon {
      width: 1.5rem;
      height: 1.5rem;
      fill: currentColor;
    }
  </style>
</template> satisfies TOC<{ Element: HTMLAnchorElement }>;
