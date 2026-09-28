# CLAUDE.md — Saans

`SPEC.md` is the source of truth. This file summarizes it for day-to-day work. When they disagree, `SPEC.md` wins; fix this file.

Saans (साँस, "breath") is a calm, private, offline-first Android app that helps Indian smokers (cigarettes and bidis) quit using evidence-based methods. No account, no server, no ads. The app name lives in one `APP_NAME` constant.

## Workflow (every task)

1. Implement one ~1-hour task from the phase plan. Stop for review at the end of each phase.
2. Run `npm run typecheck && npm run lint && npm test && npm run content:check`. All must pass.
3. Write a summary + manual test steps.
4. Commit with a conventional commit message (`feat:`, `fix:`, `chore:`, `docs:`, `test:`, `ci:`, `refactor:`), one commit per task, on the working branch.

Rules:
- Ask before adding any dependency not in SPEC §4 or the approved list below.
- Never write a health fact from memory. Every claim maps to a source ID in `src/content/sources.ts`. If unsure: add `TODO(clinician-review)` and an entry in `docs/review-queue.md`.
- Never add a source to `sources.ts` yourself; propose it in `docs/review-queue.md`. Set `verified: true` only after confirming the URL/DOI resolves to the right document.

## Stack

- Expo (SDK 57) + React Native + TypeScript strict + Expo Router. Android-first; keep code iOS-safe. New Architecture, Hermes.
- Storage: `expo-sqlite` behind a typed repository layer (`src/data`) with versioned migrations (`PRAGMA user_version`). Tests run the same repos on Node's built-in `node:sqlite`.
- State: Zustand (`src/state`), thin stores that call repos and domain functions.
- Notifications: `expo-notifications`, local only. Android channels: Support, Check-in, Milestones.
- i18n: i18next + react-i18next + expo-localization. Locales `en-IN`, `hi-IN`.
- Dates: date-fns, device local time. Money: `formatINR` in `src/i18n/format.ts` (Intl `en-IN`, lakh grouping, with a fallback if Hermes lacks it).
- UI: react-native-svg, react-native-reanimated (breathing only), expo-haptics, expo-font (Mukta, vendored TTF).
- Share: react-native-view-shot + expo-sharing.
- Crash reporting: @sentry/react-native — opt-in only, PII scrubbing, no health payloads, never for under-18, no-op without a DSN.
- Tests: jest-expo + @testing-library/react-native; Maestro for E2E (`.maestro/`).
- Tooling: ESLint (flat config) + Prettier; GitHub Actions CI.
- No backend. No runtime AI content.

Approved beyond SPEC §4: `expo-linking`, `expo-constants`, `expo-status-bar`, `expo-splash-screen`, `react-native-screens`, `react-native-safe-area-context`, `react-native-worklets`, `expo-image-picker`, `expo-file-system`, `expo-document-picker`, `expo-crypto`, `expo-dev-client`, `tsx`, `eslint-config-expo`, `eslint-config-prettier`. Deliberately not used: zod, date/time picker libraries, better-sqlite3, font packages.

## Commands

| Command | What it does |
|---|---|
| `npm start` | Expo dev server (Expo Go through P3; dev build from P4) |
| `npm run android` | Open on a connected device/emulator |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint + Prettier check |
| `npm run format` | Prettier write |
| `npm test` | Jest with coverage; fails if `src/domain` < 90% |
| `npm run content:check` | Content rules (sources, review fields, en/hi parity, lengths, banned terms) |
| `npm run content:check -- --release` | Also fails on draft health items or unreviewed Hindi |
| `npm run bundle:android` | `expo export` for Android — catches bundling errors without a device |

## Folder rules

```
app/                  Expo Router routes only. Screens compose ui + state; no business logic.
  (onboarding)/ (tabs)/ sos.tsx slip.tsx checkin.tsx settings/
src/domain/           Pure TypeScript. NO imports from react, react-native, expo*, or other src/ folders
                      except src/domain itself. Lint-enforced. ≥90% coverage. Time is always passed in (`now`).
src/data/             SQLite repos + migrations. Depends on domain types only.
src/state/            Zustand stores.
src/content/          sources.ts, helplines.ts, schema, en-IN/*.json, hi-IN/*.json. Static, versioned.
src/notifications/    Adapter: domain scheduler output -> expo-notifications.
src/ui/               Tokens, theme, components.
src/i18n/             i18next init, formatting.
scripts/              content-check.ts and other node scripts.
docs/                 design-plan, review-queue, launch-checklist, privacy-policy, store-listing, oem-reminders.
```

- Every helpline number lives only in `src/content/helplines.ts`.
- Every source lives only in `src/content/sources.ts`.
- User-facing strings live only in `src/content/<locale>/*.json`. Every key exists in both locales.
- Hindi drafted by a machine carries `needsHumanReview: true` until a native speaker approves.
- Photos are copied into the app sandbox; nothing is read from shared storage after picking.

## Agreed defaults

