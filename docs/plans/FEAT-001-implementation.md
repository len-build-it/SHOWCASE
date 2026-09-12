# Implementation Plan: Living Blueprint portfolio skeleton

Created: 2026-09-11T20:23:09+08:00
Updated: 2026-09-12T20:54:50+08:00
Revision: 4
Status: Approved; Phase 1 and shell refinement implemented and verified
Feature spec and revision: [FEAT-001 revision 3](../features/FEAT-001-living-blueprint.md)
Product and architecture proposals: [Overview revision 5](../product/OVERVIEW.md) and [architecture revision 5](../product/ARCHITECTURE.md).
Len's chat approval: Approved by Len in chat with "I approve this revisions. Proceed to implement" on 2026-09-11T21:20:30+08:00.

Len's shell-refinement approval: Direct request to remove the header and leave a Privacy Policy footer link on 2026-09-12T20:54:50+08:00.
Target branch: `master` confirmed on 2026-09-11.

## Scope

This plan covers FEAT-001/REQ-001 through FEAT-001/REQ-004 and FEAT-001/REQ-007 through FEAT-001/REQ-013.

FEAT-001/REQ-005 and FEAT-001/REQ-006, including audio controls, autoplay handling, looping, and failed-playback tests, are deferred together.

Real project entries and hosting are outside this plan.

Existing untracked project instruction files under `.agents/`, plus `AGENTS.md`, `GEMINI.md`, `.editorconfig`, and `.gitignore`, must be preserved.

## Concrete implementation inputs

Use tracked authored files `site/index.html`, `site/privacy.html`, `site/styles.css`, `site/script.js`, and `site/assets/hammer.svg`.

Use the proposed chapter copy, contact destinations, palette, composition, and hammer storyboard in the feature spec.

Create the hammer as a minimal local vector drawing during implementation; no supplied illustration or external service is required.

Create `scripts/preview.mjs` as the small Node built-in development server defined in architecture revision 2, with the exact launch command `node scripts/preview.mjs`.

Create `scripts/check-intro.mjs` as one focused Node built-in assertion check for release behavior: normal completion, timeout recovery, duplicate release, and motion-preference change must all leave the content available with no residual restrictions.

The check must exercise the actual release logic or a small browser-state stub around that logic, not a duplicate implementation or only a source-text search.

Node v24.14.0 and branch `master` were observed during planning.

Browser scenario verification and screenshots are part of this phase, with no new test framework or dependency.

## Readiness and authority

Exact revision 2 documents approved by Len on 2026-09-11T21:20:30+08:00.

Execution proceeds through Phase 1 verification and checkpoint commit.

## Phase 1: Story skeleton and build-sequence intro

Requirements: FEAT-001/REQ-001 through FEAT-001/REQ-004 and FEAT-001/REQ-007 through FEAT-001/REQ-012
State: Implemented and verified

### Tasks

- [x] Reconcile Git status and the approval record, and run the session setup check required by AGENTS.md if not already checked in the implementation session.
- [x] Create the tracked static files and bounded local preview helper specified above; add no package dependency.
- [x] Implement all five narrative chapters and links using the proposed copy and semantic heading order, with the complete story visible before progressive enhancement.
- [x] Draw the local hammer asset and implement the 3.5-second storyboard connecting the strike to the actual page spine.
- [x] Implement idempotent intro release, a separately armed five-second deadline, a CSS fallback, and the specified missing-script, asset-failure, preference-change, and background-return behavior.
- [x] Implement the positive visual requirements, single truthful project frame, and once-per-chapter connection motion while keeping essential content readable without callbacks.
- [x] Implement the specified responsive layout, keyboard focus, contrast, and reduced-motion behavior; do not add sound controls or media requests.
- [x] Add the one release-logic assertion check and record the browser scenarios below.

### Verification

- [x] Run `node --check site/script.js`, `node --check scripts/preview.mjs`, and `node --check scripts/check-intro.mjs`; each must exit 0.
- [x] Run `node scripts/check-intro.mjs`; all release-logic assertions must pass, with nonzero exit on failure.
- [x] Run `git check-ignore -v site/index.html site/styles.css site/script.js site/assets/hammer.svg scripts/preview.mjs scripts/check-intro.mjs`; expect no output and exit 1, meaning none is ignored.
- [x] Start `node scripts/preview.mjs` in a retained session; it must print `http://127.0.0.1:4173/` and serve only `site/`.
- [x] In PowerShell run `(Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:4173/').StatusCode`; expect 200, and verify every local asset loads with the expected content type and no console errors.
- [x] Request `/AGENTS.md` and an encoded parent-directory path against the preview; expect 404 or 403 without workspace file content, and verify a missing asset returns 404.
- [x] Record the exact browser/version and run scenarios S1-S8 below in a desktop browser; unavailable browser capabilities leave the affected gate pending.
- [x] Save screenshots of the hammer impact, completed desktop story, narrow mobile story, and reduced-motion state under `docs/evidence/FEAT-001/` and link them in the verification record.
- [x] Record actual commands, dates, conditions, outcomes, and limitations in [FEAT-001 verification](../evidence/FEAT-001-verification.md); no runtime result is implied by this checklist.

