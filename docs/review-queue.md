# Review queue

Open questions for a clinician, a native Hindi speaker, or the owner. Anything in the app marked `TODO(clinician-review)` has a row here.

How to use: add a row when you write a `TODO(clinician-review)`, propose a source, or can't verify a fact. Quote the supporting line from the source when there is one, so the reviewer can check the wording against it. Move the row to "Resolved" with who decided and when.

Status: `open` → `answered` → `applied`.

## Open

| ID | Area | Question | Proposed / notes | Needs | Status |
|---|---|---|---|---|---|
| RQ-001 | Helplines | NTQLS 1800-11-2356: confirm hours (8 AM–8 PM?) and whether it is closed on Mondays. | Check ntqls.in and NTCP site; record date checked. | Owner | open |
| RQ-002 | Helplines | Confirm the URL for NTCP's list of Tobacco Cessation Centres. | Check ntcp.mohfw.gov.in. | Owner | open |
| RQ-003 | Dependence | HSI is validated for cigarettes. For bidi-only users SPEC says use time-to-first alone. What bands should that map to? | Time-to-first score 0–3 → low 0–1, moderate 2, high 3 (proposal only). `TODO(clinician-review)` | Clinician | open |
| RQ-004 | Dependence | People who smoke both cigarettes and bidis: add both per-day counts for the HSI per-day item? | Sum sticks/day (proposal only). `TODO(clinician-review)` | Clinician | open |
| RQ-005 | Mood safety net | Thresholds: "very low" = mood 1 on 3 consecutive check-ins. Should mood 2 count? Should a gap day break "consecutive"? | Mood 1 only; consecutive = consecutive check-ins, not days (proposal only). `TODO(clinician-review)` | Clinician | open |
| RQ-006 | SOS | Breathing pace for the SOS circle (e.g. 4 s in, 6 s out). No registry source covers a specific pace. | Needs a clinician's OK on the pace, and copy that makes no claim about how long cravings last. | Clinician | open |
| RQ-007 | Scheduler | Default "usual time" per trigger before the user has logged data (e.g. chai = wake + 30 min, after meals = 13:30 and 20:30). Behavioural default, not a health claim. | List to be written in P1.5. | Owner | open |
| RQ-008 | Onboarding | Asking "Are you using a quit medicine prescribed by a doctor?" so the §3.6 mood-change card can be shown. Hidden for under-18. | Optional field `quitMedicine`, "prefer not to say" allowed. | Clinician | open |

## Proposed sources

None yet. Sources are never added to `src/content/sources.ts` without review.

| Proposed ID | Citation | Why it's needed | Status |
|---|---|---|---|

## Resolved

| ID | Decision | Decided by | Date |
|---|---|---|---|
