# Contributing to the Boobs Pictures app

Thanks for helping build a useful, joyful field map for booby seabirds.

## Before you start

- Search existing issues before opening a new one.
- Discuss substantial product or architecture changes in an issue first.
- Keep pull requests focused on one improvement.
- Never include credentials, personal information, precise sensitive nest locations, or unlicensed photographs.
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Local development

```sh
npm install
npm run dev
```

Open `http://127.0.0.1:4180`.

Before opening a pull request, run:

```sh
npm test
npm run check
npm run build
```

Test interface changes on desktop and mobile. New motion must respect `prefers-reduced-motion`. Screenshots are encouraged for visual changes.

## Wildlife and content safety

- Cite reliable sources for biological or distribution claims.
- Obscure sensitive nesting locations when disclosure could endanger wildlife.
- Confirm photo licensing and attribution before adding media.
- Treat every future community submission as untrusted until moderated.

Maintainers review and merge pull requests. Merges to protected `main` trigger the production build workflow.
