/**
 * Living Blueprint - Intro Sequence & Recovery Controller
 *
 * Implements a 3.5s storyboard intro sequence with phase management,
 * idempotent release, independent 5-second recovery deadline,
 * reduced-motion bypass, asset-failure recovery, and tab-visibility recovery.
 */

export function createIntroController(deps = {}) {
  const {
    isReducedMotion = false,
    onRelease = () => {},
    onPhaseChange = () => {},
    setTimeoutFn = setTimeout,
    clearTimeoutFn = clearTimeout,
    nowFn = () => (typeof performance !== 'undefined' ? performance.now() : Date.now()),
  } = deps;

  let released = false;
  let isStarted = false;
  let activationTime = 0;
  let normalTimerId = null;
  let deadlineTimerId = null;
  const phaseTimers = [];

  function release(reason = 'normal') {
    if (released) return false;
    released = true;

    while (phaseTimers.length > 0) {
      clearTimeoutFn(phaseTimers.pop());
    }
    if (normalTimerId !== null) {
      clearTimeoutFn(normalTimerId);
      normalTimerId = null;
    }
    if (deadlineTimerId !== null) {
      clearTimeoutFn(deadlineTimerId);
      deadlineTimerId = null;
    }

    onRelease(reason);
    return true;
  }

  function start() {
    if (isReducedMotion) {
      release('reduced-motion-init');
      return;
    }

    isStarted = true;
    activationTime = nowFn();

    // Storyboard Phase Timers
    onPhaseChange('phase-init');
    phaseTimers.push(setTimeoutFn(() => onPhaseChange('phase-enter'), 500));
    phaseTimers.push(setTimeoutFn(() => onPhaseChange('phase-strike'), 1200));
    phaseTimers.push(setTimeoutFn(() => onPhaseChange('phase-line'), 1500));
    phaseTimers.push(setTimeoutFn(() => onPhaseChange('phase-withdraw'), 2700));

    // Standard sequence targets 3.5 seconds
    normalTimerId = setTimeoutFn(() => {
      release('normal-completion');
    }, 3500);

    // Hard fail-open deadline: release by 5.0 seconds unconditionally
    deadlineTimerId = setTimeoutFn(() => {
      release('timeout-deadline');
    }, 5000);
  }

  function handleAssetError() {
    return release('asset-error');
  }

  function handleMotionChange(prefersReduced) {
    if (prefersReduced) {
      return release('motion-preference-change');
    }
    return false;
  }

  function handleVisibilityChange(isHidden) {
    if (!isHidden && isStarted && !released) {
      const elapsed = nowFn() - activationTime;
      if (elapsed >= 5000) {
        return release('background-tab-expired');
      }
    }
    return false;
  }

  return {
    start,
    release,
    isReleased: () => released,
    handleAssetError,
    handleMotionChange,
    handleVisibilityChange,
    getActivationTime: () => activationTime,
  };
}

// Browser bootstrap
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const overlay = document.getElementById('intro-overlay');
  const hammerAsset = document.getElementById('hammer-asset');

  // If user prefers reduced motion on initial load, do not activate intro
  if (reducedMotionQuery.matches) {
    document.documentElement.classList.add('intro-finished');
    if (overlay) {
      overlay.style.display = 'none';
      overlay.setAttribute('aria-hidden', 'true');
    }
  } else {
    // Progressive enhancement: add intro classes
    document.documentElement.classList.add('has-intro');
    document.body.classList.add('intro-locked');

    const controller = createIntroController({
      isReducedMotion: false,
      onPhaseChange: (phase) => {
        if (overlay) {
          overlay.className = `intro-overlay ${phase}`;
        }
      },
      onRelease: () => {
        document.documentElement.classList.remove('has-intro');
        document.documentElement.classList.add('intro-finished');
        document.body.classList.remove('intro-locked');

        if (overlay) {
          overlay.className = 'intro-overlay phase-release';
          overlay.setAttribute('aria-hidden', 'true');
          setTimeout(() => {
            overlay.style.display = 'none';
          }, 500);
        }
      },
    });

    // Asset failure fail-open recovery
    if (hammerAsset) {
      hammerAsset.addEventListener('error', () => {
        controller.handleAssetError();
      });
    }

    // Motion preference change mid-sequence
    reducedMotionQuery.addEventListener('change', (e) => {
      controller.handleMotionChange(e.matches);
    });

    // Background tab visibility recovery
    document.addEventListener('visibilitychange', () => {
      controller.handleVisibilityChange(document.hidden);
    });

    // Non-skippable in standard mode: intercept interaction on overlay
    if (overlay) {
      const preventInteraction = (e) => {
        if (!controller.isReleased()) {
          e.preventDefault();
        }
      };
      overlay.addEventListener('click', preventInteraction);
      overlay.addEventListener('keydown', preventInteraction);
      overlay.addEventListener('wheel', preventInteraction, { passive: false });
      overlay.addEventListener('touchmove', preventInteraction, { passive: false });
    }

    // Start intro sequence
    controller.start();
  }
}
