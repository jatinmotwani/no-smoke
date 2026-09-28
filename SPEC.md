# SPEC — "Saans": affordable, evidence-based quit-smoking app for India

Working name: **Saans** (साँस, "breath"). Keep it in one `APP_NAME` constant.
Read this whole file before doing anything. It is the source of truth; `CLAUDE.md` summarizes it.

## 0. How we work

I'm a solo Node.js developer (6+ years) with about 1 hour a day for this. Optimize for low ops, no servers, small reviewable steps.

1. **No code yet.** First reply with: (a) blocking questions only, max 5; (b) repo tree; (c) the §13 phases broken into ~1-hour tasks; (d) top risks. Wait for my "go".
2. Create `CLAUDE.md` with stack, commands, folder rules, and the §3 safety rules **verbatim**.
3. Every task: implement → `npm run typecheck && npm run lint && npm test && npm run content:check` → summary + manual test steps → conventional commit.
4. Ask before adding any dependency not listed in §4.
5. Domain logic is pure TypeScript in `src/domain/` (no React/Expo imports), ≥90% test coverage.
6. Never write a health fact from memory. Every claim maps to a §2 source ID. If unsure: `TODO(clinician-review)` + an entry in `docs/review-queue.md`.

## 1. Product

**One-liner:** a calm, private, offline-first Android app that helps Indian smokers (cigarettes and bidis) make a quit plan, get through cravings, recover from slips, and stay quit — using only evidence-based methods, free at its core.

**User:** Indian adults who smoke cigarettes and/or bidis and want to quit within a month. Android, often a 2–3 GB RAM phone, patchy data, price-sensitive, English or Hindi. Typical patterns: chai + cigarette, office/college smoke breaks, stress smoking, heavy daily bidi use. Many also use smokeless tobacco (gutka, khaini) — track it in data (§6); a full smokeless program is post-MVP.

**Principles**
- Everything that affects quit success is free forever. No ads, ever.
- Safe by design: sourced general info only; medicines and red flags always go to doctors and helplines.
- Private by default: no account, no server, data stays on the phone.
- Kind, never shaming: a slip is information, not failure.
- Fast and fully offline on low-end phones.

## 2. Evidence base

Standalone apps have weaker evidence than text-message support, quitline counselling, and medicines. So the app implements the proven techniques and actively routes people to the quitline and to doctors.

| Feature | Why | Sources |
|---|---|---|
| Quit date **or** cut-down-then-quit plan | Cutting down first and quitting abruptly give comparable quit rates; set a date within ~2 weeks | COCH_REDUCE_2019, SMOKEFREE_GOV |
| Scheduled support notifications, most intense around quit day | Automated text support raises quit rates; txt2stop roughly doubled verified 6-month abstinence; India's mCessation uses this model | COCH_MOBILE_2019, FREE_2011, WHO_MCESSATION |
| Craving SOS: urge surfing, breathing, distraction, brisk walk | ACT-based app beat a standard guidance app in a 2,415-person RCT; short exercise bouts reduce cravings | BRICKER_2020, HAASOVA_2013 |
| If-then plans for personal triggers; reasons/values reminders | Core behaviour-change techniques in cessation support | MICHIE_2011, BRICKER_2020 |
| Progress: smoke-free time, ₹ saved, health milestones | Feedback + reward techniques; WHO recovery timeline | MICHIE_2011, WHO_BENEFITS |
| Slip ≠ relapse; easy re-plan | Relapse-prevention model; most people need several attempts | MARLATT_1985, CHAITON_2016 |
| Nudge to medicines + quitline (info only, doctor-first) | NRT raises quit rates ~50–60%; combining medicine with behavioural support improves quit rates | COCH_NRT_2018, COCH_COMBINED_2016, NHS_TREATMENTS, NTQLS |
| Withdrawal and mood normalization | Symptoms peak early and mostly fade in ~2–4 weeks; quitting is linked to better mental health | HUGHES_2007, COCH_MH_2021 |
| 2-question dependence check | Heaviness of Smoking Index | HSI_1989 |
| "Just a few a day" myth | 1 cigarette/day carries far more than 1/20th of the heart risk of 20/day | HACKSHAW_2018 |
| "Tell your doctor you're quitting" | Smoking changes how some medicines (and caffeine) are processed | KROON_2007 |

