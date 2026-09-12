# Implementation Plan: FEAT-002 Glass music widget

Created: 2026-09-12T20:15:05+08:00
Updated: 2026-09-12T22:05:00+08:00
Revision: 6
Status: Complete; compact widget refinement implemented and verified
Feature spec and revision: [FEAT-002 revision 4](../features/FEAT-002-music-widget.md)
Approved baseline and architecture revisions: [Product revision 4](../product/OVERVIEW.md), [Architecture revision 4](../product/ARCHITECTURE.md)
Len's chat approval: `okay proceed with implementing, also make sure to make changes on the documentation` on 2026-09-12 after the round-1 proposals.

Len's reference-UI approval: Direct request to change the current widget UI to the supplied player reference on 2026-09-12T21:13:53+08:00.
Target branch: `master` (verified before implementation)

## Scope

Implement FEAT-002/REQ-001 through FEAT-002/REQ-009 in the existing static site.

Preserve the existing untracked `music/` directory and unrelated working-tree changes.

## Phase 1: Working local music widget

Requirements: FEAT-002/REQ-001 through FEAT-002/REQ-009
State: Complete

### Tasks

- [x] Add the native audio element, track selector, controls, status, and waveform markup.
- [x] Add the minimum glassmorphism, responsive, focus, and reduced-motion styles.
- [x] Add local playlist playback, autoplay fallback, track switching, playlist wraparound, mute state, analyser updates, and CSS fallback.
- [x] Add one small static validation check for the playlist and required widget hooks.
- [x] Update product, architecture, index, handoff, and verification records.
- [x] Repair the browser bootstrap, autoplay fallback, and widget-styled track menu after user verification.
- [x] Reshape the widget around the reference hierarchy with centered metadata, progress seeking, icon controls, and a functional favorite action.
- [x] Tighten the card dimensions, move mute to the lower-right control slot, and add an upward-opening picker with a drag-handle fallback.

### Verification

- [x] `node --check site/script.js` exits 0.
- [x] `node scripts/check-intro.mjs` passes all existing intro assertions.
- [x] `node scripts/check-music.mjs` passes playlist and widget-hook assertions.
- [x] Preview server returns 200 for the page and all five MP3 assets.
- [x] Browser scenarios verify autoplay fallback, controls, track selection, waveform structure, responsive desktop placement, and no horizontal overflow in the available browser.
- [x] Browser scenarios verify the corrected plain-script bootstrap, custom listbox open/select behavior, and sound-enable gesture.
- [x] Browser scenarios verify track selection, favorite state, progress control, and the reference-style player layout.
- [x] Browser scenarios verify the compact dimensions, lower-right mute placement, and upward picker interaction.
- [x] Evidence is recorded in `docs/evidence/FEAT-002-verification.md`; visual screenshot inspected in the browser session.

### Review and checkpoint

- [x] Review correctness, accessibility, scope, dependency count, and Ponytail simplicity.
- [x] Update plan, evidence, and current handoff with actual results.
- [x] Stage only reviewed correction paths and verify the staged diff.
- [x] Commit with `fix(portfolio): refine music widget interface` and verify Git reports success.

Checkpoint message: `fix(portfolio): refine music widget interface`
Phase completion requires all gates and a successful commit.

## Recovery

Follow project `AGENTS.md` for the three-attempt limit.

If browser autoplay or analyser behavior differs by environment, record the actual result and preserve the fallback path rather than making playback a content prerequisite.
