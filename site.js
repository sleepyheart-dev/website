(function () {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const icon = document.querySelector('.theme-icon');
  const storageKey = 'site-theme';

  function prefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function getStoredTheme() {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch (error) {
      return null;
    }
    return null;
  }

  function storeTheme(theme) {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (error) {
      // Ignore storage failures (private mode / disabled storage).
    }
  }

  function toggleLabels(theme, lang) {
    const isNorwegian = lang.startsWith('no');
    if (theme === 'dark') {
      return {
        icon: '\u2600',
        label: isNorwegian ? 'Bytt til lys modus' : 'Switch to light mode'
      };
    }
    return {
      icon: '\u263E',
      label: isNorwegian ? 'Bytt til mørk modus' : 'Switch to dark mode'
    };
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);

    const lang = (root.lang || 'en').toLowerCase();
    const labels = toggleLabels(theme, lang);
    if (icon) {
      icon.textContent = labels.icon;
    }
    if (toggle) {
      toggle.setAttribute('aria-label', labels.label);
      toggle.setAttribute('title', labels.label);
    }
  }

  const storedTheme = getStoredTheme();
  const initialTheme = storedTheme || (prefersDark() ? 'dark' : 'light');
  applyTheme(initialTheme);

  if (toggle) {
    toggle.addEventListener('click', function () {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      storeTheme(next);
    });
  }

  const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  if (media && typeof media.addEventListener === 'function') {
    media.addEventListener('change', function (event) {
      if (getStoredTheme()) {
        return;
      }
      applyTheme(event.matches ? 'dark' : 'light');
    });
  }

  const dateline = document.getElementById('dateline');
  const year = document.getElementById('y');
  const now = new Date();

  if (dateline) {
    const lang = (root.lang || 'en').toLowerCase();
    const isNorwegian = lang.startsWith('no');
    const locale = isNorwegian ? 'no-NO' : 'en-GB';
    const prefix = isNorwegian ? 'Oppdatert' : 'Updated';
    dateline.textContent =
      prefix + ' ' + now.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
  }

  if (year) {
    year.textContent = now.getFullYear();
  }
})();
