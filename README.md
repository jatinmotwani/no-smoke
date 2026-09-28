# Saans

A calm, private, offline-first Android app that helps Indian smokers (cigarettes and bidis) quit, using evidence-based methods. Free at its core, no account, no server, no ads.

- Product spec: [`SPEC.md`](SPEC.md) (source of truth)
- Working rules for contributors and Claude: [`CLAUDE.md`](CLAUDE.md)
- Open clinical and language questions: [`docs/review-queue.md`](docs/review-queue.md)
- Release gates: [`docs/launch-checklist.md`](docs/launch-checklist.md)

> Saans is not a medical device and does not give medical advice. It points people to doctors, pharmacists, and India's free helplines.

## Setup

Requirements: Node 22 LTS, npm 10+, Android Studio with an emulator (or an Android phone with Expo Go).

```sh
npm ci
```

## Run

```sh
npm start          # then press "a" for Android, or scan the QR code with Expo Go
```

## Checks

```sh
npm run typecheck && npm run lint && npm test && npm run content:check
```

## Build

To be written in P4.1 (first dev build).

## Release

To be written in P6.6.
