# FEAT-002: Glass music widget

Created: 2026-09-12T20:15:05+08:00
Updated: 2026-09-12T22:05:00+08:00
Revision: 4
Status: Approved by Len through the compact-widget refinement request on 2026-09-12T22:05:00+08:00

## Purpose and success

Visitors should be able to hear a small background soundtrack and change it without leaving the Living Blueprint story.

The feature succeeds when the widget attempts playback without delaying the page, clearly recovers from blocked or failed autoplay, lets visitors change tracks with keyboard-usable controls, and presents a compact player surface with a progress scrubber and restrained audio-reactive waveform.

## Scope and non-goals

This delivery adds one fixed glassmorphism music widget to the existing static page.

It includes the five local MP3 files in `music/`, a default track, playlist order, previous/play-next/mute/favorite controls, a track selector, a progress scrubber with elapsed and remaining time, automatic advance with playlist wraparound, and a waveform driven by the Web Audio analyser when available.

The widget is fixed at the lower right on desktop and becomes a bottom dock on narrow screens.

The desktop card stays compact, keeps the title and artist centered, and places mute in the lower-right control slot.

The track list opens upward from a visible grab handle, with a click and keyboard fallback for visitors who do not drag.

It excludes volume control, shuffle, track history, persistence, streaming, metadata extraction, downloads, analytics, and any new dependency.

## User flows

### First load

The page remains readable while the widget attempts to play `Panda Beats - Retry Retry.mp3`.

The page attempts audible autoplay on entry.

The audio element also requests autoplay with a muted fallback so browsers that permit silent autoplay can start the track and waveform immediately.

If the browser blocks autoplay, including browsers that block silent autoplay, the page remains usable and the widget offers an explicit enable-sound action.

### Playback

The visitor can play or pause, mute or unmute, favorite or unfavorite the current track, choose a track from the widget-styled listbox, seek within the current track, and move to the previous or next track.

When a track ends, playback advances to the next track and wraps to the first track after the last one.

Changing tracks while playing starts the selected track; changing tracks while paused only changes the selection.

### Failure and recovery

If a file cannot load or play, the widget reports that state without covering content or breaking page navigation.

The visitor can retry with the play or enable-sound control after a blocked or failed attempt.

If Web Audio analysis is unavailable, the waveform uses a quiet CSS fallback and playback controls still work.

### Accessibility and motion

All controls have visible labels or accessible names, keyboard focus is visible, and status changes are announced through a polite live region.

With reduced motion enabled, the waveform is static and no widget animation runs.

## Requirements and acceptance criteria

| ID | Required behavior | Observable pass/fail criterion |
| --- | --- | --- |
| REQ-001 | The widget is present without blocking the story. | A fresh page load shows the widget independently of the intro, and the five chapters remain readable and navigable if audio does not start. |
| REQ-002 | The supplied tracks are available locally. | The selector exposes all five MP3 files from `music/` with readable names and no external media request. |
| REQ-003 | Autoplay failure is recoverable. | A rejected or unavailable `audio.play()` leaves the page usable and exposes a clear enable-sound or play action that retries playback; silent autoplay is used when permitted. |
| REQ-004 | Basic music-player controls work. | Play/pause, previous, next, mute/unmute, favorite, progress seeking, and the widget-styled accessible listbox update native audio state and visible labels. |
| REQ-005 | The playlist advances automatically. | When the current track emits `ended`, the next local track is selected and played, wrapping from the final track to the first. |
| REQ-006 | The waveform reflects playback when possible. | While audio plays with analyser support, waveform bars update from analyser data; without analyser support they use the CSS fallback. |
| REQ-007 | The widget is responsive and visually integrated. | Desktop places a compact card at the lower right; narrow layouts use a bottom dock; the panel uses the reference's centered hierarchy, translucent glass, blur, and readable contrast; the track list opens upward from the grab handle. |
| REQ-008 | Accessibility and reduced motion are preserved. | Controls are keyboard usable with visible focus, status is announced politely, no control is smaller than the project target, and reduced motion freezes the waveform. |
| REQ-009 | Media failures fail open. | A missing or unsupported MP3 reports an error in the widget while the intro, chapter links, and page reading order continue to work. |

## Data and interfaces

The feature has no durable data or external API.

The playlist is a small static array of local relative asset paths in `site/script.js`.

The page uses one native `<audio>` element, one widget-styled button/listbox wrapper, one native range input for seeking, and one `AudioContext` analyser connection created only when needed.

## Quality constraints

- Use the existing static HTML, CSS, and JavaScript stack.
- Add no runtime dependency.
- Use a plain browser script so the widget does not silently fail when the static page is opened without module support.
- Keep audio independent from intro release and content visibility.
- Use local assets only.
- Preserve the existing contrast, focus, responsive viewport, and reduced-motion targets.
- Do not request browser permissions.
- Keep the widget compact enough that it does not obscure the primary reading column on desktop.

## Decisions and assumptions

### Confirmed requirements

- Len requested an automatically playing background music widget.
- Len requested track switching like a music player.
- Len requested a soundwave beat visual over the widget.
- Len requested a glassmorphism UI.
- Five MP3 files are present in the root `music/` folder.

### Approved decisions

- Attempt audible autoplay and provide an explicit fallback when the browser blocks it.
- Start with `Panda Beats - Retry Retry.mp3`.
- Use previous, play/pause, next, mute, and a track selector without a volume slider.
- Use the built-in Web Audio analyser for the waveform with a CSS fallback.
- Use lower-right desktop placement and a bottom mobile dock.
- Advance through the playlist and wrap around at the end.
- Use centered title and artist metadata, a time range slider, and icon-first playback controls based on the supplied reference image.
- Keep the mute control at the lower-right edge of the playback controls and open the track picker upward from a drag handle.
- Keep the track selector available from the title area, favorite state local to the current page, and status messaging visually hidden but available to assistive technology.

### Assumptions

- Len has the right to host and play the supplied MP3 files.
- Browser autoplay policy may prevent audible playback until a user gesture.
- Some embedded browsers block all programmatic autoplay, including muted autoplay.
- The existing static preview helper remains sufficient for local verification.

## Open questions and readiness

No blocking questions remain for this delivery.

Len's original approval is recorded against revision 1 by the message `okay proceed with implementing, also make sure to make changes on the documentation` on 2026-09-12.

Len requested and approved this correction through the message `The buttons are fully static and doesnt actually do anything. ... most importantly it should auto play when entering the site` on 2026-09-12.

The compact-widget refinement is implemented and verified in the integration worktree.

## Revision history

- Revision 1 defines the first approved music widget delivery from the supplied local MP3 set.
- Revision 2 adds a widget-styled accessible listbox, a plain-script bootstrap, and a muted autoplay fallback for browsers that permit it.
- Revision 3 adds the reference-style player hierarchy, progress seeking, metadata, and a working favorite control.
- Revision 4 makes the player compact, centers its spacing, moves mute to the lower-right controls, and adds the upward-opening drag handle picker.
