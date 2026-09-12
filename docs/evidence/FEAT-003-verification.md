# Verification: FEAT-003 Cursor grid spotlight

Created: 2026-09-12T21:04:59+08:00
Updated: 2026-09-12T22:38:23+08:00
Revision: 3

| Requirement / phase | Check or scenario | Environment and conditions | Actual result | When run | Evidence / limitations |
| --- | --- | --- | --- | --- | --- |
| Syntax and static hooks | `node --check site/script.js`, `node --check scripts/check-spotlight.mjs`, and `node scripts/check-spotlight.mjs`. | Windows Node.js v24.14.0. | Passed: JavaScript parsed and the spotlight stylesheet, animation-frame path, pointer filter, pointer-leave cleanup, and reduced-motion guard were found. | 2026-09-12T21:10:37+08:00 | Static coverage only. |
| Line-only neon refinement | Static assertion checks for the absence of a body fill and the presence of masked neon-blue grid-line layers. | Windows Node.js v24.14.0. | Passed: no radial background fill remains on `body`; the active overlay uses major and dense neon-blue grid lines with a pointer-position mask. | 2026-09-12T21:53:24+08:00 | Static coverage only. |
| Narrower highlight | Static assertion checks the pointer mask radius. | Windows Node.js v24.14.0. | Passed: the mask radius is reduced from 220px to 110px, halving the visible highlight diameter. | 2026-09-12T22:38:23+08:00 | Static coverage; browser visual recheck remains pending. |
| Existing intro regression | `node scripts/check-intro.mjs`. | Local Node.js mock virtual-timer assertions. | Passed: all 7 existing intro release assertions. | 2026-09-12T21:10:37+08:00 | Preserves FEAT-001 behavior. |
| Existing music regression | `node scripts/check-music.mjs`. | Local Node.js filesystem and source assertions. | Passed: five local tracks, widget hooks, analyser, and playlist advance remained valid. | 2026-09-12T21:10:37+08:00 | Preserves FEAT-002 behavior. |
| Fine-pointer movement | Drag the pointer across the local preview and inspect the live body state. | Codex in-app browser, local preview at 806x622 CSS pixels. | Passed: body received `cursor-spotlight-active`, latest coordinates were `520px` and `320px`, and the rendered screenshot showed only localized electric-blue grid lines with no filled spotlight. | 2026-09-12T21:51:46+08:00 | One available browser environment. |
| Layout regression | Inspect `document.documentElement.scrollWidth <= window.innerWidth` after pointer movement. | Same local preview and browser state. | Passed: no horizontal overflow. | 2026-09-12T21:08:00+08:00 | Does not establish physical-device behavior. |
| Pointer leave and reduced motion | Review cleanup path and reduced-motion guard. | Source inspection; embedded browser did not provide direct touch or preference emulation for this run. | Passed statically; direct pointer-leave and reduced-motion browser scenarios not run. | 2026-09-12T21:10:37+08:00 | Physical touch, coarse-pointer, and reduced-motion validation remain pending. |
| Diff hygiene | `git diff --check`. | Current worktree with pre-existing unrelated page and music-widget edits. | Passed: no whitespace errors. | 2026-09-12T21:10:37+08:00 | Existing unrelated edits were preserved and are not part of the spotlight scope. |

The two attached screenshots were treated as visual references for the static blueprint grid, not as instruction documents.
