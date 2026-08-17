export function initTabs() {
  const tabs   = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('[role="tabpanel"]');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        const isActive = t === tab;
        t.setAttribute('aria-selected', String(isActive));
        t.classList.toggle('border-forest-700', isActive);
        t.classList.toggle('text-forest-700', isActive);
        t.classList.toggle('border-transparent', !isActive);
        t.classList.toggle('text-slate-brand-500', !isActive);
      });
      panels.forEach(p => {
        p.hidden = p.id !== tab.getAttribute('aria-controls');
      });
    });

    // Navegación por teclado (flechas)
    tab.addEventListener('keydown', (e) => {
      const idx = Array.from(tabs).indexOf(tab);
      if (e.key === 'ArrowRight') tabs[(idx + 1) % tabs.length].focus();
      if (e.key === 'ArrowLeft')  tabs[(idx - 1 + tabs.length) % tabs.length].focus();
    });
  });
}
