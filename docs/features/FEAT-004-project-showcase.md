# FEAT-004: Project showcase stories and slider

Created: 2026-10-03T19:14:28+08:00
Updated: 2026-10-03T19:14:28+08:00
Revision: 1
Status: Approved by Len through the direct implementation request recorded below.

## Purpose and success

Visitors need to understand the range of Len's work through accurate, concise project stories that fit the existing story-led Living Blueprint page.

The feature succeeds when visitors can read 17 distinct project and supporting-work entries in a manually controlled, responsive slider that retains the site's editorial blueprint style and works by pointer, touch, and keyboard.

## Scope and non-goals

This feature replaces FEAT-001's honest project placeholder with a project-story section and adds a manual project carousel on the existing one-page site.

It includes selected software projects, experiments, prototypes, learning projects, a technical write-up, and the existing employer portfolio as supporting work.

It includes concise descriptions grounded in the supplied project inventory, appropriate status labels, and the Team Aquanons 2026 RSTW Student Startup Competition champion recognition for AqOne.

It excludes project screenshots and artwork, repository links whose public status and sharing permission are not confirmed, unverified performance metrics, private documents or member information, account or analytics behavior, and project-source redistribution.

The slider does not auto-advance. Its static HTML keeps every story present and readable if JavaScript is unavailable.

## User flows

Visitors reach the Build chapter through normal page reading and encounter editorial project entries in a horizontally scrollable track.

Visitors move one entry at a time with labeled previous and next buttons, horizontal scrolling, touch swipes, or the left and right arrow keys while the track is focused.

The position indicator reports the first visible project, and the previous or next control reports its unavailable state at the corresponding end.

Visitors can read every entry in DOM order without activating the controls. Reduced-motion preference makes button-driven movement immediate.

## Public project content

The slide order and required qualifications are:

| Position | Project | Public treatment |
| --- | --- | --- |
| 1 | AqOne | Team Aquanons maritime-safety project; champion at the 2026 RSTW Student Startup Competition. Attribute the award to the team. Do not reproduce confidential code, team materials, or unapproved assets. |
| 2 | Project Tabang | Aklan flood reporting and response workflows; contribution is backend development and technical presentation. Do not describe unfinished branch work as delivered. |
| 3 | Warang | Offline-first, map-centered photo journal; describe product intent without implying unfinished release safeguards are complete. |
| 4 | Pipeline | Organization manager for members, tasks, and announcements with cached offline mobile reads; local MVP complete, production operations and device release remain pending. |
| 5 | Len's Toolkit | Dependency-free Node.js workflow CLI; preserve upstream attribution for curated or adapted skills. |
| 6 | DevGuild Website | Responsive student-community website; keep community photos and member details private. |
| 7 | Aquanons Public Website | Communication companion to AqOne, not a duplicate claim of the team product. |
| 8 | CatTinder | Three AI-assisted app implementations as an experiment; chat responses are simulated and there is no claimed model winner. |
| 9 | Software Engineering Reviewer | Interactive study tool; course material and derived content require attribution review before redistribution. |
| 10 | BantAI | Acoustic incident-response concept/prototype; do not imply finished detection models or real-world accuracy. |
| 11 | Ani.Aklan | Early marketplace prototype; contribution and ownership require confirmation before claiming authorship. |
| 12 | Superpowers | Customized fork; preserve upstream identity, authorship, and license notices. |
| 13 | DevGuild Document Tools | Describe sanitized document and presentation automation; examples use synthetic data and omit member records or signatures. |
| 14 | Python Seminar Projects | Educational exercises and Tkinter banking simulator; use synthetic account data. |
| 15 | Java Programming Exercises | Selected completed educational exercises only. |
| 16 | Cisco Virtual Desktop Startup Fix | A technical write-up only; do not redistribute the third-party Cisco or Adobe application. |
| 17 | Portfolio and Credentials | Supporting employer-focused portfolio; do not copy identity documents or private contact data into this project story. |

The current page's existing publicly intended contact links remain outside this feature. Project slides add no personal phone number, identity number, home address, signatures, résumé file, credential scan, secret, or private organizational record.

## Requirements and acceptance criteria

| ID | Required behavior | Observable pass/fail criterion |
| --- | --- | --- |
| REQ-001 | The project chapter contains the 17 distinct stories in the specified order. | The live page contains each named entry once, with accurate contribution and status wording and no duplicate worktrees presented as products. |
| REQ-002 | AqOne's recognition is attributed to Team Aquanons. | The hero and AqOne story identify Team Aquanons as the 2026 RSTW Student Startup Competition champion; no text implies Len won individually. |
| REQ-003 | Visitors can manually browse the project slider. | Previous/next buttons, horizontal touch/pointer scrolling, and native scroll snap reach the first and last entries; no timer advances slides. |
| REQ-004 | Slider navigation supports keyboard and assistive technology. | Controls have visible focus and accessible names/state; a focused track responds to left/right arrows; the region and individual slides expose carousel/slide labels; all story text remains in DOM reading order. |
| REQ-005 | Responsive movement respects visitor preferences. | At 320px and wider, the page has no document-wide horizontal overflow; slider movement is usable without clipping; reduced motion disables smooth slider movement. |
| REQ-006 | The existing editorial blueprint presentation remains recognizable. | The project entries use the existing palette, type roles, connected-story section, and restrained annotation style without introducing a bento layout, stacked glass cards, autoplay, or external library. |
| REQ-007 | Public content respects inventory privacy and ownership cautions. | No private identity/member records, credentials, secrets, third-party assets, or unverified project results are added; uncertain authorship, prototypes, and upstream forks are labeled clearly. |

## Data and interfaces

The stories are static semantic HTML in `site/index.html`.

The slider uses the browser's native horizontal scrolling and CSS scroll snap, with a small progressive-enhancement controller in `site/script.js` for buttons, position text, and focused-track arrow keys.

No network request, API, storage, server state, external script, font, image, or dependency is introduced.

## Quality constraints

- Keep all project text available when JavaScript is disabled.
- Use native buttons, keyboard-visible focus, accessible names, and at least 44px control targets.
- Do not auto-rotate or hijack vertical page scrolling.
- Support reduced-motion preferences.
- Keep the project track within the existing content column; horizontal movement is confined to the labeled slider region.
- Do not copy source code or image assets from projects with uncertain or restricted publication rights.
- Continue using the existing static HTML/CSS/JavaScript stack without adding packages.

## Approval and revision history

Len authorized this feature in the direct user request: "Alright need you to update the portfolio based on your findings, it should still maintain the blog style styling but I think the rstw champion for AqOne is good too. Also add a slider feature on the project showcase too" on 2026-10-03.

This feature revision 1 records that authorization and bounds implementation to the project stories and manual slider described above.
