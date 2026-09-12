import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const browserScript = fs.readFileSync(new URL('../site/script.js', import.meta.url), 'utf8');
const browserContext = vm.createContext({ console });
vm.runInContext(browserScript, browserContext);
const { createIntroController } = browserContext;

console.log('Running Living Blueprint Intro Release Logic Assertions...\n');

// Mock virtual timer environment
function createMockEnvironment(initialTime = 0) {
  let currentTime = initialTime;
  const timers = new Map();
  let nextTimerId = 1;

  const setTimeoutFn = (callback, delay) => {
    const id = nextTimerId++;
    timers.set(id, { callback, triggerTime: currentTime + delay });
    return id;
  };

  const clearTimeoutFn = (id) => {
    timers.delete(id);
  };

  const nowFn = () => currentTime;

  const advanceTime = (ms) => {
    currentTime += ms;
    // Execute all timers that have reached or passed current time
    let executedAny = true;
    while (executedAny) {
      executedAny = false;
      for (const [id, timer] of Array.from(timers.entries())) {
        if (timer.triggerTime <= currentTime) {
          timers.delete(id);
          timer.callback();
          executedAny = true;
          break; // restart loop in case callback added or removed timers
        }
      }
    }
  };

  return { setTimeoutFn, clearTimeoutFn, nowFn, advanceTime, getPendingCount: () => timers.size };
}

// Test 1: Normal completion at 3500ms
{
  const env = createMockEnvironment();
  const releaseEvents = [];

  const controller = createIntroController({
    isReducedMotion: false,
    onRelease: (reason) => releaseEvents.push(reason),
    setTimeoutFn: env.setTimeoutFn,
    clearTimeoutFn: env.clearTimeoutFn,
    nowFn: env.nowFn,
  });

  controller.start();
  assert.equal(controller.isReleased(), false, 'Intro should not be released immediately');

  env.advanceTime(2000);
  assert.equal(controller.isReleased(), false, 'Intro should not be released at 2000ms');

  env.advanceTime(1500); // reaches 3500ms
  assert.equal(controller.isReleased(), true, 'Intro should be released at 3500ms');
  assert.deepEqual(releaseEvents, ['normal-completion'], 'Should record normal completion reason');
  assert.equal(env.getPendingCount(), 0, 'All timers should be cleared after release');
  console.log('✔ Test 1 passed: Normal completion releases at 3500ms with all timers cleared');
}

// Test 2: Timeout recovery at 5000ms if normal timer is blocked or omitted
{
  const env = createMockEnvironment();
  const releaseEvents = [];

  // Simulate a custom controller where 3500ms callback was dropped
  let intercepted3500 = false;
  const setTimeoutFnIntercepted = (cb, delay) => {
    if (delay === 3500) {
      intercepted3500 = true;
      return 999; // do not register 3500ms timer
    }
    return env.setTimeoutFn(cb, delay);
  };

  const controller = createIntroController({
    isReducedMotion: false,
    onRelease: (reason) => releaseEvents.push(reason),
    setTimeoutFn: setTimeoutFnIntercepted,
    clearTimeoutFn: env.clearTimeoutFn,
    nowFn: env.nowFn,
  });

  controller.start();
  assert.equal(intercepted3500, true, '3500ms timer was intercepted');

  env.advanceTime(4900);
  assert.equal(controller.isReleased(), false, 'Intro should not be released at 4900ms when normal callback dropped');

  env.advanceTime(200); // reaches 5100ms, past 5000ms deadline
  assert.equal(controller.isReleased(), true, 'Intro must be released by 5000ms deadline');
  assert.deepEqual(releaseEvents, ['timeout-deadline'], 'Should record timeout-deadline recovery reason');
  console.log('✔ Test 2 passed: Hard 5000ms recovery deadline releases when normal completion fails');
}

