# Implementation Plan: FEAT-003 Cursor grid spotlight

Created: 2026-09-12T21:04:59+08:00
Updated: 2026-09-12T21:53:24+08:00
Revision: 2

Status: Complete in working tree; commit pending
Feature spec and revision: [FEAT-003 revision 2](../features/FEAT-003-cursor-spotlight.md)
Approved baseline and architecture revisions: [Product revision 6](../product/OVERVIEW.md), [Architecture revision 6](../product/ARCHITECTURE.md)
Len's chat approval: "approve spotlight" on 2026-09-12
Target branch: codex/neon-grid-lines

## Scope

Implement FEAT-003/REQ-001 through FEAT-003/REQ-005 in the existing static site.

Preserve existing working-tree changes and avoid new dependencies or markup.

## Phase 1: Responsive no-trace spotlight

Requirements: FEAT-003/REQ-001 through FEAT-003/REQ-005
State: Complete

### Tasks

- [x] Add the localized line-only neon-blue grid highlight to `site/styles.css`.
- [x] Add one coalesced fine-pointer update path and cleanup to `site/script.js`.
- [x] Add a static assertion for the required hooks and reduced-motion guard.
- [x] Update evidence and handoff with actual verification.

### Verification

- [x] `node --check site/script.js` exits 0.
- [x] Run the spotlight assertion check and confirm required styles and script hooks are present.
- [x] Use the local preview in a browser to confirm movement and no horizontal overflow; record pointer-leave and preference limitations.
- [x] Record actual results in `docs/evidence/FEAT-003-verification.md`.
- [x] Confirm the overlay contains no filled cursor-area background glow.

### Review and checkpoint

- [x] Review correctness, accessibility, scope, dependencies, and Ponytail simplicity.
- [x] Update plan, evidence, and current handoff.
- [ ] Stage only reviewed phase-related paths and verify the staged diff.
- [ ] Commit with a phase checkpoint after handoff approval.

Checkpoint message: `feat(portfolio): add cursor grid spotlight`
The implementation is verified in the working tree; the checkpoint commit is intentionally pending for the receiving model.

## Recovery

Follow project `AGENTS.md` for the three-attempt limit.

If the browser cannot expose a fine-pointer interaction in the available environment, record the static checks and limitation without weakening the touch or reduced-motion guard.
