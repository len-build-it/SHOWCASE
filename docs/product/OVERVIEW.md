# Product overview: Living Blueprint Portfolio

Created: 2026-09-11T20:23:09+08:00
Updated: 2026-09-12T20:46:17+08:00
Revision: 4
Status: Approved by Len on 2026-09-12T20:46:17+08:00

## Purpose and users

Living Blueprint is a one-page portfolio for Lenard Angelo Olajay that creates an emotional first impression and gives visitors a memorable way to understand him as a builder and problem solver.

The audience includes potential employers, clients, collaborators, and fellow builders.

The site complements the existing employer-focused portfolio rather than replacing its résumé, credentials, and detailed proof.

Success means a visitor understands Len's builder identity, remembers the opening experience, and can follow the narrative into future project stories.

## Planned capabilities and main flows

- A story-led one-page experience with a clear beginning, middle, and closing connection.
- A non-skippable minimal hammer line-art intro that makes the site feel like it is being built as it loads.
- A glass music widget using Len's supplied local MP3 playlist, with graceful behavior when autoplay is blocked or audio is unavailable.
- A blueprint-inspired project section that starts as an honest work-in-progress state and later becomes a set of project chapters.
- A short section describing Len's building method and problem-solving principles.
- A final contact section that points visitors toward the next build.
- Responsive, keyboard-usable, readable, reduced-motion, and sound-optional behavior.

## Scope and non-goals

The first implementation covers the visual and narrative skeleton only.

The completed skeleton remains independently readable, and the approved audio delivery is specified and implemented separately in [FEAT-002](../features/FEAT-002-music-widget.md).

The first implementation does not include real project entries, detailed case studies, résumé content, credentials, authentication, a CMS, forms, analytics, or a backend.

The site does not attempt to replace the existing employer-focused portfolio.

The site does not use generic AI portfolio conventions such as gradient blobs, bento grids, stacked glass cards, fake dashboards, or decorative AI sparkle motifs.

## Open questions and approval

- Proposed public-facing copy and an intro storyboard are specified in [FEAT-001 revision 2](../features/FEAT-001-living-blueprint.md) for review.
- The supplied MP3 files are now present in the root `music/` directory and their hosting rights remain Len's responsibility.
- Project chapters will be specified after the skeleton is approved.

Len approved the immediately preceding conversational baseline with the message "approve baseline" on 2026-09-11.

That summary covered a one-page story-led Living Blueprint portfolio, builder/problem-solver identity, a non-skippable minimal hammer intro, looping MP3 music, the spark/problem/build/method/next-build story arc, deferred projects, avoidance of generic AI visual patterns, and no implementation or deployment yet.

Overview revision 1 was written after that approval and incorrectly attributed approval to the document itself.

Len approved the exact revision 2 documents and implementation in chat with "I approve this revisions. Proceed to implement" on 2026-09-11T21:20:30+08:00.

Len approved the revision 3 audio-scope update through the 2026-09-12 implementation message recorded in FEAT-002.

## Revision history

- Revision 1 recorded the discussion baseline and incorrectly marked the written document approved.
- Revision 2 corrects the approval attribution and distinguishes the silent skeleton from future music delivery.
- Revision 3 links the approved local music widget delivery and records that the supplied playlist is available.
- Revision 4 records the corrected autoplay fallback and browser-compatible widget bootstrap.
