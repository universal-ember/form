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
      <h1 class="landing-title">Form</h1>
      <p>
        The Ember.js library that distills the common behavior and accessibility
        best practices of forms into reusable components, without any opinions
        on specific markup or styling. Use it to build your forms directly, or
        to build your opinionated forms component kit on top of it.
      </p>
    </:tagline>
    <:callToAction>
      <InternalLink
        href="/1-get-started/index.md"
        style="color: white; text-shadow: 0px 2px 0px black; transform: scale(2.5);"
      >
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

      <br /><br />

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
        .landing-title {
          font-size: 1.875rem;
          margin-bottom: 1rem;
        }

        .landing-blurb {
          font-size: 1.5rem;
          width: 50%;
          margin-inline: auto;
          padding: 2rem;
        }

        .landing-features {
          width: 66%;
          margin-inline: auto;
        }

        .landing-feature {
          max-width: 300px;
        }
      </style>
    </:content>
  </IndexPage>
</template>
