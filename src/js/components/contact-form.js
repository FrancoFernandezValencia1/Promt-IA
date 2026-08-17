export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const showError = (id, message) => {
    const el = document.getElementById(id);
    el.textContent = message;
    el.classList.remove('hidden');
    const input = form.querySelector(`[aria-describedby="${id}"]`);
    input?.setAttribute('aria-invalid', 'true');
    input?.classList.add('border-terracotta-500');
  };

  const clearError = (id) => {
    const el = document.getElementById(id);
    el.classList.add('hidden');
    const input = form.querySelector(`[aria-describedby="${id}"]`);
    input?.removeAttribute('aria-invalid');
    input?.classList.remove('border-terracotta-500');
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    ['name-error', 'email-error', 'message-error'].forEach(clearError);

    if (name.length < 2) {
      showError('name-error', 'Ingresa tu nombre completo.');
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('email-error', 'Ingresa un correo electrónico válido.');
      valid = false;
    }
    if (message.length < 10) {
      showError('message-error', 'El mensaje debe tener al menos 10 caracteres.');
      valid = false;
    }
    if (!form.privacy.checked) {
      valid = false;
      alert('Debes aceptar la política de privacidad.');
    }

    if (valid) {
      document.getElementById('form-success').classList.remove('hidden');
      form.reset();
      document.getElementById('form-success').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}