**Source registry** — seed `src/content/sources.ts` with exactly these. Don't add sources yourself; propose them in `docs/review-queue.md`. Shape: `{ id, citation, year, url?, kind: 'review'|'trial'|'guideline'|'gov'|'law', verified: false }`. Set `verified: true` only after confirming the URL/DOI resolves to the right document (use web fetch if available).

- `WHO_BENEFITS` — WHO Q&A: "Tobacco: health benefits of smoking cessation".
- `WHO_MCESSATION` — WHO mTobaccoCessation page (India mCessation).
- `COCH_MOBILE_2019` — Whittaker R et al. Mobile phone text messaging and app-based interventions for smoking cessation. Cochrane 2019, CD006611.
- `FREE_2011` — Free C et al. Smoking cessation support delivered via mobile phone text messaging (txt2stop): a single-blind randomised trial. Lancet 2011;378:49–55.
- `COCH_REDUCE_2019` — Lindson N et al. Smoking reduction interventions for smoking cessation. Cochrane 2019, CD013183.
- `COCH_NRT_2018` — Hartmann-Boyce J et al. Nicotine replacement therapy versus control for smoking cessation. Cochrane 2018, CD000146.
- `COCH_COMBINED_2016` — Stead LF et al. Combined pharmacotherapy and behavioural interventions for smoking cessation. Cochrane 2016, CD008286.
- `COCH_MH_2021` — Taylor GMJ et al. Smoking cessation for improving mental health. Cochrane 2021, CD013522.
- `BRICKER_2020` — Bricker JB et al. Efficacy of smartphone applications for smoking cessation: a randomized clinical trial. JAMA Intern Med 2020;180(11):1472–80.
- `HAASOVA_2013` — Haasova M et al. The acute effects of physical activity on cigarette cravings: systematic review and meta-analysis with individual participant data. Addiction 2013;108(1):26–37.
- `MICHIE_2011` — Michie S et al. Development of a taxonomy of behaviour change techniques used in individual behavioural support for smoking cessation. Addict Behav 2011;36(4):315–19.
- `HSI_1989` — Heatherton TF et al. Measuring the heaviness of smoking. Br J Addict 1989;84(7):791–99.
- `HUGHES_2007` — Hughes JR. Effects of abstinence from tobacco: valid symptoms and time course. Nicotine Tob Res 2007;9(3):315–27.
- `HACKSHAW_2018` — Hackshaw A et al. Low cigarette consumption and risk of coronary heart disease and stroke. BMJ 2018;360:j5855.
- `CHAITON_2016` — Chaiton M et al. Estimating the number of quit attempts it takes to quit smoking successfully in a longitudinal cohort of smokers. BMJ Open 2016.
- `MARLATT_1985` — Marlatt GA, Gordon JR. Relapse Prevention. Guilford Press, 1985.
- `KROON_2007` — Kroon LA. Drug interactions with smoking. Am J Health Syst Pharm 2007;64(18):1917–21.
- `IARC_ARECA_2004` — IARC Monographs vol. 85: Betel-quid and areca-nut chewing (areca nut = Group 1 carcinogen).
- `NHS_TREATMENTS` — NHS: stop smoking treatments (nhs.uk).
- `SMOKEFREE_GOV` — US NCI Smokefree.gov: build your quit plan.
- `NTQLS` — National Tobacco Quitline Services, MoHFW (ntqls.in) + NTCP mCessation page (ntcp.mohfw.gov.in/mcessation).
- `PECA_2019` — Prohibition of Electronic Cigarettes Act, 2019 (covers heat-not-burn).
- `COTPA_2003` — Cigarettes and Other Tobacco Products Act, 2003.

## 3. Safety rules (non-negotiable — copy into CLAUDE.md)

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

## 4. Tech stack (decided — ask before changing)

Why native, not PWA: the core evidence-based feature is scheduled support messages. Expo local notifications work offline with **no server**, and Play Store search is how Indian users find apps.

