# FEAT-001: Living Blueprint portfolio skeleton

Created: 2026-09-11T20:23:09+08:00
Updated: 2026-09-11T20:58:55+08:00
Revision: 2
Status: Approved by Len on 2026-09-11T21:20:30+08:00

## Purpose and success

Potential employers, clients, collaborators, and fellow builders need a memorable first encounter with Len's work that communicates builder and problem-solver identity before detailed project content is available.

The feature succeeds when the page opens as a short illustrated build sequence, leads visitors through a coherent story, remains usable without sound or motion, and leaves an intentional place for later project chapters.

## Scope and non-goals

The current delivery includes the silent one-page narrative skeleton, the non-skippable hammer intro, the blueprint visual system, the work-in-progress project state, and responsive accessibility behavior.

REQ-005 and REQ-006 remain reserved for future audio integration, including controls and failure handling; neither is a current-phase completion criterion.

This feature excludes real project entries, case-study copy, project imagery, résumé or credentials content, contact-form submission, analytics, authentication, persistence, and deployment configuration.

## User flows

### Standard first load

The visitor opens the page and sees a blueprint field, a minimal illustrated hammer enters and strikes a foundation point, impact accents travel through the drawing, and the story sections become available after the three-to-four-second sequence.

The visitor can read the page and navigate its sections after the intro completes.

The standard intro has no user skip action, and clicking, scrolling, or pressing a key does not shorten it.

Each fresh document load replays the intro; same-page links do not replay it, and no visit-history storage is introduced.

### Proposed intro storyboard

The hammer is a simple side-profile cartoon drawn with warm off-white outlines, a short blue handle, and no texture, photorealism, or 3D shading.

It strikes a small outlined foundation block once, using restrained squash and rebound for a handmade feel.

| Time from activation | Visible action | Story purpose |
| --- | --- | --- |
| 0.0-0.5 seconds | A faint grid and one foundation block appear on the ink-blue field. | Something is about to be built. |
| 0.5-1.2 seconds | The outlined hammer enters and lifts over the block. | Give the building action a recognizable author. |
| 1.2-1.5 seconds | A single strike produces three short orange impact strokes and a small rebound. | Make the action feel deliberate and charming. |
| 1.5-2.7 seconds | A blue connection line grows from the block into the page's vertical spine and first heading rule. | Show that the strike constructs this page. |
| 2.7-3.5 seconds | The hammer withdraws, Len's name and opening copy become visible, and the overlay releases. | Hand control to the visitor without a second entry screen. |

The normal target is 3.5 seconds, with acceptance between 3 and 4 seconds in a foreground tab.

### Proposed narrative and copy

The following copy is a reviewable proposal, not a claim of verified project outcomes.

| Chapter and anchor | Proposed visible copy | Composition and transition | Intended takeaway |
| --- | --- | --- | --- |
| Spark, `#spark` | "Lenard Angelo Olajay"; "Builder. Problem solver."; "I start with a problem worth understanding." | A large left-aligned name sits beside the foundation mark; the line from the intro continues below it. | Meet the person who starts the build. |
| Problem, `#problem` | "Where things get difficult."; "Limited connectivity. Everyday friction. Tools that do not fit the people using them. These are the kinds of problems that draw me in." | Short offset annotations attach to the same spine with generous empty space around them. | Understand what motivates the work. |
| Build, `#build` | "From questions to working things."; "Project stories are being prepared. This space will show the problem, the constraints, the build, and what I learned." | The line reaches one open drawing frame with the annotation "Project stories in progress"; no empty clickable cards or invented projects appear. | See where evidence will eventually belong. |
| Method, `#method` | "Understand. Make. Test. Refine."; "Understand the people and constraints. Make the smallest useful version. Test it against the problem. Refine what matters." | Four sequential annotations continue the drawing and respond to the unfinished build chapter. | Learn how Len approaches the work. |
| Next build, `#next-build` | "What should we build next?"; "Have a problem worth working through? Let's talk." | The spine terminates at a connection point beside ordinary contact links. | Leave with a clear way to connect. |

