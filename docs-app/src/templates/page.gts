import { ExternalLink, service } from 'ember-primitives';

import { GitHubLink } from '#components/header.gts';

import { OopsError, PageLayout } from '@universal-ember/docs-support';

<template>
  <PageLayout>
    <:logoLink>
      <span>Form</span>
    </:logoLink>
    <:topRight>
      <GitHubLink />
    </:topRight>
    <:error as |error|>
      <OopsError @error={{error}}>
        If you have a GitHub account (and the time),
        <ReportingAnIssue />
        would be most helpful! 🎉
      </OopsError>
    </:error>
    <:editLink as |Link|>
      {{#let (service "router") as |router|}}
        <Link
          @href="https://github.com/universal-ember/form/edit/main/docs-app/src/templates{{router.currentURL}}"
        >
          Edit this page
        </Link>
      {{/let}}
    </:editLink>
  </PageLayout>
</template>

const ReportingAnIssue = <template>
  <ExternalLink href="https://github.com/universal-ember/form/issues/new">
    reporting an issue
  </ExternalLink>
</template>;
