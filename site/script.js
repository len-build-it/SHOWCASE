/**
 * Living Blueprint - Intro Sequence & Recovery Controller
 *
 * Implements a 3.5s storyboard intro sequence with phase management,
 * idempotent release, independent 5-second recovery deadline,
 * reduced-motion bypass, asset-failure recovery, and tab-visibility recovery.
 */

function createIntroController(deps = {}) {
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

const MUSIC_TRACKS = [
  { title: 'Retry Retry', src: 'music/Panda%20Beats%20-%20Retry%20Retry.mp3' },
  { title: 'Mister Prime', src: 'music/Panda%20Beats%20-%20Mister%20Prime.mp3' },
  { title: 'Hills Of Hell', src: 'music/Panda%20Beats%20-%20Hills%20Of%20Hell.mp3' },
  { title: 'Diab-low', src: 'music/Panda%20Beats%20-%20Diab-low.mp3' },
  { title: 'All Wave Control', src: 'music/Panda%20Beats%20-%20All%20Wave%20Control.mp3' },
];

globalThis.createIntroController = createIntroController;

function setupMusicPlayer() {
  const widget = document.getElementById('music-widget');
  const audio = document.getElementById('music-audio');
  const trackToggle = document.getElementById('music-track-toggle');
  const trackValue = document.getElementById('music-track-value');
  const trackMenu = document.getElementById('music-track-menu');
  const trackOptions = [...document.querySelectorAll('#music-track-menu [role="option"]')];
  const playButton = document.getElementById('music-play');
  const previousButton = document.getElementById('music-previous');
  const nextButton = document.getElementById('music-next');
  const muteButton = document.getElementById('music-mute');
  const status = document.getElementById('music-status');
  const waveBars = [...document.querySelectorAll('#music-wave span')];
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!widget || !audio || !trackToggle || !trackValue || !trackMenu || !playButton || !status) return;

  audio.muted = false;
  let currentIndex = 0;
  let audioContext;
  let analyser;
  let source;
  let waveFrame;
  let waveData;

  function setStatus(message) {
    status.textContent = message;
  }

  function syncControls() {
    const isPlaying = !audio.paused;
    const needsSoundGesture = isPlaying && audio.muted;
    widget.classList.toggle('is-playing', isPlaying);
    playButton.textContent = needsSoundGesture ? 'Enable sound' : isPlaying ? 'Pause' : 'Play';
    playButton.setAttribute('aria-label', needsSoundGesture ? 'Enable sound' : isPlaying ? 'Pause music' : 'Play music');
    muteButton.textContent = audio.muted ? 'Unmute' : 'Mute';
    muteButton.setAttribute('aria-label', audio.muted ? 'Unmute music' : 'Mute music');
    muteButton.setAttribute('aria-pressed', String(audio.muted));
  }

  function stopWave() {
    if (waveFrame) cancelAnimationFrame(waveFrame);
    waveFrame = null;
  }

  function drawWave() {
    if (!analyser || reducedMotionQuery.matches || audio.paused) return;
    analyser.getByteFrequencyData(waveData);
    waveBars.forEach((bar, index) => {
      const sample = waveData[Math.floor(index * waveData.length / waveBars.length)] / 255;
      bar.style.setProperty('--wave-level', String(Math.max(0.2, sample)));
    });
    waveFrame = requestAnimationFrame(drawWave);
  }

  function startWave() {
    stopWave();
    if (!reducedMotionQuery.matches && analyser) drawWave();
  }

  function ensureAnalyser() {
    if (analyser || !window.AudioContext) return;
    try {
      audioContext = new AudioContext();
      source = audioContext.createMediaElementSource(audio);
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      waveData = new Uint8Array(analyser.frequencyBinCount);
    } catch {
      analyser = null;
    }
  }

  async function playAudio({fallbackToMuted = false} = {}) {
    try {
      ensureAnalyser();
      if (audioContext?.state === 'suspended') audioContext.resume().catch(() => {});
      const playPromise = audio.play();
      await (fallbackToMuted
        ? Promise.race([
          playPromise,
          new Promise((_, reject) => setTimeout(() => reject(new Error('autoplay timeout')), 800)),
        ])
        : playPromise);
      setStatus(`Playing ${MUSIC_TRACKS[currentIndex].title}.`);
      syncControls();
      startWave();
    } catch {
      if (!fallbackToMuted || !audio.paused) {
        setStatus('Click Enable sound to hear the soundtrack.');
        syncControls();
        return;
      }
      audio.muted = true;
      try {
        await audio.play();
        setStatus('Playing muted. Click Enable sound for audio.');
        syncControls();
        startWave();
      } catch {
        setStatus('Click Enable sound to start the soundtrack.');
        syncControls();
      }
    }
  }

  function loadTrack(index, shouldPlay) {
    currentIndex = (index + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
    trackValue.textContent = MUSIC_TRACKS[currentIndex].title;
    trackOptions.forEach((option, index) => {
      option.setAttribute('aria-selected', String(index === currentIndex));
    });
    audio.src = MUSIC_TRACKS[currentIndex].src;
    audio.load();
    setStatus(`${MUSIC_TRACKS[currentIndex].title} selected.`);
    if (shouldPlay) playAudio();
  }

  playButton.addEventListener('click', () => {
    if (audio.muted && !audio.paused) {
      audio.muted = false;
      setStatus(`Playing ${MUSIC_TRACKS[currentIndex].title}.`);
      syncControls();
    } else if (audio.paused) playAudio();
    else audio.pause();
  });

  previousButton?.addEventListener('click', () => {
    if (audio.currentTime > 3) audio.currentTime = 0;
    else loadTrack(currentIndex - 1, !audio.paused);
  });

  nextButton?.addEventListener('click', () => loadTrack(currentIndex + 1, !audio.paused));
  muteButton?.addEventListener('click', () => {
    audio.muted = !audio.muted;
    syncControls();
    setStatus(audio.muted ? 'Music muted.' : 'Music unmuted.');
  });
  function closeTrackMenu() {
    trackMenu.hidden = true;
    trackToggle.setAttribute('aria-expanded', 'false');
  }

  trackToggle.addEventListener('click', () => {
    const isOpen = !trackMenu.hidden;
    trackMenu.hidden = isOpen;
    trackToggle.setAttribute('aria-expanded', String(!isOpen));
    if (!isOpen) trackOptions[currentIndex].focus();
  });
  trackOptions.forEach((option, index) => {
    option.addEventListener('click', () => {
      loadTrack(index, !audio.paused);
      closeTrackMenu();
      trackToggle.focus();
    });
    option.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        trackOptions[(index + direction + trackOptions.length) % trackOptions.length].focus();
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        option.click();
      } else if (event.key === 'Escape') {
        closeTrackMenu();
        trackToggle.focus();
      }
    });
  });
  document.addEventListener('click', (event) => {
    if (!widget.contains(event.target)) closeTrackMenu();
  });
  audio.addEventListener('play', syncControls);
  audio.addEventListener('pause', () => {
    stopWave();
    syncControls();
  });
  audio.addEventListener('ended', () => loadTrack(currentIndex + 1, true));
  audio.addEventListener('error', () => {
    stopWave();
    setStatus('This track is unavailable. Choose another track.');
    syncControls();
  });
  reducedMotionQuery.addEventListener('change', () => {
    stopWave();
    if (!reducedMotionQuery.matches && !audio.paused) startWave();
  });

  syncControls();
  setStatus('Starting soundtrack...');
  playAudio({fallbackToMuted: true});
}

// Browser bootstrap
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const overlay = document.getElementById('intro-overlay');
  const hammerAsset = document.getElementById('hammer-asset');

  setupMusicPlayer();

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
