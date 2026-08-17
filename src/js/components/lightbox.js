export function initLightbox() {
  const modal = document.getElementById('lightbox');
  if (!modal) return;

  const img     = modal.querySelector('img');
  const caption = modal.querySelector('figcaption');
  const closeBtn = modal.querySelector('.lightbox-close');
  let lastFocused = null;

  document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      lastFocused = document.activeElement;
      img.src     = trigger.dataset.src;
      img.alt     = trigger.querySelector('img').alt;
      caption.textContent = trigger.dataset.caption || '';
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      closeBtn.focus();
    });
  });

  const close = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    if (lastFocused) lastFocused.focus();
  };

  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) close();
  });
}