- Android package `in.saans.app` (placeholder until first Play upload). `allowBackup: false`.
- Model additions to SPEC §6: `IfThenPlan`, `Settings` (check-in time, quiet hours, savings goal), `SentLog`, optional `quitMedicine` (hidden for under-18).
- Milestone notifications count toward the 4/day cap.
- ₹ saved uses fractional days, shown floored to whole rupees; day counts are whole local days.
- Smokeless: tracked only; excluded from HSI and ₹ saved. Mixed cigarette + bidi HSI sums sticks/day (`TODO(clinician-review)`).
- A trigger's "usual time" = median time of day of logged cravings/slips with that trigger; per-trigger defaults relative to wake/sleep until there is data.
- Latin digits in both locales.
- Device checks are done by the owner from the manual test steps; there is no emulator in CI.

## Safety rules (SPEC §3, verbatim)

1. **Not a medical device.** No diagnosis, prescribing, or dosing. Medicine content (NRT gum/lozenge/patch; prescription options) is general, sourced, and always ends with "ask a doctor or pharmacist". No dose calculators, no "which strength" logic, no drug brand names.
2. **Never suggest a substitute that harms.** No switching to e-cigarettes/vapes/heat-not-burn (banned in India, PECA 2019), bidis, hookah, gutka/khaini, "herbal" or "light" cigarettes, and never supari, pan masala, or areca-nut mouth fresheners as "something to chew". These appear only in myth-busting cards.
3. **Every health claim has ≥1 source ID.** `content:check` fails CI otherwise.
4. **No runtime AI-generated content.** All content is static and versioned. Items with `health: true` carry `reviewStatus: 'draft'|'approved'`, `reviewedBy`, `reviewedAt`. Release builds fail if any health item is `draft`.
5. **Help is always ≤2 taps away** (Get help tab + inside SOS). All numbers live in one `helplines.ts`:
   - Chest pain, severe breathlessness, fainting → **112**.
   - Feeling very low, hopeless, or thinking of self-harm → **Tele-MANAS 14416** (or 1-800-891-4416), free, 24×7.
   - Quit counselling → **NTQLS 1800-11-2356** (toll-free, 8 AM–8 PM; published reports say closed Mondays — verify) and **mCessation** missed call **011-22901701**.
6. **Mood safety net:** mood "very low" on 3 consecutive check-ins, or the user taps "I'm struggling" → calm card with Tele-MANAS + "talk to someone you trust". Never block the app, never alarmist. Users on a prescription quit medicine who report mood or behaviour changes → "contact your doctor" card. Thresholds: `TODO(clinician-review)`.
7. **Special situations** (onboarding, all optional, "prefer not to say" allowed): pregnant/breastfeeding, heart condition, mental-health condition, regular medicines → "talk to a doctor before using any quit medicine" and hide generic medicine nudges. Regular medicines → also "tell your doctor you're quitting" (KROON_2007).
8. **Under 18:** allowed in restricted mode — no medicine content, crash reporting forced off, quitline + "talk to a trusted adult or doctor" shown prominently.
9. **Kind copy only:** no shame, no fear imagery (no diseased-lung photos), no "you failed", no guilt-trip or fake-urgency notifications.
10. **No diet or calorie features or targets.** Weight worries get general, non-restrictive tips.
11. **No tobacco brand names, logos, or pack imagery** anywhere; never depict smoking attractively (COTPA 2003). Price entry is brand-free.
12. **Privacy:** no account; no location, contacts, or ad-ID access; buddy number is typed in and stored locally; no third-party SDK receives health data.

## Design (SPEC §9, short)

Calm, hopeful, adult, unmistakably Indian. The Home "air clearing" sky is the one bold element; the SOS breathing circle is the only continuous motion (static count under reduced motion). Tokens and type scale live in `docs/design-plan.md` and `src/ui/tokens.ts`. Tap targets ≥48dp, body ≥16sp, works at 200% font scale, WCAG AA, a label on every control. Copy: plain verbs, sentence case, second person, warm; Hindi is natural spoken Hindi.

## Out of scope for MVP

Accounts, cloud sync, any backend, chatbot/LLM features, community/forums, ads, CO monitors/wearables, iOS release, B2B.

## Expo notes (SDK 57)

- Expo APIs change every SDK. Don't trust memory: read the installed package's `.d.ts`/README, or the docs source at `raw.githubusercontent.com/expo/expo/sdk-57/docs/pages/...` (docs.expo.dev is blocked in the cloud sandbox).
- Add native packages with `npx expo install <pkg>` so versions match the SDK. In the cloud sandbox api.expo.dev is blocked: prefix with `EXPO_OFFLINE=1` (uses the version map bundled in `expo`).
- Routes live in root `app/`. Never create `src/app/`: Expo Router would use it instead of `app/`.
- Tabs come from `expo-router/js-tabs` (the `Tabs` export of `expo-router` is deprecated). Stacks from `expo-router`.
- Typed routes are on. `npm run typecheck` regenerates `.expo/types` first (`expo customize tsconfig.json`), so CI and local agree.
- App identity (name, slug, scheme, package) lives in `src/app-identity.json`, because Expo's config loader can't follow relative `.ts` imports from `app.config.ts`. Code imports `APP_NAME` from `@/config`.
