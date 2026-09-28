# Launch checklist

From SPEC §15. Tick each item with who did it and when.

## Required by SPEC

- [ ] A qualified clinician (e.g., a doctor at a Tobacco Cessation Centre) reviews every `health: true` item; record name + date.
- [ ] A native Hindi speaker reviews all Hindi.
- [ ] Re-verify helplines on official sites: NTQLS 1800-11-2356 (hours/days), mCessation 011-22901701, Tele-MANAS 14416 / 1-800-891-4416, 112.
- [ ] All sources `verified: true`.
- [ ] Privacy policy (EN/HI) + disclaimer reviewed; Play Data safety matches reality; complete any health-app declarations Play requires.
- [ ] Tested on a low-end phone and an aggressive battery-saver phone.

## Added during planning

- [ ] `npm run content:check -- --release` passes.
- [ ] App name checked against the Indian trademark register and Play Store search (the name "SAANS" is also used by an MoHFW pneumonia campaign). Get help screen says the app is not affiliated with the Government of India.
- [ ] Play Console: check the current closed-testing requirement for new personal developer accounts (at planning time: 12+ testers for 14 days) and start it early.
- [ ] Play target audience and content rating set; restricted under-18 mode reviewed against Play's policies for teens.
- [ ] Data safety answers match `docs/data-safety.md` (no data collected unless crash reports are opted in; Android backup disabled).
- [ ] Download size < 30 MB, cold start < 3 s on a 2–3 GB RAM phone.
- [ ] Manual matrix from SPEC §12 done: low-end Android, Hindi, 200% font, dark mode, airplane mode, notifications denied, reduced motion.
