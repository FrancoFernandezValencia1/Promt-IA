export function initAudioPlayers() {
  document.querySelectorAll('[data-audio-player]').forEach(initPlayer);
}

function initPlayer(container) {
  const audio      = container.querySelector('audio');
  const playBtn    = container.querySelector('.play-btn');
  const playIcon   = container.querySelector('.play-icon');
  const pauseIcon  = container.querySelector('.pause-icon');
  const progress   = container.querySelector('.progress-bar');
  const volume     = container.querySelector('.volume-bar');
  const currentTime = container.querySelector('.current-time');
  const durationEl  = container.querySelector('.duration');

  if (!audio || !playBtn) return;

  const formatTime = (s) => {
    if (!isFinite(s)) return '--:--';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playIcon.classList.add('hidden');
      pauseIcon.classList.remove('hidden');
      playBtn.setAttribute('aria-label', 'Pausar episodio');
    } else {
      audio.pause();
      playIcon.classList.remove('hidden');
      pauseIcon.classList.add('hidden');
      playBtn.setAttribute('aria-label', 'Reproducir episodio');
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    const pct = (audio.currentTime / audio.duration) * 100 || 0;
    progress.value = pct;
    currentTime.textContent = formatTime(audio.currentTime);
  });

  progress.addEventListener('input', (e) => {
    audio.currentTime = (e.target.value / 100) * audio.duration;
  });

  if (volume) {
    volume.addEventListener('input', (e) => {
      audio.volume = e.target.value;
    });
  }

  audio.addEventListener('ended', () => {
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
  });
}
