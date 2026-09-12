import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../site/index.html', import.meta.url), 'utf8');
const script = fs.readFileSync(new URL('../site/script.js', import.meta.url), 'utf8');
const musicDir = new URL('../music/', import.meta.url);

const tracks = [
  'Panda Beats - Retry Retry.mp3',
  'Panda Beats - Mister Prime.mp3',
  'Panda Beats - Hills Of Hell.mp3',
  'Panda Beats - Diab-low.mp3',
  'Panda Beats - All Wave Control.mp3',
];

assert.equal((script.match(/title: '/g) || []).length, tracks.length);
tracks.forEach((track) => assert.equal(fs.existsSync(new URL(encodeURIComponent(track), musicDir)), true, track));
['music-widget', 'music-track-toggle', 'music-track-menu', 'music-play', 'music-previous', 'music-next', 'music-mute', 'music-wave'].forEach((id) => {
  assert.match(html, new RegExp(`id="${id}"`));
});
assert.doesNotMatch(html, /Soundtrack ready when you are\./);
assert.match(html, /<audio[^>]+autoplay[^>]+muted/);
assert.match(script, /new AudioContext\(\)/);
assert.match(script, /audio\.addEventListener\('ended'/);
assert.match(html, /<script src="script\.js"><\/script>/);

console.log('Music checks passed: 5 local tracks, widget hooks, analyser, and playlist advance are present.');
