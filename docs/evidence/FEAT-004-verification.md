# Verification: FEAT-004 Project showcase stories and slider

Created: 2026-10-03T19:14:28+08:00
Updated: 2026-10-03T19:40:14+08:00
Revision: 1
Status: Implementation and available checks passed; remaining viewport and physical-touch checks are pending.

| Requirement / phase | Check or scenario | Environment and conditions | Actual result | When run | Evidence / limitations |
| --- | --- | --- | --- | --- | --- |
| JavaScript syntax | `node --check site/script.js` | Windows Node.js v24.14.0. | Passed; exit code 0. | 2026-10-03 | Syntax only. |
| Preview and existing-check syntax | `node --check scripts/preview.mjs` and `node --check scripts/check-intro.mjs` | Windows Node.js v24.14.0. | Passed; both exited 0. | 2026-10-03T19:37:06+08:00 | Existing support files. |
| Intro regression | `node scripts/check-intro.mjs` | Windows Node.js v24.14.0. | Passed; all seven intro assertions. | 2026-10-03 | Confirms existing intro controller behavior. |
| Music regression | `node scripts/check-music.mjs` | Windows Node.js v24.14.0. | Passed; five local tracks, widget hooks, analyser, and playlist advance found. | 2026-10-03 | Existing static check. |
| Spotlight regression | `node scripts/check-spotlight.mjs` | Windows Node.js v24.14.0. | Passed; cursor spotlight checks passed. | 2026-10-03 | Existing static check. |
| Regression suite and source diff | Re-run `node --check site/script.js`, `node scripts/check-intro.mjs`, `node scripts/check-music.mjs`, `node scripts/check-spotlight.mjs`, and `git diff --check`. | Windows Node.js v24.14.0; current workspace. | Passed; all checks exited 0. | 2026-10-03T19:37:06+08:00 | Git emitted line-ending normalization warnings for edited Markdown, HTML, CSS, and JavaScript files; there were no whitespace errors. |
| Preview route | `node scripts/preview.mjs`; request `http://127.0.0.1:4173/`. | Local loopback preview. | Passed; page returned HTTP 200. | 2026-10-03 | Confirms the static page is served. |
| Project content and accessible structure | Inspect the rendered accessibility tree and current browser UI. | Codex in-app browser at 768px viewport width. | Passed; 17 ordered project slides are present in the labeled carousel, both navigation controls are labeled, all project copy remains available, and the recognition names Team Aquanons. | 2026-10-03 | Browser version and exact viewport height were not exposed by this view. |
| Previous/next browsing and end state | Activate next through the project set and return with previous. | Same browser view; native scroll-snap project track. | Passed; next navigation reached the end with the last story visible and the next button unavailable; previous navigation returned to the first story and disabled the previous button. | 2026-10-03 | Repeated actions were performed through the visible controls. |
| Keyboard browsing | Focus the project track and press ArrowRight. | Same browser view. | Passed; indicator advanced from 01 / 17 to 02 / 17 and focus remained on the named track. | 2026-10-03 | Focus and content are available in the accessibility tree. |
| Horizontal overflow | Inspect the rendered page and slider viewport at 768px. | Same browser view. | Passed visually; the project track has its own horizontal scrollbar while the page content fits the browser width. | 2026-10-03 | Exact document `scrollWidth` was not available; no mobile viewport override was exposed for this check. |
| Touch and reduced-motion emulation | Direct touch swipe and preference override. | Browser controls did not expose touch or reduced-motion emulation during this run. | Not run. | 2026-10-03 | The native horizontally scrollable track supports touch panning, and button movement is immediate; physical-device behavior remains pending. |
| Session setup | `npx len-toolkit start`. | Windows Node.js v24.14.0; task-specific npm cache in the temporary directory. | Blocked; npm could not reach `https://registry.npmjs.org/len-toolkit` because outbound network access returned `EACCES`. | 2026-10-03 | No toolkit setup or instruction-difference report was produced. No dependencies were added. |
| Diff hygiene | `git diff --check` | Updated feature paths; private inventory report remains untracked and unstaged. | Passed; exit code 0. | 2026-10-03T19:37:06+08:00 | Staged-path review and phase commit remain pending with the viewport matrix. |

The temporary project preview was manually opened in the in-app browser. The browser screenshot was visually reviewed; no standalone screenshot file was available to attach to this evidence folder.
