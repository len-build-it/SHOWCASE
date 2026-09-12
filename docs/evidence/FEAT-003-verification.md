# Verification: FEAT-003 Cursor grid spotlight

Created: 2026-09-12T21:04:59+08:00
Updated: 2026-09-12T21:10:37+08:00
Revision: 1

| Requirement / phase | Check or scenario | Environment and conditions | Actual result | When run | Evidence / limitations |
| --- | --- | --- | --- | --- | --- |
| Syntax and static hooks | `node --check site/script.js`, `node --check scripts/check-spotlight.mjs`, and `node scripts/check-spotlight.mjs`. | Windows Node.js v24.14.0. | Passed: JavaScript parsed and the spotlight stylesheet, animation-frame path, pointer filter, pointer-leave cleanup, and reduced-motion guard were found. | 2026-09-12T21:10:37+08:00 | Static coverage only. |
| Existing intro regression | `node scripts/check-intro.mjs`. | Local Node.js mock virtual-timer assertions. | Passed: all 7 existing intro release assertions. | 2026-09-12T21:10:37+08:00 | Preserves FEAT-001 behavior. |
| Existing music regression | `node scripts/check-music.mjs`. | Local Node.js filesystem and source assertions. | Passed: five local tracks, widget hooks, analyser, and playlist advance remained valid. | 2026-09-12T21:10:37+08:00 | Preserves FEAT-002 behavior. |
| Fine-pointer movement | Drag the pointer across the local preview and inspect the live body state. | Codex in-app browser, local preview at 806x622 CSS pixels. | Passed: body received `cursor-spotlight-active`, latest coordinates were `520px` and `320px`, and the rendered screenshot showed the localized grid glow. | 2026-09-12T21:08:00+08:00 | One available browser environment. |
| Layout regression | Inspect `document.documentElement.scrollWidth <= window.innerWidth` after pointer movement. | Same local preview and browser state. | Passed: no horizontal overflow. | 2026-09-12T21:08:00+08:00 | Does not establish physical-device behavior. |
| Pointer leave and reduced motion | Review cleanup path and reduced-motion guard. | Source inspection; embedded browser did not provide direct touch or preference emulation for this run. | Passed statically; direct pointer-leave and reduced-motion browser scenarios not run. | 2026-09-12T21:10:37+08:00 | Physical touch, coarse-pointer, and reduced-motion validation remain pending. |
| Diff hygiene | `git diff --check`. | Current worktree with pre-existing unrelated page and music-widget edits. | Passed: no whitespace errors. | 2026-09-12T21:10:37+08:00 | Existing unrelated edits were preserved and are not part of the spotlight scope. |
