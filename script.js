(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('is-open', open);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }));
  document.querySelector('[data-load-map]')?.addEventListener('click', () => {
    const container = document.querySelector('[data-map-container]');
    if (!container || container.querySelector('iframe')) return;
    const frame = document.createElement('iframe');
    frame.title = 'Map showing Fuss Pot near Radha Sadan, 18th Road, Khar West, Mumbai';
    frame.src = 'https://maps.google.com/maps?q=Fuss%20Pot%2C%20Radha%20Sadan%2C%2018th%20Road%2C%20Khar%20West%2C%20Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed';
    frame.loading = 'lazy';
    frame.referrerPolicy = 'no-referrer-when-downgrade';
    container.replaceChildren(frame);
  });
  document.querySelectorAll('[data-year]').forEach(node => node.textContent = String(new Date().getFullYear()));

  const banner = document.querySelector('[data-consent-banner]');
  const settings = document.querySelector('[data-consent-settings]');
  const analyticsChoice = document.querySelector('[data-analytics-choice]');
  const storageKey = 'fuss-pot-privacy-choice-v1';
  const getChoice = () => {
    try { return JSON.parse(localStorage.getItem(storageKey) || 'null'); } catch { return null; }
  };
  const showBanner = () => { if (banner) banner.hidden = false; };
  const hideBanner = () => { if (banner) banner.hidden = true; };
  const saveChoice = analytics => {
    try { localStorage.setItem(storageKey, JSON.stringify({ essential: true, analytics, updatedAt: new Date().toISOString() })); } catch {}
    hideBanner();
    if (settings) settings.hidden = true;
  };
  if (!getChoice()) {
    if (navigator.globalPrivacyControl === true) saveChoice(false);
    else showBanner();
  }
  document.querySelector('[data-open-consent]')?.addEventListener('click', () => {
    const choice = getChoice();
    if (analyticsChoice) analyticsChoice.checked = Boolean(choice?.analytics);
    if (settings) settings.hidden = false;
    showBanner();
  });
  banner?.querySelectorAll('[data-consent]').forEach(button => button.addEventListener('click', () => {
    const action = button.dataset.consent;
    if (action === 'manage') { if (settings) settings.hidden = false; return; }
    if (action === 'accept') return saveChoice(true);
    if (action === 'reject') return saveChoice(false);
    if (action === 'save') return saveChoice(Boolean(analyticsChoice?.checked));
  }));
})();
