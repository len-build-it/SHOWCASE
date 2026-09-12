# FEAT-003: Cursor grid spotlight

Created: 2026-09-12T21:04:59+08:00
Updated: 2026-09-12T21:04:59+08:00
Revision: 1
Status: Approved by Len through chat approval "approve spotlight" on 2026-09-12

## Purpose and success

Visitors using a mouse or trackpad should feel the blueprint respond to their cursor without adding visual noise or leaving a trail.

The feature succeeds when the current pointer location produces a soft local glow that makes the nearby background grid easier to see, follows pointer movement immediately, and disappears when the pointer leaves the page.

## Scope and non-goals

This delivery adds one live cursor spotlight to the existing story page background.

It uses the existing cyan and drafting-blue palette, does not move the grid, and keeps only the latest pointer position.

It excludes trails, particles, canvas rendering, pointer icons, persistence, settings, touch behavior, and new dependencies.

## User flows

### Fine-pointer hover

The visitor moves a mouse or trackpad over the page.

The current location shows a soft approximately 220px spotlight that brightens the nearby grid and follows the pointer without lag or accumulated marks.

When the pointer leaves the document, the spotlight disappears.

### Touch and reduced motion

Touch and coarse-pointer users see the unchanged static blueprint background.

Visitors who prefer reduced motion see the unchanged static blueprint background.

### Fallback

If scripting is disabled, the page remains readable with the original grid.

## Requirements and acceptance criteria

| ID | Required behavior | Observable pass/fail criterion |
| --- | --- | --- |
| REQ-001 | Show a local spotlight at the current fine-pointer position. | Moving a mouse or trackpad over the story visibly brightens a single soft area around the pointer. |
| REQ-002 | Brighten the nearby blueprint grid without moving it. | Existing grid lines remain aligned and stationary while the area under the pointer becomes more visible. |
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
- The spotlight should light the background grid and cursor area, remain responsive, and leave no trace.

### Approved decisions

- Use the existing cyan and drafting-blue colors.
- Enable only for fine pointers.
- Disable for reduced-motion users.
- Use a soft approximately 220px glow with immediate position updates.

### Assumptions

- The page viewport is the correct coordinate space because the effect is fixed to the visible background.
- The existing browser support target handles CSS custom properties, radial gradients, `pointermove`, and `requestAnimationFrame`.

## Open questions and readiness

No blocking questions remain for this delivery.

The feature is ready for its one implementation phase.
