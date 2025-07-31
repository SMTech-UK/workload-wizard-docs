import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { Rate } from '../components/rate';
import posthog from 'posthog-js';
import { PostHogProvider } from '../providers'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <PostHogProvider>
    <DocsLayout tree={source.pageTree} {...baseOptions}>
      {children}
      <Rate
        onRateAction={async (url, feedback) => {
          'use server';
          await posthog.capture('on_rate_docs', feedback);
          return { githubUrl: 'https://github.com/your-repo/issues' };
        }}
      />
    </DocsLayout>
    </PostHogProvider>
  );
}
