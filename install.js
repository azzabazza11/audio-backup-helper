/** Quiet native PWA install — no overlay. Header Install shows only when Chrome can prompt. */
(function () {
  'use strict';

  let deferredInstallPrompt = null;

  function isStandalone() {
    if (window.navigator.standalone === true) return true;
    return !!(window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
  }

  function installButtons() {
    return document.querySelectorAll('#btn-install, #btnInstall, [data-pwa-install]');
  }

  function updateUi() {
    const show = !!(deferredInstallPrompt && !isStandalone());
    installButtons().forEach(btn => {
      btn.hidden = !show;
      if (show) btn.textContent = 'Install';
    });
  }

  async function promptInstallApp() {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    try { await deferredInstallPrompt.userChoice; } catch { /* ignore */ }
    deferredInstallPrompt = null;
    updateUi();
  }

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredInstallPrompt = e;
    updateUi();
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    updateUi();
  });

  installButtons().forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      promptInstallApp();
    });
  });

  updateUi();
})();