// Test 3: Duplicate release calls are strictly idempotent
{
  const env = createMockEnvironment();
  const releaseEvents = [];

  const controller = createIntroController({
    isReducedMotion: false,
    onRelease: (reason) => releaseEvents.push(reason),
    setTimeoutFn: env.setTimeoutFn,
    clearTimeoutFn: env.clearTimeoutFn,
    nowFn: env.nowFn,
  });

  controller.start();

  const firstCall = controller.release('manual-trigger');
  assert.equal(firstCall, true, 'First release call must return true');

  const secondCall = controller.release('duplicate-trigger');
  assert.equal(secondCall, false, 'Duplicate release call must return false');

  const thirdCall = controller.handleAssetError();
  assert.equal(thirdCall, false, 'Asset error after release must return false');

  assert.equal(releaseEvents.length, 1, 'onRelease must be called exactly once');
  assert.equal(releaseEvents[0], 'manual-trigger', 'First reason must be preserved');
  console.log('✔ Test 3 passed: Release operation is strictly idempotent');
}

// Test 4: Reduced motion initial state releases immediately
{
  const env = createMockEnvironment();
  const releaseEvents = [];

  const controller = createIntroController({
    isReducedMotion: true,
    onRelease: (reason) => releaseEvents.push(reason),
    setTimeoutFn: env.setTimeoutFn,
    clearTimeoutFn: env.clearTimeoutFn,
    nowFn: env.nowFn,
  });

  controller.start();
  assert.equal(controller.isReleased(), true, 'Reduced motion must be released immediately on start');
  assert.deepEqual(releaseEvents, ['reduced-motion-init'], 'Should record reduced-motion-init reason');
  assert.equal(env.getPendingCount(), 0, 'No timers should be scheduled in reduced-motion mode');
  console.log('✔ Test 4 passed: Reduced motion mode bypasses intro immediately with zero timers');
}

// Test 5: Motion preference change mid-sequence triggers immediate release
{
  const env = createMockEnvironment();
  const releaseEvents = [];

  const controller = createIntroController({
    isReducedMotion: false,
    onRelease: (reason) => releaseEvents.push(reason),
    setTimeoutFn: env.setTimeoutFn,
    clearTimeoutFn: env.clearTimeoutFn,
    nowFn: env.nowFn,
  });

  controller.start();
  env.advanceTime(1000);
  assert.equal(controller.isReleased(), false);

  const released = controller.handleMotionChange(true);
  assert.equal(released, true, 'handleMotionChange(true) must trigger release');
  assert.equal(controller.isReleased(), true);
  assert.deepEqual(releaseEvents, ['motion-preference-change']);
  assert.equal(env.getPendingCount(), 0, 'All timers cleared on motion change');
  console.log('✔ Test 5 passed: Motion preference change mid-sequence triggers instant release');
}

// Test 6: Asset error triggers immediate release
{
  const env = createMockEnvironment();
  const releaseEvents = [];

  const controller = createIntroController({
    isReducedMotion: false,
    onRelease: (reason) => releaseEvents.push(reason),
    setTimeoutFn: env.setTimeoutFn,
    clearTimeoutFn: env.clearTimeoutFn,
    nowFn: env.nowFn,
  });

  controller.start();
  env.advanceTime(200);

  const released = controller.handleAssetError();
  assert.equal(released, true, 'handleAssetError must trigger release');
  assert.equal(controller.isReleased(), true);
  assert.deepEqual(releaseEvents, ['asset-error']);
  console.log('✔ Test 6 passed: Asset error triggers instant release');
}

// Test 7: Background tab returning past deadline releases immediately
{
  const env = createMockEnvironment();
  const releaseEvents = [];

  // Suppress timers to simulate tab background throttling
  const controller = createIntroController({
    isReducedMotion: false,
    onRelease: (reason) => releaseEvents.push(reason),
    setTimeoutFn: () => 1,
    clearTimeoutFn: () => {},
    nowFn: env.nowFn,
  });

  controller.start();
  // Simulate tab being hidden and 6000ms passing
  env.advanceTime(6000);

  // Tab becomes visible again
  const released = controller.handleVisibilityChange(false);
  assert.equal(released, true, 'handleVisibilityChange past 5000ms must release');
  assert.equal(controller.isReleased(), true);
  assert.deepEqual(releaseEvents, ['background-tab-expired']);
  console.log('✔ Test 7 passed: Background tab returning past 5000ms releases immediately');
}

console.log('\nAll 7 release logic assertions PASSED successfully.');
