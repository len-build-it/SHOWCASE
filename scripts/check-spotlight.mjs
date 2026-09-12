import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const [styles, script] = await Promise.all([
  readFile(new URL('../site/styles.css', import.meta.url), 'utf8'),
  readFile(new URL('../site/script.js', import.meta.url), 'utf8'),
]);

const bodyRule = styles.match(/body \{[\s\S]*?\n\}/)?.[0] || '';
assert.doesNotMatch(bodyRule, /radial-gradient/);
assert.match(styles, /-webkit-mask-image: radial-gradient\(circle 220px at var\(--spotlight-x\) var\(--spotlight-y\)/);
assert.match(styles, /rgba\(41, 181, 255, 0\.82\)/);
assert.match(styles, /body\.cursor-spotlight-active::before/);
assert.match(styles, /@media \(hover: hover\) and \(pointer: fine\)/);
assert.match(script, /function setupCursorSpotlight\(\)/);
assert.match(script, /requestAnimationFrame\(renderSpotlight\)/);
assert.match(script, /pointerleave/);
assert.match(script, /prefers-reduced-motion/);

console.log('Cursor spotlight checks passed.');
