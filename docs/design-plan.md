# Design plan

Status: **draft for owner review**. Tokens, type scale and base components are implemented (P0.7: `src/ui/tokens.ts`, `Text`, `Button`, `Screen`); the answers to §10 shape the hero (P2.8), icons (P2) and dark-mode builds (P4.1).

Mock of the revised plan (rendered in Chromium with the real font): [`design/mock-home-sos.png`](design/mock-home-sos.png). Type test: [`design/type-test-mukta-vs-hind.png`](design/type-test-mukta-vs-hind.png).

## 1. Direction

An Indian morning after the smoke lifts. Lime-washed walls (chuna, often tinted with neel), indigo ink, a neem tree on the skyline, a rooftop water tank, marigolds kept for celebrations. The Home sky is the one bold element: it starts hazy and clears as smoke-free days add up. Everything else is quiet: flat surfaces, hairline dividers, one green action colour. No shadows, no gradients, no fear imagery.

## 2. Colour tokens

Six named tokens, each with a light and dark value, plus a few tones derived for specific roles.

| Token | Light | Dark | Role |
|---|---|---|---|
| `chuna` (lime-wash) | `#F3F6F4` | `#111827` | App background. A faintly blue-green off-white: not cream, not hospital white. Dark = night. |
| `neel` (indigo ink) | `#1D2536` | `#E9EEF0` | All text and icons. Not near-black. |
| `neem` (leaf green) | `#2F6B45` | `#8FCB9C` | Actions only: SOS button, primary buttons, links, focus, selected state. |
| `sky` (clear morning) | `#CFE5F3` | `#1C3553` | Home hero sky, only there. Dark = clear night sky. |
| `haze` (smoke) | `#D9D4DA` | `#3A3744` | The haze layer over the hero sky. Grey-mauve, deliberately not brown. |
| `marigold` (genda) | `#F0A21A` | `#F5B53D` | Milestones only: badges, the milestone share card, the unlocked health timeline marker. |

Derived tones:

| Tone | Light | Dark | Role |
|---|---|---|---|
| `neelSoft` | `#4B5569` | `#AEB7C6` | Secondary text |
| `onNeem` | `#FFFFFF` | `#0E1F14` | Text on neem fills |
| `neemTint` | `#DCEADF` | `#1E3A2B` | Breathing circle's outer ring, selected-chip background |
| `onMarigold` | `#1D2536` | `#1D2536` | Text on marigold (always dark; light text fails in dark mode) |
| `marigoldDeep` | `#A35F00` | `#F5B53D` | Marigold strokes/icons on light surfaces (plain marigold is 1.95:1 there) |
| `line` | `#C9D1CC` | `#344054` | Hairline dividers (decorative) |
| `dawn` | `#FFF1CC` | `#E9EEF0` | Sun (light) / moon (dark) in the hero; decorative |
| `tree` | `#2F6B45` | `#0B1320` | Skyline silhouette; decorative |

Measured contrast (WCAG 2.x), light / dark:

| Pair | Light | Dark | Needs |
|---|---|---|---|
| `neel` on `chuna` | 14.09 | 15.17 | 4.5 |
| `neelSoft` on `chuna` | 6.89 | 8.78 | 4.5 |
| `neel` on `sky` / on `haze` (hero text, both extremes) | 11.79 / 10.50 | 10.66 / 9.92 | 4.5 |
| `neelSoft` on `sky` / on `haze` | 5.76 / 5.13 | 6.17 / 5.74 | 4.5 |
| `onNeem` on `neem` (SOS label) | 6.34 | 9.14 | 4.5 |
| `neem` on `chuna` (links, button outlines) | 5.83 | 9.45 | 4.5 |
| `onMarigold` on `marigold` | 7.22 | 8.44 | 4.5 |
| `marigoldDeep` on `chuna` (milestone icon) | 4.60 | 9.76 | 3 |

Rules: text never sits on `marigold` unless it's `onMarigold`. `sky` and `haze` appear only in the hero. Nothing uses a gradient; the haze is flat layers with opacity.

## 3. Type

**Mukta** (Ek Type, SIL OFL), bundled as TTF, two weights: Regular 400 and SemiBold 600. Chosen over Hind after a render test:
- Every conjunct in the test set forms correctly in Mukta (क्ष त्र ज्ञ श्र द्ध द्य ह्म ह्य क्त स्त्र ट्ट ड्ड ङ्ग); Hind shows a visible halant in ङ्ग.
- Mukta has tabular digits (`tnum`), so a running timer doesn't jitter. Hind has none.
- Both have ₹. Mukta covers 127 Devanagari code points to Hind's 94.

Tabular digits are used **only** for ticking timers: they add a gap after ₹ and before "1" in static numbers. Latin digits in both locales.

