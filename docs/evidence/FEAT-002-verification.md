# Verification: FEAT-002

Created: 2026-09-12T20:21:59+08:00
Updated: 2026-09-13T08:45:19+08:00
Revision: 5

| Requirement / phase | Check or scenario | Environment and conditions | Actual result | When run | Evidence / limitations |
| --- | --- | --- | --- | --- | --- |
| Syntax validation | `node --check site/script.js`, `node --check scripts/preview.mjs`, and `node --check scripts/check-music.mjs`. | Windows Node.js v24.14.0. | Passed: all three files parsed without syntax errors. | 2026-09-12T20:19:00+08:00 | Syntax only. |
| Existing intro regression | `node scripts/check-intro.mjs`. | Local Node.js mock virtual-timer assertions. | Passed: all 7 existing intro release assertions. | 2026-09-12T20:19:00+08:00 | Preserves FEAT-001 behavior. |
| Music static assertions | `node scripts/check-music.mjs`. | Local Node.js filesystem check against the five supplied MP3s. | Passed: five local tracks, widget hooks, analyser creation, and playlist advance are present. | 2026-09-12T20:19:00+08:00 | Does not play audio. |
| Preview assets | HEAD requests to `/`, `/styles.css`, `/script.js`, and all five `/music/*.mp3` paths. | `node scripts/preview.mjs` at `http://127.0.0.1:4173/`. | Passed: page and source assets returned 200; MP3 assets returned `audio/mpeg` with expected nonzero lengths. | 2026-09-12T20:20:00+08:00 | Local preview only. |
| Preview boundary | HEAD requests to `/AGENTS.md` and `/music/../AGENTS.md`. | Same loopback preview server. | Passed: both returned 404 and did not expose workspace files. | 2026-09-12T20:20:00+08:00 | Confirms the added music route remains bounded. |
| Fresh-load fallback | Reload the page without a prior gesture. | Codex in-app browser, local preview. | Passed: story was readable and the widget exposed `Play music` with status `Click Play to enable sound.` after autoplay was not started. | 2026-09-12T20:22:00+08:00 | Autoplay behavior is browser-policy dependent. |
| Playback start | Activate `Play music`. | Same browser and local MP3. | Passed: control changed to `Pause music` and status changed to `Playing Retry Retry.`. | 2026-09-12T20:22:00+08:00 | Confirms a real user-gesture start in this environment. |
| Track switching | Activate `Next track`, mute, and choose `All Wave Control`. | Same browser and local playlist. | Passed: selected track and status changed, mute state was announced as `Unmute music`, and selected-track playback continued. | 2026-09-12T20:22:00+08:00 | Ended-event wraparound not forced because it would require waiting for full tracks. |
| Layout and waveform structure | Inspect rendered widget and page dimensions. | Same browser, viewport `806` CSS px wide. | Passed: 12 waveform bars rendered, widget was positioned at the lower right, and `scrollWidth <= innerWidth` was true. | 2026-09-12T20:22:00+08:00 | Mobile physical-device review remains pending. |
| Console errors | Browser console filtered to warnings and errors. | Same browser and local preview. | Passed: no warnings or errors captured. | 2026-09-12T20:22:00+08:00 | One browser environment only. |
| Corrected bootstrap | Reload after changing the browser script from module to plain script. | Codex in-app browser, local preview. | Passed: the widget initialized, controls changed state, and no console warnings or errors were captured. | 2026-09-12T20:46:00+08:00 | Direct `file://` navigation is blocked by the browser test policy, so HTTP preview was used. |
| Widget-styled menu | Open the track button and select `Mister Prime`. | Same browser and local preview. | Passed: the glass listbox opened above the widget, exposed five options, closed after selection, and status changed to `Playing Mister Prime.`. | 2026-09-12T20:46:00+08:00 | Keyboard arrow traversal is implemented but not separately exercised here. |
| Sound-enable gesture | Start muted playback with `Play music`, then activate `Enable sound`. | Same browser and local preview. | Passed: playback began after the gesture, the button changed to `Enable sound`, and the gesture changed the mute state to unmuted with `Pause music`. | 2026-09-12T20:46:00+08:00 | The embedded browser blocked both audible and muted autoplay on fresh load; this is recorded as a browser limitation, not treated as successful autoplay. |
| Reference-style layout | Inspect the rendered widget after the intro releases. | Codex in-app browser, local preview, viewport approximately 806 CSS px wide. | Passed: compact horizontal glass card shows centered title and artist, waveform signal at the upper right, elapsed and remaining time, progress range, favorite control, and icon-first playback controls. | 2026-09-12T21:10:00+08:00 | Background color was not evaluated against the supplied reference. |
| Reference-style controls | Open the track picker, choose `Mister Prime`, favorite the track, seek with the progress range, and activate `Enable sound`. | Same browser and local MP3 playlist. | Passed: selection updates metadata and status, favorite changes to pressed state, progress responds to keyboard input, and playback changes to `Pause music` with a playing status. | 2026-09-12T21:10:00+08:00 | Favorite state is intentionally session-local and is not persisted. |
| Compact placement and spacing | Inspect the rendered player after the intro releases. | Codex in-app browser, integrated preview at `http://127.0.0.1:4175/`, viewport `1280x720`. | Passed: the widget measured approximately `480x164`, metadata was centered, and mute was positioned at the lower-right of the control row. | 2026-09-12T22:29:56+08:00 | Visual screenshot inspected; the spotlight implementation from current `master` remains present. |
| Upward drawer | Drag upward from the handle, then select `Mister Prime`. | Same integrated preview and browser. | Passed: the picker opened above the card, exposed all five tracks, and selection updated the title. | 2026-09-12T22:29:56+08:00 | Browser gesture evidence is from the in-app preview viewport. |
| Lower-right sound control | Activate the sound control from the playback row. | Same integrated preview and local MP3. | Passed: `Unmute music` changed to `Mute music`, playback continued, and the live status announced `Music unmuted.`. | 2026-09-12T22:29:56+08:00 | Speaker output remains environment dependent. |
| Browser console | Inspect warning and error logs after the interaction scenarios. | Same integrated preview and browser. | Passed: no warning or error entries were captured. | 2026-09-12T22:29:56+08:00 | Browser environment only. |
| Compact centered-control refinement | Reload the isolated preview and inspect the released widget. | Codex in-app browser, isolated preview at `http://127.0.0.1:4175/`, viewport `1280x720`. | Passed: the desktop card is approximately half the previous width, spacing and metadata are tighter, and favorite, previous, play, next, and mute form one centered control group. | 2026-09-13T08:45:19+08:00 | Visual screenshot inspected; existing button hit areas remain unchanged. |
| Regression checks | `node --check site/script.js`, `node --check scripts/preview.mjs`, `node --check scripts/check-music.mjs`, `node scripts/check-music.mjs`, `node scripts/check-intro.mjs`, and `git diff --check`. | Local Node.js v24.14.0 and current working tree. | Passed: all syntax, music, intro, and diff checks completed successfully. | 2026-09-13T08:45:19+08:00 | Does not replace physical-device playback review. |

## Limitations and pending evidence

- Physical-device playback, speaker output, and mobile safe-area behavior remain pending Len's device review.
- Full playlist ended-event wraparound was not waited through because supplied tracks are several minutes long.
- Reduced-motion behavior is covered by the CSS rule and should receive a dedicated browser preference run when a viewport or preference override is available.
- Fresh-load autoplay is attempted with audible and muted paths, but the available embedded browser blocks both without a gesture.

## Revision history

- Revision 1 records the first FEAT-002 syntax, preview, browser, and static assertion checks.
- Revision 2 records the corrected plain-script bootstrap, custom menu interaction, and autoplay limitation.
- Revision 3 records the reference-style layout, seek control, metadata, favorite action, and browser interaction checks.
- Revision 4 records the compact dimensions, lower-right mute placement, upward drag drawer, integrated-master verification, and clean console run.
- Revision 5 records the roughly half-width desktop card, centered control group, preserved hit areas, and regression checks.
