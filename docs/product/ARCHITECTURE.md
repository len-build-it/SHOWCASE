# Architecture: Living Blueprint Portfolio

Created: 2026-09-11T20:23:09+08:00
Updated: 2026-09-11T20:58:55+08:00
Revision: 2
Status: Approved by Len on 2026-09-11T21:20:30+08:00

## Observed facts and assumptions

The workspace contains project instructions and no existing site implementation, package manifest, or hosting manifest.

The reference portfolio is a deployed static site at [lenardangeloolajay.onrender.com](https://lenardangeloolajay.onrender.com/).

The new site is a separate one-page showcase and should not duplicate the reference site's employer-oriented credentials structure.

The MP3 and final project materials are not available yet.

The current branch is `master`, Node v24.14.0 is available, and `.gitignore` excludes `dist/` and `build/`.

## Components, boundaries, and flows

The proposed implementation is a static site with one HTML entry point, one stylesheet, and one small browser script.

Authored files live in tracked paths `site/index.html`, `site/styles.css`, `site/script.js`, and `site/assets/hammer.svg`.

No compilation or generated output is needed for the local skeleton.

A small development-only `scripts/preview.mjs` uses Node built-ins to serve only `site/` at `http://127.0.0.1:4173/`.

It binds to loopback, rejects paths outside that directory, returns 404 for missing files, and serves correct HTML, CSS, JavaScript, and SVG content types.

This helper is not a production server and requires no package installation.

The intro uses one local minimal hammer illustration asset with CSS motion, plus simple blueprint lines and impact accents rendered as interface decoration.

The page uses semantic sections for arrival, problem, build, method, and closing connection.

The project area uses truthful placeholder content until project material is supplied.

The skeleton has no audio element, media request, or sound control.

Future audio integration uses the native HTML audio element and independent playback state; it must never gate the intro or content release.

Playback controls, autoplay fallback, and error handling remain deferred together with the MP3.

No backend, database, authentication, CMS, analytics, or third-party runtime dependency is required for the skeleton.

## Decisions and trade-offs

Static HTML, CSS, and JavaScript are preferred because the first release has no server-side behavior and the simplest stack preserves the visual focus.

The hammer should be an authored local asset rather than a CSS drawing of a representational object.

The intro is non-skippable for the standard experience, but reduced-motion users receive an immediate static reveal so the experience does not trap or delay them.

The base HTML exposes the complete story, and JavaScript enables the temporary intro only after a recovery deadline is armed.

Use a single idempotent release operation to remove the overlay and any scroll or input restriction on normal completion, asset failure, a motion-preference change, or the five-second deadline.

The deadline is measured from intro activation, does not wait for image or audio loading, and is independent of the hammer animation's completion event.

Use a CSS fallback that also relinquishes the overlay and any input restrictions by the deadline if script execution stops after activation.

Do not leave persistent `inert`, hidden-content, or scroll-lock state that only a successful animation callback can clear.

The static story remains readable with JavaScript disabled or blocked, and late scripts must not cover content that has already been revealed.

In a background tab, timers may be delayed; on returning to the foreground, compare elapsed time and release an expired intro immediately.

Future audio behavior is proposed in FEAT-001/REQ-005 and FEAT-001/REQ-006 and is not implemented or validated by the silent phase.

Project content remains out of the skeleton to avoid inventing details and to keep the later content phase independently reviewable.

The architecture intentionally avoids animation libraries and new dependencies unless a measured implementation problem requires Len's authorization.

## Open questions and approval

The source paths, preview approach, and recovery mechanism above are concrete proposals for this revision.

The hammer is a local vector illustration using the [feature storyboard](../features/FEAT-001-living-blueprint.md), with no external asset or library prerequisite.

Len approved architecture revision 2 in chat with "I approve this revisions. Proceed to implement" on 2026-09-11T21:20:30+08:00.

Revisit the static approach only if later approved interactions require capabilities beyond a static page.

## Revision history

- Revision 1 proposed a static page but left source paths, preview setup, and intro recovery unresolved.
- Revision 2 specifies tracked source files, a bounded preview helper, progressive enhancement and recovery, and deferred audio ownership.