| Style | Size / line height (sp) | Weight | Use |
|---|---|---|---|
| `display` | 56 / 60 | 600 | Hero time ("12 days 4 hrs"): number at 56, unit at 22 |
| `title` | 28 / 36 | 600 | Screen titles, hero stats (₹2,340 · 96), SOS timer |
| `heading` | 22 / 32 | 600 | Section headings, sheet questions |
| `body` | 17 / 27 | 400 | All running text, list rows |
| `label` | 18 / 26 | 600 | Button labels |
| `small` | 16 / 24 | 400 | Secondary text, stat captions. Nothing readable goes below 16. |
| `tab` | 14 / 18 | 400/600 | Tab bar labels only (with an icon; see §7) |

Line heights are ~1.5–1.6× because Mukta's Devanagari matras reach well above and below the Latin line (ascender 1.13 em, descender 0.53 em). Sentence case everywhere; no all-caps labels.

## 4. Shape, space, icons

- Spacing on a 4dp grid: 4, 8, 12, 16, 20, 24, 32, 48. Screen side padding 20.
- Radius is chosen per job, not one value for everything: the SOS button and full-width primary buttons are pills; bottom sheets get 20 on the top corners; answer tiles and chips get 8–12; the hero and list rows are square and full-bleed.
- No cards with shadows. Lists are rows separated by `line` hairlines; grouping is done with space and headings.
- Tap targets ≥48dp; the SOS button is 64dp tall and sits in the bottom third (thumb zone).
- Icons: a small hand-drawn SVG set (≈12: tabs, settings, close, phone, chat, walk, heart, back, check) drawn with react-native-svg, 2dp strokes, `neel`. No icon font or library. No brand logos (WhatsApp is named in text, not shown as a logo).

## 5. The "air clearing" hero

Layers, back to front: `sky` fill → `dawn` sun (moon in dark) low on the right → `tree` skyline silhouette (flat rooftops, a water tank, a neem tree) → `haze` layer at opacity *h* → text.

*h* steps down at the same points as the progress milestones, so the sky visibly changes on meaningful days rather than drifting imperceptibly:

| Smoke-free days | 0 | 1 | 3 | 7 | 14 | 30 | 90 | 180 | 365 |
|---|---|---|---|---|---|---|---|---|---|
| Haze opacity *h* | 0.85 | 0.75 | 0.65 | 0.55 | 0.45 | 0.35 | 0.25 | 0.12 | 0 |

- Before the quit date and during cut-down: full haze (0.85), with the countdown or today's limit as the headline.
- The sky is drawn statically for the current step; it doesn't animate. The breathing circle stays the only continuous motion.
- Text contrast is checked at both ends (table in §2), so any *h* is safe.
- **After a slip** (proposal, see open question 1): the sky follows *total* smoke-free days, which never go down, while the numbers show the current streak honestly. The air you've cleared stays cleared.

## 6. Wireframes v1 (first draft)

```
HOME v1                                  SOS v1
┌──────────────────────────────┐        ┌──────────────────────────────┐
│ (hazy sky)            ( sun )│        │ ✕                  Get help  │
│ 12 days 4 hrs                │        │         (  breathing  )      │
│ smoke-free · ₹2,340 saved ·  │        │         (   circle    )      │
│ 96 not smoked                │        │  4:12 ride it out    Skip    │
│ Next: 2 weeks, in 1 day      │        │ Try something else           │
│   ▁▁▂▂▁▁▁▁▁▁▁▁▁▁▁(neem tree) │        │  Urge surfing                │
├──────────────────────────────┤        │  My reasons                  │
│ Today's check-in       Start │        │  10-minute walk              │
│ "For Meera's school fees"    │        │  Quick distraction           │
│ ( Craving? Get through it  ) │        │  Message Rahul               │
│   I smoked   (neem green)    │        │  Call quitline               │
│ Home  Progress  Learn  Help  │        │ Log: 1 2 3 4 5 6 7 8 9 10    │
└──────────────────────────────┘        │ Did you smoke?   No   Yes    │
                                        └──────────────────────────────┘
```

## 7. Critique of v1 against SPEC §9