| Scenario | Requirement coverage | Repeatable action and expected result |
| --- | --- | --- |
| S1: Standard intro | FEAT-001/REQ-002, REQ-003 | In a foreground tab with normal motion, reload and time activation to release; expect one strike and release in 3-4 seconds, no skip action from click/scroll/keys, and no replay from chapter links. |
| S2: Story and art direction | FEAT-001/REQ-001, REQ-003, REQ-004, REQ-008, REQ-012 | Read all five chapters and compare to the storyboard and copy; confirm the impact connects to the actual spine, asymmetric desktop annotations become a narrow single column, links work, and no invented project appears. |
| S3: Reduced motion | FEAT-001/REQ-007 | Enable reduced motion before load, then separately change it mid-intro; both must reveal static content immediately, with no remaining moving decoration. |
| S4: Recovery | FEAT-001/REQ-010 | Disable JavaScript, block its request, fail the hammer request, and suppress the normal completion event in separate runs; content must be immediate without script and available by five seconds for active-intro failure, with scroll and input released. |
| S5: Interrupted enhancement | FEAT-001/REQ-010 | Simulate an exception after intro activation and delay script loading; verify the independent fallback releases all restrictions and a late script never covers readable content. Background the tab past the deadline, then return; expect immediate content without replay. |
| S6: Layout and keyboard | FEAT-001/REQ-009 | Test 1440x900, 768x1024, 390x844, and 320x568 CSS-pixel viewports, then 200% zoom from the desktop viewport; confirm no clipping or unintended horizontal scroll, visible focus, usable links, specified contrast, and semantic reading order in the accessibility tree. |
| S7: Silent skeleton | FEAT-001/REQ-011 | Inspect initial load and navigation network activity and controls; expect no audio request, player, or sound toggle. Do not mark REQ-005 or REQ-006 verified. |
| S8: Normal reading | FEAT-001/REQ-012 | Scroll back and forth and use chapter links; reveal each connection at most once, keep headings/text readable regardless of animation callbacks, and preserve ordinary scrolling. |

Viewport emulation establishes browser layout only; Len's physical-device checks remain separately pending and do not masquerade as completed desktop evidence.

### Review and checkpoint

- [x] Review correctness, scope, dependencies, accessibility, and Ponytail simplicity.
- [x] Update the plan, verification record, and current handoff.
- [ ] Stage only reviewed Phase 1 paths and verify the staged diff.
- [ ] Commit with the unique phase message `feat(portfolio): add living blueprint skeleton` and verify Git reports success.

Checkpoint message: `feat(portfolio): add living blueprint skeleton`
Phase completion requires all gates and a successful commit.

## Deferred follow-up

Audio integration and all verification for FEAT-001/REQ-005 and FEAT-001/REQ-006 remain pending until Len supplies the MP3 and approves that delivery.

Completion of this phase means the silent skeleton is complete, not that all FEAT-001 requirements have passed.

## Phase 2: Minimal site shell

Requirements: FEAT-001/REQ-009 and FEAT-001/REQ-013
State: Implemented and verified

### Tasks

- [x] Remove the persistent site header and chapter navigation without changing the narrative reading order.
- [x] Replace the colophon footer with a Privacy Policy link.
- [x] Add the static Privacy Policy page and a back link to the portfolio.
- [x] Update the relevant product, architecture, feature, evidence, index, and handoff documents.

### Verification

- [x] Open the Privacy Policy link in the local preview and confirm the policy page renders.
- [x] Follow the policy page back link and confirm it returns to the story page.
- [x] Inspect the story accessibility tree and confirm no site-wide header or navigation remains.
- [x] Run syntax, static music, preview, and Git diff checks before the shell refinement checkpoint.

The music widget header and controls remain unchanged by this phase.

Project chapters start only after Len supplies project materials and approves a project-content revision.

## Recovery

Follow `AGENTS.md` for the three-attempt limit and immediate blockers.

Record unresolved work and attempt counts in the current handoff.

Interrupted or failing work remains uncommitted and the phase remains incomplete.

## Revision history

- Revision 1 proposed one phase but targeted ignored output paths and mixed deferred audio checks into the skeleton.
- Revision 2 retains one phase and adds concrete tracked files, preview and release checks, storyboard inputs, failure scenarios, screenshot evidence, and corrected approval attribution.
- Revision 3 records Len's chat approval, completed Phase 1 tasks and verifications, and prepares for the phase checkpoint commit.
- Revision 4 records the approved minimal site-shell refinement and Privacy Policy route verification.
