# Implementation Plan: Project showcase stories and slider

Created: 2026-10-03T19:14:28+08:00
Updated: 2026-10-03T19:40:14+08:00
Revision: 1
Status: Approved for implementation under the direct request recorded in FEAT-004.
Feature spec and revision: [FEAT-004 revision 1](../features/FEAT-004-project-showcase.md).
Len's chat approval: Direct implementation request on 2026-10-03, recorded in FEAT-004 revision 1.

## Scope

This plan implements FEAT-004/REQ-001 through FEAT-004/REQ-007.

The work is limited to the existing page's hero and project section, a small native-scroll slider enhancement, and the project/product/architecture documentation and evidence records.

Do not modify the music player, intro, privacy page, cursor spotlight, contact details, project source repositories, hosting, or deployment.

## Phase 1: Project stories and manual slider

State: In progress

### Tasks

- [x] Reconcile the project inventory, current approved scope, Git status, and the user's direct request.
- [x] Add the 2026 RSTW champion note, attributed to Team Aquanons.
- [x] Replace the placeholder with the 17 ordered, qualified project and supporting-work entries.
- [x] Implement the no-dependency horizontal scroll-snap track, labeled controls, position count, keyboard arrows, and reduced-motion handling.
- [x] Verify 17 slide entries, first and end control states, next/previous navigation, focused-track arrow-key navigation, and the 768px rendered layout.
- [ ] Verify 1440px, 390px, and 320px layouts plus direct touch and reduced-motion emulation when a browser with those controls is available.
- [x] Run `node --check site/script.js`, `node --check scripts/preview.mjs`, `node --check scripts/check-intro.mjs`, `node scripts/check-intro.mjs`, `node scripts/check-music.mjs`, and `node scripts/check-spotlight.mjs`.
- [x] Record actual verification results and limitations; review the page in the in-app browser.
- [ ] Review the change against FEAT-004, preserve the pre-existing untracked private inventory note, inspect only the intended staged paths, and commit the completed phase.

### Verification gates

- `node --check site/script.js` exits 0.
- `node scripts/check-intro.mjs`, `node scripts/check-music.mjs`, and `node scripts/check-spotlight.mjs` pass.
- The local preview serves the page, stylesheet, and script successfully.
- Browser checks confirm there are 17 unique project slides, the award says Team Aquanons, the slider advances through the complete range with buttons and keyboard, and there is no page-level horizontal overflow at 1440x900, 768x1024, 390x844, and 320x568.
- Browser checks confirm the intro, music controls, project content, and privacy link remain available; reduced-motion slider movement is immediate when the browser can emulate that preference.
- The source diff contains no copied private or restricted assets, new dependency, accidental inventory report staging, or unrelated behavior change.

## Revision history

- Revision 1 records the user-authorized project-story and slider implementation scope.