Proposed closing links are "Email Len" to `mailto:olajaylenardangelo@gmail.com`, "GitHub" to `https://github.com/len-build-it`, and "Employer portfolio" to `https://lenardangeloolajay.onrender.com/`.

These destinations were observed on Len's reference portfolio during this conversation; their inclusion is proposed for revision 2 review.

A compact text navigation links to the five anchors after the intro; use native scrolling with no forced snapping or scroll hijacking.

### Positive visual requirements

Use deep blueprint ink `#0B1726`, warm off-white `#F2F0E6`, drafting blue `#639FE8`, restrained cyan `#80E3E0`, and signal orange `#FFB36B` as proposed tokens, subject to contrast verification in context.

Headings use a sturdy system sans-serif stack, body text remains readable, and small drafting annotations use a system monospace stack without external font downloads.

The desktop composition is asymmetric: alternating offsets attach annotations and chapter headings to one continuous vertical spine.

On narrow screens the spine sits beside a single readable content column, preserving the chapter sequence.

Only the intro strike and chapter connection lines animate; each chapter reveal runs once, and there are no endless decorative particles or flashing effects.

The completed lines remain visible so the page retains its identity when motion is disabled.

Retain the exclusions in REQ-004 as guardrails alongside these positive requirements.

### Future audio delivery, outside the silent skeleton

The browser attempts to play the supplied MP3 on load when policy allows it.

If autoplay is blocked, the page remains fully usable and exposes a sound-enable control.

Once started, the MP3 loops until the visitor pauses or mutes it.

### Reduced motion

When the visitor prefers reduced motion, the page presents the completed blueprint state immediately and does not animate the hammer, impact, particles, or section reveals.

### Empty project state

Before project materials are supplied, the project section clearly presents itself as a work-in-progress area without invented project names, metrics, screenshots, or claims.

### Offline or media failure

In the current phase there is no audio request, player, or nonfunctional sound toggle.

If the hammer asset fails, the page reveals the completed story instead of waiting for the animation.

If the normal completion signal fails, the overlay and input restrictions release automatically within five seconds of activation in a foreground tab.

If scripting is disabled or fails to load, the story is immediately readable and links work normally.

No animation is required to reveal essential content below the intro, and a late script must not re-cover content already available to the visitor.

Changing the reduced-motion preference during the intro immediately reveals the static page.

Returning from a background tab after the intro deadline reveals the page immediately rather than restarting the animation.

This release promises no offline installation or offline first-visit support; a fully loaded static page does not need network requests for chapter navigation.

No browser permission is requested.

## Requirements and acceptance criteria

| ID | Required behavior | Observable pass/fail criterion |
| --- | --- | --- |
| REQ-001 | The site tells the proposed story on one page. | All five chapters use the proposed copy and order; the problem motivates the build, the method explains the approach, and the closing includes working links. |
| REQ-002 | The intro is automatic and non-skippable in standard mode. | Each fresh document load plays the 3-4 second intro; clicks, scrolls, and keys do not shorten it, and anchor navigation does not replay it. |
| REQ-003 | The hammer visibly builds this page. | The storyboard shows one outlined cartoon hammer strike, restrained impact strokes, and a line that becomes the actual first heading rule and page spine. |
| REQ-004 | The visual system follows the positive blueprint direction and exclusions. | Desktop and mobile show the specified palette roles, drafting annotations, connected spine, and responsive composition; there are no gradient blobs, bento grids, stacked glass cards, fake dashboards, or decorative sparkle icon fields. |
| REQ-005 | Deferred: the audio-equipped page handles blocked, muted, and failed playback. | After future audio integration, rejected playback offers an explicit play control, pause/resume and mute work, and blocked or failed audio never delays content. |
| REQ-006 | Deferred: the supplied MP3 loops. | With Len's MP3 integrated, playback reaches the end and restarts without another action; this remains pending until tested with that asset. |
| REQ-007 | Reduced motion immediately exposes the static page. | With the preference set before load or changed during the intro, the page is immediately usable and no hammer, impact, or chapter movement continues. |
| REQ-008 | The project area is truthful before content arrives. | The proposed single work-in-progress frame contains no invented project details, outcomes, screenshots, or dead project links. |
| REQ-009 | The layout and navigation are accessible. | At 1440x900, 768x1024, 390x844, and 320x568 CSS pixels there is no unintended horizontal scroll or clipping; at 200% desktop zoom content and controls remain usable, keyboard focus is visible, and the story is available in reading order to assistive technology. |
| REQ-010 | Intro failure never permanently conceals content. | Block the script, fail the hammer asset, or suppress the normal completion event; content is immediately available without scripting and becomes accessible within five seconds of activation for an interrupted active intro, including release of input and scroll restrictions. |
| REQ-011 | The skeleton is honestly silent. | Initial load and all interactions make no audio request, expose no sound control, and remain usable without an MP3. |
| REQ-012 | Chapter motion preserves normal reading and navigation. | Connection lines reveal at most once per chapter, headings and text never depend on a reveal callback, the document uses native scrolling, and same-page links reach their named sections. |