- **Expo** (latest stable SDK) + React Native + **TypeScript strict** + **Expo Router**. Android-first; keep code iOS-safe.
- Storage: `expo-sqlite` behind a typed repository layer with versioned migrations.
- State: Zustand.
- Notifications: `expo-notifications`, local only. Android channels: Support, Check-in, Milestones (users can mute each).
- i18n: i18next + react-i18next + expo-localization. Locales `en-IN`, `hi-IN`.
- Dates: date-fns, device local time. Money: `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })` for ₹1,00,000 grouping (verify on Hermes).
- UI: react-native-svg (charts + illustration; no heavy chart libs), react-native-reanimated (breathing), expo-haptics, expo-font.
- Share: react-native-view-shot + expo-sharing.
- Crash reporting: @sentry/react-native — **opt-in**, PII scrubbing on, no health payloads.
- Tests: jest-expo + @testing-library/react-native; Maestro for E2E.
- Tooling: ESLint + Prettier; GitHub Actions (typecheck, lint, test, content:check); EAS Build or local builds.
- **No backend in MVP.**

## 5. Structure

```
app/                    # Expo Router routes
  (onboarding)/
  (tabs)/               # home, progress, learn, help
  sos.tsx  slip.tsx  checkin.tsx  settings/
src/
  domain/               # pure TS: hsi, plan, streaks, savings, milestones, scheduler
  data/                 # sqlite repos + migrations
  content/              # sources.ts, helplines.ts, en-IN/*.json, hi-IN/*.json
  notifications/        # adapter: domain scheduler -> expo-notifications
  ui/                   # tokens, components
  i18n/
scripts/content-check.ts
docs/                   # review-queue, launch-checklist, privacy-policy, store-listing
```

## 6. Data model and rules

```ts
type Product = 'cigarette' | 'bidi' | 'smokeless';
type TriggerId = 'chai_coffee' | 'after_meals' | 'morning_toilet' | 'work_breaks' | 'friends'
  | 'alcohol' | 'stress' | 'boredom' | 'after_argument' | 'commute' | 'late_night_work'
  | 'weddings_festivals' | 'seeing_others_smoke';

interface Profile {
  nickname?: string;
  locale: 'en-IN' | 'hi-IN';
  ageBand: 'under18' | '18-24' | '25-39' | '40-59' | '60plus';
  products: Product[];
  perDay: Partial<Record<Product, number>>;
  price: { cigarettePerStick?: number; bidiPerBundle?: number; bidiBundleSize?: number }; // ₹
  timeToFirstSmoke: 'lte5' | '6to30' | '31to60' | 'gt60';
  flags: { pregnant?: boolean | null; heart?: boolean | null; mentalHealth?: boolean | null; regularMeds?: boolean | null };
  reasons: string[];
  reasonPhotoUri?: string;                 // copied into app sandbox only
  triggers: TriggerId[];
  wake: string; sleep: string;             // 'HH:mm'
  buddy?: { name: string; phone: string }; // normalized to 91XXXXXXXXXX
  notif: { intensity: 'low' | 'normal' | 'high'; discreet: boolean };
  crashReportsOptIn: boolean;
}
interface QuitPlan {
  method: 'date' | 'reduce';
  quitDate: string;
  reduce?: { date: string; max: number }[];
  status: 'preparing' | 'quit';
  history: { quitDate: string; endedAt?: string }[];
}
interface Craving { id: string; at: string; intensity: number; trigger?: TriggerId; tool?: string; outcome: 'resisted' | 'smoked' }
interface Smoke   { id: string; at: string; count: number; product: Product; trigger?: TriggerId }
interface CheckIn { date: string; smoked: number; cravings: 'none' | 'few' | 'many'; mood: 1 | 2 | 3 | 4 | 5; sleepOk?: boolean; note?: string }
```

