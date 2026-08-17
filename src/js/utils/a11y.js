/**
 * Utilidades de accesibilidad reutilizables.
 * WCAG 2.1 AA compliant.
 */

/**
 * Atrapa el foco dentro de un contenedor (para modales y diálogos).
 * @param {HTMLElement} container
 * @returns {Function} Función para desvincular el listener.
 */
export function trapFocus(container) {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  const focusableEls = container.querySelectorAll(focusableSelectors);
  const firstEl = focusableEls[0];
  const lastEl  = focusableEls[focusableEls.length - 1];

  const handler = (e) => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  };

  container.addEventListener('keydown', handler);
  return () => container.removeEventListener('keydown', handler);
}

/**
 * Anuncia un mensaje a lectores de pantalla vía región aria-live.
 * Crea el contenedor si no existe.
 */
export function announce(message, priority = 'polite') {
  let region = document.getElementById('a11y-announcer');
  if (!region) {
    region = document.createElement('div');
    region.id = 'a11y-announcer';
    region.setAttribute('aria-live', priority);
    region.setAttribute('aria-atomic', 'true');
    region.className = 'sr-only';
    document.body.appendChild(region);
  }
  region.textContent = '';
  // Pequeño delay para que el lector detecte el cambio
  requestAnimationFrame(() => { region.textContent = message; });
}

/**
 * Detecta si el usuario prefiere movimiento reducido.
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Maneja el scroll con respeto a prefers-reduced-motion.
 */
export function smoothScrollTo(element) {
  if (prefersReducedMotion()) {
    element.scrollIntoView({ block: 'start' });
  } else {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Verifica contraste de colores (ratio WCAG AA).
 * @param {string} hex1 - Color de primer plano
 * @param {string} hex2 - Color de fondo
 * @returns {{ ratio: number, AA: boolean, AAA: boolean }}
 */
export function checkContrast(hex1, hex2) {
  const hexToLuminance = (hex) => {
    const rgb = hex.replace('#', '').match(/.{2}/g)
      .map(c => parseInt(c, 16) / 255)
      .map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };
  const l1 = hexToLuminance(hex1);
  const l2 = hexToLuminance(hex2);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  return {
    ratio: Math.round(ratio * 100) / 100,
    AA:  ratio >= 4.5,
    AAA: ratio >= 7,
  };
}
