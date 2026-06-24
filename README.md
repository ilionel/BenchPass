# BenchPass

[![CI](https://github.com/ilionel/BenchPass/actions/workflows/ci.yml/badge.svg)](https://github.com/ilionel/BenchPass/actions/workflows/ci.yml)

A **password strength benchmarker** — type a password and instantly see how robust it is,
with actionable feedback. Powered by [zxcvbn-ts](https://github.com/zxcvbn-ts/zxcvbn)
(French dictionaries), React + TypeScript.

> 🔒 **Your password never leaves your browser.** Evaluation runs entirely client-side —
> nothing is sent to a server, logged, or stored.

## Run

**Docker (production build, served by nginx):**

```sh
docker compose up --build      # then open http://localhost:8080
```

**Local development:**

```sh
cd web
npm install
npm start                      # http://localhost:3000 (hot reload)
```

## How it works

zxcvbn estimates how guessable the password is and returns a **0–4 score** plus feedback.
BenchPass additionally **caps the score** when the password is short (< 12 chars) or uses
fewer than three character classes, then renders a colour indicator bar, warnings and
suggestions (in French).

## Develop

```sh
cd web
npm run build          # production build (sass + react-scripts)
npm run format         # prettier
npm run format:check   # prettier --check
npm test               # CRA test runner
```

ESLint (`react-app` config) runs as part of the build; CI builds the app and lints the
Dockerfile with [hadolint](https://github.com/hadolint/hadolint).

## Tech

- React 18 + TypeScript (Create React App)
- `@zxcvbn-ts` core + common + fr dictionaries
- Bootstrap 5

## License

See [LICENSE](LICENSE).