Rules (pure functions, unit-tested):
- **HSI:** time-to-first (≤5 min = 3, 6–30 = 2, 31–60 = 1, >60 = 0) + per day (≤10 = 0, 11–20 = 1, 21–30 = 2, ≥31 = 3) → 0–1 low, 2–4 moderate, 5–6 high. Validated for cigarettes; for bidi-only users use time-to-first alone + `TODO(clinician-review)`.
- **Reduce plan:** linear from baseline to 0 over 1–4 weeks, ending on the quit date.
- **Health milestones** count from the **last logged smoke**, not the quit date.
- **Savings:** sticks avoided = baseline/day × days since quit − sticks logged since quit (floor 0). Bidi per-stick = bundle price ÷ bundle size. ₹ saved = Σ per product (sticks avoided × per-stick price).
- **Slips never erase history:** show current streak, longest streak, total smoke-free days.
- Smoking logged on ≥3 of the last 7 days → offer (never force) a new quit date; old plans kept in `history`.
- Day boundary = local midnight; handle device timezone changes.

## 7. MVP features

**7.1 Onboarding** (≤2 min, progress bar, back allowed, most steps skippable)
Language → nickname (optional) → age band → what you smoke, per day, price (cigarettes: per stick or per pack → stored per stick; bidis: bundle price + size) → time to first smoke → special situations (§3.7) → reasons (chips + custom + optional photo) → triggers (§6 list) → plan: **quit on a date** (default; suggest within 14 days, allow ≤30) or **cut down first** (1–4 weeks) → wake/sleep times → notification permission (explain the value first; app fully works if denied) → privacy (data stays on phone; crash reports opt-in, unchecked) → Home.
High dependence → sourced card: medicines + quitline counselling improve the odds; talk to a doctor; call 1800-11-2356.

