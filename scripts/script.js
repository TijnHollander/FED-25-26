console.log('Nav Script geladen');
(() => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('nav-links');
  const focusableSelector = 'a, button, input, [tabindex]:not([tabindex="-1"])';
  let lastFocused = null;

  function openMenu() {
    lastFocused = document.activeElement;
    document.body.classList.add('menu-open');
    navLinks.classList.add('open');
    navToggle.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Sluit menu');
    document.body.style.overflow = 'hidden';

    // focus first link in menu
    const firstLink = navLinks.querySelector(focusableSelector);
    if (firstLink) firstLink.focus();

    document.addEventListener('keydown', handleKeydown);
    navLinks.addEventListener('click', handleNavClick);
  }

  function closeMenu() {
    document.body.classList.remove('menu-open');
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';

    if (lastFocused) lastFocused.focus();

    document.removeEventListener('keydown', handleKeydown);
    navLinks.removeEventListener('click', handleNavClick);
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  }

  function handleNavClick(e) {
    // Klik op link sluit menu
    if (e.target.tagName.toLowerCase() === 'a') {
      closeMenu();
    }
    // overal klikken sluit lijst behalve binnenin de lijst
    const insideList = e.target.closest('ul');
    if (!insideList) closeMenu();
  }

  navToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.contains('menu-open');
    if (isOpen) closeMenu();
    else openMenu();
  });

  // close menu bij resize naar desktop
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 768 && document.body.classList.contains('menu-open')) {
        closeMenu();
      }
    }, 150);
  });
})();
