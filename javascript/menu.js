document.addEventListener('DOMContentLoaded', () => {
  const openButton = document.getElementById('openMenuBtn');
  const closeButton = document.getElementById('closeMenuBtn');
  const sideMenu = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');

  if (!openButton || !sideMenu) return;

  const closeMenu = () => {
    sideMenu.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
  };

  openButton.addEventListener('click', () => {
    sideMenu.classList.add('open');
    if (overlay) overlay.classList.add('active');
  });

  if (closeButton) closeButton.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);
});
