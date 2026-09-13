# Living Blueprint Portfolio

A static, story-led portfolio for Lenard Angelo Olajay.

The page presents a blueprint-inspired introduction, a short build sequence, a local music player, and a responsive narrative about Len's approach to solving problems. Project stories will be added as they are ready.

## Live site

Open the deployed portfolio at <https://lenshowcasesite.onrender.com/>.

## Run locally

This project needs no install step or build tool.

```text
node scripts/preview.mjs
```

Open <http://127.0.0.1:4173/> in a browser.

## Checks

```text
node --check site/script.js
node scripts/check-intro.mjs
node scripts/check-music.mjs
node scripts/check-spotlight.mjs
```

## Project structure

- `site/` - HTML, CSS, JavaScript, and image assets for the portfolio.
- `music/` - local MP3 files used by the music player.
- `scripts/` - the local preview server and assertion checks.
- `docs/` - product, feature, implementation, and verification documents.