1. **Sun collides with the headline** in the top-right; at 200% font the numbers run into it. → Sun moves low, behind the neem tree (a rising sun reads as morning and hope).
2. **Stats as one "·"-joined line** wrapped mid-phrase ("96 not / smoked") even at 100%. §9 asks for big legible numerals for ₹ too. → Two stat blocks with `title`-size numbers and `small` captions, stacking under each other at large font sizes.
3. **"Next: 2 weeks, in 1 day"** is confusing. → "2 days to your 2-week mark". Plain verbs, second person.
4. **"I smoked" in neem green right under SOS** competes with the main action and invites mis-taps. → Neutral `neelSoft` underlined text, 48dp tall, 12dp+ below the SOS button. Still one tap from Home.
5. **The SOS log's 1–10 row** gives each number ~24dp on a 320dp phone, half the 48dp floor. → Two rows of five tiles (≥52dp each). Still two taps: intensity, then No/Yes.
6. **The log sat inside the SOS screen**, and at 200% font the SOS screen can't fit circle + timer + six tools. → The tool list scrolls under a fixed "I'm through it" button; the log is a bottom sheet that opens on "I'm through it", Close, or Skip-then-close.
7. **Naming drift**: "Craving? Get through it" on Home vs "ride it out" in SOS. §9: an action keeps its name. → The SOS exit button is "I'm through it"; the timer caption is "riding it out" as a description, not an action.
8. **"Unmistakably Indian"** relied on copy alone. → The skyline gets a rooftop water tank and a neem tree; chuna/neel/neem/marigold carry the rest. No flags, no monuments, no clichés.
9. **Tab bar at 200% font**: "Get help" wraps and pushes the bar to three lines. → Icon + 14sp label, label scale capped at 1.6×; TalkBack reads the full label. This is the one place below 16sp, and it's a label, not body text.
10. **Templated tells** (§9): v1 had none of the rounded-card-with-shadow pattern, but "Try something else" risked becoming a card grid. → It stays a hairline list with right-aligned hints ("2 min", "free", "WhatsApp").
11. **Timer copy**: "4:12 ride it out" implies the craving ends when the timer does. §7.3 forbids claiming how long cravings last unless sourced. → The timer is a counter the user can skip. No copy says the urge will pass by then (RQ-006).

## 8. Wireframes v2 (revised)

```
HOME v2 (after quit date)                SOS v2                                 SOS log sheet
┌──────────────────────────────┐        ┌──────────────────────────────┐       ┌──────────────────────────────┐
│ Smoke-free for            ⚙  │        │ Close                Get help│       │ (SOS dimmed behind)          │
│ 12 days 4 hrs     (display)  │        │                              │       ├──────────────────────────────┤
│                              │        │       ╭────────────╮         │       │ How strong was it?           │
│ ₹2,340        96             │        │      (  Breathe in  )        │       │ [ 1 ][ 2 ][ 3 ][ 4 ][ 5 ]    │
│ saved         not smoked     │        │       ╰────────────╯         │       │ [ 6 ][ 7 ][ 8 ][ 9 ][10 ]    │
│ 2 days to your 2-week mark   │        │   3:42 riding it out · Skip  │       │ Mild             Very strong │
│                              │        ├──────────────────────────────┤       │                              │
│            (dawn)  ♣ (neem)  │        │ Try something else           │       │ Did you smoke?               │
│ ▁▁▂▂▁▃▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁ │        │ Surf the urge           2 min│       │ [    No    ]  [    Yes    ] │
├──────────────────────────────┤        │ My reasons                   │       └──────────────────────────────┘
│ How was today?      Check in │        │ 10-minute walk               │        No → saved, back to Home.
│ "For Meera's school fees"    │        │ Quick distraction            │        Yes → saved, opens "I smoked"
│                              │        │ Message Rahul        WhatsApp│        with count + trigger.
│ (   Craving? Get through it )│        │ Call the quitline        free│
│           I smoked           │        │ (scrolls)                    │
│  ⌂      ↗        ≡      ♡    │        │ (      I'm through it       )│
│ Home Progress Learn Get help │        └──────────────────────────────┘
└──────────────────────────────┘
```

Before the quit date the hero reads "Quit day in / 3 days", with "₹0 saved so far" and "Mon, your quit day", and a line about the user's first trigger ("Tomorrow: plan for your first chai").

## 9. Motion, haptics, accessibility

- **Breathing circle**: the inner `neem` disc scales between 0.65 and 1.0 inside a `neemTint` ring; the label switches "Breathe in" / "Breathe out". Pace (e.g. 4 s in, 6 s out) awaits clinician review (RQ-006). A light haptic tick at each phase change.
- **Reduced motion**: static circle, label counts down "Breathe in… 4, 3, 2, 1", haptics kept.
- **200% font**: the hero grows downward (no fixed height); stat blocks stack; SOS tools scroll; sheets scroll; buttons grow taller rather than truncating.
- Every control has an accessibility label and role; the SOS button's label is the same as its text; the timer announces only when the user focuses it.
- Colour never carries meaning alone: selected tiles are filled and bold, and milestones have an icon plus text.

## 10. Open questions for you

1. **Haze after a slip**: follow total smoke-free days (never re-hazes, my recommendation) or the current streak (literal, but a slip wipes the sky)?
2. **Skyline**: are a rooftop water tank and a neem tree the right everyday-Indian cue, or would you prefer something else (a chai stall awning, a temple-free city roofline)?
3. **Icons**: OK to hand-draw ~12 SVG icons rather than add an icon library?
4. **`expo-system-ui`**: Android builds need it for `userInterfaceStyle: 'automatic'` (dark mode following the phone). Expo Go doesn't, so it isn't needed until the first dev build. Not on the approved list; OK to add in P4.1?
