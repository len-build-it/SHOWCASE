# FEAT-003: Cursor grid spotlight

Created: 2026-09-12T21:04:59+08:00
Updated: 2026-09-12T22:38:23+08:00
Revision: 3
Status: Approved by Len through the 2026-09-12 request to make the neon-blue line highlight 50% less wide

## Purpose and success

Visitors using a mouse or trackpad should feel the blueprint respond to their cursor without adding visual noise or leaving a trail.

The feature succeeds when the current pointer location produces a strong neon-blue highlight on nearby grid lines only, follows pointer movement immediately, and disappears when the pointer leaves the page.

## Scope and non-goals

This delivery adds one live cursor spotlight to the existing story page background.

It uses a strong neon-blue line treatment, does not move the grid, and keeps only the latest pointer position.

It excludes filled cursor-area glow, trails, particles, canvas rendering, pointer icons, persistence, settings, touch behavior, and new dependencies.

## User flows

### Fine-pointer hover

The visitor moves a mouse or trackpad over the page.

The current location brightens nearby major and dense grid lines in a strong approximately 110px-radius neon-blue area and follows the pointer without lag or accumulated marks.

When the pointer leaves the document, the spotlight disappears.

### Touch and reduced motion

Touch and coarse-pointer users see the unchanged static blueprint background.

Visitors who prefer reduced motion see the unchanged static blueprint background.

### Fallback

If scripting is disabled, the page remains readable with the original grid.

## Requirements and acceptance criteria

| ID | Required behavior | Observable pass/fail criterion |
| --- | --- | --- |
| REQ-001 | Show a localized neon-blue grid-line highlight at the current fine-pointer position. | Moving a mouse or trackpad over the story visibly brightens nearby major and dense grid lines in a single responsive area. |
| REQ-002 | Brighten only the nearby blueprint grid lines without moving them. | Existing grid lines remain aligned and stationary, with no filled spotlight or cursor-area wash. |
| REQ-003 | Avoid traces and stale state. | The effect contains only the latest pointer location and clears on pointer leave; no trail or persistent mark remains. |
| REQ-004 | Stay responsive. | Pointer updates are coalesced through one animation-frame callback and do not create one render loop per event. |
| REQ-005 | Preserve accessible and low-motion behavior. | The feature is inactive for coarse pointers and `prefers-reduced-motion: reduce`; keyboard reading order and controls remain unchanged. |

## Data and interfaces

The feature stores only two CSS custom properties for the latest viewport pointer coordinates and one transient active state on `body`.

The existing static browser script and stylesheet are the only interfaces.

## Quality constraints

Use the existing static HTML, CSS, and JavaScript stack.

Add no runtime dependency or markup.

Use `pointermove` with a single `requestAnimationFrame` update path, `pointerleave` cleanup, and `pointerType` filtering.

Preserve the existing blueprint palette, responsive layout, focus styles, intro recovery, music widget, and reduced-motion rules.

## Decisions and assumptions

### Confirmed requirements

- Len approved the cursor spotlight direction with "approve spotlight" on 2026-09-12.
- Len requested the filled spotlight be removed and the line-only effect be stronger and neon blue on 2026-09-12.
- Len requested the neon-blue line highlight be 50% less wide on 2026-09-12.
- The highlight should remain responsive and leave no trace.

### Approved decisions

- Use strong neon-blue grid-line colors for the transient overlay.
- Enable only for fine pointers.
- Disable for reduced-motion users.
- Use an approximately 110px-radius masked grid-line overlay with immediate position updates.

### Assumptions

- The page viewport is the correct coordinate space because the effect is fixed to the visible background.
- The existing browser support target handles CSS custom properties, masks, radial gradients, `pointermove`, and `requestAnimationFrame`.
- The radial gradient is used only as the line-overlay mask, not as a filled background glow.

## Open questions and readiness

No blocking questions remain for this delivery.

The line-only neon refinement is ready for verification and handoff on its isolated branch.

## Revision history

- Revision 1 defined the responsive no-trace cursor grid spotlight.
- Revision 2 removes the filled spotlight and specifies the stronger neon-blue grid-line-only treatment requested on 2026-09-12.
- Revision 3 halves the highlight diameter by reducing its mask radius from 220px to 110px.
