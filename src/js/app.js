import { initMobileMenu } from './components/mobile-menu.js';
import { initArticleFilters } from './components/article-filters.js';
import { initAudioPlayers } from './components/audio-player.js';
import { initLightbox } from './components/lightbox.js';
import { initTabs } from './components/tabs.js';
import { initContactForm } from './components/contact-form.js';
import { announce } from './utils/a11y.js';

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initArticleFilters();
  initAudioPlayers();
  initLightbox();
  initTabs();
  initContactForm();
  announce('Página cargada correctamente');
});
