import { GitHubLink } from '#components/header.gts';

import {
  Article,
  H2,
  IndexPage,
  InternalLink,
  Text,
  TopRight,
} from '@universal-ember/docs-support';

<template>
  <IndexPage>
    <:header>
      <TopRight>
        <GitHubLink />
      </TopRight>
    </:header>
    <:tagline>
      <header class="landing-hero">
        <p class="landing-scope">@universal-ember/</p>
        <h1 class="landing-title">form</h1>
      </header>
      <p class="landing-tagline">
        The Ember.js library that distills the common behavior and accessibility
        best practices of forms into reusable components, without any opinions
        on specific markup or styling. Use it to build your forms directly, or
        to build your opinionated forms component kit on top of it.
      </p>
    </:tagline>
    <:callToAction>
      <InternalLink href="/1-get-started/index.md" class="landing-cta">
        Get Started ➤
      </InternalLink>
    </:callToAction>
    <:content>
      <div class="landing-blurb">
        Forms aren't exactly a new thing — existing solutions are either not
        using the latest Ember paradigms, generate specific markup that is hard
        to customize, or are coupled to a specific validation library.
        <em>@universal-ember/form</em>
        is none of this: all the flexibility, without reinventing the wheel.
      </div>

      <div class="landing-features">
        <Article class="flex flex-wrap gap-12 justify-around">

          <div class="landing-feature">
            <H2>Headless</H2><br />

            <Text>
              No opinions on markup or styling: bring your own DOM. Rendering
              semantic form markup, accessible by default, while you stay in
              control of every element and class.
            </Text>
          </div>

          <div class="landing-feature">
            <H2>Validation, your way</H2><br />

            <Text>
              Native HTML5 validation, custom field- and form-level validators,
              or adapters for validation libraries like yup and ember-changeset
              — mix and match as needed.
            </Text>
          </div>

          <div class="landing-feature">
            <H2>TypeScript &amp; Glint</H2><br />

            <Text>
              Written in TypeScript with Glint-ready types: strict checking of
              components, arguments, and your form data shape, with API docs
              right in your IDE.
            </Text>
          </div>

          <div class="landing-feature">
            <H2>Data down, actions up</H2><br />

            <Text>
              Immutable by default: pass data in, receive the changed data on
              submit. Or opt into mutable mode for buffering libraries like
              ember-changeset.
            </Text>
          </div>

        </Article>
      </div>

      <style>
        .landing-hero {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.25rem;
        }

        .landing-scope {
          font-family: var(--font-display);
          font-style: normal;
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          font-weight: 500;
          letter-spacing: 0.05em;
          opacity: 0.85;
          margin: 0;
        }

        .landing-title {
          font-family: var(--font-display);
          font-style: normal;
          font-size: clamp(4rem, 12vw, 7rem);
          font-weight: 800;
          line-height: 1;
          margin: 0 0 1rem;
          padding: 0.05em 0.25em 0.12em;
          border-radius: 0.12em;
          background: rgb(30 30 42 / 85%);
          color: white;
          box-shadow: 0 8px 24px rgb(0 0 0 / 35%);
        }

        .landing-tagline {
          max-width: 46ch;
          margin: 0;
        }

        a.landing-cta,
        a.landing-cta:visited {
          display: inline-block;
          font-family: var(--font-display);
          font-style: normal;
          font-size: 1.5rem;
          font-weight: 700;
          text-decoration: none;
          color: #1e1b4b !important;
          background: white;
          padding: 0.5rem 1.75rem;
          border-radius: 999px;
          box-shadow: 0 6px 20px rgb(0 0 0 / 30%);
          transition:
            transform 0.15s ease,
            box-shadow 0.15s ease;
        }

        .landing-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgb(0 0 0 / 35%);
          text-decoration: none;
        }

        .landing-blurb {
          font-size: 1.5rem;
          max-width: 60ch;
          margin-inline: auto;
          padding: 2rem 1.5rem;
          text-align: center;
          text-wrap: balance;
        }

        .landing-features {
          max-width: 72rem;
          margin-inline: auto;
          padding: 1rem 1.5rem 3rem;
        }

        .landing-feature {
          max-width: 300px;
        }
      </style>
    </:content>
  </IndexPage>
</template>
