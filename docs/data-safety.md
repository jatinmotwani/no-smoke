# Play Data safety answers (draft)

> Filled in P6.5. Must match what the shipped build actually does.

- Data collected: none, unless the user opts in to crash reports.
- Crash reports (opt-in, never for under-18): crash logs and diagnostics only; PII scrubbed; no health data.
- Data shared with third parties: none.
- Encrypted in transit: yes (crash reports only).
- Users can request deletion: yes — "Delete all data" in Settings deletes everything on the phone.
- Android backup: disabled (`allowBackup: false`).
