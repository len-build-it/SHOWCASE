# Architecture: Living Blueprint Portfolio

Created: 2026-09-11T20:23:09+08:00
Updated: 2026-09-12T21:15:35+08:00
Revision: 6
Status: Approved by Len through FEAT-003 approval on 2026-09-12

## Observed facts and assumptions

The workspace contains project instructions and no existing site implementation, package manifest, or hosting manifest.

The reference portfolio is a deployed static site at [lenardangeloolajay.onrender.com](https://lenardangeloolajay.onrender.com/).

The new site is a separate one-page showcase and should not duplicate the reference site's employer-oriented credentials structure.

The MP3 and final project materials are not available yet.

The current branch is `master`, Node v24.14.0 is available, and `.gitignore` excludes `dist/` and `build/`.

## Components, boundaries, and flows

The implementation is a static site with a story HTML entry point, a Privacy Policy page, one stylesheet, and one small browser script.

Authored files live in tracked paths `site/index.html`, `site/privacy.html`, `site/styles.css`, `site/script.js`, and `site/assets/hammer.svg`.

No compilation or generated output is needed for the local skeleton.

A small development-only `scripts/preview.mjs` uses Node built-ins to serve `site/` and the root `music/` directory at `http://127.0.0.1:4173/`.

It binds to loopback, rejects paths outside those two asset directories, returns 404 for missing files, and serves correct HTML, CSS, JavaScript, SVG, and MP3 content types.

This helper is not a production server and requires no package installation.

The intro uses one local minimal hammer illustration asset with CSS motion, plus simple blueprint lines and impact accents rendered as interface decoration.

The page uses semantic sections for arrival, problem, build, method, and closing connection.

The project area uses truthful placeholder content until project material is supplied.

The music delivery uses one native HTML audio element and independent playback state; it never gates the intro or content release.

The widget uses a static local playlist, native audio events, a widget-styled accessible listbox, and a browser-built Web Audio analyser with a CSS fallback for the waveform.

The story page has no persistent header or chapter navigation, and `site/index.html` links to the static `site/privacy.html` page from its footer.

Playback controls, autoplay fallback, and media error handling are specified in [FEAT-002](../features/FEAT-002-music-widget.md).

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

The silent skeleton's deferred audio requirements remain historical scope boundaries; the approved implementation is tracked and verified under FEAT-002.

Project content remains out of the skeleton to avoid inventing details and to keep the later content phase independently reviewable.

The browser bootstrap uses a plain script so static hosting and direct browser loading do not fail solely because module execution is unavailable.

The architecture intentionally avoids animation libraries and new dependencies unless a measured implementation problem requires Len's authorization.

The privacy page stays static and factual, with no form, analytics, account, or tracking implementation.

The cursor spotlight uses one CSS radial glow controlled by the latest fine-pointer coordinates and a single requestAnimationFrame update path; it is disabled for coarse pointers and reduced-motion users.

## Open questions and approval

The source paths, preview approach, recovery mechanism, and local music boundary above are concrete proposals for this revision.

The hammer is a local vector illustration using the [feature storyboard](../features/FEAT-001-living-blueprint.md), with no external asset or library prerequisite.

Len approved architecture revision 2 in chat with "I approve this revisions. Proceed to implement" on 2026-09-11T21:20:30+08:00.

Len approved the revision 3 local music update through the 2026-09-12 implementation message recorded in FEAT-002.

Len approved the revision 5 site-shell refinement through the direct implementation request on 2026-09-12T20:54:50+08:00.

Revisit the static approach only if later approved interactions require capabilities beyond a static page.

## Revision history

- Revision 1 proposed a static page but left source paths, preview setup, and intro recovery unresolved.
- Revision 2 specifies tracked source files, a bounded preview helper, progressive enhancement and recovery, and deferred audio ownership.
- Revision 3 records the approved native local-playlist audio boundary and analyser fallback.
- Revision 4 records the plain-script bootstrap, custom listbox, and muted autoplay fallback.
- Revision 5 records the separate Privacy Policy page and removal of persistent site navigation.
