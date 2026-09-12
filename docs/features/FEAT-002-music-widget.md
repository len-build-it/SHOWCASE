# FEAT-002: Glass music widget

Created: 2026-09-12T20:15:05+08:00
Updated: 2026-09-12T20:15:05+08:00
Revision: 1
Status: Approved by Len on 2026-09-12T20:15:05+08:00

## Purpose and success

Visitors should be able to hear a small background soundtrack and change it without leaving the Living Blueprint story.

The feature succeeds when the widget attempts playback without delaying the page, clearly recovers from blocked or failed autoplay, lets visitors change tracks with keyboard-usable controls, and shows a restrained audio-reactive waveform.

## Scope and non-goals

This delivery adds one fixed glassmorphism music widget to the existing static page.

It includes the five local MP3 files in `music/`, a default track, playlist order, previous/play-next/mute controls, a track selector, automatic advance with playlist wraparound, and a waveform driven by the Web Audio analyser when available.

The widget is fixed at the lower right on desktop and becomes a bottom dock on narrow screens.

It excludes volume control, shuffle, track history, persistence, streaming, metadata extraction, downloads, analytics, and any new dependency.

## User flows

### First load

The page remains readable while the widget attempts to play `Panda Beats - Retry Retry.mp3`.

If the browser permits audible autoplay, the track starts and the widget shows its playing state.

If autoplay is blocked, the page remains usable and the widget offers an explicit enable-sound action.

### Playback

The visitor can play or pause, mute or unmute, choose a track, and move to the previous or next track.

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
| REQ-003 | Autoplay failure is recoverable. | A rejected `audio.play()` leaves the page usable and exposes a clear enable-sound or play action that retries playback. |
| REQ-004 | Basic music-player controls work. | Play/pause, previous, next, mute/unmute, and track selection update the native audio state and visible labels. |
| REQ-005 | The playlist advances automatically. | When the current track emits `ended`, the next local track is selected and played, wrapping from the final track to the first. |
| REQ-006 | The waveform reflects playback when possible. | While audio plays with analyser support, waveform bars update from analyser data; without analyser support they use the CSS fallback. |
| REQ-007 | The widget is responsive and visually integrated. | Desktop places it at the lower right; narrow layouts use a bottom dock; the panel uses existing blueprint colors, translucent glass, blur, and readable contrast. |
| REQ-008 | Accessibility and reduced motion are preserved. | Controls are keyboard usable with visible focus, status is announced politely, no control is smaller than the project target, and reduced motion freezes the waveform. |
| REQ-009 | Media failures fail open. | A missing or unsupported MP3 reports an error in the widget while the intro, chapter links, and page reading order continue to work. |

## Data and interfaces

The feature has no durable data or external API.

The playlist is a small static array of local relative asset paths in `site/script.js`.

The page uses one native `<audio>` element and one `AudioContext` analyser connection created only when needed.

## Quality constraints

- Use the existing static HTML, CSS, and JavaScript stack.
- Add no runtime dependency.
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

### Assumptions

- Len has the right to host and play the supplied MP3 files.
- Browser autoplay policy may prevent audible playback until a user gesture.
- The existing static preview helper remains sufficient for local verification.

## Open questions and readiness

No blocking questions remain for this delivery.

Len's approval is recorded against this feature and its one-phase plan by the message `okay proceed with implementing, also make sure to make changes on the documentation` on 2026-09-12, following the six proposed behavior decisions in the preceding message.

The feature is ready for implementation and verification.

## Revision history

- Revision 1 defines the first approved music widget delivery from the supplied local MP3 set.
