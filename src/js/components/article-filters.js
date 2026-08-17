export function initArticleFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards   = document.querySelectorAll('#articles-grid article');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Actualiza estado visual y ARIA
      buttons.forEach(b => {
        const isActive = b === btn;
        b.setAttribute('aria-pressed', String(isActive));
        b.classList.toggle('bg-forest-700', isActive);
        b.classList.toggle('text-white', isActive);
        b.classList.toggle('bg-white', !isActive);
        b.classList.toggle('text-slate-brand-700', !isActive);
        b.classList.toggle('border', !isActive);
      });

      // Filtra tarjetas con animación
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });
}