**7.2 Home**
- Hero: time smoke-free (or countdown to quit date / today's cut-down limit) shown as the "air clearing" visual (§9), plus ₹ saved, cigarettes/bidis not smoked, next milestone.
- One large "Craving? Get through it" button, thumb-reachable.
- Quit-day checklist on the day: get rid of cigarettes/bidis and lighters, tell one person, plan for your first trigger.
- Today's check-in if pending; one rotating personal reason.

**7.3 Craving SOS** — the most important screen
- 1 tap from Home and from a notification action ("I'm craving").
- Opens straight into a paced-breathing circle with a 5-minute "ride it out" timer (skippable) and haptic breath cues. Timer copy must not claim how long cravings last unless sourced.
- Tools: urge surfing (ACT-style, ~2 min guided text), my reasons (+ photo), 10-minute walk timer, quick distractions, **message my buddy** (`https://wa.me/91XXXXXXXXXX?text=…` prefilled), call quitline.
- On exit: 2-tap log — intensity 1–10 and "did you smoke?" (+ optional trigger). Instant, offline, no spinners.

**7.4 Slip ("I smoked")**
Kind copy → log count + trigger → one if-then plan ("Next time I'm at {trigger}, I will ___"), saved and resurfaced before that trigger's usual time. History kept per §6.

**7.5 Daily check-in** (≤20 s, from the evening notification)
Smoked today? Cravings (none/few/many), mood (5 faces), slept OK?, optional note. Feeds the §3.6 mood net. Weeks 1–4: "withdrawal is normal and temporary" card (HUGHES_2007).

**7.6 Progress**
Health timeline (WHO_BENEFITS milestones unlocked by time since last smoke), ₹ saved with an optional goal ("Saving for ___ — ₹___"), weekly cravings trend, top triggers, cravings resisted. **Milestone share card** (days + ₹ saved only) → share sheet / WhatsApp.

**7.7 Learn** — 20–25 cards, ≤90-second reads, each sourced
First 2 weeks (withdrawal); chai/coffee (the same chai can feel stronger after quitting — KROON_2007); after meals; office smoke breaks; alcohol; stress; sleep; weight worries (no diet targets); something to chew (sugar-free gum, plain saunf/elaichi — never supari/pan masala, IARC_ARECA_2004); medicines overview (doctor-first; keep NRT away from children); tell your doctor if you take regular medicines; India myths (bidi is "herbal"/safer, "light" cigarettes, "2–3 a day is fine", hookah is safer, switching to gutka/khaini, vaping to quit — illegal in India); telling family and friends; weddings and festivals plan.

**7.8 Get help** (tab, always 1 tap)
One-tap dial: NTQLS, mCessation missed call, Tele-MANAS, 112. Link to NTCP's Tobacco Cessation Centres list (verify URL). "Share my smoking summary with a doctor": products, per day, time-to-first, quit date — plain text via share sheet, no advice.

**7.9 Settings**
Language; notification intensity, reminder times, quiet hours; **discreet mode** (generic notification text for shared phones); prices/baseline; buddy; export (JSON via share sheet), import, delete all data (DB + photos); privacy policy; "Sources and how we check facts" (renders the registry); disclaimer; crash-report toggle; "Not getting reminders?" guide (§8).

## 8. Notification engine

- Pure scheduler in `src/domain/scheduler.ts`: `(profile, plan, events, sentLog, now) → { at, messageId }[]`.
- Library `content/<locale>/messages.json`: `{ id, phase, tags, text (≤120 chars), sourceIds, health, reviewStatus }`. Tokens: `{name} {days} {saved} {reason}`.
- Cadence (normal): prep (days −7 to −1) 1/day; quit day 3; days 1–7 3/day (morning, before top-trigger time, evening check-in); days 8–28 taper 2→1/day; days 29–90 3/week; 90+ weekly + milestones. Low ≈ half; high = +1/day in weeks 1–2. Modeled on txt2stop (5/day for 5 weeks, then 3/week) but gentler; user-adjustable.
- Hard rules: ≤4/day; nothing in quiet hours (sleep → wake); no repeats until a phase's pool is exhausted; match user triggers and time-of-day tags.
- Milestones: 1 day, 3 days, 1 week, 2 weeks, 1 month, 3 months, 6 months, 1 year (+ ₹ saved).
- Rolling 7-day window, rebuilt on app foreground, plan/settings change, and slip (iOS caps pending local notifications at 64). Don't request exact-alarm permission; inexact is fine.
- Actions: "I'm craving" → `/sos`; check-in → `/checkin`.
- Android OEM reality: Xiaomi/Redmi/POCO, Realme, Oppo, Vivo, and some Samsung battery optimizers can kill scheduled notifications. Ship the "Not getting reminders?" guide with per-brand steps (autostart, battery "unrestricted"); test on at least one such phone.

## 9. Design direction

- Feel: calm, hopeful, adult, unmistakably Indian. Not clinical, not preachy, not childish-gamified.
- Concept, "air clearing": the Home hero is a hazy sky that visibly clears as smoke-free time grows. This is the one bold element; everything else stays quiet.
- Motion: the SOS breathing circle is the only continuous motion. Respect reduced motion (static count instead).
- Palette: propose 4–6 named hex tokens drawn from the subject (clear morning sky, neem green; marigold reserved for milestones). Avoid cream + terracotta, tobacco browns, hospital blue/white, near-black + neon, decorative gradients. Light + dark themes.
- Type: one family covering Latin + Devanagari (e.g., Mukta or Hind — test conjuncts), a clear scale, big legible numerals for time and ₹.
- Avoid templated tells: identical rounded cards with the same soft shadow, one radius on everything, all-caps labels above headings, numbered markers on things that aren't sequences.
- Copy: plain verbs, sentence case, second person, warm. An action keeps the same name through a flow. Errors say what happened and how to fix it. Hindi = natural spoken Hindi, not bookish.
- Before building UI: write a 1-page design plan (tokens, type scale, ASCII wireframes of Home + SOS), critique it against this section, revise, then build.
- Accessibility floor: tap targets ≥48dp, body ≥16sp, works at 200% font scale, WCAG AA contrast, labels on every control.

## 10. India specifics

- ₹ with lakh grouping; cigarettes priced per stick (loose buying is common) or per pack; bidis per bundle.
- Hindi at launch. Machine-drafted Hindi gets `needsHumanReview: true` until a native speaker approves. Architecture ready for kn, ta, te, bn, mr, and Roman-script Hinglish later.
- Performance budget: download <30 MB, cold start <3 s on a 2–3 GB RAM phone, every core feature offline.
- Play Store listing in English + Hindi, including Hinglish search phrases people actually type ("smoking kaise chhode", "cigarette chhodne ka tarika", "bidi chhodo").
- Law: PECA 2019 (no e-cig/heat-not-burn promotion), COTPA 2003 (no brand/pack imagery or promotion), DPDP Act 2023 (clear notice, consent for any processing, export/delete; a "child" is under 18).

## 11. Pricing — fair, one-time, never paywall what helps people quit

- Free forever: everything in §7.
- **Saans Plus**, one-time ₹149 (test ₹99/₹199 later). Offered after 7 smoke-free days, framed with their own data ("₹149 = what you used to spend in {n} days"), and anytime from Settings. Unlocks extras only: themes, advanced insights (time-of-day trigger heatmap, trends), home-screen widget, extra share-card designs.
- Google Play Billing via RevenueCat (P7). No subscriptions, no ads, no data sales.

## 12. Quality gates

- Unit (domain ≥90%): HSI, reduce plan, streaks with slips, sticks/₹ incl. bidi math and floor 0, milestones from last smoke, scheduler (caps, quiet hours, no repeats, window rebuild, phase changes), midnight and timezone edges.
- `content:check`: source IDs exist; health items have review fields; en/hi key parity; messages ≤120 chars; banned-term scan (tobacco brand list; e-cig/vape/heat-not-burn/supari/pan masala terms allowed only in `myth`-tagged items); release mode fails on any draft health item or unreviewed Hindi.
- Component: onboarding (happy + skip paths), SOS log, slip flow, delete-all.
- E2E (Maestro): install → onboarding → quit date → SOS → craving log → slip → check-in → export.
- Manual matrix: low-end Android (emulator + one Xiaomi/Realme/Vivo if possible), Hindi, 200% font, dark mode, airplane mode, notifications denied, reduced motion.

## 13. Phases (~1-hour tasks; stop for my review after each phase)

| Phase | Scope | Done when |
|---|---|---|
| P0 | Scaffold, TS strict, Router, lint, Jest, CI, i18n skeleton, CLAUDE.md, docs stubs, design plan (§9) | Boots on Android emulator; CI green |
| P1 | Domain calculators + scheduler, SQLite repos/migrations, sources + helplines config, content:check | Domain coverage ≥90% |
| P2 | Onboarding, plan, Home | Fresh install → Home in <2 min; numbers match domain tests |
| P3 | SOS, slip, check-in, mood safety net | SOS in 1 tap; logging in 2 taps; fully offline |
| P4 | Notifications, milestones, OEM guide, discreet mode | Scheduler rules hold on device; actions deep-link |
| P5 | Progress, Learn, Get help, Settings (export/import/delete), share card | Every helpline dials; delete wipes DB + files |
| P6 | Hindi, accessibility, performance, store listing, Data safety answers, privacy policy draft | Budgets met; release-mode content:check passes after reviews |
| P7 (post-launch) | Plus via Play Billing, widget, app-icon SOS shortcut, app lock, opt-in anonymous analytics (allowlisted events, no free text), smokeless track, more languages, iOS | — |

## 14. Out of scope for MVP

Accounts, cloud sync, any backend, chatbot/LLM features, community/forums, ads, CO monitors/wearables, iOS release, corporate-wellness (B2B) version.

## 15. Launch checklist and deliverables

Write to `docs/launch-checklist.md`:
- [ ] A qualified clinician (e.g., a doctor at a Tobacco Cessation Centre) reviews every `health: true` item; record name + date.
- [ ] A native Hindi speaker reviews all Hindi.
- [ ] Re-verify helplines on official sites: NTQLS 1800-11-2356 (hours/days), mCessation 011-22901701, Tele-MANAS 14416 / 1-800-891-4416, 112.
- [ ] All sources `verified: true`.
- [ ] Privacy policy (EN/HI) + disclaimer reviewed; Play Data safety matches reality; complete any health-app declarations Play requires.
- [ ] Tested on a low-end phone and an aggressive battery-saver phone.

Deliverables: repo; README (setup, run, build, release); CLAUDE.md; `docs/` (review-queue, launch-checklist, privacy-policy EN/HI marked "draft — needs legal review", store-listing EN/HI); seeded draft content in EN + HI — ~80 messages, 20–25 learn cards, 8 milestones, 8 myths — all sourced.

Start now with §0 step 1.