## Data and interfaces

The skeleton has no durable data and no external API.

The future project-content phase will define a project chapter shape after Len provides actual project material.

The future audio phase accepts one local MP3 asset and exposes play, pause, and mute behavior through native browser controls or a small accessible control wrapper.

## Quality constraints

- Main body text remains at least 16px with readable line height.
- Interactive labels remain at least 14px and controls have accessible names.
- Motion and audio are enhancements, not prerequisites for understanding the page.
- The skeleton uses no new runtime dependency without Len's authorization.
- The current phase has no audio dependency; future audio failure checks belong to REQ-005.
- Verify normal text contrast of at least 4.5:1 and focus/control indicators of at least 3:1 against adjacent colors as project quality targets.
- Decorative artwork is hidden from assistive technology, and the static story remains in semantic reading order throughout the intro.
- The initial experience avoids scroll hijacking and does not require hover to reveal essential content.

## Decisions and assumptions

### Confirmed requirements

- The primary identity is builder and problem solver.
- The experience is a one-page storytelling portfolio.
- The visual direction is Living Blueprint.
- The opening includes a minimalistic cartoon or line-art hammer animation.
- The animation is not skippable in the standard experience.
- The intro music is a looping MP3 that Len will provide later.
- The first release is a skeleton, with projects added afterward.

### Proposed decisions for revision 2 review

- Use a three-to-four-second opening sequence.
- Use deep blueprint ink, drafting blue, restrained cyan, signal orange, and warm off-white.
- Use asymmetric editorial composition and a connected vertical blueprint spine rather than a project card grid.
- Use the storyboard, narrative copy, contact destinations, five-second recovery deadline, and viewport matrix specified above.

### Assumptions

- Len will provide an MP3 that can be hosted with the site.
- Len will provide project names, descriptions, roles, visuals, and links in a later feature revision.

## Open questions and readiness

The opening copy, chapter copy, hammer art direction, recovery behavior, and verification targets are concrete proposals in this revision.

There are no missing project or audio assets required for the silent skeleton.

Len approved feature spec FEAT-001 revision 2 in chat with "I approve this revisions. Proceed to implement" on 2026-09-11T21:20:30+08:00.

Future music delivery still requires the supplied MP3 and approval of the deferred audio behavior; future project stories require actual project material.

## Revision history

- Revision 1 recorded the initial skeleton but mixed deferred audio checks into its scope and left visual outcomes, recovery, and copy underdefined.
- Revision 2 adds the storyboard and proposed copy, positive visual criteria, fail-open behavior, explicit delivery ownership, and concrete accessibility scenarios.
- REQ-001 through REQ-009 retain their identities; local IDs now use the `REQ-NNN` form, with `FEAT-001/REQ-NNN` retained for cross-document references.
